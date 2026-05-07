"use client";

import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    // Scroll progress bar
    const bar = document.getElementById("scrollBar");
    function updateBar() {
      if (!bar) return;
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      bar.style.width = `${Math.min(scrolled * 100, 100)}%`;
    }
    window.addEventListener("scroll", updateBar, { passive: true });
    updateBar();

    // Scroll reveal
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
      { threshold: 0.1 }
    );
    revEls.forEach((el) => io.observe(el));

    // 3D tilt for pain-card / step-card
    const tiltCards = document.querySelectorAll<HTMLElement>(".pain-card, .step-card");
    const onMove = (card: HTMLElement) => (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
      card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
    };
    const onLeave = (card: HTMLElement) => () => {
      card.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
    };
    const handlers: Array<{ card: HTMLElement; m: (e: MouseEvent) => void; l: () => void }> = [];
    tiltCards.forEach((card) => {
      const m = onMove(card);
      const l = onLeave(card);
      card.addEventListener("mousemove", m);
      card.addEventListener("mouseleave", l);
      handlers.push({ card, m, l });
    });

    // Hero parallax
    const onScrollParallax = () => {
      const sy = window.scrollY;
      const chatW = document.getElementById("chatWidget");
      if (chatW && sy < 900) {
        chatW.style.transform = `perspective(1000px) rotateY(-2deg) rotateX(1deg) translateY(${sy * -0.08}px)`;
      }
    };
    window.addEventListener("scroll", onScrollParallax, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateBar);
      window.removeEventListener("scroll", onScrollParallax);
      io.disconnect();
      handlers.forEach(({ card, m, l }) => {
        card.removeEventListener("mousemove", m);
        card.removeEventListener("mouseleave", l);
      });
    };
  }, []);

  return null;
}
