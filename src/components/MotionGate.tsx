"use client";

import { useEffect } from "react";

const ENGAGE_EVENTS = ["pointerdown", "pointermove", "keydown", "wheel", "touchstart"] as const;

/**
 * Looping ambient motion stays off until the visitor interacts, so the first
 * paint costs no animation frames. Once engaged, the flag stays on.
 */
export function MotionGate() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.motion === "on") return;

    const enable = () => {
      root.dataset.motion = "on";
      ENGAGE_EVENTS.forEach((event) => window.removeEventListener(event, enable));
    };

    ENGAGE_EVENTS.forEach((event) =>
      window.addEventListener(event, enable, { once: true, passive: true }),
    );

    return () => {
      ENGAGE_EVENTS.forEach((event) => window.removeEventListener(event, enable));
    };
  }, []);

  return null;
}
