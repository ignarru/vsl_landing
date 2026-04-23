"use client";

import CalEmbed from "@/components/cal-embed";
import VideoPlayer from "@/components/video-player";
import { useEffect } from "react";

function Brand({ size = "text-2xl" }: { size?: string }) {
  return (
    <span className={`brand-mark ${size}`}>
      <span className="brand-ia">IA</span>
      <span className="brand-by">by</span>
      <span className="brand-ia">IA</span>
    </span>
  );
}

const CalendarIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function Home() {
  // Reveal on scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ── NAV ── */}
      <nav
        id="navbar"
        className="fixed top-0 left-0 right-0 z-[200] h-[66px] px-[52px] flex items-center justify-between"
        style={{
          background: "rgba(7,13,26,0.75)",
          backdropFilter: "blur(22px) saturate(1.6)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          transition: "background .3s",
        }}
      >
        <a href="#" className="flex items-center gap-2.5 no-underline">
          <Brand size="text-xl" />
        </a>
        <a
          href="#agendar"
          className="cta-pulse inline-flex items-center gap-2 px-[22px] py-[10px] rounded-[9px] text-white font-semibold text-sm no-underline whitespace-nowrap"
          style={{
            background: "linear-gradient(135deg, #0f6fd4, #1e8fff)",
          }}
        >
          <CalendarIcon />
          Agenda tu llamada gratis
        </a>
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ padding: "88px 52px 48px" }}
      >
        {/* Glow */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            top: "-20%", left: "50%", transform: "translateX(-50%)",
            width: "1000px", height: "700px",
            background: "radial-gradient(ellipse at center, rgba(30,143,255,0.2) 0%, transparent 65%)",
          }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, transparent 70%)",
            maskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full mb-9"
            style={{
              background: "rgba(30,143,255,0.1)",
              border: "1px solid rgba(30,143,255,0.25)",
              padding: "5px 16px 5px 10px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#7dd3fc",
              animation: "fadeUp .5s ease both",
            }}
          >
            <span className="badge-dot" />
            Solo para mayoristas con alto volumen de mensajes
          </div>

          {/* H1 */}
          <h1
            className="font-extrabold tracking-tight mb-6 max-w-[880px]"
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontSize: "clamp(42px, 5.8vw, 76px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              animation: "fadeUp .6s .07s ease both",
            }}
          >
            Tu negocio pierde ventas
            <br />
            cada vez que{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #3ba3ff 10%, #38bdf8 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              no respondés
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="mb-12 text-center"
            style={{
              fontSize: "clamp(16px, 1.9vw, 20px)",
              color: "#8ba3cc",
              maxWidth: "540px",
              lineHeight: 1.72,
              animation: "fadeUp .6s .14s ease both",
            }}
          >
            Mientras tu equipo descansa, tus clientes se van a la competencia.
            La IA de IAbyIA atiende, asesora y cierra ventas por vos — las 24 horas, sin errores.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col items-center gap-3.5"
            style={{ animation: "fadeUp .6s .21s ease both" }}
          >
            <a
              href="#agendar"
              className="cta-pulse inline-flex items-center gap-2.5 rounded-[11px] text-white font-semibold no-underline"
              style={{
                padding: "17px 38px",
                background: "linear-gradient(135deg, #0f6fd4 0%, #1e8fff 60%, #2eaeff 100%)",
                fontSize: "16px",
              }}
            >
              <CalendarIcon />
              Quiero mi diagnóstico gratis — 15 min
            </a>
            <p style={{ fontSize: "13px", color: "#8ba3cc" }}>
              Sin costo · Sin compromiso ·{" "}
              <span style={{ color: "rgba(56,189,248,0.65)" }}>Solo para mayoristas</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── VIDEO ── */}
      <div className="relative z-10 flex justify-center" style={{ padding: "0 52px 80px" }}>
        <div className="reveal vsl-frame w-full" style={{ maxWidth: "760px", aspectRatio: "16/9" }}>
          <VideoPlayer />
        </div>
      </div>

      {/* ── STATS ── */}
      <div
        className="reveal flex items-center justify-center"
        style={{ padding: "0 52px 80px" }}
      >
        <div
          className="w-full grid"
          style={{
            maxWidth: "960px",
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
              className="text-center transition-all duration-250 hover:-translate-y-1"
              style={{
                background: "rgba(11,17,32,0.85)",
                padding: "40px 20px",
                backdropFilter: "blur(10px)",
              }}
            >
              <p
                className="font-extrabold mb-2"
                style={{
                  fontFamily: "var(--font-bricolage), sans-serif",
                  fontSize: "44px",
                  lineHeight: 1,
                  background: "linear-gradient(135deg, #60b4ff, #38bdf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
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
      <section style={{ padding: "80px 52px" }}>
        <div className="reveal w-full mx-auto" style={{ maxWidth: "1040px" }}>
          <span
            className="inline-block font-semibold uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#1e8fff", marginBottom: "14px" }}
          >
            El problema real
          </span>
          <h2
            className="font-extrabold tracking-tight"
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontSize: "clamp(28px, 3.5vw, 46px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Cada mensaje sin respuesta
            <br />es una venta que perdiste
          </h2>
          <p style={{ fontSize: "17px", color: "#8ba3cc", maxWidth: "520px", lineHeight: 1.72, marginTop: "14px" }}>
            Los mayoristas con alto volumen no pierden ventas por falta de clientes — las pierden por falta de velocidad y disponibilidad.
          </p>

          <div className="grid mt-14" style={{ gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {/* Sin IAbyIA */}
            <div style={{ borderRadius: "13px", overflow: "hidden" }}>
              <div
                className="font-bold uppercase tracking-widest text-xs"
                style={{ padding: "14px 24px", background: "rgba(239,68,68,0.1)", color: "#f87171", borderBottom: "1px solid rgba(239,68,68,0.15)" }}
              >
                Sin IAbyIA — hoy
              </div>
              <div style={{ background: "rgba(11,17,32,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderTop: "none", borderRadius: "0 0 13px 13px" }}>
                {[
                  ["💬", "Respondés 200+ WhatsApps a mano, todos los días"],
                  ["🌙", "Fuera de horario, tus clientes se van a otro proveedor"],
                  ["🔁", "5-10 horas diarias respondiendo las mismas preguntas"],
                  ["📉", "Para crecer, tenés que contratar más personas"],
                  ["😤", "Tu equipo se desgasta y comete errores"],
                ].map(([icon, text]) => (
                  <div
                    key={text}
                    className="flex items-start gap-3 transition-all duration-200 hover:pl-8"
                    style={{ padding: "15px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", fontSize: "14.5px", lineHeight: 1.55 }}
                  >
                    <span style={{ fontSize: "15px", flexShrink: 0, marginTop: "2px" }}>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Con IAbyIA */}
            <div style={{ borderRadius: "13px", overflow: "hidden" }}>
              <div
                className="font-bold uppercase tracking-widest text-xs"
                style={{ padding: "14px 24px", background: "rgba(30,143,255,0.1)", color: "#38bdf8", borderBottom: "1px solid rgba(30,143,255,0.15)" }}
              >
                Con IAbyIA
              </div>
              <div style={{ background: "rgba(11,17,32,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderTop: "none", borderRadius: "0 0 13px 13px" }}>
                {[
                  ["🤖", "La IA atiende, asesora y vende sola, en segundos"],
                  ["🌙", "A las 3 AM tu negocio sigue cerrando ventas"],
                  ["⚡", "Tu equipo solo atiende lo que está listo para cerrar"],
                  ["📈", "Escalás sin sumar una sola persona"],
                  ["🎯", "Cero errores, cero inconsistencias, siempre disponible"],
                ].map(([icon, text]) => (
                  <div
                    key={text}
                    className="flex items-start gap-3 transition-all duration-200 hover:pl-8"
                    style={{ padding: "15px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", fontSize: "14.5px", lineHeight: 1.55 }}
                  >
                    <span style={{ fontSize: "15px", flexShrink: 0, marginTop: "2px" }}>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section style={{ padding: "0 52px 80px" }}>
        <div
          className="reveal w-full mx-auto relative overflow-hidden"
          style={{
            maxWidth: "1040px",
            background: "rgba(11,17,32,0.85)",
            border: "1px solid rgba(30,143,255,0.2)",
            borderRadius: "20px",
            padding: "56px 56px 48px",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* top gradient line */}
          <div
            className="absolute top-0 left-0 right-0"
            style={{
              height: "2px",
              background: "linear-gradient(90deg, transparent 0%, #1e8fff 30%, #38bdf8 70%, transparent 100%)",
            }}
          />
          {/* decorative quote mark */}
          <div
            className="absolute pointer-events-none select-none"
            style={{
              top: "-50px", left: "40px",
              fontFamily: "var(--font-bricolage), sans-serif",
              fontSize: "260px", fontWeight: 800, lineHeight: 1,
              color: "rgba(30,143,255,0.055)",
            }}
          >
            &ldquo;
          </div>

          <p
            className="font-medium mb-9"
            style={{
              fontSize: "clamp(18px, 2.2vw, 24px)",
              lineHeight: 1.55,
              maxWidth: "800px",
              color: "#dce8ff",
            }}
          >
            &ldquo;Pasamos de responder{" "}
            <strong style={{ color: "#38bdf8", fontWeight: 600 }}>200 mensajes a mano por día</strong>
            {" "}a que el sistema maneje el{" "}
            <strong style={{ color: "#38bdf8", fontWeight: 600 }}>90% solo</strong>.
            Las ventas subieron un{" "}
            <strong style={{ color: "#38bdf8", fontWeight: 600 }}>30%</strong>
            {" "}y el equipo por fin se enfoca en lo que realmente importa.&rdquo;
          </p>

          <div className="flex items-center gap-3.5">
            <div
              className="flex items-center justify-center font-bold text-sm flex-shrink-0"
              style={{
                width: "44px", height: "44px", borderRadius: "50%",
                background: "linear-gradient(135deg, #0f6fd4, #1e8fff)",
                color: "#fff",
              }}
            >
              RN
            </div>
            <div>
              <div className="font-semibold" style={{ fontSize: "15px" }}>Repuestos Noroeste</div>
              <div style={{ fontSize: "12px", color: "#8ba3cc", marginTop: "2px" }}>Mayorista · +4.300 productos · Buenos Aires</div>
            </div>
          </div>

          <div
            className="flex gap-10 mt-9 pt-9"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            {[
              { val: "90%",   label: "Mensajes automatizados" },
              { val: "+30%",  label: "Aumento en ventas" },
              { val: "2 sem.", label: "Implementación" },
              { val: "2-3 m.", label: "Recupero de inversión" },
            ].map((m) => (
              <div key={m.label}>
                <div
                  className="font-extrabold"
                  style={{
                    fontFamily: "var(--font-bricolage), sans-serif",
                    fontSize: "32px",
                    background: "linear-gradient(135deg, #60b4ff, #38bdf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {m.val}
                </div>
                <div style={{ fontSize: "12px", color: "#8ba3cc", marginTop: "2px" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section style={{ padding: "80px 52px" }}>
        <div className="w-full mx-auto" style={{ maxWidth: "1040px" }}>
          <div className="reveal">
            <span
              className="inline-block font-semibold uppercase"
              style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#1e8fff", marginBottom: "14px" }}
            >
              Cómo funciona la llamada
            </span>
            <h2
              className="font-extrabold tracking-tight"
              style={{
                fontFamily: "var(--font-bricolage), sans-serif",
                fontSize: "clamp(28px, 3.5vw, 46px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              En 15 minutos sabés exactamente
              <br />cuánto podés automatizar
            </h2>
            <p style={{ fontSize: "17px", color: "#8ba3cc", maxWidth: "520px", lineHeight: 1.72, marginTop: "14px" }}>
              No es una charla de ventas. Es un diagnóstico real de tu operación, sin compromiso.
            </p>
          </div>

          <div
            className="relative grid mt-14"
            style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}
          >
            {/* connecting line */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: "28px",
                left: "calc(16.67% + 10px)",
                right: "calc(16.67% + 10px)",
                height: "1px",
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
                className={`reveal d${i + 1} group transition-all duration-300 hover:-translate-y-1.5`}
                style={{
                  background: "rgba(11,17,32,0.8)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "13px",
                  padding: "36px 28px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="flex items-center justify-center font-bold mb-6"
                  style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: "rgba(30,143,255,0.1)",
                    border: "1px solid rgba(30,143,255,0.3)",
                    fontSize: "13px", color: "#38bdf8",
                  }}
                >
                  {s.num}
                </div>
                <h3
                  className="font-bold mb-2.5"
                  style={{ fontFamily: "var(--font-bricolage), sans-serif", fontSize: "19px" }}
                >
                  {s.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#8ba3cc", lineHeight: 1.68 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "0 52px 80px" }}>
        <div className="reveal w-full mx-auto" style={{ maxWidth: "1040px" }}>
          <span
            className="inline-block font-semibold uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#1e8fff", marginBottom: "14px" }}
          >
            Preguntas frecuentes
          </span>
          <h2
            className="font-extrabold tracking-tight mb-10"
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontSize: "clamp(28px, 3.5vw, 46px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Todo lo que necesitás saber
          </h2>

          <div className="flex flex-col gap-2.5">
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
                  transition: "border-color .25s",
                }}
              >
                <summary
                  className="flex justify-between items-center cursor-pointer font-semibold list-none"
                  style={{ padding: "20px 28px", fontSize: "15px", gap: "16px" }}
                >
                  {f.q}
                  <span
                    className="flex-shrink-0 transition-transform duration-300 group-open:rotate-45"
                    style={{
                      width: "22px", height: "22px", borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.07)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "17px", color: "#8ba3cc",
                    }}
                  >
                    +
                  </span>
                </summary>
                <p style={{ padding: "0 28px 22px", fontSize: "14.5px", color: "#8ba3cc", lineHeight: 1.78 }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section
        id="agendar"
        className="relative overflow-hidden flex flex-col items-center justify-center text-center"
        style={{ padding: "80px 52px 60px", minHeight: "100vh" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(30,143,255,0.16), transparent 70%)",
          }}
        />

        <div className="reveal relative z-10 flex flex-col items-center w-full" style={{ maxWidth: "720px" }}>
          <span
            className="inline-block font-semibold uppercase mb-3"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#1e8fff" }}
          >
            Agendá tu lugar ahora
          </span>
          <h2
            className="font-extrabold tracking-tight mb-2.5"
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontSize: "clamp(28px, 4vw, 50px)",
              lineHeight: 1.1,
              letterSpacing: "-0.022em",
            }}
          >
            Elegí un horario. Te mostramos
            <br />el potencial de tu negocio.
          </h2>
          <p style={{ fontSize: "16px", color: "#8ba3cc", marginBottom: "16px" }}>
            15 minutos que pueden cambiar cómo operás para siempre.
          </p>

          <div className="flex items-center justify-center gap-6 flex-wrap mb-6">
            {["Sin costo", "Sin compromiso", "Solo para mayoristas"].map((c) => (
              <span key={c} className="flex items-center gap-1.5" style={{ fontSize: "13px", color: "#8ba3cc" }}>
                <span style={{ color: "#38bdf8" }}><CheckIcon /></span>
                {c}
              </span>
            ))}
          </div>

          <div className="w-full">
            <CalEmbed />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="flex items-center justify-between flex-wrap"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "30px 52px",
          gap: "12px",
          background: "rgba(7,13,26,0.7)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Brand size="text-lg" />
        <p style={{ fontSize: "13px", color: "#8ba3cc" }}>© 2026 IAbyIA · Buenos Aires, Argentina</p>
        <p style={{ fontSize: "13px", color: "#8ba3cc" }}>Transformamos tareas en resultados.</p>
      </footer>

      {/* ── REVEAL SCRIPT ── */}
      <NavScrollScript />
    </>
  );
}

// Separate component to handle nav scroll effect client-side
function NavScrollScript() {
  useEffect(() => {
    const nav = document.getElementById("navbar");
    if (!nav) return;
    const handler = () => {
      nav.style.background =
        window.scrollY > 60 ? "rgba(7,13,26,0.97)" : "rgba(7,13,26,0.75)";
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return null;
}
