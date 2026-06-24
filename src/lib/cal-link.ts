// Construye el link a cal.com preservando la atribución (UTMs) del visitante.
// Solo se considera la atribución de la VISITA ACTUAL (los UTMs de la URL). Si el
// visitante llega sin UTMs (directo, Google, etc.) NO se le inventa una fuente:
// el link va a cal.com sin parámetros y el dashboard lo registra como "Landing".
// (Antes se persistía la última fuente 30 días en localStorage, lo que provocaba
//  falsos positivos: una visita directa heredaba una fuente vieja.)

export const CAL_BASE = "https://cal.com/ignacio.arruvito/iabyia";

interface Attribution {
  source?: string; // utm_source: instagram, tiktok, linkedin, youtube
  medium?: string; // utm_medium: bio, channel, video, post, etc.
  videoId?: string; // utm_content: solo si es un ID válido de YouTube
  content?: string; // utm_content genérico (ej: post.id de un post de LinkedIn) — atribución por post
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
 * Resuelve la atribución del visitante únicamente a partir de los UTMs de la URL
 * actual. Si no hay UTMs, devuelve {} (visita directa, sin atribución).
 */
function resolveAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  const url = new URLSearchParams(window.location.search);
  const source = sanitizeUtm(url.get("utm_source"));
  const medium = sanitizeUtm(url.get("utm_medium"));
  const content = url.get("utm_content");

  // Sin ningún UTM en la URL → visita directa: no atribuimos nada.
  if (!source && !medium && !content) return {};

  // Solo tomamos utm_content como video_id si la fuente es claramente YouTube
  // (utm_source=youtube + utm_medium=video). Sino "link_in_bio" y similares de
  // 11 chars en otras plataformas crearían falsos positivos.
  const isYouTubeVideo = source === "youtube" && medium === "video";

  return {
    source,
    medium,
    videoId: isYouTubeVideo && isValidVideoId(content) ? content : undefined,
    // utm_content genérico para fuentes que NO son video de YouTube (ej: post.id de
    // un post de LinkedIn). En YouTube el id ya viaja como video_id, no lo duplicamos.
    content: !isYouTubeVideo ? sanitizeUtm(content) : undefined,
  };
}

/** Devuelve la URL de cal.com con los UTMs del visitante incrustados en la query. */
export function buildCalUrl(): string {
  const att = resolveAttribution();
  const params = new URLSearchParams();
  if (att.videoId) params.set("video_id", att.videoId);
  if (att.source) params.set("utm_source", att.source);
  if (att.medium) params.set("utm_medium", att.medium);
  if (att.content) params.set("utm_content", att.content);
  const qs = params.toString();
  return qs ? `${CAL_BASE}?${qs}` : CAL_BASE;
}
