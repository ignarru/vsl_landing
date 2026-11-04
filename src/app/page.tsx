"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CalculadoraVentas from "@/components/calculadora-ventas";
import { CAL_BASE, buildCalUrl } from "@/lib/cal-link";
import { getSid } from "@/lib/track";

/* ═══ LANDING v4.3 — oferta integral (nov 2026) ══════════════════════════════════════════
   Oferta: obsidian/01 - Negocio/Oferta integral — IA en marketing, ventas y operación (2026-11).md
     (⚠ marketing quedó FUERA el 03/11: la oferta es ventas + operación)
   Investigación: obsidian/08 - Conocimiento/Landings — qué retiene y convierte (investigación nov 2026).md
   Crítica impeccable + cro (04/11): .impeccable/critique/ — esta versión aplica todo lo que salió.

   Tipografías: Instrument Sans (títulos) + Hanken Grotesk (texto), ver layout.tsx.
   Voz: primera persona, Ignacio ("pongo", "armo"). Un negocio de una persona: el trato es el diferencial.

   Tracking (NO romper): selectores que mide lib/track.ts y solo los data-cta que acepta el
   dashboard (nav, hero, calculadora, como, quiz).
     .hero · .transform-section (prueba, ahora arriba) · #dolor · .stats-section (áreas)
     #calculadora · #como · #diagnostico (para quién) · #faq · footer
   El título y el botón del hero no se animan (LCP). Solo se anima el resumen, cuando se ve. */

/** Tu WhatsApp para el plan B al calendario, en formato internacional sin "+" (ej. "5491112345678").
 *  Vacío = el link no aparece. ⏳ Ignacio tiene que pasarlo. */
const WHATSAPP = "";
const WA_TEXTO = encodeURIComponent("Hola Ignacio, vi tu página y quiero consultarte por mi negocio.");

const DOLORES = [
  { cita: "La cuestión no es meter más plata en publicidad, porque ya lo hicimos. No damos abasto.", quien: "E-commerce · Uruguay" },
  { cita: "Por más que le ponga más plata a Meta, del otro lado no puede llevar a cabo.", quien: "E-commerce · Argentina" },
  { cita: "Le hablan a las nueve y le contestan a las tres.", quien: "Mayorista con venta online" },
];

const PASOS = [
  { n: "01", titulo: "Llamada", texto: "Me contás cómo vende tu negocio hoy y vemos si tiene sentido trabajar juntos. Si no lo tiene, te lo digo ahí.", nota: "Gratis" },
  { n: "02", titulo: "Diagnóstico", texto: "Te muestro el mapa de tus ventas y tu operación: dónde se pierde plata y tiempo, y por dónde conviene empezar.", nota: "Gratis" },
  { n: "03", titulo: "Un área por vez", texto: "Arrancamos por la que más pierde, con un objetivo medible por mes. Primero lo armo yo, después lo hacemos juntos y al final lo maneja tu equipo.", nota: "Encuentros fijos" },
  { n: "04", titulo: "Medición", texto: "Cada mes te paso un informe con tus números contra cómo estaban al empezar. Todo queda a tu nombre: cuentas, datos y sistemas.", nota: "Todos los meses" },
];

const SI = [
  "Tenés un negocio online que ya vende todos los días",
  "Ponés plata en pauta y entran más consultas de las que tu equipo contesta",
  "Decidís vos, o tus socios están en la llamada",
  "Querés que tu equipo aprenda a usarlo, no depender de alguien para siempre",
];

const NO = [
  "Sos una agencia o un desarrollador buscando cómo hacerlo",
  "Recién empezás y todavía no hay ventas que recuperar",
  "Buscás un bot de respuestas automáticas para salir del paso",
  "Tu rubro es apuestas, préstamos o cobranza (WhatsApp no los permite)",
];

