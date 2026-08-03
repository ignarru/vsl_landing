/**
 * Tracking propio de la landing → dashboard.iabyia.com.ar
 *
 * Mide lo que Google Analytics no puede: qué hace cada visita ANTES de agendar, y cuál de esas
 * visitas terminó en una reunión (y en una venta). El puente es el `sid`, que viaja a cal.com
 * como campo oculto y el webhook del dashboard guarda junto a la reunión.
 *
 * Sin dependencias, ~4 KB. Todo falla en silencio: el tracking NUNCA puede romper la página que
 * vende. Si el dashboard está caído, la landing ni se entera.
 *
 * ═══ REGLA QUE NO SE ROMPE ═══════════════════════════════════════════════════════════════
 * Ni `sid` ni `vid` tocan la ATRIBUCIÓN. Los UTMs se siguen leyendo SOLO de la URL de la visita
 * actual (igual que en cal-link.ts). El commit 7a0e1ca eliminó la persistencia de atribución en
 * localStorage porque una visita directa heredaba la fuente de una visita vieja — te marcaba
 * "linkedin" entrando por Google. `vid` responde "¿ya había venido antes?" y NUNCA "¿de dónde
 * vino?". No agregar lecturas de storage en la dirección de la atribución.
 * ═════════════════════════════════════════════════════════════════════════════════════════
 */

// Hardcodeado a propósito: con `output: "export"` las NEXT_PUBLIC_* se inlinean en build time,
// así que una env exigiría configurarla también en Cloudflare Pages. Para un dominio único, el
// riesgo de olvido supera al beneficio.
const ENDPOINT = "https://dashboard.iabyia.com.ar/api/landing/eventos";

const KEY_SID = "iabyia_lp_sid";
const KEY_VID = "iabyia_lp_vid";
const KEY_NO_TRACK = "iabyia_no_track";

/** Secciones de la página, en orden, con el selector que ya existe en el markup.
 *  Se mapea por selector para no tener que ensuciar page.tsx con ids nuevos. */
const SECCIONES: [string, string][] = [
  ["hero", ".hero"],
  ["stats", ".stats-section"],
  ["calculadora", "#calculadora"],
  ["dolor", "#dolor"],
  ["transformacion", ".transform-section"],
  ["como", "#como"],
  ["faq", "#faq"],
  ["diagnostico", "#diagnostico"],
  ["footer", "footer"],
];

type Evento = { t: string; ts: number; p?: Record<string, unknown> };

let activo = false;
let sid = "";
let vid: string | null = null;
let cola: Evento[] = [];
let timer: ReturnType<typeof setInterval> | null = null;

/** Estado acumulado de la sesión. Viaja ENTERO en cada flush (last-write-wins), así perder un
 *  batch intermedio no pierde el resultado final. */
const st = {
  scroll: 0,
  activo: 0,
  secciones: [] as string[],
  ctas: 0,
  cta1: null as string | null,
  ctaN: null as string | null,
  faq: 0,
  quiz: { completado: false, score: null as number | null, r: [] as string[] },
  calc: { usada: false, msg: null as number | null, ticket: null as number | null, pct: null as number | null, perdida: null as number | null },
};

const ctx: Record<string, unknown> = {};

/* ─── utilidades ────────────────────────────────────────────────────────────────────────── */

function uuid(): string {
  try {
    if (crypto?.randomUUID) return crypto.randomUUID();
  } catch { /* noop */ }
  // Fallback para navegadores viejos / contextos sin crypto.randomUUID
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

/** ⚠️ El storage se resuelve DENTRO del try a propósito. Con las cookies bloqueadas, en algunos
 *  navegadores (Safari/iOS estricto, Chrome con "bloquear todo") ni siquiera se puede LEER la
 *  propiedad `localStorage`: tira SecurityError. Si se pasara el objeto por parámetro, esa
 *  excepción saltaría en quien llama, fuera de este try. */
function get(kind: "local" | "session", k: string): string | null {
  try { return (kind === "local" ? localStorage : sessionStorage).getItem(k); } catch { return null; }
}
function set(kind: "local" | "session", k: string, v: string): void {
  try { (kind === "local" ? localStorage : sessionStorage).setItem(k, v); } catch { /* modo privado / storage bloqueado */ }
}

/** Mismo saneado que sanitizeUtm() de cal-link.ts, para que los valores sean comparables. */
function utm(v: string | null): string | undefined {
  if (!v) return undefined;
  const s = v.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40);
  return s.length ? s : undefined;
}

