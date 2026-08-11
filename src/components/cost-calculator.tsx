"use client";

import { useState, useEffect, useRef } from "react";
import { trackCalculadora } from "@/lib/track";

/* Supuestos, conservadores a propósito:
   - 22 días hábiles y jornada de 8 h → 176 h/mes.
   - Factor 1.45 sobre el sueldo: un empleado trabaja ~11 meses de los que le pagás
     (aguinaldo, vacaciones, ausencias). Es la versión moderada del cálculo; la agresiva
     multiplica por 3 contando cargas completas.
   - 65 % automatizable: se deja afuera el criterio, la excepción y el trato humano. */
const HORAS_MES = 176;
const CARGAS = 1.45;
const AUTOMATIZABLE = 0.65;

const fmt = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function trackFill(value: number, min: number, max: number) {
  const pct = ((value - min) / (max - min)) * 100;
  return `linear-gradient(90deg, #29b5e5 0%, #29b5e5 ${pct}%, rgba(41,181,229,0.12) ${pct}%)`;
}

export default function CostCalculator({ calUrl }: { calUrl: string }) {
  const [personas, setPersonas] = useState(3);
  const [horas, setHoras] = useState(4);
  const [sueldo, setSueldo] = useState(700);

  // Costo real de la hora, con el peso de las cargas incluido.
  const costoHora = (sueldo * CARGAS) / HORAS_MES;
  const mensual = Math.round(personas * horas * 22 * costoHora);
  const anual = mensual * 12;
  const recuperable = Math.round(mensual * AUTOMATIZABLE);
  const horasMes = personas * horas * 22;

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
    <section className="calc-section" id="calculadora">
      <div className="calc-grid">
        {/* IZQUIERDA: sliders */}
        <div className="reveal">
          <div className="sec-label">El número que casi nadie tiene</div>
          <h2 className="sec-title">
            Cuánto te cuesta hoy el <span className="accent">trabajo repetitivo</span>
          </h2>
          <p className="sec-sub">
            No hace falta la auditoría para tener una idea. Movelo con tus números y mirá lo que
            estás pagando por tareas que una máquina puede hacer.
          </p>

          <div className="slider-row">
            <div className="slider-head">
              <span className="slider-label">Personas que hacen tareas repetitivas</span>
              <span className="slider-value">{personas}</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={1}
              value={personas}
              onChange={(e) => setPersonas(+e.target.value)}
              style={{ background: trackFill(personas, 1, 15) }}
              aria-label="Personas que hacen tareas repetitivas"
            />
          </div>

          <div className="slider-row">
            <div className="slider-head">
              <span className="slider-label">Horas por día que le dedica cada una</span>
              <span className="slider-value">{horas} h</span>
            </div>
            <input
              type="range"
              min={1}
              max={8}
              step={1}
              value={horas}
              onChange={(e) => setHoras(+e.target.value)}
              style={{ background: trackFill(horas, 1, 8) }}
              aria-label="Horas por día"
            />
          </div>

          <div className="slider-row">
            <div className="slider-head">
              <span className="slider-label">Lo que le pagás por mes a cada una</span>
              <span className="slider-value">{fmt.format(sueldo)}</span>
            </div>
            <input
              type="range"
              min={300}
              max={2500}
              step={50}
              value={sueldo}
              onChange={(e) => setSueldo(+e.target.value)}
              style={{ background: trackFill(sueldo, 300, 2500) }}
              aria-label="Sueldo mensual"
            />
          </div>

          <div className="cota" style={{ marginTop: 30 }}>
            <span className="cota-val">{horasMes.toLocaleString("es-AR")} h por mes</span>
          </div>
        </div>

        {/* DERECHA: resultado */}
        <div className="result-card framed reveal d1">
          <div className="res-label loss">
            <span className="live-dot" />
            Estás pagando por mes
          </div>
          <div className="res-loss">{fmt.format(mensual)}</div>
          <div className="res-annual">
            Son <b>{fmt.format(anual)}</b> al año en trabajo que se repite
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
            {fmt.format(recuperable)} <span>/ mes</span>
          </div>

          <a
            href={calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="res-cta"
            data-cta="calculadora"
          >
            Quiero saber cuál es mi número real
            <span>→</span>
          </a>
        </div>
      </div>

      <p className="calc-fineprint">
        * Estimación orientativa. Se asumen 22 días hábiles, jornada de 8 horas, y un factor de{" "}
        <b>1,45</b> sobre el sueldo porque un empleado trabaja unos 11 meses de los 12 que le pagás
        (aguinaldo, vacaciones y ausencias). Se considera automatizable el <b>65 %</b> de esas
        horas: queda afuera todo lo que requiere criterio, excepción o trato humano. El número
        exacto de tu caso sale de la auditoría, no de acá.
      </p>
    </section>
  );
}
