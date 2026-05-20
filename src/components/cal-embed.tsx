"use client";

import { useEffect, useState } from "react";

const CAL_BASE = "https://cal.com/ignacio.arruvito/iabyia";
const STORAGE_KEY = "iabyia_atribucion";
const STORAGE_KEY_LEGACY = "iabyia_video_origen";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 días

interface Attribution {
  source?: string;  // utm_source: instagram, tiktok, linkedin, youtube
  medium?: string;  // utm_medium: bio, channel, video, etc.
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
    const att: Attribution = {
      source:  fromUrl.source,
      medium:  fromUrl.medium,
      videoId: isValidVideoId(fromUrl.content) ? fromUrl.content : undefined,
    };
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...att, t: Date.now() }),
      );
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
          source:  parsed.source,
          medium:  parsed.medium,
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

export default function CalEmbed() {
  const [loaded, setLoaded] = useState(false);
  const [calSrc, setCalSrc] = useState(CAL_BASE);

  useEffect(() => {
    const att = resolveAttribution();
    const params = new URLSearchParams();
    if (att.videoId) params.set("video_id",   att.videoId);
    if (att.source)  params.set("utm_source", att.source);
    if (att.medium)  params.set("utm_medium", att.medium);
    const qs = params.toString();
    if (qs) setCalSrc(`${CAL_BASE}?${qs}`);

    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(() => setLoaded(true));
      return () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(() => setLoaded(true), 100);
      return () => clearTimeout(id);
    }
  }, []);

  return (
    <div className="cal-embed">
      {loaded ? (
        <iframe
          src={calSrc}
          title="Agendar reunión con IAbyIA"
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "700px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(30,143,255,0.4)"
            strokeWidth="1.4"
          >
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p style={{ color: "#4a6589", fontSize: "14px" }}>Cargando calendario...</p>
        </div>
      )}
    </div>
  );
}
