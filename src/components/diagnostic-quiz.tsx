"use client";

import { useState } from "react";

type Opt = { n: string; t: string; score: number };
type Step = { q: string; sub: string; opts: Opt[] };

const STEPS: Step[] = [
  {
    q: "¿Cuántos mensajes recibís por día?",
    sub: "WhatsApp, Instagram, web — todo junto.",
    opts: [
      { n: "A", t: "Menos de 30", score: 1 },
      { n: "B", t: "Entre 30 y 100", score: 2 },
      { n: "C", t: "Más de 100", score: 3 },
    ],
  },
  {
    q: "¿Quién responde hoy esos mensajes?",
    sub: "La realidad, sin filtro.",
    opts: [
      { n: "A", t: "Yo mismo, como puedo", score: 3 },
      { n: "B", t: "Una o dos personas del equipo", score: 2 },
      { n: "C", t: "Un equipo dedicado de atención", score: 1 },
    ],
  },
  {
    q: "¿Qué te duele más hoy?",
    sub: "Lo que más te quita el sueño.",
    opts: [
      { n: "A", t: "Perder ventas fuera de horario", score: 3 },
      { n: "B", t: "El tiempo que se va en responder lo mismo", score: 2 },
      { n: "C", t: "No poder crecer sin contratar más gente", score: 2 },
    ],
  },
];

function resultFor(score: number) {
  if (score >= 7)
    return {
      title: "Caso ideal para IA 🔥",
      text: "Tu negocio recibe mucho volumen y está perdiendo ventas por no responder a tiempo. Es exactamente donde IAbyIA genera más impacto: podrías automatizar el 90% y recuperar ventas desde la primera semana.",
    };
  if (score >= 5)
    return {
      title: "Gran oportunidad de automatizar",
      text: "Tenés un volumen interesante y tareas repetitivas que la IA puede resolver sola. Con un buen diagnóstico identificamos qué automatizar primero para recuperar tiempo y ventas rápido.",
    };
  return {
    title: "Listo para dar el salto",
    text: "Aún con poco volumen, automatizar te asegura no perder ninguna venta y crecer sin sumar gente. Te mostramos el plan más conveniente para tu etapa.",
  };
}

export default function DiagnosticQuiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function choose(s: number) {
    const total = score + s;
    setScore(total);
    if (step < STEPS.length - 1) setStep(step + 1);
    else setDone(true);
  }

  const result = done ? resultFor(score) : null;
  const progressOn = done ? STEPS.length : step;

  return (
    <section className="quiz-section" id="diagnostico">
      <div style={{ textAlign: "center" }} className="reveal">
        <div className="sec-label" style={{ justifyContent: "center" }}>
          Diagnóstico en 30 segundos
        </div>
        <div className="sec-title">
          ¿Cuánto podés automatizar <em className="grad-text">tu negocio</em>?
        </div>
        <div className="sec-sub" style={{ margin: "14px auto 0" }}>
          Respondé 3 preguntas y te decimos en el acto qué tan listo está tu negocio para vender con IA.
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
                  onClick={() => choose(o.score)}
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
              href="#agenda"
              className="btn-primary"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              Quiero mi plan personalizado <span aria-hidden="true">→</span>
            </a>
            <div className="guarantee">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              <span>
                Si en la llamada no vemos un caso claro para tu negocio, <b>te lo decimos</b>. No
                vendemos humo.
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
