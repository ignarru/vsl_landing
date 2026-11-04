"use client";

import { useEffect, useState } from "react";
import CalculadoraVentas from "@/components/calculadora-ventas";
import { CAL_BASE, buildCalUrl } from "@/lib/cal-link";
import { getSid } from "@/lib/track";

/* ═══ LANDING v4 — oferta integral (nov 2026) ════════════════════════════════════════════
   Oferta: obsidian/01 - Negocio/Oferta integral — IA en marketing, ventas y operación (2026-11).md
   Investigación: obsidian/08 - Conocimiento/Landings — qué retiene y convierte (investigación nov 2026).md

   Tracking (NO romper): las secciones conservan los selectores que mide lib/track.ts y los
   botones usan solo los data-cta que acepta el dashboard (nav, hero, calculadora, como, quiz).
     .hero → hero · #dolor → dolor · .stats-section → las 3 áreas · #calculadora
     #como → el método · .transform-section → lo que ya funciona · #diagnostico → para quién
     #faq → preguntas · footer
   Sin animaciones de entrada: en v2 la del hero demoraba 5,4 s el contenido principal en celu. */

const DOLORES = [
  {
    cita: "La cuestión no es meter más plata en publicidad, porque ya lo hicimos. No damos abasto.",
    quien: "E-commerce · Uruguay",
  },
  {
    cita: "Por más que le ponga más plata a Meta, del otro lado no puede llevar a cabo.",
    quien: "E-commerce · Argentina",
  },
  {
    cita: "Le hablan a las nueve y le contestan a las tres.",
    quien: "Mayorista con venta online · Buenos Aires",
  },
];

const AREAS = [
  {
    nombre: "Marketing",
    para: "Atraer",
    items: [
      "Creatividades y fotos de producto con IA",
      "Guiones para anuncios y reels",
      "Publicación automática",
      "Saber qué anuncio trae ventas",
    ],
  },
  {
    nombre: "Ventas",
    para: "Convertir",
    items: [
      "Respuesta en ~1 minuto en WhatsApp, Instagram y la web",
      "Seguimiento de consultas y carritos sin cerrar",
      "Reparto de leads entre vendedores",
      "Recompra y reactivación de clientes",
    ],
  },
  {
    nombre: "Operación",
    para: "Entregar y cobrar",
    items: [
      "Estado de pedidos y envíos",
      "Stock en un solo lugar",
      "Pagos conciliados solos",
      "Un reporte diario de ventas y pauta",
    ],
  },
];

const PASOS = [
  {
    n: "1",
    titulo: "Llamada",
    texto: "Me contás cómo vende tu negocio hoy y vemos si tiene sentido trabajar juntos. Si no lo tiene, te lo digo ahí.",
    nota: "Gratis",
  },
  {
    n: "2",
    titulo: "Diagnóstico",
    texto: "Te muestro el mapa de tu marketing, tus ventas y tu operación: dónde se pierde plata en cada una y por cuál conviene empezar.",
    nota: "Gratis",
  },
  {
    n: "3",
    titulo: "Un área por vez",
    texto: "Arrancamos por la que más pierde, con un objetivo medible por mes. Primero lo hago yo, después lo hacemos juntos y al final lo hace tu equipo.",
    nota: "Encuentros fijos por semana",
  },
  {
    n: "4",
    titulo: "Medición",
    texto: "Cada mes, un informe con tus números contra cómo estaban al empezar. Lo construido queda a tu nombre: tus cuentas, tus datos.",
    nota: "Todos los meses",
  },
];

