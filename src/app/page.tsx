import CalEmbed from "@/components/cal-embed";
import VideoPlayer from "@/components/video-player";

function Brand({ size = "text-2xl" }: { size?: string }) {
  return (
    <span className={`brand-mark ${size}`}>
      <span className="brand-ia">IA</span>
      <span className="brand-by">by</span>
      <span className="brand-ia">IA</span>
    </span>
  );
}

export default function Home() {
  return (
    <>
      {/* ── BANNER DE CALIFICACION ── */}
      <div className="bg-alert/15 border-b-2 border-alert/30">
        <div className="py-4 px-5 sm:py-4 sm:px-6 text-center">
          <p className="text-lg sm:text-lg font-bold text-alert tracking-wide leading-snug">
            SOLO PARA TIENDAS MAYORISTAS CON UN ALTO VOLUMEN DE MENSAJES POR DÍA
          </p>
        </div>
      </div>

      {/* ── HERO VSL ── */}
      <section className="relative px-5 sm:px-8 lg:px-12 py-8 sm:py-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue/8 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto text-center flex flex-col items-center">
          {/* Headline */}
          <h1 className="text-[1.75rem] leading-[1.2] sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight mb-3 sm:mb-3 max-w-5xl w-full">
            Vende <span className="text-blue3">+30%</span> con
            un sistema automático que deja las ventas servidas para tus
            empleados
          </h1>

          <p className="text-blue3 text-base sm:text-base italic mb-5 sm:mb-5">
            *Sin contratar más personal. Sin invertir más en publicidad.
          </p>

          {/* ── VSL Video (maintains aspect ratio) ── */}
          <div className="vsl-frame w-full max-w-6xl mb-6 sm:mb-6 aspect-video">
            <VideoPlayer />
          </div>

          {/* CTA below video */}
          <div className="pb-1 w-full">
            <a
              href="#agendar"
              className="cta-pulse inline-flex items-center gap-2 bg-blue hover:bg-blue2 text-white font-semibold px-7 py-4 sm:px-8 sm:py-4 rounded-xl text-lg sm:text-lg transition-all hover:-translate-y-0.5"
            >
              Agendar llamada de 15 min
            </a>
            <p className="text-ink3 text-base mt-3 sm:mt-3">
              Gratis · Sin compromiso · Te mostramos cómo aplicaría en tu caso
            </p>
          </div>
        </div>
      </section>

      {/* ── RESULTADOS REALES ── */}
      <section className="py-14 sm:py-16 px-5 sm:px-8 lg:px-12 border-t border-border">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4">
            {[
              { val: "90%", label: "atención automatizada" },
              { val: "60s", label: "tiempo de respuesta" },
              { val: "+30%", label: "más conversiones" },
              { val: "24/7", label: "sin parar nunca" },
            ].map((s) => (
              <div
                key={s.val}
                className="text-center py-7 sm:py-6 px-3 rounded-2xl bg-surface border border-border"
              >
                <p className="text-3xl sm:text-3xl font-extrabold text-blue3 tracking-tight mb-1.5">
                  {s.val}
                </p>
                <p className="text-ink3 text-base sm:text-base">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANTES vs DESPUES ── */}
      <section className="py-16 sm:py-20 px-5 sm:px-8 lg:px-12 border-t border-border">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-center mb-4 leading-tight">
            De perder clientes a cerrar ventas
            <br className="hidden sm:block" />
            <span className="text-blue3"> mientras dormís</span>
          </h2>
          <p className="text-ink2 text-lg sm:text-lg text-center max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed">
            Negocios como el tuyo ya dejaron de depender de horarios y personas
            para vender.
          </p>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-5">
            {/* Antes */}
            <div className="bg-surface border border-border rounded-2xl p-7 sm:p-8">
              <p className="text-ink3 text-sm uppercase tracking-widest font-bold mb-6">
                Hoy sin IA
              </p>
              <div className="space-y-5">
                {[
                  "Respondés WhatsApp a mano, uno por uno",
                  "Perdés ventas fuera de horario",
                  "5-10 horas diarias en consultas repetitivas",
                  "Crecés contratando, no automatizando",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <span className="text-alert2/60 text-lg mt-0.5 shrink-0">
                      ✕
                    </span>
                    <p className="text-ink2 text-lg sm:text-lg leading-relaxed">
                      {t}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Despues */}
            <div className="bg-blue/5 border border-blue/10 rounded-2xl p-7 sm:p-8">
              <p className="text-blue3 text-sm uppercase tracking-widest font-bold mb-6">
                Con <Brand size="text-sm" />
              </p>
              <div className="space-y-5">
                {[
                  "Tu negocio atiende y vende solo, 24/7",
                  "Cada consulta se responde en segundos",
                  "Escalás sin sumar personas",
                  "Vos te enfocás en crecer, la IA hace el resto",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <span className="text-blue3 text-lg mt-0.5 shrink-0">
                      ✓
                    </span>
                    <p className="text-ink2 text-lg sm:text-lg leading-relaxed">
                      {t}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-10 sm:mt-10">
            <a
              href="#agendar"
              className="cta-pulse inline-flex items-center gap-2 bg-blue hover:bg-blue2 text-white font-semibold px-7 py-4 sm:px-8 sm:py-4 rounded-xl text-lg sm:text-lg transition-all hover:-translate-y-0.5"
            >
              Agendar llamada de 15 min
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIO ── */}
      <section className="py-16 sm:py-20 px-5 sm:px-8 lg:px-12 border-t border-border relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue/4 rounded-full blur-[120px]" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto">
          <p className="text-blue3 text-base sm:text-sm font-semibold uppercase tracking-widest mb-6 sm:mb-8 text-center">
            Caso real
          </p>

          <div className="bg-surface2 border border-border2 rounded-2xl p-7 sm:p-10 lg:p-12">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-blue/25 mb-5 sm:mb-6"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-xl sm:text-xl lg:text-2xl text-ink leading-relaxed mb-6">
              &ldquo;Pasamos de responder 200 mensajes a mano por día a que el
              bot maneje el <span className="text-blue3 font-semibold">90%</span>{" "}
              solo. Nuestras ventas subieron un{" "}
              <span className="text-blue3 font-semibold">30%</span> y el equipo
              por fin se enfoca en lo importante.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue/12 border border-blue/20 flex items-center justify-center text-blue3 text-base font-bold">
                RN
              </div>
              <div>
                <p className="text-ink text-base font-semibold">
                  Repuestos Noroeste
                </p>
                <p className="text-ink3 text-sm">
                  Mayorista · +4300 productos · Buenos Aires
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-10 sm:mt-10">
            <a
              href="#agendar"
              className="cta-pulse inline-flex items-center gap-2 bg-blue hover:bg-blue2 text-white font-semibold px-7 py-4 sm:px-8 sm:py-4 rounded-xl text-lg sm:text-lg transition-all hover:-translate-y-0.5"
            >
              Quiero los mismos resultados
            </a>
          </div>
        </div>
      </section>

      {/* ── QUE PASA EN LA LLAMADA ── */}
      <section className="py-16 sm:py-20 px-5 sm:px-8 lg:px-12 border-t border-border">
        <div className="w-full max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
            En 15 minutos vas a saber{" "}
            <span className="text-blue3">exactamente</span> cuánto podés
            automatizar
          </h2>
          <p className="text-ink2 text-lg sm:text-lg max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed">
            No es una charla de ventas. Es un diagnóstico rápido donde te
            mostramos qué se puede automatizar y qué impacto tendría.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 sm:gap-5 mb-10 sm:mb-12">
            {[
              {
                step: "01",
                title: "Diagnóstico express",
                text: "Analizamos tu operación y encontramos las oportunidades con mayor retorno.",
              },
              {
                step: "02",
                title: "Plan concreto",
                text: "Te mostramos qué se automatiza, cómo y en cuánto tiempo.",
              },
              {
                step: "03",
                title: "Proyección real",
                text: "Números estimados de ahorro basados en casos similares al tuyo.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="bg-surface border border-border rounded-2xl p-7 sm:p-7 text-left"
              >
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-blue/10 text-blue3 text-sm font-bold mb-5">
                  {s.step}
                </span>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-ink2 text-lg leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>

          <a
            href="#agendar"
            className="cta-pulse inline-flex items-center gap-2 bg-blue hover:bg-blue2 text-white font-semibold px-7 py-4 sm:px-8 sm:py-4 rounded-xl text-lg sm:text-lg transition-all hover:-translate-y-0.5"
          >
            Quiero mi diagnóstico gratis
          </a>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 sm:py-20 px-5 sm:px-8 lg:px-12 border-t border-border">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-center mb-8 sm:mb-10">
            Preguntas frecuentes
          </h2>

          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                q: "¿Cuánto cuesta?",
                a: "Depende de tu caso. En la llamada de 15 minutos te damos un estimado real. La mayoría recupera la inversión en 2-3 meses.",
              },
              {
                q: "¿Cuánto tiempo toma ver resultados?",
                a: "Implementación completa en 2-4 semanas.",
              },
              {
                q: "¿Se integra con lo que ya uso?",
                a: "Sí. WhatsApp Business, Excel, sistemas de gestión, e-commerce. Si usás algo custom, creamos la conexión.",
              },
              {
                q: "¿Mi equipo necesita saber de tecnología?",
                a: "No. Todo queda configurado para funcionar solo. Capacitamos a tu equipo.",
              },
              {
                q: "¿Qué pasa si no me sirve?",
                a: "La llamada es gratis y sin compromiso. Si no ves valor, no seguimos.",
              },
            ].map((f) => (
              <details
                key={f.q}
                className="group bg-surface border border-border rounded-xl"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-5 text-ink font-semibold text-lg sm:text-lg list-none [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-ink3 transition-transform group-open:rotate-45 text-xl leading-none ml-4 shrink-0">
                    +
                  </span>
                </summary>
                <p className="px-5 sm:px-5 pb-5 sm:pb-5 text-ink2 text-lg leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL + CAL.COM ── */}
      <section id="agendar" className="py-16 sm:py-20 px-5 sm:px-8 lg:px-12 border-t border-border relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue/6 rounded-full blur-[140px]" />
        </div>

        <div className="relative w-full max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
            Agendá tus 15 minutos gratis
          </h2>
          <p className="text-ink2 text-lg sm:text-lg max-w-lg mx-auto mb-4 leading-relaxed">
            Elegí el horario que te quede más cómodo y te contamos cómo la IA puede
            transformar tu operación.
          </p>

          <div className="flex flex-wrap justify-center gap-x-5 sm:gap-x-5 gap-y-2 text-base sm:text-base text-ink3 mb-8 sm:mb-10">
            <span>15 minutos</span>
            <span>·</span>
            <span>Sin costo</span>
            <span>·</span>
            <span>Sin compromiso</span>
          </div>

          <CalEmbed />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border py-8 sm:py-8 px-5 text-center">
        <Brand size="text-xl sm:text-xl" />
        <p className="text-ink3 text-sm mt-2">
          © 2026 IAbyIA · Buenos Aires, Argentina
        </p>
      </footer>
    </>
  );
}
