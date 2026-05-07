"use client";

import { useEffect, useRef } from "react";

const CHAT_MSGS: Array<{ type: "in" | "ai" | "typing"; text?: string }> = [
  { type: "in", text: "Hola! tienen filtro de aceite para honda civic 2018?" },
  { type: "typing" },
  { type: "ai", text: "¡Hola! Sí, lo tenemos. ¿Necesitás también pastillas de freno o solo el filtro?" },
  { type: "in", text: "las dos cosas, cuanto salen?" },
  { type: "typing" },
  { type: "ai", text: "Filtro de aceite: $4.800 · Pastillas delantera+trasera: $12.500. Total: $17.300. ¿Lo llevás o te lo enviamos?" },
  { type: "in", text: "envio a palermo" },
  { type: "typing" },
  { type: "ai", text: "Perfecto. Envío a Palermo: $850. Total final: $18.150. Te mando el link de pago ahora mismo 🚀" },
];

const BOT_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="11" rx="3.5"/><circle cx="9" cy="13.5" r="1.3" fill="currentColor" stroke="none"/><circle cx="15" cy="13.5" r="1.3" fill="currentColor" stroke="none"/><path d="M12 8V5"/><circle cx="12" cy="4" r="1.3" fill="currentColor" stroke="none"/><path d="M9 17h6"/></svg>`;

export default function ChatWidget() {
  const chatRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const chatEl = chatRef.current;
    if (!chatEl) return;

    let typingEl: HTMLDivElement | null = null;

    function clearTimers() {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    }

    function runChat() {
      if (!chatEl) return;
      chatEl.innerHTML = "";
      typingEl = null;

      CHAT_MSGS.forEach((m, i) => {
        const t = window.setTimeout(() => {
          if (typingEl) {
            typingEl.remove();
            typingEl = null;
          }
          if (m.type === "typing") {
            typingEl = document.createElement("div");
            typingEl.className = "msg msg-out";
            typingEl.innerHTML = `<div class="bot-avatar">${BOT_SVG}</div><div class="typing-bubble"><span></span><span></span><span></span></div>`;
            chatEl.appendChild(typingEl);
          } else {
            const div = document.createElement("div");
            div.className = `msg ${m.type === "in" ? "msg-in" : "msg-out"}`;
            div.style.opacity = "0";
            div.style.transform = "translateY(10px)";
            div.style.transition = "opacity .35s ease, transform .35s ease";
            const b = document.createElement("div");
            b.className = `bubble ${m.type === "in" ? "bubble-in" : "bubble-ai"}`;
            b.textContent = m.text ?? "";
            if (m.type === "ai") {
              const av = document.createElement("div");
              av.className = "bot-avatar";
              av.innerHTML = BOT_SVG;
              div.appendChild(av);
            }
            div.appendChild(b);
            chatEl.appendChild(div);
            requestAnimationFrame(() =>
              requestAnimationFrame(() => {
                div.style.opacity = "1";
                div.style.transform = "translateY(0)";
              })
            );
          }
          chatEl.scrollTop = chatEl.scrollHeight;
        }, i * 1100 + (m.type === "typing" ? 0 : 200));
        timersRef.current.push(t);
      });
    }

    runChat();
    const interval = window.setInterval(runChat, CHAT_MSGS.length * 1100 + 3000);
    timersRef.current.push(interval);

    return () => clearTimers();
  }, []);

  return (
    <div className="chat-widget reveal d2" id="chatWidget">
      <div className="chat-header">
        <div className="chat-avatar">IA</div>
        <div>
          <div className="chat-name">Agente IAbyIA</div>
          <div className="chat-status">
            <span className="live-dot" />
            En línea · respondiendo ahora
          </div>
        </div>
        <div className="chat-channel-tag">WHATSAPP</div>
      </div>
      <div className="chat-messages" ref={chatRef} />
      <div className="chat-input-bar">
        <div className="input-fake">Escribir mensaje...</div>
        <div className="send-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
