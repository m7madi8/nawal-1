"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-charcoal text-cream hover:bg-muted-black focus-visible:ring-charcoal",
  secondary:
    "bg-transparent text-charcoal border border-charcoal/30 hover:border-charcoal focus-visible:ring-charcoal",
  ghost:
    "bg-transparent text-charcoal hover:text-soft-brown underline underline-offset-4 decoration-charcoal/30 hover:decoration-soft-brown",
};

const sizeStyles: Record<Size, string> = {
  md: "text-sm px-6 py-3",
  lg: "text-base px-8 py-4",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-body tracking-wide transition-colors duration-300 ease-editorial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:opacity-40 disabled:pointer-events-none";

/** Button — for in-page actions (add to cart, quick view, form submits). */
export const Button = forwardRef<
  HTMLButtonElement,
  BaseProps &
    ButtonHTMLAttributes<HTMLButtonElement> &
    Omit<HTMLMotionProps<"button">, "ref">
>(({ variant = "primary", size = "md", className, children, ...rest }, ref) => {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...rest}
    >
      {children}
    </motion.button>
  );
});
Button.displayName = "Button";

/** LinkButton — same visual system as Button, for navigation. */
export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: BaseProps & { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}>
      {children}
    </Link>
  );
}
