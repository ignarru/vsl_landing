"use client";

import { useEffect, useState } from "react";

export default function CalEmbed() {
  const [loaded, setLoaded] = useState(false);

  // Start loading the iframe after first paint (not blocking render)
  useEffect(() => {
    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(() => setLoaded(true));
      return () => cancelIdleCallback(id);
    } else {
      // Safari/iOS doesn't support requestIdleCallback
      const id = setTimeout(() => setLoaded(true), 100);
      return () => clearTimeout(id);
    }
  }, []);

  return (
    <div className="cal-embed">
      {loaded ? (
        <iframe
          src="https://cal.com/ignacio.arruvito/iabyia"
          className="w-full border-none"
          style={{ height: "660px" }}
          title="Agendar reunion con IAbyIA"
        />
      ) : (
        <div
          className="w-full flex items-center justify-center bg-surface"
          style={{ height: "660px" }}
        >
          <div className="text-ink3 text-sm">Cargando calendario...</div>
        </div>
      )}
    </div>
  );
}
