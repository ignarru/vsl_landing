"use client";

import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    // Barra de progreso — un solo listener, coalescido por frame
    const bar = document.getElementById("scrollBar");
    let pendiente = false;
    const updateBar = () => {
      if (!bar || pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => {
        pendiente = false;
        const h = document.documentElement;
        const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
        bar.style.width = `${Math.min(scrolled * 100, 100)}%`;
      });
    };
    window.addEventListener("scroll", updateBar, { passive: true });
    updateBar();

    // Reveal: una vez por sección. Agrega `in` (globals.css) y deja de observar.
    const revEls = document.querySelectorAll(".reveal");
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
    revEls.forEach((el) => io.observe(el));

    // Tilt 3D solo con mouse real: en táctil no hay hover, y el transform inline
    // quedaba pegado encima del de :hover.
    const conMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const handlers: Array<{ card: HTMLElement; m: (e: MouseEvent) => void; l: () => void }> = [];
    if (conMouse) {
      const tiltCards = document.querySelectorAll<HTMLElement>(".pain-card, .step-card");
      const onMove = (card: HTMLElement) => (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
        const y = ((e.clientY - r.top) / r.height - 0.5) * -6;
        card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-3px)`;
      };
      const onLeave = (card: HTMLElement) => () => {
        card.style.transform = "";
      };
      tiltCards.forEach((card) => {
        const m = onMove(card);
        const l = onLeave(card);
        card.addEventListener("mousemove", m);
        card.addEventListener("mouseleave", l);
        handlers.push({ card, m, l });
      });
    }

    return () => {
      window.removeEventListener("scroll", updateBar);
      io.disconnect();
      handlers.forEach(({ card, m, l }) => {
        card.removeEventListener("mousemove", m);
        card.removeEventListener("mouseleave", l);
      });
    };
  }, []);

  return null;
}
