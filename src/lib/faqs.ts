/**
 * Preguntas frecuentes. Viven acá y no en page.tsx porque las usan dos lugares:
 * la sección FAQ (page.tsx) y el JSON-LD `FAQPage` del layout (rich results de Google).
 *
 * ⚠️ El tracking guarda el ÍNDICE de la pregunta abierta (`faq_open` → `{i, id}`) y el
 * dashboard etiqueta por índice para las visitas viejas. Las nuevas se agregan AL FINAL:
 * insertar en el medio corre las etiquetas de todo el histórico.
 */
export type Faq = { id: string; q: string; a: string };

export const FAQS: Faq[] = [
  {
    id: "cotiza",
    q: "¿Cómo se cotiza el trabajo?",
    a: "Por etapas, y cada una con precio cerrado antes de arrancar. La auditoría tiene un valor fijo, porque el alcance es siempre el mismo. La implementación se cotiza recién cuando terminamos de revisar cómo trabajás: antes de ver tu negocio por dentro, cualquier número que te dé sería inventado. Los valores concretos los vemos en la llamada, sin vueltas.",
  },
  {
    id: "nada",
    q: "¿Y si en mi negocio no hay nada para automatizar?",
    a: "Puede pasar, y si es así te lo digo. Por eso la auditoría tiene devolución total: si al terminarla considerás que no te sirvió, te devuelvo lo que pagaste, sin preguntas. Lo que sí te puedo asegurar es que vas a salir sabiendo cuánto te cuesta cada proceso, que es información que hoy casi ninguna PyME tiene.",
  },
  {
    id: "sistemas",
    q: "¿Tengo que cambiar los sistemas que ya uso?",
    a: "No. El trabajo se hace arriba de lo que ya tenés: WhatsApp, tu sistema de gestión, tu e-commerce, planillas, lo que sea. Cambiar todo de golpe es la forma más cara y más lenta de hacer esto.",
  },
  {
    id: "equipo",
    q: "¿Mi equipo tiene que saber de tecnología?",
    a: "No. Si elegís que lo implemente yo, queda funcionando y tu equipo solo usa el resultado. Si elegís aprender a hacerlo adentro, se lo enseño a la persona que vos elijas, sobre tus propios procesos y no en abstracto.",
  },
  {
    id: "bot",
    q: "¿Esto es un bot de WhatsApp?",
    a: "No. Un bot sigue un guion fijo y se rompe apenas alguien pregunta algo que no estaba previsto — por eso dan la sensación de estar hablando con una pared. Lo que se implementa es un agente de IA entrenado con la información real de tu negocio: entiende lo que le preguntan, responde con criterio, consulta tu stock o tus precios si hace falta, y deriva a una persona cuando el caso lo amerita. Dicho eso, la atención al cliente es solo uno de los procesos que puede salir de la auditoría. Si resulta que ahí está tu cuello de botella, lo implementamos; si está en la coordinación, en la cobranza o en el seguimiento, atacamos eso primero. Primero se mide, después se decide qué construir.",
  },
  {
    id: "resultados",
    q: "¿Cuánto tardo en ver resultados?",
    a: "La auditoría son dos semanas y ahí ya tenés los números sobre la mesa. La implementación depende del alcance, pero se arma por etapas: la primera siempre es la de mayor retorno y menor complejidad, para que el sistema empiece a devolver antes de estar terminado.",
  },
  {
    id: "afuera",
    q: "¿Trabajás con empresas fuera de Argentina?",
    a: "Sí. Trabajo 100 % remoto y hoy tengo clientes en Argentina, Bolivia y Honduras. La llamada y las dos sesiones de la auditoría son por videollamada, en tu horario, y la implementación se hace sobre las herramientas que ya usás, estén donde estén.",
  },
];
