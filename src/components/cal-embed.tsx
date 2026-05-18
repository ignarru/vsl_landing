"use client";

import { useEffect, useState } from "react";

const CAL_BASE = "https://cal.com/ignacio.arruvito/iabyia";
const STORAGE_KEY = "iabyia_video_origen";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 días

/** YouTube video IDs son 11 caracteres del set [A-Za-z0-9_-]. */
function isValidVideoId(v: string | null): v is string {
  return !!v && /^[A-Za-z0-9_-]{11}$/.test(v);
}

/**
 * Resuelve el video de origen: primero del `utm_content` de la URL actual
 * (lo persiste para sobrevivir navegación), si no, del último guardado.
 */
function resolveVideoId(): string | null {
  if (typeof window === "undefined") return null;

  const fromUrl = new URLSearchParams(window.location.search).get("utm_content");
  if (isValidVideoId(fromUrl)) {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ v: fromUrl, t: Date.now() }),
      );
    } catch {
      /* localStorage no disponible — seguimos igual */
    }
    return fromUrl;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const { v, t } = JSON.parse(raw) as { v?: string; t?: number };
      if (isValidVideoId(v ?? null) && typeof t === "number" && Date.now() - t < TTL_MS) {
        return v as string;
      }
    }
  } catch {
    /* dato corrupto o sin acceso — lo ignoramos */
  }
  return null;
}

export default function CalEmbed() {
  const [loaded, setLoaded] = useState(false);
  const [calSrc, setCalSrc] = useState(CAL_BASE);

  useEffect(() => {
    // Inyectar el video de origen como campo oculto `video_id` de cal.com
    const videoId = resolveVideoId();
    if (videoId) {
      setCalSrc(`${CAL_BASE}?video_id=${encodeURIComponent(videoId)}`);
    }

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