/* ─── envío ─────────────────────────────────────────────────────────────────────────────── */

function payload(): string {
  return JSON.stringify({ v: 1, sid, vid, ctx, st, ev: cola.splice(0, 50) });
}

function flush(): void {
  if (!activo || cola.length === 0) return;
  const body = payload();
  try {
    // text/plain es CORS-safelisted → request "simple", SIN preflight. Es crítico: un beacon
    // disparado en pagehide puede no sobrevivir el round-trip extra de un OPTIONS, y justo ese
    // batch es el que trae el tiempo total y el scroll máximo.
    const blob = new Blob([body], { type: "text/plain;charset=UTF-8" });
    if (navigator.sendBeacon?.(ENDPOINT, blob)) return;
  } catch { /* sigue por fetch */ }
  try {
    void fetch(ENDPOINT, {
      method: "POST",
      body,
      keepalive: true,
      mode: "cors",
      headers: { "content-type": "text/plain;charset=UTF-8" },
    }).catch(() => {});
  } catch { /* noop */ }
}

function track(t: string, p?: Record<string, unknown>): void {
  if (!activo) return;
  cola.push({ t, ts: Date.now(), p });
  if (cola.length >= 10) flush();
}

/* ─── tiempo ACTIVO (atención real, no pestaña abierta) ─────────────────────────────────── */

let ultimaInteraccion = Date.now();

function marcarInteraccion(): void {
  ultimaInteraccion = Date.now();
}

function tickActividad(): void {
  // Solo suma si la pestaña está visible Y hubo interacción en los últimos 30s. Sin esto, una
  // pestaña olvidada en segundo plano reporta 40 minutos de "interés".
  if (document.visibilityState !== "visible") return;
  if (Date.now() - ultimaInteraccion > 30_000) return;
  st.activo++;
  if (st.activo % 15 === 0) track("heartbeat", { activo: st.activo });
}

/* ─── API pública (la usan los componentes) ─────────────────────────────────────────────── */

/** ¿Este navegador pidió no ser medido? Do Not Track, Global Privacy Control, o la marca
 *  permanente que deja `?nt=1` (así las visitas propias de Ignacio no ensucian las métricas).
 *
 *  ⚠️ "El visitante pidió que no lo midan" y "este navegador no me deja guardar nada" son cosas
 *  DISTINTAS y se evalúan por separado. Antes iban en un solo try/catch que devolvía `true` ante
 *  cualquier excepción: alguien con las cookies bloqueadas (iOS estricto, modo privado) quedaba
 *  tratado como si hubiera activado DNT y se descartaba la visita entera — ni `view`, ni sid, ni
 *  puente con cal.com. Caso real: la reunión del 03/08 llegó con los UTMs pero sin `lp_sid`, y
 *  la visita no existía en la DB. No poder persistir NO es una señal de privacidad: el sid vive
 *  igual en memoria mientras dure la pestaña, que es todo lo que necesita el puente. */
