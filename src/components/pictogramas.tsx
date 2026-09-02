/* Pictogramas lineales de los cuatro agujeros. Trazo de 1,5 px en cyan, sin relleno:
   la misma mano que dibuja el resto del plano. */

const P = { viewBox: "0 0 24 24", className: "draw", "aria-hidden": true } as const;

function Seguimiento() {
  return (
    <svg {...P}>
      <path d="M4 5h16v10H9l-5 4z" />
      <line x1="8" y1="10" x2="9" y2="10" />
      <line x1="12" y1="10" x2="13" y2="10" />
      <line x1="16" y1="10" x2="17" y2="10" />
      <line x1="19" y1="20" x2="22" y2="23" className="warn" />
      <line x1="22" y1="20" x2="19" y2="23" className="warn" />
    </svg>
  );
}

function Coordinar() {
  return (
    <svg {...P}>
      <path d="M8 21s-5-4.5-5-9a5 5 0 0 1 10 0c0 4.5-5 9-5 9z" />
      <circle cx="8" cy="12" r="1.6" />
      <polyline points="13,19 17,19 21,15 21,9" className="dim" />
      <circle cx="21" cy="6" r="2" />
    </svg>
  );
}

function Cobranza() {
  return (
    <svg {...P}>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="12" y2="16" />
      <path d="M17 15.5c0-1.2 3-1.2 3 0s-3 1.2-3 2.4 3 1.2 3 0" className="warn" />
    </svg>
  );
}

function Datos() {
  return (
    <svg {...P}>
      <ellipse cx="12" cy="6" rx="7" ry="2.6" />
      <path d="M5 6v5c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" />
      <path d="M5 11v5c0 1.4 3.1 2.6 7 2.6" />
      <path d="M19 11v2.5" className="dim" />
      <line x1="16" y1="17" x2="22" y2="22" className="warn" />
      <line x1="22" y1="17" x2="16" y2="22" className="warn" />
    </svg>
  );
}

export const PICTOGRAMAS = { seguimiento: Seguimiento, coordinar: Coordinar, cobranza: Cobranza, datos: Datos } as const;
export type PictogramaId = keyof typeof PICTOGRAMAS;

export function Pictograma({ id }: { id: PictogramaId }) {
  const I = PICTOGRAMAS[id];
  return (
    <span className="pain-ico">
      <I />
    </span>
  );
}
