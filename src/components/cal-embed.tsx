"use client";

import { useEffect, useState } from "react";

export default function CalEmbed() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
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
          src="https://cal.com/ignacio.arruvito/iabyia"
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
