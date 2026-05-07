"use client";

import { useEffect, useRef } from "react";

const PHRASES = [
  "una venta perdida.",
  "plata que se va.",
  "un cliente menos.",
  "tu mayor problema.",
];

export default function MorphingText() {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const idxRef = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const interval = window.setInterval(() => {
      const phrases = wrap.querySelectorAll<HTMLSpanElement>(".morph-phrase");
      if (!phrases.length) return;

      const current = phrases[idxRef.current];
      idxRef.current = (idxRef.current + 1) % phrases.length;
      const next = phrases[idxRef.current];

      current.classList.remove("active");
      current.classList.add("exit");
      next.classList.remove("exit");
      // small delay to let exit animate before next enters
      window.setTimeout(() => {
        next.classList.add("active");
      }, 60);

      // clean exit class after transition
      window.setTimeout(() => {
        current.classList.remove("exit");
      }, 600);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="morph-wrap" ref={wrapRef}>
      {PHRASES.map((p, i) => (
        <span key={p} className={`morph-phrase ${i === 0 ? "active" : ""}`}>
          {p}
        </span>
      ))}
    </span>
  );
}
