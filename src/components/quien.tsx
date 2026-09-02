/* Quién te atiende. El tráfico viene de los videos de Ignacio y aterrizaba en una
   página sin nombre ni cara; este es el puente. Va sobre el plano invertido (azul
   cianotipo) para romper la monotonía de secciones y anclar la marca.

   ⚠️ La foto: `public/assets/quien.jpg`. Hasta que Ignacio deje la real, el archivo es
   el personaje ilustrado de marca (marca/assets/personaje-flatvector-brazos-cruzados.png)
   compuesto sobre azul. Reemplazar el archivo alcanza; el tratamiento cianotipo del CSS
   se aplica igual a la foto real. */

const REDES = [
  { n: "YouTube", u: "https://www.youtube.com/@ignacio.arruvito" },
  { n: "Instagram", u: "https://www.instagram.com/ignacioarruvito" },
  { n: "TikTok", u: "https://www.tiktok.com/@ignacioarruvito11" },
  { n: "LinkedIn", u: "https://www.linkedin.com/in/ignacio-arruvito-485562340" },
];

const PRUEBAS = [
  ["+4.000", "suscriptores en YouTube"],
  ["+50", "dueños entrevistados en 2026"],
  ["3 países", "con clientes: Argentina, Bolivia y Honduras"],
  ["10 meses", "seguidos del abono más largo"],
];

export default function Quien() {
  return (
    <section className="quien-wrap" id="quien" aria-label="Quién te atiende">
      <div className="quien reveal">
        <div className="quien-foto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/quien.jpg" alt="Ignacio Arruvito" width={640} height={640} loading="lazy" />
          <span className="quien-foto-tag">Dibujó · I.A.</span>
        </div>
        <div>
          <div className="sec-head">
            <div className="sec-head-main">
              <div className="sec-label">Quién te atiende</div>
              <h2 className="sec-title sm">Ignacio Arruvito</h2>
              <p className="quien-rol">Auditoría de operaciones e implementación de IA · Buenos Aires · 100 % remoto</p>
            </div>
            <div className="sec-head-side">
              <span className="hoja">Hoja 02 / 09</span>
              <p className="nota nota-margen">El que te atiende es el que construye.</p>
            </div>
          </div>
          <p className="quien-text">
            Hago auditorías de operaciones e implemento IA en PyMEs. La llamada es conmigo:
            <strong> no hay agencia ni intermediarios</strong>, y el sistema que sale de la auditoría
            lo construyo yo. Este año hablé con más de cincuenta dueños de negocio de toda
            Latinoamérica sobre cómo trabajan por dentro; de ahí salen los números de esta página.
          </p>
          <ul className="quien-chips" aria-label="Datos">
            {PRUEBAS.map(([b, t]) => (
              <li key={t} className="quien-chip">
                <b>{b}</b> {t}
              </li>
            ))}
          </ul>
          <div className="quien-redes">
            {REDES.map((r) => (
              <a key={r.n} href={r.u} target="_blank" rel="noopener noreferrer" className="quien-red">
                {r.n}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
