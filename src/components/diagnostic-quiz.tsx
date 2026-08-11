"use client";

import { useState, useRef } from "react";
import { trackQuizPaso, trackQuizFin } from "@/lib/track";

// `v` es el slug que se guarda en el dashboard: así las respuestas quedan legibles en la DB
// ("mas_100") en vez de una letra sin contexto ("C"), y reordenar las opciones acá no invalida
// el histórico. ⚠️ Si cambiás un slug, actualizá QUIZ_LABELS en el sales-dashboard
// (src/lib/landing-metrics.ts) o la etiqueta vieja se sigue mostrando cruda.
type Opt = { n: string; t: string; score: number; v: string };
type Step = { q: string; sub: string; opts: Opt[] };

const STEPS: Step[] = [
  {
    q: "¿Cuánta gente hace tareas repetitivas todos los días?",
    sub: "Cargar datos, responder lo mismo, coordinar, conciliar.",
    opts: [
      { n: "A", t: "Nadie, lo hago yo solo", score: 1, v: "solo" },
      { n: "B", t: "Una o dos personas", score: 2, v: "una_dos" },
      { n: "C", t: "Tres o más", score: 3, v: "tres_mas" },
    ],
  },
  {
    q: "Al que consulta y no compra, ¿quién lo vuelve a contactar?",
    sub: "La respuesta honesta, no la que debería ser.",
    opts: [
      { n: "A", t: "Nadie, se pierde", score: 3, v: "nadie" },
      { n: "B", t: "Alguien, cuando se acuerda", score: 2, v: "a_veces" },
      { n: "C", t: "Tenemos un proceso armado", score: 1, v: "proceso" },
    ],
  },
  {
    q: "¿Sabés cuánto te cuesta cada proceso de tu negocio?",
    sub: "En horas y en plata, no por intuición.",
    opts: [
      { n: "A", t: "Ni idea, nunca lo medí", score: 3, v: "ni_idea" },
      { n: "B", t: "Más o menos, a ojo", score: 2, v: "a_ojo" },
      { n: "C", t: "Sí, lo tengo medido", score: 1, v: "medido" },
    ],
  },
];

function resultFor(score: number) {
  if (score >= 7)
    return {
      title: "Hay plata sobre la mesa",
      text: "Tenés varias personas haciendo trabajo que se repite, nadie retoma al que no compró, y no sabés qué te cuesta cada cosa. Es exactamente el caso donde la auditoría se paga sola con el primer proceso que ordenamos.",
    };
  if (score >= 5)
    return {
      title: "Vale la pena medirlo",
      text: "Hay material para trabajar. Lo que falta es el número: cuánto te cuesta hoy cada proceso y cuál conviene tocar primero. Eso sale de la auditoría, y con eso decidís con datos en vez de con intuición.",
    };
  return {
    title: "Puede que todavía no sea tu momento",
    text: "Si trabajás solo y ya tenés medido lo que hacés, probablemente no necesites esto todavía — y prefiero decírtelo ahora que venderte algo que no te va a mover la aguja. Igual podemos hablar: si veo un caso claro, te lo digo, y si no, también.",
  };
}

export default function DiagnosticQuiz({ calUrl }: { calUrl: string }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  // Respuestas elegidas, para mandarlas junto al score al terminar. El scoring no cambia.
  const respuestas = useRef<string[]>([]);

  function choose(o: Opt) {
    const total = score + o.score;
    respuestas.current[step] = o.v;
    setScore(total);
    trackQuizPaso(step + 1, o.n, o.v, o.score);
    if (step < STEPS.length - 1) setStep(step + 1);
    else {
      setDone(true);
      trackQuizFin(total, [...respuestas.current]);
    }
  }

  const result = done ? resultFor(score) : null;
  const progressOn = done ? STEPS.length : step;

  return (
    <section className="quiz-section" id="diagnostico">
      <div style={{ textAlign: "center" }} className="reveal">
        <div className="sec-label" style={{ justifyContent: "center" }}>
          Diagnóstico en 30 segundos
        </div>
        <div className="sec-title" style={{ margin: "0 auto" }}>
          ¿Tenés algo para <em className="grad-text">automatizar</em>?
        </div>
        <div className="sec-sub" style={{ margin: "14px auto 0" }}>
          Tres preguntas y te digo en el acto si tiene sentido que hablemos. Si no lo tiene,
          también te lo digo.
        </div>
      </div>

      <div className="quiz-card reveal d1">
        <div className="quiz-progress">
          {[0, 1, 2].map((i) => (
            <i key={i} className={i <= progressOn ? "on" : ""} />
          ))}
        </div>

        {!done && (
          <div className="quiz-step" key={step}>
            <div className="quiz-q">{STEPS[step].q}</div>
            <div className="quiz-qsub">{STEPS[step].sub}</div>
            <div className="quiz-opts">
              {STEPS[step].opts.map((o) => (
                <button
                  key={o.n}
                  className="quiz-opt"
                  type="button"
                  onClick={() => choose(o)}
                >
                  <span className="qo-n">{o.n}</span>
                  {o.t}
                </button>
              ))}
            </div>
          </div>
        )}

        {done && result && (
          <div className="quiz-result" aria-live="polite">
            <div className="qr-label">Tu diagnóstico</div>
            <div className="qr-big grad-text">{result.title}</div>
            <div className="qr-text">{result.text}</div>
            <a
              href={calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ marginLeft: "auto", marginRight: "auto" }}
              data-cta="quiz"
            >
              Agendar la llamada <span aria-hidden="true">→</span>
            </a>
            <div className="guarantee">
              La auditoría tiene devolución total: si al terminarla considerás que no te sirvió,
              te devuelvo los USD 1.500 sin preguntas.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