const FAQS = [
  { q: "¿Cuánto cuesta?", a: "Depende de qué trabajemos primero y con qué ritmo. Lo vemos en la llamada con tus números, y el diagnóstico es gratis: sabés qué conviene hacer antes de pagar nada." },
  { q: "¿Cuánto tiempo me lleva a mí?", a: "Un encuentro fijo por semana (o dos, si querés ir más rápido) y alguien de tu equipo que le dedique unas horas. El trabajo pesado lo hago yo, sobre todo al principio." },
  { q: "Ya lo intentamos solos y no funcionó.", a: "Es lo más común. Casi siempre falla por empezar por la herramienta y no por el problema. Primero medimos dónde se pierde la plata y recién después construimos, un área por vez." },
  { q: "¿Y si la IA le responde mal a un cliente?", a: "Lo pruebo con consultas reales antes de salir, responde solo con la información de tu negocio y le pasa la conversación a una persona cuando no sabe o cuando el cliente lo pide." },
  { q: "¿Voy a depender de vos para siempre?", a: "No. Todo queda a tu nombre: tus cuentas, tus datos, tus sistemas. Y el programa termina con tu equipo manejándolo solo. Esa es la idea." },
  { q: "¿Y si no funciona?", a: "Si al final del primer mes el objetivo que acordamos no está funcionando, te podés ir y te devuelvo los meses que no usaste." },
  { q: "¿Me pueden bloquear el WhatsApp?", a: "Trabajo con la API oficial de WhatsApp y respetando sus reglas, que es lo que evita los bloqueos. Si ya te pasó, lo vemos en la llamada." },
  { q: "¿Tengo que cambiar los sistemas que uso?", a: "No. Trabajo arriba de lo que ya tenés: tu tienda, tu WhatsApp, tus planillas, tu sistema de gestión." },
];

const usd = (n: number) => "US$ " + Math.round(n).toLocaleString("es-AR");

/** Todo el negocio funcionando sin que el dueño esté encima: el resumen que recibe a la mañana.
 *  Números de EJEMPLO, rotulados así. Sin montos de plata: la crítica del 04/11 marcó que
 *  "vendido ayer US$ 1.840" contradecía a la calculadora (US$ 575 recuperable por MES).
 *  Animación (04/11): arranca recién cuando el panel ENTRA en pantalla (en el celu queda abajo del
 *  pliegue y antes se animaba sin que nadie la viera). Sin JS o con "reducir movimiento" se ve
 *  terminado. */
