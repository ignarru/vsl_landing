"use client";

import { useEffect, useRef, useState } from "react";

/* Procesos distintos a propósito: la auditoría no es sobre conversaciones,
   es sobre cualquier tarea repetitiva del negocio. */
const PHRASES = [
  "cargar pedidos a mano.",
  "armar presupuestos uno por uno.",
  "seguir a los que no compraron.",
  "cruzar pagos en una planilla.",
  "coordinar entregas por teléfono.",
  "responder siempre lo mismo.",
];

const CADA = 2800;

export default function MorphingText() {
  const [idx, setIdx] = useState(0);
  const [saliendo, setSaliendo] = useState<number | null>(null);
  const idxRef = useRef(0);

  useEffect(() => {
    // Con reduced-motion la frase se queda quieta: rotar sin transición es solo ruido.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let intervalo: number | null = null;
    let limpieza = 0;

    const paso = () => {
      const actual = idxRef.current;
      const siguiente = (actual + 1) % PHRASES.length;
      idxRef.current = siguiente;
      setSaliendo(actual);
      setIdx(siguiente);
      clearTimeout(limpieza);
      limpieza = window.setTimeout(() => setSaliendo(null), 600);
    };
    // Se pausa con la pestaña oculta: nadie mira y el timer no tiene por qué seguir.
    const arrancar = () => { if (intervalo === null) intervalo = window.setInterval(paso, CADA); };
    const parar = () => { if (intervalo !== null) { clearInterval(intervalo); intervalo = null; } };
    const onVisibilidad = () => (document.visibilityState === "visible" ? arrancar() : parar());

    document.addEventListener("visibilitychange", onVisibilidad);
    if (document.visibilityState === "visible") arrancar();
    return () => {
      parar();
      clearTimeout(limpieza);
      document.removeEventListener("visibilitychange", onVisibilidad);
    };
  }, []);

  /* Las frases se apilan en la misma celda de grid (ver .morph-wrap en globals.css):
     el alto del bloque lo fija sola la frase más alta y nunca salta al rotar. */
  return (
    <span className="morph-wrap">
      {PHRASES.map((p, i) => (
        <span
          key={p}
          className={`morph-phrase${i === idx ? " active" : ""}${i === saliendo ? " exit" : ""}`}
          aria-hidden={i !== idx}
        >
          {p}
        </span>
      ))}
    </span>
  );
}
