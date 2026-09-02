"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";
import AuditReport from "@/components/audit-report";
import CostCalculator from "@/components/cost-calculator";
import MorphingText from "@/components/morphing-text";
import ScrollEffects from "@/components/scroll-effects";
import Wordmark from "@/components/wordmark";
import Quien from "@/components/quien";
import ParaQuien from "@/components/para-quien";
import { PaginaInforme, type PaginaId } from "@/components/informe-paginas";
import { Pictograma, type PictogramaId } from "@/components/pictogramas";
import { FAQS } from "@/lib/faqs";
import { CAL_BASE, buildCalUrl } from "@/lib/cal-link";
import { getSid } from "@/lib/track";

/* Numeración de hojas del plano: 01 hero · 02 quién · 03 qué te llevás · 04 proceso ·
   05 calculadora · 06 agujeros · 07 diferencia · 08 ¿es para vos? · 09 preguntas */
const HOJAS = "09";

const ENTREGABLES: { n: string; pagina: PaginaId; title: string; desc: string }[] = [
  {
    n: "01",
    pagina: "mapa",
    title: "El mapa de tus procesos",
    desc: "Cómo se hace hoy cada cosa, quién la hace y cuánto tarda. Escrito, no de memoria.",
  },
  {
    n: "02",
    pagina: "costos",
    title: "Cuánto te cuesta cada uno",
    desc: "En horas y en plata al año, calculado con tus números reales. No con promedios del sector.",
  },
  {
    n: "03",
    pagina: "ia",
    title: "Dónde entra la IA",
    desc: "Y dónde no conviene implementarla, que es igual de importante y nadie te lo dice.",
  },
  {
    n: "04",
    pagina: "plan",
    title: "El plan, ordenado por retorno",
    desc: "Qué hacer primero, qué después, y cuánto sale cada cosa. Para que decidas con números.",
  },
];

const DOLORES: { n: string; icono: PictogramaId; title: string; body: string; quote: string; cite: string }[] = [
  {
    n: "01",
    icono: "seguimiento",
    title: "Al que no compró, nadie lo vuelve a llamar",
    body: "Entran consultas todos los días. Un porcentaje compra en el momento. El resto queda en un chat y no lo retoma nadie, porque no hay proceso: depende de que alguien se acuerde.",
    quote: "Ella una vez que no le responde, no le vuelve a hacer seguimiento. Esa es una realidad. Lo deja morir.",
    cite: "Academia con 4 sedes · Bolivia",
  },
  {
    n: "02",
    icono: "coordinar",
    title: "Coordinar a mano frena el crecimiento",
    body: "Agendar, rutear, confirmar, avisar. Cuando el volumen sube, el que coordina se convierte en el cuello de botella — y ahí se frena la venta, no la producción.",
    quote: "La cuestión no es meter más plata en publicidad, porque ya lo hicimos. No damos abasto.",
    cite: "E-commerce · Uruguay",
  },
  {
    n: "03",
    icono: "cobranza",
    title: "La plata que entra se controla a ojo",
    body: "Transferencias que se revisan una por una, pagos que se cruzan en una planilla, clientes que quedan debiendo sin que nadie lo note hasta fin de mes.",
    quote: "Una transferencia puede ser clonada, y ahora estamos revisando transferencia por transferencia. Es un tema lento.",
    cite: "Proveedor de internet · Chile",
  },
  {
    n: "04",
    icono: "datos",
    title: "Los datos desordenados frenan todo lo demás",
    body: "Catálogos con productos que ya no existen, precios en tres lugares distintos, stock que no coincide entre canales. Nada se puede automatizar arriba de eso.",
    quote: "De esos 14.000, uso 5.000. Es un laburo ponerme a eliminarlos uno por uno, entonces lo dejo.",
    cite: "Ferretería, 2 sucursales · Argentina",
  },
];

const ETAPAS: {
  n: string; title: string; cota: string; desc: string; extra?: string; garantia?: string; chips: string[]; hi?: boolean;
}[] = [
  {
    n: "01",
    title: "La llamada",
    cota: "1 llamada · sin costo",
    desc: "Miramos tu operación por arriba y vemos si tiene sentido avanzar. Si no lo tiene, te lo digo ahí mismo y no perdemos más tiempo ninguno de los dos.",
    extra: "Traé tres números, aunque sean aproximados: consultas por mes, cuántas compran y cuánto te deja un cliente. Con eso alcanza.",
    chips: ["Sin costo", "Sin compromiso"],
  },
  {
    n: "02",
    title: "La auditoría",
    cota: "2 semanas",
    desc: "Dos sesiones: con vos y con quien maneja el día a día. Salís con el mapa completo, el costo real de cada proceso y el presupuesto de cada solución. Si después avanzamos, lo que pagaste acá se descuenta.",
    garantia: "Si al terminar considerás que no te sirvió, te la devuelvo. Sin preguntas.",
    chips: ["2 semanas", "Se descuenta", "Con garantía"],
    hi: true,
  },
  {
    n: "03",
    title: "La implementación",
    cota: "por etapas, en marcha",
    desc: "Con el plan en la mano elegís: lo implemento yo, o le enseño a alguien de tu equipo a hacerlo. Según lo que te convenga y qué tan adentro querés la capacidad.",
    chips: ["Lo hago yo", "o te enseño"],
  },
];

