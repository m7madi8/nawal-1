"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

/**
 * Wraps Lenis smooth scroll around the whole app.
 * Kept as a single provider (not per-section) so GSAP ScrollTrigger and
 * Framer Motion's useScroll both stay in sync with one scroll source.
 *
 * Respects prefers-reduced-motion: skips smoothing entirely for users who
 * have that OS setting on, falling back to native scroll.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
