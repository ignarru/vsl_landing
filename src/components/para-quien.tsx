/* ¿Es para vos? — el criterio de calificación, por escrito y antes de agendar.
   Reemplaza al quiz: lo empezaban 14 de 403 visitas y ninguno de los que agendaron lo
   tocó. Un bloque estático califica igual, no pide nada y acorta la página. */

const SI = [
  "Tenés equipo: entre 3 y 50 personas.",
  "Alguien dedica horas todos los días a lo mismo: cargar, responder, coordinar, cobrar.",
  "Ya facturás de forma estable.",
  "La decisión la tomás vos.",
];

const NO = [
  "Estás arrancando y todavía no hay ingresos.",
  "Lo único que querés es que no te baneen el número de WhatsApp.",
  "Sos agencia o desarrollador buscando cómo se hace.",
];

export default function ParaQuien({ calUrl }: { calUrl: string }) {
  return (
    <section className="sec" id="para-quien" aria-label="¿Es para vos?">
      <div className="reveal">
        <div className="sec-head">
          <div className="sec-head-main">
            <div className="sec-label">Criterio</div>
            <h2 className="sec-title">¿Es para vos?</h2>
            <p className="sec-sub">
              No es para todo el mundo, y prefiero que lo sepas antes de agendar que en la llamada.
            </p>
          </div>
          <div className="sec-head-side">
            <span className="hoja">Hoja 08 / 09</span>
            <p className="nota nota-margen">Si no te ves en la primera lista, no agendes: no te voy a poder ayudar.</p>
          </div>
        </div>

        <div className="pq-grid">
          <div className="pq-col si">
            <div className="pq-head"><span aria-hidden="true">✓</span> Es para vos si…</div>
            <ul>
              {SI.map((t) => (
                <li key={t} className="pq-item"><span className="ci-mark ci-ok" aria-hidden="true">✓</span><span>{t}</span></li>
              ))}
            </ul>
          </div>
          <div className="pq-col no">
            <div className="pq-head"><span aria-hidden="true">✕</span> No es para vos si…</div>
            <ul>
              {NO.map((t) => (
                <li key={t} className="pq-item"><span className="ci-mark ci-x" aria-hidden="true">✕</span><span>{t}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pq-cta">
          <a href={calUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" data-cta="final">
            Agendar la llamada<span aria-hidden="true">→</span>
          </a>
          <div className="cta-note">
            <span className="live-dot" />
            Si te viste en la primera lista, hablemos. Si no, igual te sirve la calculadora.
          </div>
        </div>
      </div>
    </section>
  );
}