function trackingDesactivado(): boolean {
  // 1. Señales explícitas del visitante. Se respetan siempre.
  try {
    if (navigator.doNotTrack === "1" ||
        (window as unknown as { doNotTrack?: string }).doNotTrack === "1" ||
        (navigator as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl === true) {
      return true;
    }
  } catch { /* no poder leerlas no es una señal — seguimos evaluando */ }

  // 2. `?nt=1` en la URL: auto-exclusión de Ignacio. Vale para esta visita aunque el intento de
  //    dejarla marcada para las próximas falle (set() ya es a prueba de storage bloqueado).
  try {
    if (new URLSearchParams(window.location.search).get("nt") === "1") {
      set("local", KEY_NO_TRACK, "1");
      return true;
    }
  } catch { /* URL rara: no es una señal de nada */ }

  // 3. La marca de una exclusión anterior. Si el storage no se puede leer devuelve null, que es
  //    "no hay marca" — NO "pidió no ser medido".
  return get("local", KEY_NO_TRACK) === "1";
}

/**
 * Id de esta visita. Lo pide `page.tsx` para pegarlo al link de cal.com.
 *
 * Crea el sid por lazy-init y NO depende de que initTracker() ya haya corrido: los efectos de la
 * página corren antes que los del layout, así que si esto solo leyera la variable del módulo
 * devolvería "" y el link se iría a cal.com sin el puente (bug real, visto en la verificación).
 *
 * Devuelve "" si el visitante pidió no ser medido — en ese caso el link queda igual que antes.
 *
 * Si el navegador no deja usar sessionStorage, el sid igual se genera y vive en memoria: dura lo
 * que dura la pestaña, que es exactamente lo que necesita el puente visita → reunión. Lo único
 * que se pierde es reusarlo si la persona recarga la página.
 */
export function getSid(): string {
  if (typeof window === "undefined") return "";
  try {
    if (trackingDesactivado()) return "";
    if (!sid) {
      sid = get("session", KEY_SID) ?? "";
      if (!sid) { sid = uuid(); set("session", KEY_SID, sid); }
    }
    return sid;
  } catch {
    // Nunca romper el render del link a cal.com por el tracking.
    return sid;
  }
}

/** Registra un clic en un CTA. Se llama sola por delegación; se exporta por si algún
 *  componente necesita dispararla a mano. Hace flush INMEDIATO: el visitante se va a cal.com y
 *  puede reservar en 40 segundos — la sesión tiene que existir en la DB antes que el booking. */
export function trackCta(id: string): void {
  if (!activo) return;
  st.ctas++;
  if (!st.cta1) st.cta1 = id;
  st.ctaN = id;
  track("cta_click", { id });
  flush();
}

export function trackCalculadora(msg: number, ticket: number, pct: number, perdida: number): void {
  if (!activo) return;
  st.calc = { usada: true, msg, ticket, pct, perdida };
  track("calc_change", { msg, ticket, pct, perdida });
}

export function trackQuizPaso(paso: number, opcion: string, valor: string, score: number): void {
  if (!activo) return;
  st.quiz.r[paso] = valor;
  track("quiz_step", { paso, opcion, valor, score });
}

export function trackQuizFin(score: number, respuestas: string[]): void {
  if (!activo) return;
  st.quiz.completado = true;
  st.quiz.score = score;
  st.quiz.r = respuestas;
  track("quiz_done", { score, r: respuestas });
  flush();
}

/* ─── init ──────────────────────────────────────────────────────────────────────────────── */

function arrancar(): void {
  // Respeta DNT / GPC / ?nt=1. getSid() aplica el mismo criterio.
  if (trackingDesactivado()) return;

  const url = new URLSearchParams(window.location.search);

  // sessionStorage: el sid muere con la pestaña. Es físicamente incapaz de arrastrar nada de una
  // visita anterior — a diferencia del localStorage que causó el bug de 7a0e1ca.
  // Puede venir ya creado por getSid() (page.tsx lo pide antes de que corra este efecto).
  sid = getSid();
  if (!sid) return;

  // vid: solo para separar visitante nuevo de recurrente. Nunca se usa para atribuir fuente.
  // Con el storage bloqueado siempre da null → esas visitas se cuentan como "nuevo visitante".
  // Es una imprecisión aceptable: mejor eso que perder la visita completa.
  vid = get("local", KEY_VID);
  const esNuevo = !vid;
  if (!vid) { vid = uuid(); set("local", KEY_VID, vid); }

  const source = utm(url.get("utm_source"));
  const medium = utm(url.get("utm_medium"));
  const content = url.get("utm_content");
  ctx.utm_source = source;
  ctx.utm_medium = medium;
  ctx.utm_content = utm(content);
  if (source === "youtube" && medium === "video" && content && /^[A-Za-z0-9_-]{11}$/.test(content)) {
    ctx.video_id = content;
  }
  try {
    ctx.ref = document.referrer ? new URL(document.referrer).hostname : undefined;
  } catch { /* referrer inválido */ }
  // Solo el HOST del referrer, nunca la URL completa: puede arrastrar datos del sitio de origen.
  ctx.lang = navigator.language;
  try { ctx.tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { /* noop */ }

  activo = true;
  track("view", { nuevo: esNuevo, vw: window.innerWidth, vh: window.innerHeight });

  /* — scroll depth (listener propio, pasivo + rAF) — */
  let pendiente = false;
  const hitos = new Set<number>();
  const onScroll = () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => {
      pendiente = false;
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const pct = total <= 0 ? 100 : Math.round((h.scrollTop / total) * 100);
      if (pct > st.scroll) st.scroll = Math.min(100, pct);
      for (const hito of [25, 50, 75, 90, 100]) {
        if (st.scroll >= hito && !hitos.has(hito)) { hitos.add(hito); track("scroll", { pct: hito }); }
      }
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* — secciones vistas (IntersectionObserver) — */
  try {
    const io = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        const id = (e.target as HTMLElement).dataset.lpSec;
        if (!id || st.secciones.includes(id)) continue;
        st.secciones.push(id);
        track("section", { id });
        io.unobserve(e.target);
      }
    }, { threshold: 0.35 });
    for (const [id, sel] of SECCIONES) {
      const el = document.querySelector(sel);
      if (el) { (el as HTMLElement).dataset.lpSec = id; io.observe(el); }
    }
  } catch { /* noop */ }

  /* — clics: un solo listener delegado para CTAs y FAQ —
     Así no hay que envolver ningún <a> ni tocar handlers existentes, y los CTAs que se agreguen
     mañana quedan trackeados solos con poner data-cta. */
  document.addEventListener("click", (e) => {
    try {
      const t = e.target as Element | null;
      const cta = t?.closest?.("[data-cta]");
      if (cta) { trackCta(cta.getAttribute("data-cta") ?? "?"); return; }
      const faq = t?.closest?.(".faq-btn");
      if (faq) {
        const item = faq.closest(".faq-item");
        const i = item?.parentElement ? [...item.parentElement.children].indexOf(item) : -1;
        st.faq++;
        track("faq_open", { i });
      }
    } catch { /* noop */ }
  }, true);

  /* — actividad y salida — */
  for (const ev of ["mousemove", "keydown", "touchstart", "scroll", "click"]) {
    window.addEventListener(ev, marcarInteraccion, { passive: true });
  }
  timer = setInterval(tickActividad, 1000);
  setInterval(flush, 15_000);

  const salir = () => {
    if (!activo) return;
    track("exit", { activo: st.activo, scroll: st.scroll });
    flush();
  };
  // pagehide + visibilitychange, NUNCA unload (rompe el bfcache y no corre en iOS).
  window.addEventListener("pagehide", salir);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") { flush(); }
    else { marcarInteraccion(); }
  });
}

export function initTracker(): void {
  if (typeof window === "undefined" || activo) return;
  try {
    // Chrome puede pre-renderizar la página en background por una sugerencia de la barra de
    // direcciones. Eso NO es una visita: esperamos a que se active de verdad.
    const doc = document as Document & { prerendering?: boolean };
    if (doc.prerendering) {
      document.addEventListener("prerenderingchange", () => { try { arrancar(); } catch { /* noop */ } }, { once: true });
      return;
    }
    arrancar();
  } catch {
    // Si el init falla, la landing sigue funcionando exactamente igual.
    activo = false;
    if (timer) clearInterval(timer);
    cola = [];
  }
}
