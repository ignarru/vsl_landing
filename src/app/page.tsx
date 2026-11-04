"use client";

import { useEffect, useState } from "react";
import CalculadoraVentas from "@/components/calculadora-ventas";
import { CAL_BASE, buildCalUrl } from "@/lib/cal-link";
import { getSid } from "@/lib/track";

/* ═══ LANDING v4.1 — oferta integral (nov 2026) ══════════════════════════════════════════
   Oferta: obsidian/01 - Negocio/Oferta integral — IA en marketing, ventas y operación (2026-11).md
   Investigación: obsidian/08 - Conocimiento/Landings — qué retiene y convierte (investigación nov 2026).md

   v4.1: la v4 "se veía tan simple que era fea / IA genérica". Lo que se tomó de los referentes
   (Linear, Resend): mostrar el PRODUCTO en vez de describirlo (el chat del agente), luz y
   atmósfera en vez de fondo plano, títulos con carácter (Instrument Serif, la de las propuestas),
   texto en dos tonos, líneas y aire en vez de cajas, y sin rótulo chico arriba de cada título.

   Tracking (NO romper): selectores que mide lib/track.ts y solo los data-cta que acepta el
   dashboard (nav, hero, calculadora, como, quiz).
     .hero · #dolor · .stats-section (3 áreas) · #calculadora · #como · .transform-section
     #diagnostico (para quién) · #faq · footer
   Sin animaciones de entrada: el contenido se ve al cargar (LCP). */

const DOLORES = [
  { cita: "La cuestión no es meter más plata en publicidad, porque ya lo hicimos. No damos abasto.", quien: "E-commerce · Uruguay" },
  { cita: "Por más que le ponga más plata a Meta, del otro lado no puede llevar a cabo.", quien: "E-commerce · Argentina" },
  { cita: "Le hablan a las nueve y le contestan a las tres.", quien: "Mayorista con venta online" },
];

const PASOS = [
  { n: "01", titulo: "Llamada", texto: "Me contás cómo vende tu negocio hoy y vemos si tiene sentido trabajar juntos. Si no lo tiene, te lo digo ahí.", nota: "Gratis" },
  { n: "02", titulo: "Diagnóstico", texto: "El mapa de tu marketing, tus ventas y tu operación: dónde se pierde plata en cada una y por cuál conviene empezar.", nota: "Gratis" },
  { n: "03", titulo: "Un área por vez", texto: "Arrancamos por la que más pierde, con un objetivo medible por mes. Primero lo hago yo, después lo hacemos juntos y al final lo hace tu equipo.", nota: "Encuentros fijos" },
  { n: "04", titulo: "Medición", texto: "Cada mes, un informe con tus números contra cómo estaban al empezar. Todo queda a tu nombre: cuentas, datos y sistemas.", nota: "Todos los meses" },
];

const SI = [
  "Tenés un negocio online que factura más de USD 30.000 por mes",
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
  { q: "¿Cuánto cuesta?", a: "Depende de cuántas áreas trabajemos y con qué ritmo. Lo vemos en la llamada con tus números, y el diagnóstico es gratis: sabés qué conviene hacer antes de pagar nada." },
  { q: "¿Cuánto tiempo me lleva a mí?", a: "Un encuentro fijo por semana (o dos, si querés ir más rápido) y alguien de tu equipo que le dedique unas horas. El trabajo pesado lo hago yo, sobre todo al principio." },
  { q: "Ya lo intentamos solos y no funcionó.", a: "Es lo más común. Casi siempre falla por empezar por la herramienta y no por el problema. Acá primero se mide dónde se pierde la plata y recién después se construye, un área por vez." },
  { q: "¿Y si la IA le responde mal a un cliente?", a: "Se prueba con consultas reales antes de salir, responde solo con la información de tu negocio y pasa la conversación a una persona cuando no sabe o cuando el cliente lo pide." },
  { q: "¿Voy a depender de vos para siempre?", a: "No. Todo queda a tu nombre: tus cuentas, tus datos, tus sistemas. Y el programa termina con tu equipo manejándolo solo. Esa es la idea." },
  { q: "¿Y si no funciona?", a: "Si al final del primer mes el objetivo que acordamos no está funcionando, te podés ir y te devuelvo lo que no usaste. La única condición es que hayamos hecho los encuentros." },
  { q: "¿Me pueden bloquear el WhatsApp?", a: "Se trabaja con la API oficial de WhatsApp y respetando sus reglas, que es lo que evita los bloqueos. Si ya te pasó, lo vemos en la llamada." },
  { q: "¿Tengo que cambiar los sistemas que uso?", a: "No. Se trabaja arriba de lo que ya tenés: tu tienda, tu WhatsApp, tus planillas, tu sistema de gestión." },
];

