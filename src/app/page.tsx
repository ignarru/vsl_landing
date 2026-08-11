"use client";

import { useEffect, useState } from "react";
import CostCalculator from "@/components/cost-calculator";
import DiagnosticQuiz from "@/components/diagnostic-quiz";
import ScrollEffects from "@/components/scroll-effects";
import { CAL_BASE, buildCalUrl } from "@/lib/cal-link";
import { getSid } from "@/lib/track";

/* Procesos que aparecen en el diagrama del hero. Es un ejemplo genérico de PyME:
   muestra el formato exacto del entregable de la auditoría. */
const PROCESOS = [
  { n: "01", name: "Responder las mismas consultas", horas: "12 h/sem", costo: "$840/mes", w: "76%" },
  { n: "02", name: "Cargar pedidos a mano", horas: "8 h/sem", costo: "$560/mes", w: "52%" },
  { n: "03", name: "Coordinar entregas y turnos", horas: "6 h/sem", costo: "$420/mes", w: "38%" },
  { n: "04", name: "Conciliar pagos y cobranzas", horas: "5 h/sem", costo: "$350/mes", w: "32%" },
  { n: "05", name: "Retomar al que no compró", horas: "0 h/sem", costo: "no se hace", w: "4%", warn: true },
];

const TICKER_ITEMS = [
  "Presupuestos",
  "Seguimiento de clientes",
  "Facturación",
  "Coordinación de entregas",
  "Cobranzas",
  "Carga de pedidos",
  "Turnos y agenda",
  "Control de stock",
  "Reportes",
  "Recompra",
  "Altas de productos",
  "Atención de consultas",
];

const ENTREGABLES = [
  {
    n: "01",
    title: "El mapa de tus procesos",
    desc: "Cómo se hace hoy cada cosa, quién la hace y cuánto tarda. Escrito, no de memoria.",
  },
  {
    n: "02",
    title: "Cuánto te cuesta cada uno",
    desc: "En horas y en plata al año, calculado con tus números reales. No con promedios del sector.",
  },
  {
    n: "03",
    title: "Dónde entra la IA",
    desc: "Y dónde no conviene meterla, que es igual de importante y nadie te lo dice.",
  },
  {
    n: "04",
    title: "El plan, ordenado por retorno",
    desc: "Qué hacer primero, qué después, y cuánto sale cada cosa. Para que decidas con números.",
  },
];

const DOLORES = [
  {
    n: "01",
    title: "Al que no compró, nadie lo vuelve a llamar",
    body: "Entran consultas todos los días. Un porcentaje compra en el momento. El resto queda en un chat y no lo retoma nadie, porque no hay proceso: depende de que alguien se acuerde.",
    quote: "Ella una vez que no le responde, no le vuelve a hacer seguimiento. Esa es una realidad. Lo deja morir.",
    cite: "Academia con 4 sedes · Bolivia",
  },
  {
    n: "02",
    title: "Coordinar a mano frena el crecimiento",
    body: "Agendar, rutear, confirmar, avisar. Cuando el volumen sube, el que coordina se convierte en el cuello de botella — y ahí se frena la venta, no la producción.",
    quote: "La cuestión no es meter más plata en publicidad, porque ya lo hicimos. No damos abasto.",
    cite: "E-commerce · Capital Federal",
  },
  {
    n: "03",
    title: "La plata que entra se controla a ojo",
    body: "Transferencias que se revisan una por una, pagos que se cruzan en una planilla, clientes que quedan debiendo sin que nadie lo note hasta fin de mes.",
    quote: "Una transferencia puede ser clonada, y ahora estamos revisando transferencia por transferencia. Es un tema lento.",
    cite: "Proveedor de internet · Chile",
  },
  {
    n: "04",
    title: "Los datos desordenados frenan todo lo demás",
    body: "Catálogos con productos que ya no existen, precios en tres lugares distintos, stock que no coincide entre canales. Nada se puede automatizar arriba de eso.",
    quote: "De esos 14.000, uso 5.000. Es un laburo ponerme a eliminarlos uno por uno, entonces lo dejo.",
    cite: "Ferretería, 2 sucursales · Tucumán",
  },
];

