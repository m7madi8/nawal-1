"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds — use for sequential reveals within a section. */
  delay?: number;
  /** Distance the element travels in, in pixels. */
  distance?: number;
  as?: "div" | "span" | "h1" | "h2" | "h3" | "p" | "li";
}

const buildVariants = (distance: number): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
});

/**
 * Shared scroll-reveal primitive. One deliberate, slow, editorial motion
 * curve reused everywhere — consistency here reads as "designed," not
 * scattered fade-ins added component by component.
 *
 * Respects prefers-reduced-motion automatically via Framer Motion's
 * useReducedMotion — reduced-motion users get an instant, static reveal.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 24,
  as = "div",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = motion[as];

  if (shouldReduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={buildVariants(distance)}
      transition={{ delay }}
    >
      {children}
    </MotionComponent>
  );
}