const FUNCIONA = [
  { dato: "24/7", texto: "agentes de IA atendiendo a los clientes de mis clientes, también de noche y los fines de semana" },
  { dato: "~1 min", texto: "lo que tarda un agente en responderle a un cliente, a cualquier hora" },
  { dato: "3 áreas", texto: "donde ya lo aplico en IAbyIA: el contenido, la atención y la operación" },
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
  {
    q: "¿Cuánto cuesta?",
    a: "Depende de cuántas áreas trabajemos y con qué ritmo. Lo vemos en la llamada con tus números, y el diagnóstico es gratis: sabés qué conviene hacer antes de pagar nada.",
  },
  {
    q: "¿Cuánto tiempo me lleva a mí?",
    a: "Un encuentro fijo por semana (o dos, si querés ir más rápido) y alguien de tu equipo que le dedique unas horas. El trabajo pesado lo hago yo, sobre todo al principio.",
  },
  {
    q: "Ya lo intentamos solos y no funcionó.",
    a: "Es lo más común. Casi siempre falla por empezar por la herramienta y no por el problema. Acá primero se mide dónde se pierde la plata y recién después se construye, un área por vez.",
  },
  {
    q: "¿Y si la IA le responde mal a un cliente?",
    a: "Se prueba con consultas reales antes de salir, responde solo con la información de tu negocio y pasa la conversación a una persona cuando no sabe o cuando el cliente lo pide.",
  },
  {
    q: "¿Voy a depender de vos para siempre?",
    a: "No. Todo queda a tu nombre: tus cuentas, tus datos, tus sistemas. Y el programa termina con tu equipo manejándolo solo. Esa es la idea.",
  },
  {
    q: "¿Y si no funciona?",
    a: "Si al final del primer mes el objetivo que acordamos no está funcionando, te podés ir y te devuelvo lo que no usaste. La única condición es que hayamos hecho los encuentros.",
  },
  {
    q: "¿Me pueden bloquear el WhatsApp?",
    a: "Se trabaja con la API oficial de WhatsApp y respetando sus reglas, que es lo que evita los bloqueos. Si ya te pasó, lo vemos en la llamada.",
  },
  {
    q: "¿Tengo que cambiar los sistemas que uso?",
    a: "No. Se trabaja arriba de lo que ya tenés: tu tienda, tu WhatsApp, tus planillas, tu sistema de gestión.",
  },
];

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
        {/* HERO */}
        <section className="hero">
          <div className="contenedor hero-grid">
            <div>
              <p className="etiqueta">Consultoría de IA para negocios online</p>
              <h1>Vendé más con la misma pauta y el mismo equipo.</h1>
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
              <p className="hero-filtro">Para negocios online que facturan más de USD 30.000 por mes.</p>
            </div>

            <div className="hero-panel" aria-label="Dónde se pierde la plata en un negocio online">
              <p className="panel-titulo">Dónde se pierde la plata</p>
              {[
                ["Marketing", "El contenido sale cuando alguien tiene tiempo"],
                ["Ventas", "Las consultas esperan horas y no se retoman"],
                ["Operación", "Pedidos, stock y pagos cruzados a mano"],
              ].map(([area, texto]) => (
                <div key={area} className="panel-fila">
                  <span className="panel-area">{area}</span>
                  <span>{texto}</span>
                </div>
              ))}
              <p className="panel-pie">Empezamos por la que más pierde.</p>
            </div>
          </div>
        </section>

        {/* EL PROBLEMA */}
        <section className="seccion" id="dolor">
          <div className="contenedor">
            <p className="etiqueta">El problema</p>
            <h2 className="titulo">Más pauta ya no es más ventas.</h2>
            <p className="bajada">
              Ponés más plata en anuncios, entran más consultas y el equipo es el mismo. Las que no se
              contestan a tiempo se van con otro. Lo dicen los dueños con los que hablé este año:
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

        {/* LAS 3 ÁREAS */}
        <section className="seccion stats-section">
          <div className="contenedor">
            <p className="etiqueta">Qué hacemos</p>
            <h2 className="titulo">IA en las tres partes de tu negocio que mueven la plata.</h2>
            <div className="areas">
              {AREAS.map((a) => (
                <div key={a.nombre} className="area">
                  <p className="area-para">{a.para}</p>
                  <h3>{a.nombre}</h3>
                  <ul>
                    {a.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CalculadoraVentas calUrl={calUrl} />

        {/* CÓMO TRABAJAMOS */}
        <section className="seccion" id="como">
          <div className="contenedor">
            <p className="etiqueta">Cómo trabajamos</p>
            <h2 className="titulo">Un área por vez, con un objetivo por mes.</h2>
            <ol className="pasos">
              {PASOS.map((p) => (
                <li key={p.n} className="paso">
                  <span className="paso-n">{p.n}</span>
                  <div>
                    <h3>{p.titulo}</h3>
                    <p>{p.texto}</p>
                    <span className="paso-nota">{p.nota}</span>
                  </div>
                </li>
              ))}
            </ol>
            <div className="garantia">
              <strong>Si el primer mes no funciona, te podés ir.</strong> Si el objetivo que acordamos
              no se cumple, te devuelvo lo que no usaste.
            </div>
            <div className="centro">
              <a href={calUrl} target="_blank" rel="noopener noreferrer" className="boton" data-cta="como">
                Agendar una llamada
              </a>
            </div>
          </div>
        </section>

        {/* LO QUE YA FUNCIONA */}
        <section className="seccion transform-section">
          <div className="contenedor">
            <p className="etiqueta">Lo que ya funciona</p>
            <h2 className="titulo">No te vendo algo que no uso.</h2>
            <p className="bajada">
              Los agentes de IA de mis clientes atienden todos los días, y el contenido de IAbyIA, los
              videos que te trajeron hasta acá, se produce y se publica con los mismos sistemas.
            </p>
            <div className="datos">
              {FUNCIONA.map((f) => (
                <div key={f.texto} className="dato">
                  <strong>{f.dato}</strong>
                  <span>{f.texto}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PARA QUIÉN */}
        <section className="seccion" id="diagnostico">
          <div className="contenedor">
            <p className="etiqueta">Para quién es</p>
            <h2 className="titulo">Para quién es, y para quién no.</h2>
            <div className="quien">
              <div className="quien-col si">
                <h3>Es para vos si</h3>
                <ul>{SI.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
              <div className="quien-col no">
                <h3>No es para vos si</h3>
                <ul>{NO.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* PREGUNTAS */}
        <section className="seccion" id="faq">
          <div className="contenedor angosto">
            <p className="etiqueta">Preguntas</p>
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

        {/* CIERRE */}
        <section className="cierre">
          <div className="contenedor angosto centro">
            <h2 className="titulo">Veamos dónde está perdiendo plata tu negocio.</h2>
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