const ETAPAS = [
  {
    n: "01",
    title: "La llamada",
    desc: "Miramos tu operación por arriba y vemos si tiene sentido avanzar. Si no lo tiene, te lo digo ahí mismo y no perdemos más tiempo ninguno de los dos.",
    chips: ["45 minutos", "Sin costo"],
  },
  {
    n: "02",
    title: "La auditoría",
    desc: "Dos sesiones: con vos y con quien maneja el día a día. Salís con el mapa completo, el costo real de cada proceso y el presupuesto de cada solución.",
    chips: ["2 semanas", "USD 1.500", "Se descuenta"],
    hi: true,
  },
  {
    n: "03",
    title: "La implementación",
    desc: "Con el plan en la mano elegís: lo implemento yo, o le enseño a alguien de tu equipo a hacerlo. Según lo que te convenga y qué tan adentro querés la capacidad.",
    chips: ["Lo hago yo", "o te enseño"],
  },
];

const FAQS = [
  {
    q: "¿Cuánto sale todo?",
    a: "La auditoría son USD 1.500 y se descuenta del proyecto si avanzamos. La implementación depende de lo que salga del relevamiento: un proceso suele estar entre 2.500 y 4.000; varios procesos conectados, entre 5.000 y 8.000. No te puedo dar el número exacto antes de ver cómo trabajás por dentro, y prefiero decirte eso a inventarte una cifra.",
  },
  {
    q: "¿Y si en mi negocio no hay nada para automatizar?",
    a: "Puede pasar, y si es así te lo digo. Por eso la auditoría tiene devolución total: si terminada considerás que no te sirvió, te devuelvo los 1.500 sin preguntas. Lo que sí te puedo asegurar es que vas a salir sabiendo cuánto te cuesta cada proceso, que es información que hoy casi ninguna PyME tiene.",
  },
  {
    q: "¿Tengo que cambiar los sistemas que ya uso?",
    a: "No. El trabajo se hace arriba de lo que ya tenés: WhatsApp, tu sistema de gestión, tu e-commerce, planillas, lo que sea. Cambiar todo de golpe es la forma más cara y más lenta de hacer esto.",
  },
  {
    q: "¿Mi equipo tiene que saber de tecnología?",
    a: "No. Si elegís que lo implemente yo, queda funcionando y tu equipo solo usa el resultado. Si elegís aprender a hacerlo adentro, se lo enseño a la persona que vos elijas, sobre tus propios procesos y no en abstracto.",
  },
  {
    q: "¿Esto es un bot de WhatsApp?",
    a: "Puede incluir uno, si de la auditoría sale que ese es tu cuello de botella. Pero en la mayoría de los negocios que releví el problema no era contestar más rápido: era todo lo que pasaba después de contestar. Por eso primero se mide y después se decide qué construir.",
  },
  {
    q: "¿Cuánto tardo en ver resultados?",
    a: "La auditoría son dos semanas y ahí ya tenés los números sobre la mesa. La implementación depende del alcance, pero se arma por etapas: la primera siempre es la de mayor retorno y menor complejidad, para que el sistema empiece a devolver antes de estar terminado.",
  },
];

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

  return (
    <>
      <ScrollEffects />
      <div className="scroll-bar" id="scrollBar" />

      {/* NAV */}
      <nav className="nav-bar">
        <a href="#" className="wordmark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-icon-transparent.png" alt="IAbyIA" width={26} height={26} className="wm-icon" />
          <span>IAbyIA</span>
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
          <span className="nav-cta-arrow">→</span>
        </a>
      </nav>

      <main>
        {/* HERO */}
        <section>
          <div className="hero">
            <div className="hero-left">
              <div className="hero-tag reveal">
                <span className="live-dot" />
                Auditoría de operaciones con IA
              </div>

              <h1 className="h1 reveal d1">
                El problema no es que{" "}
                <span className="strike">no le contestes</span>.
                <br />
                Es todo lo que pasa después.
              </h1>

              <p className="hero-sub reveal d2">
                Te hago el mapa de cómo funciona tu negocio por dentro, te digo{" "}
                <strong>cuánto te cuesta cada proceso en horas y en plata</strong>, y qué conviene
                automatizar primero. Después lo implemento.
              </p>

              <div className="hero-ctas reveal d3">
                <a
                  href={calUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  data-cta="hero"
                >
                  Ver cuánto estoy perdiendo
                  <span>→</span>
                </a>
                <div className="cta-note">
                  <span className="live-dot" />
                  Llamada sin costo · 45 min · Los proyectos arrancan en USD 1.500
                </div>
              </div>
            </div>

            {/* DIAGRAMA — el formato del entregable */}
            <div className="diagrama framed reveal d2">
              <div className="diagrama-head">
                <span className="tech">Relevamiento · ejemplo</span>
                <span className="pieza">REV·A</span>
              </div>

              {PROCESOS.map((p) => (
                <div className="proc-row" key={p.n}>
                  <span className="pieza">{p.n}</span>
                  <div>
                    <div className="proc-name">{p.name}</div>
                    <div className="proc-bar">
                      <div
                        className={`proc-fill${p.warn ? " warn" : ""}`}
                        style={{ ["--w" as string]: p.w, animationDelay: `${0.4 + Number(p.n) * 0.12}s` }}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="tech" style={{ marginBottom: 3 }}>{p.horas}</div>
                    <div className="proc-cost">{p.costo}</div>
                  </div>
                </div>
              ))}

              <div className="diagrama-total">
                <span className="tech">Costo anual del trabajo manual</span>
                <span className="total-val">$26.040</span>
              </div>

              <p className="nota" style={{ marginTop: 16 }}>
                Así se ve el entregable. Con tus procesos y tus números.
              </p>
            </div>
          </div>
        </section>

        {/* TICKER — procesos, no tecnologías */}
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={`${item}-${i}`} className="ticker-item">{item}</span>
            ))}
          </div>
        </div>

        {/* ENTREGABLES */}
        <div className="stats-section">
          <div className="reveal" style={{ marginBottom: 34 }}>
            <div className="sec-label">Qué te llevás</div>
            <div className="sec-title" style={{ fontSize: "clamp(26px,3vw,36px)" }}>
              Cuatro cosas que hoy no tenés escritas en ningún lado
            </div>
          </div>
          <div className="stats-grid">
            {ENTREGABLES.map((e, i) => (
              <div key={e.n} className={`stat-item reveal d${i + 1}`}>
                <div className="stat-num">{e.n}</div>
                <div className="stat-label">{e.title}</div>
                <div className="stat-desc">{e.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CALCULADORA */}
        <CostCalculator calUrl={calUrl} />

        {/* DOLOR */}
        <section className="sec" id="dolor">
          <div className="reveal">
            <div className="sec-label">Lo que aparece siempre</div>
            <div className="sec-title">
              Cuatro agujeros que se repiten en <span className="accent">casi todos los negocios</span>
            </div>
            <div className="sec-sub">
              Esto no sale de un estudio. Sale de relevar más de cincuenta operaciones reales —
              ferreterías, e-commerce, academias, distribuidoras, prestadores de servicio.
            </div>
          </div>

          <div className="pain-grid">
            {DOLORES.map((d, i) => (
              <div key={d.n} className={`pain-card reveal d${(i % 2) + 1}`}>
                <div className="pain-head">
                  <span className="pieza">{d.n}</span>
                  <span className="pain-title">{d.title}</span>
                </div>
                <p className="pain-body">{d.body}</p>
                <blockquote className="pain-quote">
                  “{d.quote}”
                  <cite>{d.cite}</cite>
                </blockquote>
              </div>
            ))}
          </div>
        </section>

        {/* TRANSFORMACIÓN */}
        <section className="transform-section sec">
          <div className="reveal">
            <div className="sec-label">La diferencia</div>
            <div className="sec-title">
              De trabajar <span className="accent">en</span> el negocio a que el negocio trabaje solo
            </div>
          </div>

          <div className="compare-grid">
            <div className="compare-col reveal d1">
              <div className="compare-head" style={{ color: "var(--color-alert)" }}>
                <span>✕</span> Cómo funciona hoy
              </div>
              {[
                "Cada proceso depende de que alguien se acuerde de hacerlo",
                "Nadie sabe cuánto cuesta realmente atender un pedido",
                "Para crecer hay que contratar, con todo lo que eso implica",
                "Los clientes que no compraron quedan en un chat, sin volver",
                "Cuando falta la persona que sabe, se frena todo",
              ].map((t) => (
                <div className="compare-item" key={t}>
                  <span className="ci-mark ci-x">✕</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>

            <div className="compare-col after reveal d2">
              <div className="compare-head accent">
                <span>✓</span> Cómo queda
              </div>
              {[
                "Cada proceso corre solo, con reglas escritas y auditables",
                "Sabés qué te cuesta cada operación y cuánto deja",
                "El volumen sube sin que suba la nómina",
                "Al que no compró se lo retoma sin que nadie lo recuerde",
                "El conocimiento queda en el sistema, no en una persona",
              ].map((t) => (
                <div className="compare-item" key={t}>
                  <span className="ci-mark ci-ok">✓</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="honesty framed reveal d3">
            <div className="tech" style={{ marginBottom: 14 }}>Lo que no vas a escuchar en otro lado</div>
            <p className="honesty-text">
              No te voy a decir que la inteligencia artificial resuelve todo. En la auditoría vas a
              ver que hay procesos donde <strong>no conviene meterla</strong> — porque el volumen no
              da, porque las reglas cambian todo el tiempo, o porque simplemente sale más caro que
              hacerlo a mano. Eso también te lo digo, y por escrito. Es la parte que nadie menciona
              cuando lo único que tiene para venderte es un bot.
            </p>
          </div>
        </section>

        {/* CÓMO */}
        <div className="how-section" id="como">
          <div className="how-inner">
            <div className="reveal">
              <div className="sec-label">El proceso</div>
              <div className="sec-title">Tres etapas, y en cada una sabés a qué atenerte</div>
              <div className="sec-sub">
                Nada de propuestas de veinte páginas ni de proyectos abiertos. Cada etapa tiene
                precio, plazo y entregable definido antes de arrancar.
              </div>
            </div>

            <div className="steps-grid">
              {ETAPAS.map((s, i) => (
                <div key={s.n} className={`step-card framed reveal d${i + 1}`}>
                  <div className="step-num">ETAPA {s.n}</div>
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                  <div className="step-meta">
                    {s.chips.map((c) => (
                      <span key={c} className={`step-chip${s.hi ? " hi" : ""}`}>{c}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 52 }} className="reveal d3">
              <div className="cota" style={{ maxWidth: 520, margin: "0 auto 26px" }}>
                <span className="cota-val">Empieza acá</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 13 }}>
                <a
                  href={calUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  data-cta="como"
                >
                  Agendar la llamada
                  <span>→</span>
                </a>
                <div className="cta-note">
                  Sin costo · Sin compromiso · Si no aplica para vos, te lo digo en la llamada
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className="faq-section" id="faq">
          <div className="reveal">
            <div className="sec-label">Preguntas</div>
            <div className="sec-title" style={{ fontSize: "clamp(26px,3vw,38px)" }}>
              Lo que todos preguntan antes de arrancar
            </div>
          </div>
          <div className="faq-list reveal d1">
            {FAQS.map((f, i) => (
              <div key={f.q} className="faq-item">
                <button
                  className="faq-btn"
                  onClick={(e) => {
                    const item = (e.currentTarget as HTMLButtonElement).closest(".faq-item");
                    if (!item) return;
                    const wasOpen = item.classList.contains("open");
                    document.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("open"));
                    if (!wasOpen) item.classList.add("open");
                  }}
                  type="button"
                  aria-expanded="false"
                  aria-controls={`faq-body-${i}`}
                >
                  {f.q}
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-body" id={`faq-body-${i}`}>{f.a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* QUIZ (cierre) */}
        <DiagnosticQuiz calUrl={calUrl} />
      </main>

      {/* FOOTER — cartucho de plano */}
      <footer>
        <div className="cartucho reveal">
          <div className="cartucho-cell">
            <div className="cartucho-key">Proyecto</div>
            <div className="cartucho-val">Auditoría de operaciones con IA</div>
          </div>
          <div className="cartucho-cell">
            <div className="cartucho-key">Escala</div>
            <div className="cartucho-val">PyME · 5 a 50 personas</div>
          </div>
          <div className="cartucho-cell">
            <div className="cartucho-key">Plazo</div>
            <div className="cartucho-val">2 semanas</div>
          </div>
          <div className="cartucho-cell">
            <div className="cartucho-key">Responsable</div>
            <div className="cartucho-val">Ignacio Arruvito</div>
          </div>
        </div>

        <div className="footer-bottom">
          <a href="#" className="wordmark" style={{ fontSize: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo-icon-transparent.png"
              alt="IAbyIA"
              width={22}
              height={22}
              className="wm-icon"
              style={{ width: 22, height: 22 }}
            />
            <span>IAbyIA</span>
          </a>
          <nav className="footer-links">
            <a href="/privacidad.html" className="footer-link">Privacidad</a>
            <a href="/terminos.html" className="footer-link">Términos</a>
          </nav>
          <p className="footer-copy">© 2026 · Buenos Aires, Argentina</p>
        </div>
      </footer>
    </>
  );
}
