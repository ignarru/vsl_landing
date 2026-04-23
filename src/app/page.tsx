"use client";

import CalEmbed from "@/components/cal-embed";
import VideoPlayer from "@/components/video-player";
import { useEffect } from "react";


const BG_FONT = "'Bricolage Grotesque', sans-serif";
const LOGO_SRC = "data:image/png;base64,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";


function Brand({ size = 28 }: { size?: number }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: BG_FONT,
        fontWeight: 700,
        fontSize: `${size}px`,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        textDecoration: "none",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_SRC}
        alt="IAbyIA logo"
        style={{
          width: `${size * 1.3}px`,
          height: `${size * 1.3}px`,
          objectFit: "contain",
          flexShrink: 0,
        }}
      />
      {/* Wordmark */}
      <span style={{
        background: "linear-gradient(120deg, #e8f0ff 10%, #c0d8ff 90%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        IAbyIA
      </span>
    </span>
  );
}

const CalIcon = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ flexShrink: 0 }}>
    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const GradText = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    background: "linear-gradient(120deg, #3ba3ff 10%, #38bdf8 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  }}>
    {children}
  </span>
);

const CyanText = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: "#38bdf8", fontWeight: 600 }}>{children}</strong>
);

export default function Home() {
  useEffect(() => {
    // Reveal on scroll
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // Nav scroll effect
    const nav = document.getElementById("navbar");
    const onScroll = () => {
      if (nav) nav.style.background = window.scrollY > 60
        ? "rgba(7,13,26,0.97)"
        : "rgba(7,13,26,0.75)";
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* ── NAV ── */}
      <nav
        id="navbar"
        className="nav-pad fixed top-0 left-0 right-0 z-[200] flex items-center justify-between"
        style={{
          height: "66px",
          paddingLeft: "52px",
          paddingRight: "52px",
          background: "rgba(7,13,26,0.75)",
          backdropFilter: "blur(22px) saturate(1.6)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          transition: "background .3s",
        }}
      >
        <a href="#" style={{ textDecoration: "none" }}>
          <Brand size={22} />
        </a>
        <a
          href="#agendar"
          className="cta-pulse inline-flex items-center gap-1.5 text-white font-semibold no-underline"
          style={{
            padding: "8px 14px",
            background: "linear-gradient(135deg, #0f6fd4, #1e8fff)",
            borderRadius: "9px",
            fontSize: "13px",
            whiteSpace: "nowrap",
            maxWidth: "calc(100vw - 180px)",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <CalIcon size={13} />
          <span className="nav-cta-text">Agenda tu llamada gratis</span>
          <span className="nav-cta-short">Agendar</span>
        </a>
      </nav>

      {/* ── HERO ── */}
      <section
        className="section-pad relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          minHeight: "100vh",
          paddingTop: "66px",       /* justo debajo del nav */
          paddingBottom: "60px",
          paddingLeft: "52px",
          paddingRight: "52px",
        }}
      >
        {/* Glow orb */}
        <div style={{
          position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)",
          width: "1000px", height: "700px",
          background: "radial-gradient(ellipse at center, rgba(30,143,255,0.2) 0%, transparent 65%)",
          pointerEvents: "none", zIndex: 0,
        }} />
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, transparent 70%)",
          maskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, transparent 70%)",
        }} />

        <div className="relative flex flex-col items-center w-full" style={{ zIndex: 1, maxWidth: "900px" }}>

          {/* ── BADGE MAYORISTAS — grande y prominente ── */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(30,143,255,0.1)",
              border: "1px solid rgba(30,143,255,0.3)",
              borderRadius: "100px",
              padding: "10px 24px",
              marginBottom: "36px",
              animation: "fadeUp .5s ease both",
            }}
          >
            <span className="badge-dot" />
            <span style={{
              fontFamily: BG_FONT,
              fontSize: "clamp(12px, 1.3vw, 15px)",
              fontWeight: 600,
              color: "#7dd3fc",
              letterSpacing: "0.01em",
            }}>
              Solo para mayoristas con alto volumen de mensajes
            </span>
          </div>

          {/* ── H1 ── */}
          <h1
            style={{
              fontFamily: BG_FONT,
              fontSize: "clamp(38px, 8vw, 76px)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              marginBottom: "28px",
              animation: "fadeUp .6s .07s ease both",
            }}
          >
            Tu negocio pierde ventas
            <br />
            cada vez que{" "}
            <GradText>no respondés</GradText>
          </h1>

          {/* ── SUBHEADLINE ── */}
          <p
            style={{
              fontSize: "clamp(15px, 1.9vw, 20px)",
              color: "#8ba3cc",
              maxWidth: "540px",
              lineHeight: 1.72,
              marginBottom: "48px",
              animation: "fadeUp .6s .14s ease both",
            }}
          >
            Mientras tu equipo descansa, tus clientes se van a la competencia.
            La IA de IAbyIA atiende, asesora y cierra ventas por vos — las 24 horas, sin errores.
          </p>

          {/* ── CTA ── */}
          <div
            className="flex flex-col items-center gap-3"
            style={{ animation: "fadeUp .6s .21s ease both" }}
          >
            <a
              href="#agendar"
              className="cta-pulse inline-flex items-center gap-2.5 text-white font-semibold no-underline"
              style={{
                padding: "17px 38px",
                background: "linear-gradient(135deg, #0f6fd4 0%, #1e8fff 60%, #2eaeff 100%)",
                borderRadius: "11px",
                fontSize: "clamp(15px, 1.5vw, 17px)",
                fontFamily: BG_FONT,
              }}
            >
              <CalIcon size={17} />
              Quiero mi diagnóstico gratis — 15 min
            </a>
            <p style={{ fontSize: "13px", color: "#8ba3cc" }}>
              Sin costo · Sin compromiso ·{" "}
              <span style={{ color: "rgba(56,189,248,0.75)" }}>Solo para mayoristas</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── VIDEO ── */}
      <div
        className="section-pad reveal"
        style={{ paddingLeft: "52px", paddingRight: "52px", paddingBottom: "80px", display: "flex", justifyContent: "center" }}
      >
        <div className="vsl-frame w-full" style={{ maxWidth: "760px", aspectRatio: "16/9" }}>
          <VideoPlayer />
        </div>
      </div>

      {/* ── STATS ── */}
      <div
        className="section-pad reveal"
        style={{ paddingLeft: "52px", paddingRight: "52px", paddingBottom: "80px", display: "flex", justifyContent: "center" }}
      >
        <div
          className="stats-grid w-full"
          style={{
            maxWidth: "960px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "13px",
            overflow: "hidden",
          }}
        >
          {[
            { val: "90%",  label: "Atención automatizada" },
            { val: "60s",  label: "Tiempo de respuesta" },
            { val: "+30%", label: "Más conversiones" },
            { val: "24/7", label: "Sin parar nunca" },
          ].map((s) => (
            <div
              key={s.val}
              className="text-center"
              style={{ background: "rgba(11,17,32,0.85)", padding: "40px 20px", backdropFilter: "blur(10px)" }}
            >
              <p style={{
                fontFamily: BG_FONT,
                fontSize: "44px",
                fontWeight: 800,
                lineHeight: 1,
                marginBottom: "8px",
                background: "linear-gradient(135deg, #60b4ff, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {s.val}
              </p>
              <p style={{ fontSize: "12px", color: "#8ba3cc", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── PAIN / GAIN ── */}
      <section className="section-pad" style={{ padding: "0 52px 80px" }}>
        <div className="reveal w-full mx-auto" style={{ maxWidth: "1040px" }}>
          <SecTag>El problema real</SecTag>
          <h2 style={{ fontFamily: BG_FONT, fontSize: "clamp(28px, 3.5vw, 46px)", marginBottom: "14px" }}>
            Cada mensaje sin respuesta
            <br />es una venta que perdiste
          </h2>
          <p style={{ fontSize: "17px", color: "#8ba3cc", maxWidth: "520px", lineHeight: 1.72 }}>
            Los mayoristas con alto volumen no pierden ventas por falta de clientes — las pierden por falta de velocidad y disponibilidad.
          </p>

          <div
            className="two-col-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "52px" }}
          >
            <ColCard
              head="Sin IAbyIA — hoy"
              headStyle={{ background: "rgba(239,68,68,0.1)", color: "#f87171", borderBottom: "1px solid rgba(239,68,68,0.15)" }}
              rows={[
                ["💬", "Respondés 200+ WhatsApps a mano, todos los días"],
                ["🌙", "Fuera de horario, tus clientes se van a otro proveedor"],
                ["🔁", "5-10 horas diarias respondiendo las mismas preguntas"],
                ["📉", "Para crecer, tenés que contratar más personas"],
                ["😤", "Tu equipo se desgasta y comete errores"],
              ]}
            />
            <ColCard
              head="Con IAbyIA"
              headStyle={{ background: "rgba(30,143,255,0.1)", color: "#38bdf8", borderBottom: "1px solid rgba(30,143,255,0.15)" }}
              rows={[
                ["🤖", "La IA atiende, asesora y vende sola, en segundos"],
                ["🌙", "A las 3 AM tu negocio sigue cerrando ventas"],
                ["⚡", "Tu equipo solo atiende lo que está listo para cerrar"],
                ["📈", "Escalás sin sumar una sola persona"],
                ["🎯", "Cero errores, cero inconsistencias, siempre disponible"],
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="section-pad" style={{ padding: "0 52px 80px" }}>
        <div
          className="reveal quote-card-inner w-full mx-auto"
          style={{
            maxWidth: "1040px",
            position: "relative",
            overflow: "hidden",
            background: "rgba(11,17,32,0.85)",
            border: "1px solid rgba(30,143,255,0.2)",
            borderRadius: "20px",
            padding: "56px 56px 48px",
            backdropFilter: "blur(16px)",
          }}
        >
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: "linear-gradient(90deg, transparent 0%, #1e8fff 30%, #38bdf8 70%, transparent 100%)",
          }} />
          <div style={{
            position: "absolute", top: "-50px", left: "40px",
            fontFamily: BG_FONT, fontSize: "260px", fontWeight: 800, lineHeight: 1,
            color: "rgba(30,143,255,0.055)", pointerEvents: "none", userSelect: "none",
          }}>&ldquo;</div>

          <p style={{ fontSize: "clamp(18px, 2.2vw, 24px)", fontWeight: 500, lineHeight: 1.55, maxWidth: "800px", marginBottom: "36px", color: "#dce8ff" }}>
            &ldquo;Pasamos de responder <CyanText>200 mensajes a mano por día</CyanText> a que el sistema maneje el{" "}
            <CyanText>90% solo</CyanText>. Las ventas subieron un <CyanText>30%</CyanText> y el equipo por fin se enfoca en lo que realmente importa.&rdquo;
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, #0f6fd4, #1e8fff)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: "13px", color: "#fff",
            }}>RN</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "15px" }}>Repuestos Noroeste</div>
              <div style={{ fontSize: "12px", color: "#8ba3cc", marginTop: "2px" }}>Mayorista · +4.300 productos · Buenos Aires</div>
            </div>
          </div>

          <div
            className="metrics-row"
            style={{ display: "flex", gap: "40px", marginTop: "36px", paddingTop: "36px", borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            {[
              { val: "90%",    label: "Mensajes automatizados" },
              { val: "+30%",   label: "Aumento en ventas" },
              { val: "2 sem.", label: "Implementación" },
              { val: "2-3 m.", label: "Recupero de inversión" },
            ].map((m) => (
              <div key={m.label}>
                <div style={{ fontFamily: BG_FONT, fontSize: "32px", fontWeight: 800,
                  background: "linear-gradient(135deg, #60b4ff, #38bdf8)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>{m.val}</div>
                <div style={{ fontSize: "12px", color: "#8ba3cc", marginTop: "2px" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section className="section-pad" style={{ padding: "0 52px 80px" }}>
        <div className="w-full mx-auto" style={{ maxWidth: "1040px" }}>
          <div className="reveal">
            <SecTag>Cómo funciona la llamada</SecTag>
            <h2 style={{ fontFamily: BG_FONT, fontSize: "clamp(28px, 3.5vw, 46px)" }}>
              En 15 minutos sabés exactamente
              <br />cuánto podés automatizar
            </h2>
            <p style={{ fontSize: "17px", color: "#8ba3cc", maxWidth: "520px", lineHeight: 1.72, marginTop: "14px" }}>
              No es una charla de ventas. Es un diagnóstico real de tu operación, sin compromiso.
            </p>
          </div>

          <div
            className="steps-grid-inner"
            style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "56px" }}
          >
            <div
              className="steps-connector"
              style={{
                position: "absolute", top: "28px",
                left: "calc(16.67% + 10px)", right: "calc(16.67% + 10px)", height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(30,143,255,0.35) 30%, #1e8fff 50%, rgba(30,143,255,0.35) 70%, transparent)",
              }}
            />
            {[
              { num: "01", title: "Diagnóstico express", text: "Analizamos tu flujo de mensajes y encontramos las oportunidades con mayor retorno inmediato para tu negocio." },
              { num: "02", title: "Plan concreto",       text: "Te mostramos qué se automatiza, cómo se implementa y en cuánto tiempo empezás a ver resultados reales." },
              { num: "03", title: "Proyección real",     text: "Estimamos el ahorro de tiempo y el aumento de ventas basándonos en casos similares al tuyo." },
            ].map((s, i) => (
              <div
                key={s.num}
                className={`reveal d${i + 1}`}
                style={{
                  background: "rgba(11,17,32,0.8)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "13px",
                  padding: "36px 28px",
                  backdropFilter: "blur(10px)",
                  transition: "border-color .3s, transform .3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "rgba(30,143,255,0.45)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "rgba(30,143,255,0.1)", border: "1px solid rgba(30,143,255,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "13px", fontWeight: 700, color: "#38bdf8", marginBottom: "22px",
                }}>{s.num}</div>
                <h3 style={{ fontFamily: BG_FONT, fontSize: "19px", marginBottom: "10px" }}>{s.title}</h3>
                <p style={{ fontSize: "14px", color: "#8ba3cc", lineHeight: 1.68 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-pad" style={{ padding: "0 52px 80px" }}>
        <div className="reveal w-full mx-auto" style={{ maxWidth: "1040px" }}>
          <SecTag>Preguntas frecuentes</SecTag>
          <h2 style={{ fontFamily: BG_FONT, fontSize: "clamp(28px, 3.5vw, 46px)", marginBottom: "40px" }}>
            Todo lo que necesitás saber
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { q: "¿Cuánto cuesta?",                           a: "Depende de tu caso. En la llamada de 15 minutos te damos un estimado real basado en tu volumen. La mayoría de nuestros clientes recupera la inversión en 2-3 meses." },
              { q: "¿Cuánto tiempo toma implementarlo?",        a: "Implementación completa en 2 a 4 semanas. En muchos casos podés ver resultados desde la primera semana de funcionamiento." },
              { q: "¿Se integra con lo que ya uso?",            a: "Sí. WhatsApp Business, Excel, sistemas de gestión, e-commerce y más. Si usás algo custom, construimos la conexión específica para tu operación." },
              { q: "¿Mi equipo necesita saber de tecnología?",  a: "No. Todo queda configurado para funcionar solo. Capacitamos a tu equipo en menos de una hora para que sepan supervisar el sistema sin complicaciones." },
              { q: "¿Y si no me sirve?",                        a: "La llamada es 100% gratis y sin compromiso. Si en 15 minutos no te mostramos valor claro, simplemente no seguimos. Sin presión ni seguimiento forzado." },
            ].map((f) => (
              <details
                key={f.q}
                className="group"
                style={{
                  background: "rgba(11,17,32,0.8)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "13px",
                  overflow: "hidden",
                }}
              >
                <summary
                  className="flex justify-between items-center cursor-pointer font-semibold list-none"
                  style={{ padding: "20px 28px", fontSize: "15px", gap: "16px", fontFamily: BG_FONT }}
                >
                  {f.q}
                  <span
                    className="transition-transform duration-300 group-open:rotate-45"
                    style={{
                      flexShrink: 0, width: "22px", height: "22px", borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "17px", color: "#8ba3cc",
                    }}
                  >+</span>
                </summary>
                <p style={{ padding: "0 28px 22px", fontSize: "14.5px", color: "#8ba3cc", lineHeight: 1.78 }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL + CAL ── */}
      <section
        id="agendar"
        className="section-pad relative flex flex-col items-center text-center overflow-hidden"
        style={{ padding: "80px 52px 80px", minHeight: "100vh", justifyContent: "center" }}
      >
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(30,143,255,0.16), transparent 70%)",
        }} />
        <div className="reveal relative flex flex-col items-center w-full" style={{ zIndex: 1, maxWidth: "860px" }}>
          <SecTag>Agendá tu lugar ahora</SecTag>
          <h2 style={{ fontFamily: BG_FONT, fontSize: "clamp(28px, 4vw, 50px)", marginBottom: "12px" }}>
            Elegí un horario. Te mostramos
            <br />el potencial de tu negocio.
          </h2>
          <p style={{ fontSize: "16px", color: "#8ba3cc", marginBottom: "20px" }}>
            15 minutos que pueden cambiar cómo operás para siempre.
          </p>

          <div
            className="cta-chips-row"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", flexWrap: "wrap", marginBottom: "32px" }}
          >
            {["Sin costo", "Sin compromiso", "Solo para mayoristas"].map((c) => (
              <span key={c} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#8ba3cc" }}>
                <span style={{ color: "#38bdf8" }}><CheckIcon /></span>{c}
              </span>
            ))}
          </div>

          <div style={{ width: "100%" }}>
            <CalEmbed />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="nav-pad"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "30px 52px",
          background: "rgba(7,13,26,0.7)",
          backdropFilter: "blur(10px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="footer-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <Brand size={20} />
          <p style={{ fontSize: "13px", color: "#8ba3cc" }}>© 2026 IAbyIA · Buenos Aires, Argentina</p>
          <p style={{ fontSize: "13px", color: "#8ba3cc" }}>Transformamos tareas en resultados.</p>
        </div>
      </footer>
    </>
  );
}

/* ── Helpers ── */
function SecTag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-block",
      fontFamily: BG_FONT,
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "#1e8fff",
      marginBottom: "14px",
    }}>
      {children}
    </span>
  );
}

function ColCard({
  head,
  headStyle,
  rows,
}: {
  head: string;
  headStyle: React.CSSProperties;
  rows: [string, string][];
}) {
  return (
    <div style={{ borderRadius: "13px", overflow: "hidden" }}>
      <div
        style={{
          padding: "14px 24px",
          fontFamily: BG_FONT,
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          ...headStyle,
        }}
      >
        {head}
      </div>
      <div style={{ background: "rgba(11,17,32,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderTop: "none", borderRadius: "0 0 13px 13px" }}>
        {rows.map(([icon, text]) => (
          <div
            key={text}
            style={{
              display: "flex", alignItems: "flex-start", gap: "12px",
              padding: "15px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)",
              fontSize: "14.5px", lineHeight: 1.55, transition: "background .15s",
            }}
          >
            <span style={{ fontSize: "15px", flexShrink: 0, marginTop: "2px" }}>{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