function ResumenDia() {
  const filas: [string, string, string][] = [
    ["Ventas", "38 consultas respondidas", "a cualquier hora"],
    ["Ventas", "9 ventas cerradas", "sin que nadie toque el chat"],
    ["Ventas", "12 clientes retomados", "de los que no habían comprado"],
    ["Operación", "23 pedidos actualizados", "y avisados al cliente"],
    ["Operación", "14 pagos conciliados", "contra las ventas del día"],
  ];
  const HORAS = 6;
  const ref = useRef<HTMLDivElement>(null);
  const [estado, setEstado] = useState<"listo" | "espera" | "anima">("listo");
  const [horas, setHoras] = useState(HORAS);

  // Antes de pintar: si hay movimiento permitido, se esconde para animarlo al verse.
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEstado("espera");
    setHoras(0);
  }, []);

  useEffect(() => {
    if (estado !== "espera" || !ref.current) return;
    const io = new IntersectionObserver(
      (e) => {
        if (!e[0].isIntersecting) return;
        io.disconnect();
        setEstado("anima");
      },
      { threshold: 0.35 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [estado]);

  useEffect(() => {
    if (estado !== "anima") return;
    const inicio = performance.now() + 1500; // arranca cuando ya entraron las filas
    const dura = 1100;
    let raf = 0;
    const paso = (t: number) => {
      const p = Math.min(Math.max((t - inicio) / dura, 0), 1);
      setHoras(Math.round(HORAS * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [estado]);

  return (
    <div ref={ref} className={`resumen ${estado}`} aria-label="Ejemplo del resumen diario que recibe el dueño">
      <div className="resumen-cab">
        <span className="punto" />
        <div>
          <strong>Resumen de ayer</strong>
          <span>Te llega a las 8:00 · ejemplo</span>
        </div>
      </div>
      <ul className="resumen-lista">
        {filas.map(([area, que, detalle]) => (
          <li key={que}>
            <span className="resumen-area">{area}</span>
            <span className="resumen-que">
              <strong>{que}</strong> {detalle}
            </span>
            <span className="resumen-ok" aria-hidden="true">✓</span>
          </li>
        ))}
      </ul>
      <div className="resumen-pie">
        <span>Horas que no tuviste que poner vos</span>
        <strong className="num">{horas} h</strong>
      </div>
    </div>
  );
}

export default function Home() {
  // Link a cal.com con la atribución del visitante (utm + lp_sid). El script inline del <head>
  // (lib/cta-boot.ts) ya resolvió esta URL antes de hidratar: se reusa para no cambiar el link.
  const [calUrl, setCalUrl] = useState(CAL_BASE);
  useEffect(() => {
    const w = window as unknown as { __lpCalUrl?: string };
    setCalUrl(w.__lpCalUrl || buildCalUrl({ sid: getSid() }));
  }, []);

  const [abierta, setAbierta] = useState<number | null>(null);

  // La pérdida que el visitante armó en la calculadora: el cierre se la devuelve.
  const [perdida, setPerdida] = useState<number | null>(null);

  // Botón fijo del celu: aparece recién cuando el botón del hero sale de pantalla (antes lo
  // duplicaba y tapaba el resumen desde el primer segundo).
  const ctaHero = useRef<HTMLAnchorElement>(null);
  const [fijoVisible, setFijoVisible] = useState(false);
  useEffect(() => {
    if (!ctaHero.current) return;
    const io = new IntersectionObserver((e) => setFijoVisible(!e[0].isIntersecting && e[0].boundingClientRect.top < 0));
    io.observe(ctaHero.current);
    return () => io.disconnect();
  }, []);

  const waUrl = WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${WA_TEXTO}` : null;

  return (
    <>
      <nav className="nav">
        <div className="contenedor nav-in">
          <a href="#" className="marca">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo-icon-transparent.png" alt="" width={24} height={24} />
            <span>IAbyIA</span>
          </a>
          <div className="nav-links">
            <a href="#como">Cómo trabajo</a>
            <a href="#faq">Preguntas</a>
          </div>
          <a href={calUrl} target="_blank" rel="noopener noreferrer" className="boton boton-chico" data-cta="nav">
            Diagnóstico gratis
          </a>
        </div>
      </nav>

      <main>
        {/* HERO: la promesa + todo el negocio funcionando */}
        <section className="hero">
          <div className="luz" aria-hidden="true" />
          <div className="contenedor hero-grid">
            <div className="hero-texto">
              <p className="hero-pre">Consultoría de IA para negocios online</p>
              <h1>
                {/* "funciona solo." nunca se parte (Ignacio, 04/11); la segunda frase arranca en su renglón. */}
                Tu negocio vende y <span className="junto">funciona solo.</span>{" "}
                <span className="gris bloque">Vos te ocupás de hacerlo crecer.</span>
              </h1>
              <p className="hero-sub">
                Pongo IA a atender tu WhatsApp e Instagram, a seguir a los que no compraron, a actualizar
                pedidos y a conciliar cobros. Empiezo por donde más plata perdés hoy.
              </p>
              <div className="hero-acciones">
                <a ref={ctaHero} href={calUrl} target="_blank" rel="noopener noreferrer" className="boton" data-cta="hero">
                  Quiero mi diagnóstico gratis
                </a>
                {waUrl && (
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="link-wa">
                    o escribime por WhatsApp
                  </a>
                )}
              </div>
              <p className="hero-nota">Hablás conmigo, Ignacio. La llamada y el diagnóstico no tienen costo.</p>
            </div>
            <ResumenDia />
          </div>
          <div className="contenedor">
            <div className="sobre">
              <span>Trabajo sobre lo que ya usás</span>
              <ul>
                {["WhatsApp", "Instagram", "Tiendanube", "Shopify", "Mercado Libre", "Mercado Pago"].map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* PRUEBA, arriba: la mitad de la gente no llega a la mitad de la página.
            ⏳ [VERIFICAR] los números del caso los tiene que pasar Ignacio. */}
        <section className="seccion transform-section">
          <div className="contenedor caso-grid">
            <div>
              <h2 className="titulo">Esto ya está funcionando.</h2>
              <p className="bajada">
                Hay negocios donde los agentes que armé atienden a sus clientes todos los días: responden,
                cotizan y le pasan el caso a una persona cuando hace falta.
              </p>
              <div className="datos">
                <div className="dato"><strong>24/7</strong><span>atendiendo, también de noche y los fines de semana</span></div>
                <div className="dato"><strong>~1 min</strong><span>lo que tarda en responderle a un cliente</span></div>
                <div className="dato"><strong>100 %</strong><span>tuyo: cuentas, datos y sistemas a tu nombre</span></div>
              </div>
            </div>
            <figure className="caso">
              <p className="caso-rubro">Caso · Lubricentro · Argentina</p>
              <blockquote>
                Le entran entre 70 y 80 WhatsApps por día. Desde octubre, el agente responde las consultas,
                cotiza con el stock del sistema y le pasa a una persona lo que necesita criterio.
              </blockquote>
              <div className="caso-numeros">
                <div><span>Antes</span><strong className="verificar">[VERIFICAR: tiempo de respuesta]</strong></div>
                <div><span>Ahora</span><strong className="verificar">[VERIFICAR: tiempo de respuesta]</strong></div>
              </div>
            </figure>
          </div>
        </section>

        {/* EL PROBLEMA */}
        <section className="seccion" id="dolor">
          <div className="contenedor">
            <h2 className="titulo">Más pauta ya no es más ventas.</h2>
            <p className="bajada">
              Entran más consultas, el equipo es el mismo, y las que no se contestan a tiempo se van con
              otro. Te lo resumo con frases que me dijeron dueños en llamadas este año:
            </p>
            <div className="citas">
              {DOLORES.map((d) => (
                <figure key={d.cita} className="cita">
                  <blockquote>“{d.cita}”</blockquote>
                  <figcaption>{d.quien}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ÁREAS: ventas y operación + el resultado para el dueño */}
        <section className="seccion stats-section">
          <div className="contenedor">
            <h2 className="titulo">Dónde pongo IA en tu negocio.</h2>
            <div className="areas">
              <div className="area">
                <div className="vineta vineta-ventas" aria-hidden="true">
                  <div className="mini-msj">¿Hacen envíos a Rosario?</div>
                  <div className="mini-msj agente">Sí, llega en 48 h. ¿Te paso el link?</div>
                </div>
                <p className="area-num">01 · Vender</p>
                <h3>Ventas</h3>
                <p>Respuesta en un minuto en WhatsApp, Instagram y la web, seguimiento de lo que no se cerró, reparto de consultas y recompra.</p>
              </div>
              <div className="area">
                <div className="vineta vineta-op" aria-hidden="true">
                  <div><span>#1043</span><b className="ok">Pagado</b></div>
                  <div><span>#1044</span><b>En camino</b></div>
                  <div><span>#1045</span><b className="ok">Pagado</b></div>
                </div>
                <p className="area-num">02 · Entregar y cobrar</p>
                <h3>Operación</h3>
                <p>Estado de pedidos y envíos, stock en un solo lugar, pagos conciliados solos y las tareas repetitivas del equipo.</p>
              </div>
              <div className="area">
                <div className="vineta vineta-vos" aria-hidden="true">
                  <div><span>Ventas de la semana</span><b className="ok">+18 %</b></div>
                  <div><span>Horas en el chat</span><b>−22 h</b></div>
                  <div><span>Consultas sin responder</span><b className="ok">0</b></div>
                  <em>ejemplo</em>
                </div>
                <p className="area-num">03 · El resultado</p>
                <h3>Vos</h3>
                <p>Menos horas apagando incendios, un reporte cada mañana y decisiones con números, no a ojo. Más tiempo para hacer crecer el negocio.</p>
              </div>
            </div>
          </div>
        </section>

        <CalculadoraVentas calUrl={calUrl} onCambio={setPerdida} />

        {/* CÓMO TRABAJO */}
        <section className="seccion" id="como">
          <div className="contenedor">
            <h2 className="titulo">Un área por vez, con un objetivo por mes.</h2>
            <ol className="pasos">
              {PASOS.map((p) => (
                <li key={p.n} className="paso">
                  <span className="paso-n">{p.n}</span>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                  <span className="paso-nota">{p.nota}</span>
                </li>
              ))}
            </ol>
            <div className="garantia">
              <p>
                <strong>Si el primer mes no funciona, te podés ir.</strong> Si el objetivo que acordamos
                no se cumple, te devuelvo los meses que no usaste.
              </p>
              <a href={calUrl} target="_blank" rel="noopener noreferrer" className="boton" data-cta="como">
                Quiero mi diagnóstico gratis
              </a>
            </div>
          </div>
        </section>

        {/* PARA QUIÉN */}
        <section className="seccion" id="diagnostico">
          <div className="contenedor">
            <h2 className="titulo">Para quién es, y para quién no.</h2>
            <div className="quien">
              <div>
                <h3>Es para vos si</h3>
                <ul className="lista si">{SI.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
              <div>
                <h3>No es para vos si</h3>
                <ul className="lista no">{NO.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* PREGUNTAS */}
        <section className="seccion" id="faq">
          <div className="contenedor faq-grid">
            <h2 className="titulo">Lo que todos preguntan antes de arrancar.</h2>
            <div className="faqs">
              {FAQS.map((f, i) => (
                <div key={f.q} className={`faq-item${abierta === i ? " open" : ""}`}>
                  <button
                    type="button"
                    className="faq-btn"
                    aria-expanded={abierta === i}
                    aria-controls={`faq-${i}`}
                    onClick={() => setAbierta(abierta === i ? null : i)}
                  >
                    {f.q}
                    <span aria-hidden="true">{abierta === i ? "−" : "+"}</span>
                  </button>
                  <div className="faq-body" id={`faq-${i}`} hidden={abierta !== i}>
                    <p>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CIERRE: le devuelve al visitante el número que armó en la calculadora */}
        <section className="cierre">
          <div className="luz luz-abajo" aria-hidden="true" />
          <div className="contenedor centro">
            <h2 className="titulo grande">
              {perdida
                ? <>Con tus números, se te van <span className="perdida">{usd(perdida)}</span> por mes. <span className="gris">Veamos cómo recuperarlos.</span></>
                : <>Veamos dónde está perdiendo plata tu negocio.</>}
            </h2>
            <p className="bajada">Una llamada conmigo y un diagnóstico, sin costo. Si no tiene sentido trabajar juntos, te lo digo.</p>
            <div className="cierre-acciones">
              <a href={calUrl} target="_blank" rel="noopener noreferrer" className="boton" data-cta="quiz">
                Quiero mi diagnóstico gratis
              </a>
              {waUrl && (
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="link-wa">
                  o escribime por WhatsApp
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="contenedor pie">
          <span className="marca">IAbyIA</span>
          <nav className="pie-links">
            <a href="/privacidad.html">Privacidad</a>
            <a href="/terminos.html">Términos</a>
          </nav>
          <span>© 2026 · Buenos Aires, Argentina</span>
        </div>
      </footer>

      {/* Botón fijo abajo, solo en celular, recién cuando el del hero ya pasó. data-cta="nav":
          es el mismo acceso persistente. */}
      <a
        href={calUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`boton fijo${fijoVisible ? " visible" : ""}`}
        data-cta="nav"
        aria-hidden={!fijoVisible}
        tabIndex={fijoVisible ? 0 : -1}
      >
        Quiero mi diagnóstico gratis
      </a>
    </>
  );
}
