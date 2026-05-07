"use client";

import CalEmbed from "@/components/cal-embed";
import ChatWidget from "@/components/chat-widget";
import MorphingText from "@/components/morphing-text";
import ScrollEffects from "@/components/scroll-effects";

const TICKER_ITEMS = [
  "WhatsApp Business API",
  "n8n Workflows",
  "Claude AI",
  "Chatwoot CRM",
  "PostgreSQL",
  "ElevenLabs Voice",
  "OpenRouter",
  "Docker / VPS",
  "Respuesta en 60s",
  "90% Automatizado",
  "24/7 Sin parar",
  "ROI en 2–3 meses",
];

const PAIN_CARDS = [
  {
    num: "5–10h",
    title: "Por día, respondiendo lo mismo",
    body: "Tu equipo pasa horas respondiendo \"¿tienen stock?\", \"¿cuánto sale?\", \"¿hacen envíos?\". Tareas repetitivas que la IA resuelve sola en segundos, las 24 horas.",
  },
  {
    num: "+40%",
    title: "De consultas llegan fuera de horario",
    body: "Cuando tu negocio cierra, los clientes siguen mandando mensajes. Sin respuesta inmediata, se van a la competencia. Cada noche es dinero que perdés.",
  },
  {
    num: "3x",
    title: "Más ventas con respuesta en 60 segundos",
    body: "Los estudios muestran que la tasa de conversión se triplica cuando respondés en el primer minuto. Tu equipo nunca puede lograr eso de forma consistente. La IA sí.",
  },
  {
    num: "∞",
    title: "Escalabilidad sin contratar nadie",
    body: "Si tu negocio crece, necesitás más personal para atender más mensajes. Con IAbyIA escalás sin sumar personas: 200 mensajes o 2000, el sistema responde igual.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Diagnóstico express",
    desc: "Analizamos tu volumen de mensajes, los tipos de consultas que recibís y el impacto real que tiene en tu equipo. Sin tecnicismos. Todo en 15 minutos.",
  },
  {
    num: "02",
    title: "Plan concreto",
    desc: "Te mostramos qué automatizamos, cómo funciona técnicamente, y la proyección de ahorro y ventas recuperadas. Números reales, no promesas vacías.",
  },
  {
    num: "03",
    title: "ROI en 2–3 meses",
    desc: "Implementación completa en 2–4 semanas. La inversión se recupera en 2–3 meses. Después es ganancia pura, sin contratar más nadie.",
  },
];

const FAQS = [
  {
    q: "¿Cuánto cuesta implementar el sistema?",
    a: "Depende del volumen y la complejidad de tu operación. Lo que sí podemos decirte es que la mayoría de nuestros clientes recupera la inversión en 2–3 meses.",
  },
  {
    q: "¿Cuánto tiempo toma ver resultados?",
    a: "Implementación completa en 2–4 semanas. Desde el primer día el sistema empieza a responder mensajes. Los resultados en conversiones y tiempo ahorrado se ven desde la primera semana.",
  },
  {
    q: "¿Se integra con lo que ya uso?",
    a: "Sí. Integramos con WhatsApp Business, Excel, sistemas de gestión, e-commerce y la mayoría de las herramientas que ya usás. Si usás algo custom o legacy, creamos la conexión específica para tu caso.",
  },
  {
    q: "¿Mi equipo necesita saber de tecnología?",
    a: "No. El sistema queda configurado para funcionar completamente solo. Capacitamos a tu equipo en los aspectos que sí necesitan manejar, que son mínimos. La idea es que no tengas que pensar en tecnología.",
  },
  {
    q: "¿La IA puede equivocarse o dar mala info a mis clientes?",
    a: "El sistema se entrena específicamente con la información de tu negocio: catálogo, precios, políticas, preguntas frecuentes. Si no sabe algo, escala al equipo humano en lugar de inventar. No improvisa.",
  },
  {
    q: "¿Qué pasa si probamos y no me sirve?",
    a: "La llamada de diagnóstico es completamente gratis y sin compromiso. Si analizamos tu caso y no creemos que sea una buena inversión para vos, te lo decimos claramente. No te vamos a vender algo que no te sirve.",
  },
];

