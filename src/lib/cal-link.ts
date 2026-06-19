// Construye el link a cal.com preservando la atribución (UTMs) del visitante.
// La lógica de captura es la misma que usaba el antiguo <CalEmbed/>: prioriza
// los UTMs de la URL (last-touch) y los persiste 30 días en localStorage para
// sobrevivir la navegación interna. El link resultante lleva los UTMs en la
// query, así cal.com los recibe igual que antes lo hacía el iframe.

export const CAL_BASE = "https://cal.com/ignacio.arruvito/iabyia";
const STORAGE_KEY = "iabyia_atribucion";
const STORAGE_KEY_LEGACY = "iabyia_video_origen";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 días

interface Attribution {
  source?: string; // utm_source: instagram, tiktok, linkedin, youtube
  medium?: string; // utm_medium: bio, channel, video, etc.
  videoId?: string; // utm_content: solo si es un ID válido de YouTube
}

/** YouTube video IDs son 11 caracteres del set [A-Za-z0-9_-]. */
function isValidVideoId(v: string | null | undefined): v is string {
  return !!v && /^[A-Za-z0-9_-]{11}$/.test(v);
}

/** Sanitiza un valor de UTM — solo alfanumérico, guiones y barras bajas, máx 40 chars. */
function sanitizeUtm(v: string | null): string | undefined {
  if (!v) return undefined;
  const clean = v.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40);
  return clean.length > 0 ? clean : undefined;
}

/**
 * Resuelve la atribución del visitante: prioriza UTMs de la URL actual (last-touch),
 * y la persiste para sobrevivir navegación interna. Si no hay UTMs en la URL,
 * usa lo guardado en localStorage (dentro del TTL).
 */
function resolveAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  const url = new URLSearchParams(window.location.search);
  const fromUrl = {
    source: sanitizeUtm(url.get("utm_source")),
    medium: sanitizeUtm(url.get("utm_medium")),
    content: url.get("utm_content"),
  };
  const hasUrlAttribution = fromUrl.source || fromUrl.medium || fromUrl.content;

  if (hasUrlAttribution) {
    // Solo consideramos utm_content como video_id si la fuente es claramente YouTube
    // (utm_source=youtube + utm_medium=video). Sino "link_in_bio" o similares de
    // 11 chars en otras plataformas crean falsos positivos.
    const isYouTubeVideo = fromUrl.source === "youtube" && fromUrl.medium === "video";
    const att: Attribution = {
      source: fromUrl.source,
      medium: fromUrl.medium,
      videoId: isYouTubeVideo && isValidVideoId(fromUrl.content) ? fromUrl.content : undefined,
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...att, t: Date.now() }));
    } catch {
      /* localStorage no disponible — seguimos igual */
    }
    return att;
  }

  // Sin UTMs en la URL: leer del storage si vigente
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Attribution & { t?: number };
      if (typeof parsed.t === "number" && Date.now() - parsed.t < TTL_MS) {
        return {
          source: parsed.source,
          medium: parsed.medium,
          videoId: isValidVideoId(parsed.videoId) ? parsed.videoId : undefined,
        };
      }
    }
    // Fallback al storage viejo (solo video_id) para no perder atribución
    const legacyRaw = window.localStorage.getItem(STORAGE_KEY_LEGACY);
    if (legacyRaw) {
      const { v, t } = JSON.parse(legacyRaw) as { v?: string; t?: number };
      if (isValidVideoId(v) && typeof t === "number" && Date.now() - t < TTL_MS) {
        return { videoId: v };
      }
    }
  } catch {
    /* dato corrupto o sin acceso — lo ignoramos */
  }
  return {};
}

/** Devuelve la URL de cal.com con los UTMs del visitante incrustados en la query. */
export function buildCalUrl(): string {
  const att = resolveAttribution();
  const params = new URLSearchParams();
  if (att.videoId) params.set("video_id", att.videoId);
  if (att.source) params.set("utm_source", att.source);
  if (att.medium) params.set("utm_medium", att.medium);
  const qs = params.toString();
  return qs ? `${CAL_BASE}?${qs}` : CAL_BASE;
}