/* Cada fila es un par hoy → después: la tabla se lee de a una, no de a columna. */
const COMPARACION: [string, string][] = [
  ["Cada proceso depende de que alguien se acuerde de hacerlo", "Cada proceso corre solo, con reglas escritas y auditables"],
  ["Nadie sabe cuánto cuesta realmente atender un pedido", "Sabés qué te cuesta cada operación y cuánto deja"],
  ["Para crecer hay que contratar, con todo lo que eso implica", "El volumen sube sin que suba la nómina"],
  ["Los clientes que no compraron quedan en un chat, sin volver", "Al que no compró se lo retoma sin que nadie lo recuerde"],
  ["Cuando falta la persona que sabe, se frena todo", "El conocimiento queda en el sistema, no en una persona"],
];

const REDES = [
  { n: "YouTube", u: "https://www.youtube.com/@ignacio.arruvito" },
  { n: "Instagram", u: "https://www.instagram.com/ignacioarruvito" },
  { n: "TikTok", u: "https://www.tiktok.com/@ignacioarruvito11" },
  { n: "LinkedIn", u: "https://www.linkedin.com/in/ignacio-arruvito-485562340" },
];

/** Cabecera de sección: etiqueta, título, bajada, y al margen el número de hoja y una nota. */
function SecHead({
  hoja, label, title, sub, nota,
}: { hoja: string; label: string; title: ReactNode; sub?: ReactNode; nota?: string }) {
  return (
    <div className="sec-head">
      <div className="sec-head-main">
        <div className="sec-label">{label}</div>
        <h2 className="sec-title">{title}</h2>
        {sub && <p className="sec-sub">{sub}</p>}
      </div>
      <div className="sec-head-side">
        <span className="hoja">Hoja {hoja} / {HOJAS}</span>
        {nota && <p className="nota nota-margen">{nota}</p>}
      </div>
    </div>
  );
}

