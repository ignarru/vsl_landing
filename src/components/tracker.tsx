"use client";

import { useEffect } from "react";
import { initTracker } from "@/lib/track";

/**
 * Monta el tracking propio de la landing. No renderiza nada.
 *
 * Va en el layout (y no en page.tsx) para que cualquier página futura quede medida sin acordarse
 * de nada. Todo el trabajo pasa dentro de useEffect: nada toca `window` durante el render, así
 * que no puede romper la hidratación.
 */
export default function Tracker() {
  useEffect(() => {
    initTracker();
  }, []);
  return null;
}
