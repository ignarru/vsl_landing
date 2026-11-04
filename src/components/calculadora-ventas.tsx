"use client";

import { useEffect, useRef, useState } from "react";
import { trackCalculadora } from "@/lib/track";

/* Calculadora de VENTAS PERDIDAS (v4, nov 2026). Reemplaza a la de sueldos: al negocio online se
   le vende facturación, no horas.
   Supuestos conservadores a propósito (un número creíble vende más que uno inflado):
   - solo el 3 % de las consultas sin respuesta se habría convertido en venta;
   - la IA recupera el 70 % de eso. */
const CONVERSION = 0.03;
const RECUPERABLE = 0.7;
const DIAS_MES = 30.4;

const usd = new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function relleno(v: number, min: number, max: number) {
  const p = ((v - min) / (max - min)) * 100;
  return `linear-gradient(90deg, var(--acento) 0%, var(--acento) ${p}%, var(--linea) ${p}%)`;
}

export default function CalculadoraVentas({ calUrl }: { calUrl: string }) {
  const [consultas, setConsultas] = useState(60);
  const [ticket, setTicket] = useState(50);
  const [pct, setPct] = useState(30);

  const perdidaMes = Math.round(consultas * DIAS_MES * (pct / 100) * CONVERSION * ticket);
  const recuperable = Math.round(perdidaMes * RECUPERABLE);

  /* Contrato con el dashboard: trackCalculadora(msg, ticket, pct, perdida). En v4 los 4 números
     vuelven a medir lo que dicen sus columnas: consultas por día, ticket, % sin respuesta y
     pérdida mensual (ahora en USD). Debounce de 1 s y sin contar el primer render. */
  const primero = useRef(true);
  useEffect(() => {
    if (primero.current) { primero.current = false; return; }
    const t = setTimeout(() => trackCalculadora(consultas, ticket, pct, perdidaMes), 1000);
    return () => clearTimeout(t);
  }, [consultas, ticket, pct, perdidaMes]);

  const sliders = [
    { id: "c-consultas", label: "Consultas por día (todos los canales)", v: consultas, set: setConsultas, min: 10, max: 500, step: 10, fmt: (n: number) => String(n) },
    { id: "c-ticket", label: "Ticket promedio por venta", v: ticket, set: setTicket, min: 10, max: 500, step: 5, fmt: (n: number) => usd.format(n) },
    { id: "c-pct", label: "Consultas sin respuesta o respondidas tarde", v: pct, set: setPct, min: 5, max: 90, step: 5, fmt: (n: number) => `${n} %` },
  ];

  return (
    <section className="seccion" id="calculadora">
      <div className="contenedor calc">
        <div>
          <h2 className="titulo">
            ¿Cuánto te cuestan las consultas <span className="gris">que no se contestan a tiempo?</span>
          </h2>
          <p className="bajada">Movelo con tus números. Es una estimación conservadora y solo cuenta ventas: no incluye las horas que se liberan en la operación.</p>

          <div className="sliders">
            {sliders.map((s) => (
              <label key={s.id} className="slider" htmlFor={s.id}>
                <span className="slider-cab">
                  <span>{s.label}</span>
                  <strong>{s.fmt(s.v)}</strong>
                </span>
                <input
                  id={s.id}
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={s.v}
                  onChange={(e) => s.set(+e.target.value)}
                  style={{ background: relleno(s.v, s.min, s.max) }}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="calc-resultado">
          <div className="calc-fila">
            <span>Perdés por mes</span>
            <strong className="perdida">−{usd.format(perdidaMes)}</strong>
          </div>
          <div className="calc-fila">
            <span>Perdés por año</span>
            <strong className="perdida">−{usd.format(perdidaMes * 12)}</strong>
          </div>
          <div className="calc-fila destacada">
            <span>Lo que se puede recuperar por mes</span>
            <strong>+{usd.format(recuperable)}</strong>
          </div>
          <a href={calUrl} target="_blank" rel="noopener noreferrer" className="boton" data-cta="calculadora">
            Ver mis números reales
          </a>
          <p className="nota">Supuestos: el 3 % de las consultas sin respuesta se habría vendido y la IA recupera el 70 % de eso. El número de tu negocio sale del diagnóstico.</p>
        </div>
      </div>
    </section>
  );
}
