"use client";

import { useEffect, useRef, useState } from "react";

/* Informe de auditoría que se "ejecuta" solo: las tareas aparecen una por una,
   se miden, el costo cuenta hacia arriba y al final se suma el total. La idea es
   que el visitante VEA pasar lo que le estamos prometiendo, en vez de leer una
   tabla quieta. Cuando termina, espera y vuelve a empezar. */

type Proceso = {
  n: string;
  name: string;
  horas: string;
  costo: number | null; // null = no se mide (el agujero que nadie ve)
  w: string;
};

const PROCESOS: Proceso[] = [
  { n: "01", name: "Responder las mismas consultas", horas: "12 h", costo: 10080, w: "76%" },
  { n: "02", name: "Cargar pedidos a mano", horas: "8 h", costo: 6720, w: "52%" },
  { n: "03", name: "Coordinar entregas y turnos", horas: "6 h", costo: 5040, w: "38%" },
  { n: "04", name: "Conciliar pagos y cobranzas", horas: "5 h", costo: 4200, w: "32%" },
  { n: "05", name: "Retomar a los que no compraron", horas: "0 h", costo: null, w: "4%" },
];

const TOTAL = PROCESOS.reduce((s, p) => s + (p.costo ?? 0), 0);

/* Tiempos de la secuencia (ms) */
const T_ESCANEO = 1100;   // "analizando la operación…"
const T_FILA = 620;       // entre una tarea y la siguiente
const T_TOTAL = 700;      // pausa antes de sumar el total
const T_DESCANSO = 4200;  // cuánto queda el informe completo antes de reiniciar

const fmt = new Intl.NumberFormat("es-AR");

/** Cuenta de 0 a `valor`. Arranca cuando `activo` pasa a true. */
function useContador(valor: number, activo: boolean, duracion = 700) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!activo) { setN(0); return; }
    if (typeof window === "undefined") { setN(valor); return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(valor); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duracion, 1);
      // easeOutкняж — desacelera al final para que el número "aterrice"
      setN(Math.round(valor * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [valor, activo, duracion]);
  return n;
}

function Fila({ p, visible }: { p: Proceso; visible: boolean }) {
  const monto = useContador(p.costo ?? 0, visible && p.costo !== null);
  return (
    <div className={`proc-row${visible ? " entra" : ""}`} aria-hidden={!visible}>
      <span className="pieza">{p.n}</span>
      <div>
        <div className="proc-name">{p.name}</div>
        <div className="proc-bar">
          <div
            className={`proc-fill${p.costo === null ? " warn" : ""}`}
            style={{ width: visible ? p.w : "0%" }}
          />
        </div>
      </div>
      <div className="proc-horas">{visible ? p.horas : ""}</div>
      <div className="proc-cost">
        {!visible ? "" : p.costo === null ? "sin medir" : `$${fmt.format(monto)}`}
      </div>
    </div>
  );
}

export default function AuditReport() {
  // -1 = escaneando · 0..4 = tareas apareciendo · 5 = total · 6 = completo
  const [paso, setPaso] = useState(-1);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) { setPaso(6); return; } // sin animación: informe completo de una

    const correr = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setPaso(-1);

      PROCESOS.forEach((_, i) => {
        timers.current.push(
          window.setTimeout(() => setPaso(i), T_ESCANEO + i * T_FILA)
        );
      });

      const finFilas = T_ESCANEO + PROCESOS.length * T_FILA;
      timers.current.push(window.setTimeout(() => setPaso(5), finFilas + T_TOTAL));
      timers.current.push(window.setTimeout(() => setPaso(6), finFilas + T_TOTAL + 750));
      timers.current.push(
        window.setTimeout(correr, finFilas + T_TOTAL + 750 + T_DESCANSO)
      );
    };

    correr();
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const escaneando = paso === -1;
  const totalVisible = paso >= 5;
  const total = useContador(TOTAL, totalVisible, 900);

  return (
    <div className="diagrama framed">
      <div className="diagrama-head">
        <span className="tech">Informe de auditoría · ejemplo</span>
        <span className={`pieza${escaneando ? " parpadea" : ""}`}>
          {escaneando ? "•••" : "REV·A"}
        </span>
      </div>

      {/* Línea que recorre el bloque mientras "analiza" */}
      {escaneando && <div className="scan-line" aria-hidden="true" />}

      <div className="proc-head">
        <span>Tarea que se repite</span>
        <span>Por semana</span>
        <span>Te cuesta al año</span>
      </div>

      <div className="proc-body" aria-live="polite">
        {PROCESOS.map((p, i) => (
          <Fila key={p.n} p={p} visible={paso >= i} />
        ))}
        {escaneando && (
          <div className="proc-scan">
            <span className="proc-scan-dot" />
            Analizando la operación
            <span className="puntos"><i>.</i><i>.</i><i>.</i></span>
          </div>
        )}
      </div>

      <div className={`diagrama-total${totalVisible ? " on" : ""}`}>
        <span className="tech">Lo que se va por año</span>
        <span className="total-val">{totalVisible ? `$${fmt.format(total)}` : "—"}</span>
      </div>

      <p className={`nota informe-nota${paso >= 6 ? " on" : ""}`}>
        Así queda el informe. Con tus tareas y tus números.
      </p>
    </div>
  );
}
