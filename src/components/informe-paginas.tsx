/* Las cuatro páginas del informe de auditoría, dibujadas como planos en miniatura.
   Muestran el entregable en vez de describirlo. Los trazos se "dibujan" cuando la
   sección entra (clase .draw + .reveal.in en globals.css). */

const VB = "0 0 160 120";

function Mapa() {
  return (
    <svg viewBox={VB} className="draw" aria-hidden="true">
      <rect x="10" y="14" width="40" height="22" />
      <rect x="60" y="14" width="40" height="22" />
      <rect x="110" y="14" width="40" height="22" />
      <line x1="50" y1="25" x2="60" y2="25" />
      <line x1="100" y1="25" x2="110" y2="25" />
      <polyline points="30,36 30,52 80,52 80,64" />
      <polyline points="130,36 130,52 80,52" className="dim" />
      <rect x="55" y="64" width="50" height="22" />
      <line x1="80" y1="86" x2="80" y2="98" />
      <rect x="35" y="98" width="30" height="14" className="warn" />
      <rect x="95" y="98" width="30" height="14" />
      <line x1="80" y1="98" x2="50" y2="98" className="dim" />
      <line x1="80" y1="98" x2="110" y2="98" className="dim" />
    </svg>
  );
}

function Costos() {
  const filas = [
    { w: 64, m: 1 },
    { w: 46, m: 1 },
    { w: 34, m: 1 },
    { w: 26, m: 1 },
    { w: 6, m: 0 },
  ];
  return (
    <svg viewBox={VB} className="draw" aria-hidden="true">
      <line x1="10" y1="16" x2="150" y2="16" className="dim" />
      {filas.map((f, i) => {
        const y = 30 + i * 18;
        return (
          <g key={i}>
            <line x1="12" y1={y} x2="52" y2={y} />
            <rect x="60" y={y - 4} width={f.w} height="8" className={f.m ? "" : "warn"} />
            <line x1="132" y1={y} x2="150" y2={y} className={f.m ? "" : "warn"} />
          </g>
        );
      })}
      <line x1="10" y1="108" x2="150" y2="108" />
      <line x1="118" y1="102" x2="150" y2="102" className="dim" />
    </svg>
  );
}

function DondeIA() {
  const filas = [1, 1, 0, 1, 0];
  return (
    <svg viewBox={VB} className="draw" aria-hidden="true">
      {filas.map((ok, i) => {
        const y = 20 + i * 20;
        return (
          <g key={i}>
            <circle cx="18" cy={y} r="7" className={ok ? "" : "warn"} />
            {ok ? (
              <polyline points={`14,${y} 17,${y + 3} 22,${y - 3}`} />
            ) : (
              <>
                <line x1="15" y1={y - 3} x2="21" y2={y + 3} className="warn" />
                <line x1="21" y1={y - 3} x2="15" y2={y + 3} className="warn" />
              </>
            )}
            <line x1="34" y1={y} x2={ok ? 120 : 92} y2={y} />
            <line x1="34" y1={y + 6} x2={ok ? 84 : 66} y2={y + 6} className="dim" />
          </g>
        );
      })}
    </svg>
  );
}

function Plan() {
  const alturas = [62, 46, 34, 22, 14];
  return (
    <svg viewBox={VB} className="draw" aria-hidden="true">
      <line x1="14" y1="100" x2="150" y2="100" />
      <line x1="14" y1="100" x2="14" y2="20" className="dim" />
      {alturas.map((h, i) => {
        const x = 26 + i * 25;
        return (
          <g key={i}>
            <rect x={x} y={100 - h} width="16" height={h} className={i === 0 ? "" : "dim"} />
            <line x1={x + 8} y1="106" x2={x + 8} y2="110" className="dim" />
          </g>
        );
      })}
      <polyline points="34,30 59,46 84,58 109,70 134,78" className="warn" />
      <line x1="20" y1="24" x2="60" y2="24" className="dim" />
      <line x1="20" y1="30" x2="44" y2="30" className="dim" />
    </svg>
  );
}

export const PAGINAS = { mapa: Mapa, costos: Costos, ia: DondeIA, plan: Plan } as const;
export type PaginaId = keyof typeof PAGINAS;

export function PaginaInforme({ id, n }: { id: PaginaId; n: string }) {
  const P = PAGINAS[id];
  return (
    <div className="stat-page">
      <P />
      <span className="pg-num">PÁG. {n}</span>
    </div>
  );
}
