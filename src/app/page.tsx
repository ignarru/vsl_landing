"use client";

import CalEmbed from "@/components/cal-embed";
import VideoPlayer from "@/components/video-player";
import { useEffect } from "react";

const BG_FONT = "'Bricolage Grotesque', sans-serif";

function Brand({ className = "" }: { className?: string }) {
  return (
    <span
      className={`brand-mark ${className}`}
      style={{ fontFamily: BG_FONT }}
    >
      <span className="brand-ia">IA</span>
      <span className="brand-by">by</span>
      <span className="brand-ia">IA</span>
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
          <Brand className="text-2xl" />
        </a>
        <a
          href="#agendar"
          className="cta-pulse inline-flex items-center gap-2 text-white font-semibold no-underline whitespace-nowrap"
          style={{
            padding: "10px 22px",
            background: "linear-gradient(135deg, #0f6fd4, #1e8fff)",
            borderRadius: "9px",
            fontSize: "14px",
          }}
        >
          <CalIcon size={14} />
          Agenda tu llamada gratis
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
              fontSize: "clamp(14px, 1.6vw, 18px)",
              fontWeight: 700,
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
              fontSize: "clamp(42px, 5.8vw, 76px)",
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
              fontSize: "clamp(16px, 1.9vw, 20px)",
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
          <Brand className="text-xl" />
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