/** El producto, mostrado: un agente atendiendo a un cliente fuera de horario.
 *  Conversación de ejemplo (rubro indumentaria), sin datos de ningún cliente real. */
function ChatAgente() {
  return (
    <div className="chat" aria-label="Ejemplo: un agente de IA atiende una consulta por WhatsApp a las 23:47">
      <div className="chat-cab">
        <span className="chat-avatar">T</span>
        <div>
          <strong>Tu tienda</strong>
          <span>en línea · responde el agente de IA</span>
        </div>
      </div>
      <div className="chat-cuerpo">
        <p className="chat-dia">Hoy</p>
        <div className="msj cliente">Hola! tienen la campera negra en talle M? <i>23:47</i></div>
        <div className="msj agente">¡Hola! Sí, quedan 3 en talle M. Sale US$ 64 y con transferencia tenés 10 % off. ¿Te la reservo? <i>23:47</i></div>
        <div className="msj cliente">dale, y llega a Córdoba? <i>23:48</i></div>
        <div className="msj agente">Sí, llega en 48 a 72 h hábiles. Te paso el link de pago con la reserva hecha 👇 <i>23:48</i></div>
        <div className="msj agente link">tutienda.com/pago/M-negra <i>23:48</i></div>
        <div className="msj cliente">listo, pagado 🙌 <i>23:51</i></div>
      </div>
      <div className="chat-pie">
        <span className="punto" /> Venta cerrada mientras el equipo dormía
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
            <a href="#como">Cómo trabajamos</a>
            <a href="#faq">Preguntas</a>
          </div>
          <a href={calUrl} target="_blank" rel="noopener noreferrer" className="boton boton-chico" data-cta="nav">
            Agendar llamada
          </a>
        </div>
      </nav>

      <main>
        {/* HERO: la promesa + el producto funcionando */}
        <section className="hero">
          <div className="luz" aria-hidden="true" />
          <div className="contenedor hero-grid">
            <div className="hero-texto">
              <p className="hero-pre">Consultoría de IA para negocios online</p>
              <h1>
                Vendé más con la misma pauta <span className="gris">y el mismo equipo.</span>
              </h1>
              <p className="hero-sub">
                Metemos IA en tu marketing, tus ventas y tu operación. Empezamos por donde más plata
                perdés hoy, y sumamos un área por vez.
              </p>
              <div className="hero-acciones">
                <a href={calUrl} target="_blank" rel="noopener noreferrer" className="boton" data-cta="hero">
                  Agendar una llamada
                </a>
                <span className="hero-nota">Llamada y diagnóstico gratis</span>
              </div>
            </div>
            <ChatAgente />
          </div>
          <div className="contenedor">
            <div className="sobre">
              <span>Funciona sobre lo que ya usás</span>
              <ul>
                {["WhatsApp", "Instagram", "Tiendanube", "Shopify", "Mercado Libre", "Meta Ads"].map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* EL PROBLEMA: párrafo-titular en dos tonos + citas reales */}
        <section className="seccion" id="dolor">
          <div className="contenedor">
            <p className="declaracion">
              Más pauta ya no es más ventas.{" "}
              <span className="gris">
                Entran más consultas, el equipo es el mismo, y las que no se contestan a tiempo se van
                con otro. Lo dicen los dueños con los que hablé este año.
              </span>
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

        {/* LAS 3 ÁREAS: cada una con una viñeta del producto */}
        <section className="seccion stats-section">
          <div className="contenedor">
            <h2 className="titulo">
              IA en las tres partes del negocio <span className="gris">que mueven la plata.</span>
            </h2>
            <div className="areas">
              <div className="area">
                <div className="vineta vineta-mkt" aria-hidden="true">
                  <span /><span /><span />
                  <em>3 creatividades nuevas · hoy</em>
                </div>
                <p className="area-num">01 · Atraer</p>
                <h3>Marketing</h3>
                <p>Creatividades y fotos de producto con IA, guiones para anuncios y reels, publicación automática, y saber qué anuncio trae ventas.</p>
              </div>
              <div className="area">
                <div className="vineta vineta-ventas" aria-hidden="true">
                  <div className="mini-msj">¿Hacen envíos a Rosario?</div>
                  <div className="mini-msj agente">Sí, llega en 48 h. ¿Te paso el link?</div>
                </div>
                <p className="area-num">02 · Convertir</p>
                <h3>Ventas</h3>
                <p>Respuesta en un minuto en WhatsApp, Instagram y la web, seguimiento de lo que no se cerró, reparto de leads y recompra.</p>
              </div>
              <div className="area">
                <div className="vineta vineta-op" aria-hidden="true">
                  <div><span>#1043</span><b className="ok">Pagado</b></div>
                  <div><span>#1044</span><b>En camino</b></div>
                  <div><span>#1045</span><b className="ok">Pagado</b></div>
                </div>
                <p className="area-num">03 · Entregar y cobrar</p>
                <h3>Operación</h3>
                <p>Estado de pedidos y envíos, stock en un solo lugar, pagos conciliados solos y un reporte diario de ventas y pauta.</p>
              </div>
            </div>
          </div>
        </section>

        <CalculadoraVentas calUrl={calUrl} />

        {/* CÓMO TRABAJAMOS: línea de tiempo, no cajas */}
        <section className="seccion" id="como">
          <div className="contenedor">
            <h2 className="titulo">
              Un área por vez, <span className="gris">con un objetivo por mes.</span>
            </h2>
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
                no se cumple, te devuelvo lo que no usaste.
              </p>
              <a href={calUrl} target="_blank" rel="noopener noreferrer" className="boton" data-cta="como">
                Agendar una llamada
              </a>
            </div>
          </div>
        </section>

        {/* LO QUE YA FUNCIONA */}
        <section className="seccion transform-section">
          <div className="contenedor">
            <p className="declaracion">
              No te vendo algo que no uso.{" "}
              <span className="gris">
                Los agentes de mis clientes atienden todos los días, y el contenido de IAbyIA, los videos
                que te trajeron hasta acá, se produce y se publica con los mismos sistemas.
              </span>
            </p>
            <div className="datos">
              <div className="dato"><strong>24/7</strong><span>agentes atendiendo a los clientes de mis clientes, también de noche y los fines de semana</span></div>
              <div className="dato"><strong>~1 min</strong><span>lo que tarda un agente en responderle a un cliente, a cualquier hora</span></div>
              <div className="dato"><strong>3 áreas</strong><span>donde ya lo aplico en IAbyIA: el contenido, la atención y la operación</span></div>
            </div>
          </div>
        </section>

        {/* PARA QUIÉN */}
        <section className="seccion" id="diagnostico">
          <div className="contenedor">
            <h2 className="titulo">
              Para quién es, <span className="gris">y para quién no.</span>
            </h2>
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
            <h2 className="titulo">Lo que todos preguntan <span className="gris">antes de arrancar.</span></h2>
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

        {/* CIERRE */}
        <section className="cierre">
          <div className="luz luz-abajo" aria-hidden="true" />
          <div className="contenedor centro">
            <h2 className="titulo grande">Veamos dónde está perdiendo plata tu negocio.</h2>
            <p className="bajada">Una llamada y un diagnóstico, gratis. Si no tiene sentido trabajar juntos, te lo digo.</p>
            <a href={calUrl} target="_blank" rel="noopener noreferrer" className="boton" data-cta="quiz">
              Agendar una llamada
            </a>
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

      {/* Botón fijo abajo, solo en celular. Usa data-cta="nav": es el mismo acceso persistente. */}
      <a href={calUrl} target="_blank" rel="noopener noreferrer" className="boton fijo" data-cta="nav">
        Agendar una llamada
      </a>
    </>
  );
}