export default function Home() {
  return (
    <>
      <ScrollEffects />

      {/* Scroll progress bar */}
      <div className="scroll-bar" id="scrollBar" />

      {/* NAV */}
      <nav className="nav-bar">
        <a href="#" className="wordmark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-icon-transparent.png"
            alt="IAbyIA"
            width={28}
            height={28}
            className="wm-icon"
          />
          <span className="wm-ia">IAbyIA</span>
        </a>
        <div className="nav-links">
          <a href="#dolor" className="nav-link">El problema</a>
          <a href="#como" className="nav-link">Cómo funciona</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </div>
        <a href="#agenda" className="nav-cta">
          <span className="live-dot" />
          Diagnóstico gratis
          <span className="nav-cta-arrow">→</span>
        </a>
      </nav>

      <main>
        {/* HERO */}
        <section>
          <div className="hero">
            <div className="hero-left">
              <div className="pain-tag reveal">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#38bdf8">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                Solo para empresas con alto volumen de mensajes
              </div>

              <h1 className="h1 reveal d1">
                Cada mensaje sin respuesta
                <br />
                es <MorphingText />
              </h1>

              <p className="hero-sub reveal d2">
                Tu equipo no puede responder <strong>50 mensajes por día</strong> al instante,
                las 24 horas, sin cometer errores.
                <br />
                La IA de IAbyIA sí.
              </p>

              <div className="hero-ctas reveal d4">
                <a href="#agenda" className="btn-primary">
                  Agendá tu diagnóstico gratis →
                </a>
                <div className="cta-note">
                  <span className="live-dot" />
                  Diagnóstico gratis · Solo 15 min · Sin compromiso
                </div>
              </div>
            </div>

            {/* CHAT DEMO */}
            <ChatWidget />
          </div>
        </section>

        {/* TICKER */}
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={`${item}-${i}`} className="ticker-item">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* STATS */}
        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-item reveal">
              <div className="stat-num">90%</div>
              <div className="stat-label">consultas automatizadas</div>
            </div>
            <div className="stat-item reveal d1">
              <div className="stat-num">60s</div>
              <div className="stat-label">tiempo de respuesta</div>
            </div>
            <div className="stat-item reveal d2">
              <div className="stat-num">+30%</div>
              <div className="stat-label">en conversiones</div>
            </div>
            <div className="stat-item reveal d3">
              <div className="stat-num">24/7</div>
              <div className="stat-label">sin parar, sin errores</div>
            </div>
          </div>
        </div>

        {/* PAIN SECTION */}
        <section className="pain-section" id="dolor">
          <div className="reveal">
            <div className="sec-label">El problema real</div>
            <div className="sec-title">
              Cuánto te cuesta <em className="grad-text">no tener IA</em> hoy
            </div>
            <div className="sec-sub">
              No es una pregunta de tecnología. Es una pregunta de cuánto dinero estás dejando
              sobre la mesa cada día.
            </div>
          </div>

          <div className="pain-grid">
            {PAIN_CARDS.map((c, i) => (
              <div key={c.title} className={`pain-card reveal d${(i % 2) + 1}`}>
                <div className="pain-card-num">{c.num}</div>
                <div className="pain-card-title">{c.title}</div>
                <div className="pain-card-body">{c.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* TRANSFORMATION */}
        <section className="transform-section">
          <div className="reveal">
            <div className="sec-label">La transformación</div>
            <div className="sec-title">
              De perder clientes <em className="grad-text">a cerrar ventas</em> mientras dormís
            </div>
            <div className="sec-sub">
              Negocios con las mismas características que el tuyo ya lo hicieron.
            </div>
          </div>

          <div className="compare-grid">
            <div className="compare-col before reveal d1">
              <div className="compare-head" style={{ color: "#ff6b6b" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                Hoy, sin IAbyIA
              </div>
              <div className="compare-item">
                <span className="ci-x">✕</span>
                <span>Respondés WhatsApp a mano, uno por uno, todo el día</span>
              </div>
              <div className="compare-item">
                <span className="ci-x">✕</span>
                <span>Perdés ventas cada noche, cada fin de semana, cada feriado</span>
              </div>
              <div className="compare-item">
                <span className="ci-x">✕</span>
                <span>Tu equipo gasta energía en consultas repetitivas, no en cerrar ventas</span>
              </div>
              <div className="compare-item">
                <span className="ci-x">✕</span>
                <span>Para crecer tenés que contratar, con todo el costo que eso implica</span>
              </div>
              <div className="compare-item">
                <span className="ci-x">✕</span>
                <span>Los clientes esperan, se frustran, y se van</span>
              </div>
            </div>

            <div className="compare-col after reveal d2">
              <div className="compare-head" style={{ color: "#38bdf8" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                Con IAbyIA
              </div>
              <div className="compare-item">
                <span className="ci-ok">✓</span>
                <strong>Tu sistema atiende, asesora y cierra ventas solo</strong>
              </div>
              <div className="compare-item">
                <span className="ci-ok">✓</span>
                <strong>24/7 sin parar, incluso cuando dormís</strong>
              </div>
              <div className="compare-item">
                <span className="ci-ok">✓</span>
                <strong>Tu equipo se enfoca en lo que realmente importa</strong>
              </div>
              <div className="compare-item">
                <span className="ci-ok">✓</span>
                <strong>Escalás sin contratar: de 200 a 2000 mensajes sin problema</strong>
              </div>
              <div className="compare-item">
                <span className="ci-ok">✓</span>
                <strong>Respuesta en 60 segundos, siempre, sin errores</strong>
              </div>
            </div>
          </div>

          {/* TESTIMONIAL */}
          <div className="testi-card reveal" style={{ marginTop: "32px" }}>
            <p className="testi-text">
              &ldquo;Pasamos de responder 200 mensajes a mano por día a que el sistema maneje el 90%
              solo. Nuestras ventas subieron un 30% y el equipo por fin puede enfocarse en hacer
              crecer el negocio en lugar de contestar el teléfono todo el día.&rdquo;
            </p>
            <div className="testi-author">
              <div className="testi-avatar">RN</div>
              <div>
                <div className="testi-name">Repuestos Noroeste</div>
                <div className="testi-meta">Mayorista de repuestos · +4300 productos · Buenos Aires</div>
              </div>
              <div className="testi-badge">+30% ventas · 90% automatizado</div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <div className="how-section" id="como">
          <div className="how-inner">
            <div style={{ textAlign: "center" }} className="reveal">
              <div className="sec-label" style={{ justifyContent: "center" }}>El proceso</div>
              <div className="sec-title" style={{ maxWidth: "700px", margin: "0 auto" }}>
                En 15 minutos sabés exactamente cuánto podés automatizar
              </div>
              <div className="sec-sub" style={{ maxWidth: "560px", margin: "14px auto 0" }}>
                No es una charla de ventas. Es un diagnóstico con números reales para tu negocio.
              </div>
            </div>

            <div className="steps-grid">
              {STEPS.map((s, i) => (
                <div key={s.num} className={`step-card reveal d${i + 1}`}>
                  <div className="step-num">{s.num}</div>
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "52px" }} className="reveal">
              <a
                href="#agenda"
                className="btn-primary"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                Quiero mi diagnóstico gratis →
              </a>
              <p style={{ fontSize: "13px", color: "var(--color-ink3)", marginTop: "12px" }}>
                Sin costo · Sin compromiso · Solo 15 minutos
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className="faq-section" id="faq">
          <div style={{ textAlign: "center" }} className="reveal">
            <div className="sec-label" style={{ justifyContent: "center" }}>FAQ</div>
            <div className="sec-title">Preguntas frecuentes</div>
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
                    document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
                    if (!wasOpen) item.classList.add("open");
                  }}
                  type="button"
                  aria-expanded="false"
                  aria-controls={`faq-body-${i}`}
                >
                  {f.q}
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-body-wrap">
                  <div className="faq-body" id={`faq-body-${i}`}>
                    {f.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL + CAL EMBED */}
        <section className="cta-section" id="agenda">
          <div className="reveal" style={{ position: "relative", zIndex: 2 }}>
            <div className="cta-title">
              Dejá de <em className="grad-text">perder ventas</em>.
              <br />
              Agendá <em className="grad-text">hoy</em>.
            </div>
            <div className="cta-sub">
              Elegí el horario que te quede cómodo. En 15 minutos te mostramos cuánto puede crecer
              tu negocio con IA.
            </div>
            <div className="cta-chips">
              <span className="cta-chip">Sin costo</span>
              <span className="cta-chip">Solo 15 minutos</span>
              <span className="cta-chip">Sin compromiso</span>
              <span className="cta-chip">Análisis completo</span>
            </div>
          </div>

          <div className="reveal d1" style={{ position: "relative", zIndex: 2 }}>
            <CalEmbed />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <a
          href="#"
          className="wordmark"
          style={{ fontSize: "18px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-icon-transparent.png"
            alt="IAbyIA"
            width={24}
            height={24}
            className="wm-icon"
            style={{ width: "24px", height: "24px" }}
          />
          <span className="wm-ia">IAbyIA</span>
        </a>
        <p style={{ fontSize: "13px", color: "var(--color-ink3)" }}>
          © 2026 IAbyIA · Buenos Aires, Argentina · Todos los derechos reservados
        </p>
      </footer>
    </>
  );
}