export default function Home() {
  // Link a cal.com con la atribución del visitante (utm + lp_sid).
  // El script inline del <head> (lib/cta-boot.ts) ya resolvió esta misma URL antes de que
  // hidratáramos y con ella pintó los href. Reusarla —en vez de recalcularla— garantiza que
  // el link no cambie entre antes y después de la hidratación: una sola verdad, un solo sid.
  const [calUrl, setCalUrl] = useState(CAL_BASE);
  useEffect(() => {
    const w = window as unknown as { __lpCalUrl?: string };
    setCalUrl(w.__lpCalUrl || buildCalUrl({ sid: getSid() }));
  }, []);

  // El acordeón vive en estado: así `aria-expanded` dice la verdad (antes era un string fijo).
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null);

  return (
    <>
      <ScrollEffects />
      <div className="scroll-bar" id="scrollBar" aria-hidden="true" />

      {/* NAV — el CTA de acá produce 13 de cada 16 reservas: no se toca */}
      <nav className="nav-bar" aria-label="Principal">
        <a href="/" className="wordmark">
          <Wordmark />
        </a>
        <div className="nav-links">
          <a href="#dolor" className="nav-link">El problema</a>
          <a href="#como" className="nav-link">Cómo funciona</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </div>
        {/* data-cta: lo lee el listener delegado de lib/track.ts para saber QUÉ botón convence. */}
        <a href={calUrl} target="_blank" rel="noopener noreferrer" className="nav-cta" data-cta="nav">
          <span className="live-dot" />
          Agendar llamada
          <span className="nav-cta-arrow" aria-hidden="true">→</span>
        </a>
      </nav>

      <main id="contenido">
        {/* HERO — sin .reveal a propósito: es el LCP y se pinta de una */}
        <section aria-label="Presentación">
          <div className="hero">
            <div className="hero-left">
              <div className="hero-tag">
                <span className="live-dot" />
                Auditoría de operaciones con IA
              </div>

              <h1 className="h1">
                <span className="sr-only">Tu negocio pierde plata en tareas que se hacen a mano.</span>
                <span aria-hidden="true" style={{ display: "block" }}>
                  Tu negocio pierde plata en
                  <MorphingText />
                </span>
              </h1>
              <p className="h1-remate">Y todavía no sabés cuánta.</p>

              <p className="hero-sub">
                No son solo horas: es plata que se va todos los meses. Te hago el mapa de cómo
                funciona tu negocio por dentro, <strong>le pongo número a cada proceso</strong> y
                te digo qué conviene automatizar primero. Después lo implemento.
              </p>

              {/* El botón dice lo que hace. El anterior ("Ver cuánto estoy perdiendo") mandaba a
                  cal.com: 25 clics y ninguna reserva. Calcular es el link secundario, y baja. */}
              <div className="hero-ctas">
                <a
                  href={calUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  data-cta="hero"
                >
                  Agendar la llamada
                  <span aria-hidden="true">→</span>
                </a>
                <a href="#calculadora" className="btn-ghost">
                  Calculá cuánto perdés
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
              <div className="cta-note">
                <span className="live-dot" />
                Sin costo · Sin compromiso · Si no aplica, te lo digo ahí
              </div>
            </div>

            {/* El informe se ejecuta solo — ver components/audit-report.tsx */}
            <div className="hero-right">
              <AuditReport />
            </div>
          </div>

          {/* Cota de alcance: reemplaza al ticker. El 68 % del tráfico no es de Argentina. */}
          <div className="banda">
            <div className="banda-in">
              <span><b>100 % remoto</b> · PyMEs de Argentina, Bolivia, Honduras y el resto de Latinoamérica</span>
            </div>
          </div>
        </section>

        {/* QUIÉN TE ATIENDE */}
        <Quien />

        {/* ENTREGABLES — las cuatro páginas del informe */}
        <section className="stats-section" aria-label="Qué te llevás">
          <div className="reveal">
            <SecHead
              hoja="03"
              label="Qué te llevás"
              title="Cuatro cosas que hoy no tenés escritas en ningún lado"
              nota="Cuatro entregables. Ninguno es una presentación."
            />
            <div className="stats-grid">
              {ENTREGABLES.map((e) => (
                <div key={e.n} className="stat-item">
                  <PaginaInforme id={e.pagina} n={e.n} />
                  <div className="stat-num">{e.n}</div>
                  <h3 className="stat-label">{e.title}</h3>
                  <p className="stat-desc">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CÓMO — sube acá: es la sección que más convierte y la veía menos de la mitad */}
        <section className="how-section" id="como" aria-label="Cómo funciona">
          <div className="how-inner reveal">
            <SecHead
              hoja="04"
              label="El proceso"
              title="Tres etapas, y en cada una sabés a qué atenerte"
              sub="Nada de propuestas de veinte páginas ni de proyectos abiertos. Cada etapa tiene precio, plazo y entregable definido antes de arrancar."
              nota="Cada etapa cierra sola. Ninguna te obliga a la siguiente."
            />

            {/* Cotas: la línea de tiempo del proceso, medida como en un plano */}
            <div className="steps-cotas" aria-hidden="true">
              {ETAPAS.map((s) => (
                <div key={s.n} className="cota">
                  <span className="cota-val">{s.cota}</span>
                </div>
              ))}
            </div>

            <div className="steps-grid">
              {ETAPAS.map((s) => (
                <div key={s.n} className={`step-card framed${s.hi ? " hi" : ""}`}>
                  <div className="step-num">ETAPA {s.n}</div>
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-desc">
                    {s.desc}
                    {s.extra && <> <strong>{s.extra}</strong></>}
                  </p>
                  {s.garantia && (
                    <p className="step-garantia">
                      <b>Con garantía.</b> {s.garantia}
                    </p>
                  )}
                  <div className="step-meta">
                    {s.chips.map((c) => (
                      <span key={c} className={`step-chip${s.hi ? " hi" : ""}`}>{c}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="how-cta">
              <div className="cota">
                <span className="cota-val">Empieza acá</span>
              </div>
              <a
                href={calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                data-cta="como"
              >
                Agendar la llamada
                <span aria-hidden="true">→</span>
              </a>
              <div className="cta-note">
                Sin costo · Sin compromiso · Si no aplica para vos, te lo digo en la llamada
              </div>
            </div>
          </div>
        </section>

        {/* CALCULADORA */}
        <CostCalculator calUrl={calUrl} />

        {/* DOLOR */}
        <section className="sec" id="dolor" aria-label="El problema">
          <div className="reveal">
            <SecHead
              hoja="06"
              label="Lo que aparece siempre"
              title={<>Cuatro agujeros que se repiten en <span className="accent">casi todos los negocios</span></>}
              sub="Esto no sale de un estudio. Sale de hablar con más de cincuenta dueños de negocio este año — ferreterías, e-commerce, academias, distribuidoras, prestadores de servicio."
              nota="Citas textuales de llamadas de este año."
            />

            <div className="pain-grid">
              {DOLORES.map((d) => (
                <div key={d.n} className="pain-card">
                  <div className="pain-head">
                    <Pictograma id={d.icono} />
                    <h3 className="pain-title">{d.title}</h3>
                  </div>
                  <p className="pain-body">{d.body}</p>
                  <blockquote className="pain-quote">
                    “{d.quote}”
                    <cite>{d.cite}</cite>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRANSFORMACIÓN */}
        <section className="transform-section sec" aria-label="La diferencia">
          <div className="reveal">
            <SecHead
              hoja="07"
              label="La diferencia"
              title={<>De trabajar en el negocio a que el negocio <span className="accent">trabaje solo</span></>}
              nota="Lo que cambia no es la herramienta: es quién sostiene el proceso."
            />

            <div className="compare-table">
              <div className="cmp-head x"><span aria-hidden="true">✕</span> Cómo funciona hoy</div>
              <div className="cmp-head ok"><span aria-hidden="true">✓</span> Cómo queda</div>
              {COMPARACION.map(([hoy, despues]) => (
                <Fragment key={hoy}>
                  <div className="cmp-cell">
                    <span className="ci-mark ci-x" aria-hidden="true">✕</span>
                    <span>{hoy}</span>
                  </div>
                  <div className="cmp-cell after">
                    <span className="ci-mark ci-ok" aria-hidden="true">✓</span>
                    <span>{despues}</span>
                  </div>
                </Fragment>
              ))}
            </div>

            <div className="honesty framed">
              <div className="tech" style={{ marginBottom: 14 }}>Lo que no vas a escuchar en otro lado</div>
              <p className="honesty-text">
                No te voy a decir que la inteligencia artificial resuelve todo. En la auditoría vas a
                ver que hay procesos donde <strong>no conviene implementarla</strong> — porque el volumen no
                da, porque las reglas cambian todo el tiempo, o porque simplemente sale más caro que
                hacerlo a mano. Eso también te lo digo, y por escrito. Es la parte que nadie menciona
                cuando lo único que tiene para venderte es un bot.
              </p>
            </div>
          </div>
        </section>

        {/* ¿ES PARA VOS? — reemplaza al quiz */}
        <ParaQuien calUrl={calUrl} />

        {/* FAQ */}
        <section className="faq-section" id="faq" aria-label="Preguntas frecuentes">
          <div className="reveal">
            <SecHead
              hoja="09"
              label="Preguntas"
              title="Lo que todos preguntan antes de arrancar"
              nota="Lo que se pregunta antes de agendar."
            />
            <div className="faq-list">
              {FAQS.map((f, i) => {
                const abierta = faqAbierta === i;
                return (
                  <div key={f.id} className={`faq-item${abierta ? " open" : ""}`}>
                    <h3 className="faq-q">
                      <button
                        type="button"
                        className="faq-btn"
                        aria-expanded={abierta}
                        aria-controls={`faq-body-${i}`}
                        data-faq-id={f.id}
                        onClick={() => setFaqAbierta(abierta ? null : i)}
                      >
                        {f.q}
                        <span className="faq-icon" aria-hidden="true">+</span>
                      </button>
                    </h3>
                    <div className="faq-body" id={`faq-body-${i}`} role="region" aria-hidden={!abierta}>
                      <div>{f.a}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER — el cartucho del plano */}
      <footer aria-label="Pie de página">
        <div className="cartucho">
          <div className="cart-cell"><span className="cart-k">Proyecto</span><span className="cart-v">Auditoría de operaciones con IA</span></div>
          <div className="cart-cell"><span className="cart-k">Revisión</span><span className="cart-v">v3 · 09/2026</span></div>
          <div className="cart-cell"><span className="cart-k">Hojas</span><span className="cart-v">{HOJAS}</span></div>
          <div className="cart-cell"><span className="cart-k">Dibujó</span><span className="cart-v">Ignacio Arruvito</span></div>
          <div className="cart-cell"><span className="cart-k">Escala</span><span className="cart-v">100 % remoto</span></div>
          <div className="cart-cell">
            <span className="cart-k">Contacto</span>
            <span className="cart-v"><a href="mailto:iabyia.business@gmail.com">iabyia.business@gmail.com</a></span>
          </div>
        </div>
        <div className="footer-bottom">
          <a href="/" className="wordmark" style={{ fontSize: 16 }}>
            <Wordmark size={22} />
          </a>
          <nav className="footer-links" aria-label="Legales y redes">
            <a href="/privacidad" className="footer-link">Privacidad</a>
            <a href="/terminos" className="footer-link">Términos</a>
            {REDES.map((r) => (
              <a key={r.n} href={r.u} target="_blank" rel="noopener noreferrer" className="footer-link">{r.n}</a>
            ))}
          </nav>
          <p className="footer-copy">© 2026 IAbyIA · Buenos Aires, Argentina</p>
        </div>
      </footer>
    </>
  );
}
