"use client";

import { useState } from "react";

// Supuestos (punto medio: ni inflado ni tímido)
const DAYS = 30; // días de operación al mes
const CONVERSION = 0.08; // % de consultas no respondidas a tiempo que eran una venta real
const RECOVERY = 0.7; // % de esa pérdida que recupera un agente de IA

const fmt = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

function trackFill(value: number, min: number, max: number) {
  const pct = ((value - min) / (max - min)) * 100;
  return `linear-gradient(90deg, #1e8fff 0%, #38bdf8 ${pct}%, var(--color-surface2) ${pct}%)`;
}

export default function CostCalculator() {
  const [msg, setMsg] = useState(50);
  const [ticket, setTicket] = useState(50000);
  const [pct, setPct] = useState(30);

  const loss = Math.round(msg * DAYS * (pct / 100) * CONVERSION * ticket);
  const annual = loss * 12;
  const recover = Math.round(loss * RECOVERY);

  return (
    <section className="calc-section" id="calculadora">
      <div className="calc-grid">
        {/* IZQUIERDA: título + sliders */}
        <div className="reveal">
          <div className="sec-label">El costo real</div>
          <h2 className="sec-title">
            Cuánto te cuesta <em className="grad-text">no tener IA</em> hoy
          </h2>
          <p className="sec-sub">
            Mové los valores de tu negocio y mirá, en plata, lo que estás dejando sobre la mesa
            cada mes.
          </p>

          <div className="slider-row">
            <div className="slider-head">
              <span className="slider-label">Mensajes por día</span>
              <span className="slider-value">{msg}</span>
            </div>
            <input
              type="range"
              min={10}
              max={500}
              step={5}
              value={msg}
              onChange={(e) => setMsg(+e.target.value)}
              style={{ background: trackFill(msg, 10, 500) }}
              aria-label="Mensajes por día"
            />
          </div>

          <div className="slider-row">
            <div className="slider-head">
              <span className="slider-label">Ticket promedio por venta</span>
              <span className="slider-value">{fmt.format(ticket)}</span>
            </div>
            <input
              type="range"
              min={5000}
              max={300000}
              step={5000}
              value={ticket}
              onChange={(e) => setTicket(+e.target.value)}
              style={{ background: trackFill(ticket, 5000, 300000) }}
              aria-label="Ticket promedio por venta"
            />
          </div>

          <div className="slider-row">
            <div className="slider-head">
              <span className="slider-label">% de consultas que no respondés a tiempo</span>
              <span className="slider-value">{pct}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={80}
              step={5}
              value={pct}
              onChange={(e) => setPct(+e.target.value)}
              style={{ background: trackFill(pct, 5, 80) }}
              aria-label="Porcentaje de consultas que no respondés a tiempo"
            />
          </div>
        </div>

        {/* DERECHA: resultado */}
        <div className="result-card reveal d1">
          <div className="res-label loss">
            <svg
              className="alert-ico alert-pulse"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Perdés aprox. por mes
          </div>
          <div className="res-loss">{fmt.format(loss)}</div>
          <div className="res-annual">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
            Son <b>{fmt.format(annual)}</b> al año que se te escapan
          </div>
          <p className="res-loss-note">
            Ventas que se van por no responder a tiempo, las 24 horas. Cada día que pasa es plata
            que no vuelve.
          </p>

          <div className="res-divider" />

          <div className="res-label recover">
            <span className="dot" />
            Recuperable con <b className="brand-inline">IAbyIA</b>
          </div>
          <div className="res-recover">
            {fmt.format(recover)} <span>/ mes</span>
          </div>

          <a href="#agenda" className="res-cta">
            Quiero recuperar esa plata →
          </a>
        </div>
      </div>

      <p className="calc-fineprint">
        * Estimación orientativa. Asumimos {DAYS} días de operación al mes y que el{" "}
        <b>{Math.round(CONVERSION * 100)}%</b> de las consultas que no respondés a tiempo eran una
        venta concretada. Con un agente de IA que responde al instante las 24 h, estimamos recuperar
        hasta el <b>{Math.round(RECOVERY * 100)}%</b> de esas ventas.
      </p>
    </section>
  );
}
