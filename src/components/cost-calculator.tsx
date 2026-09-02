"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import { trackCalculadora } from "@/lib/track";

/* Supuestos, conservadores a propósito:
   - 22 días hábiles y jornada de 8 h → 176 h/mes.
   - Factor 1.45 sobre el sueldo: un empleado trabaja ~11 meses de los que le pagás
     (aguinaldo, vacaciones, ausencias). Es la versión moderada del cálculo.
   - 65 % automatizable: se deja afuera el criterio, la excepción y el trato humano. */
const HORAS_MES = 176;
const CARGAS = 1.45;
const AUTOMATIZABLE = 0.65;

const fmt = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** El número no salta: cuenta hasta el valor nuevo en ~300 ms, como una aguja. */
function useSuave(valor: number, ms = 300) {
  const [v, setV] = useState(valor);
  const actual = useRef(valor);
  useEffect(() => {
    const desde = actual.current;
    const hasta = valor;
    if (desde === hasta) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      actual.current = hasta;
      setV(hasta);
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / ms, 1);
      const e = 1 - Math.pow(1 - p, 3);
      const n = Math.round(desde + (hasta - desde) * e);
      actual.current = n;
      setV(n);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [valor, ms]);
  return v;
}

function Slider({
  label, value, min, max, step, onChange, texto, aria,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; texto: string; aria: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="slider-row">
      <div className="slider-head">
        <span className="slider-label">{label}</span>
        <span className="slider-value">{texto}</span>
      </div>
      <input
        type="range"
        className="slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        style={{ "--fill": `${pct}%` } as CSSProperties}
        aria-label={aria}
      />
    </div>
  );
}

export default function CostCalculator({ calUrl }: { calUrl: string }) {
  const [personas, setPersonas] = useState(3);
  const [horas, setHoras] = useState(4);
  const [sueldo, setSueldo] = useState(700);

  // Costo real de la hora, con el peso de las cargas incluido.
  const costoHora = (sueldo * CARGAS) / HORAS_MES;
  const mensual = Math.round(personas * horas * 22 * costoHora);
  const recuperable = Math.round(mensual * AUTOMATIZABLE);
  const horasMes = personas * horas * 22;

  const mensualSuave = useSuave(mensual);
  const recuperableSuave = useSuave(recuperable);
  const anualSuave = mensualSuave * 12;

  /* Lo que el visitante declara sobre su propio negocio. Es investigación de mercado gratis
     y, si después agenda, llega a la llamada pre-calificado.
     Debounce de 1 s + skip del primer render: mover un slider al pasar no cuenta como "la usó".
     La firma de trackCalculadora se mantiene (4 números) para no tocar el contrato con el
     dashboard; lo que cambió es qué mide cada uno: personas, sueldo, horas/día y costo mensual. */
  const primerRender = useRef(true);
  useEffect(() => {
    if (primerRender.current) { primerRender.current = false; return; }
    const t = setTimeout(() => trackCalculadora(personas, sueldo, horas, mensual), 1000);
    return () => clearTimeout(t);
  }, [personas, sueldo, horas, mensual]);

  return (
    <section className="calc-section" id="calculadora" aria-label="Calculadora de costo">
      <div className="reveal">
        <div className="sec-head">
          <div className="sec-head-main">
            <div className="sec-label">El número que casi nadie tiene</div>
            <h2 className="sec-title">
              Cuánto te cuesta hoy el <span className="accent">trabajo repetitivo</span>
            </h2>
            <p className="sec-sub">
              No hace falta la auditoría para tener una idea. Movelo con tus números y mirá lo que
              estás pagando por tareas que una máquina puede hacer.
            </p>
          </div>
          <div className="sec-head-side">
            <span className="hoja">Hoja 05 / 09</span>
            <p className="nota nota-margen">Estimación. El número real sale de la auditoría.</p>
          </div>
        </div>

        <div className="calc-grid">
          {/* Sliders. En una columna (móvil) el resultado se muestra ARRIBA de esto: ver .calc-result */}
          <div className="calc-sliders">
            <Slider
              label="Personas que hacen tareas repetitivas"
              value={personas} min={1} max={15} step={1}
              onChange={setPersonas} texto={String(personas)}
              aria="Personas que hacen tareas repetitivas"
            />
            <Slider
              label="Horas por día que le dedica cada una"
              value={horas} min={1} max={8} step={1}
              onChange={setHoras} texto={`${horas} h`}
              aria="Horas por día"
            />
            <Slider
              label="Lo que le pagás por mes a cada una"
              value={sueldo} min={300} max={2500} step={50}
              onChange={setSueldo} texto={fmt.format(sueldo)}
              aria="Sueldo mensual"
            />
            <div className="cota" style={{ marginTop: 26 }}>
              <span className="cota-val">{horasMes.toLocaleString("es-AR")} h por mes</span>
            </div>
          </div>

          {/* Resultado */}
          <div className="result-card framed calc-result">
            <div className="res-label loss">
              <span className="live-dot" />
              Estás pagando por mes
            </div>
            <div className="res-loss" aria-live="polite">{fmt.format(mensualSuave)}</div>
            <div className="res-annual">
              Son <b>{fmt.format(anualSuave)}</b> al año en trabajo que se repite
            </div>
            <p className="res-loss-note">
              Y esto es solo el costo directo. No cuenta las ventas que se pierden mientras esa
              persona está ocupada haciendo otra cosa.
            </p>

            <div className="res-divider" />

            <div className="res-label recover">
              <span className="live-dot" />
              Automatizable, siendo conservador
            </div>
            <div className="res-recover">
              {fmt.format(recuperableSuave)} <span>/ mes</span>
            </div>

            <a
              href={calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="res-cta"
              data-cta="calculadora"
            >
              Agendar y ver mi número real
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <p className="calc-fineprint">
          * Estimación orientativa: 22 días hábiles, jornada de 8 horas, factor <b>1,45</b> sobre
          el sueldo (un empleado trabaja unos 11 meses de los 12 que le pagás) y un <b>65 %</b>{" "}
          automatizable, dejando afuera todo lo que requiere criterio o trato humano. El número
          exacto de tu caso sale de la auditoría, no de acá.
        </p>
      </div>
    </section>
  );
}
