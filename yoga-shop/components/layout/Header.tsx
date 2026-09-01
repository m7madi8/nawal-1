"use client";

import { Container } from "@/components/ui/Container";
import { PRIMARY_NAV, SHOP_SECTIONS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  return (
    <motion.header
      dir="rtl"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-editorial",
        isScrolled
          ? "bg-cream/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(43,38,34,0.06)]"
          : "bg-transparent",
      )}
    >
      <Container className="flex items-center justify-between py-5">
        <a href={SITE.home} className="group flex items-center gap-3">
          <span
            aria-hidden="true"
            className="motion-safe:animate-[breathe_4s_ease-in-out_infinite] h-2 w-2 rounded-full bg-soft-brown"
          />
          <span className="flex items-baseline gap-1.5">
            <span className="font-display text-xl tracking-tight text-charcoal">
              نوال
            </span>
            <span className="font-display text-sm font-light tracking-[0.15em] text-charcoal/70">
              يوغا
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="الموقع">
          {PRIMARY_NAV.map((link) => {
            const className = cn(
              "font-body text-sm tracking-wide transition-colors hover:text-charcoal",
              "current" in link && link.current
                ? "text-charcoal underline decoration-charcoal/30 underline-offset-8"
                : "text-charcoal/80",
            );

            if ("external" in link && link.external) {
              return (
                <a key={link.href} href={link.href} className={className}>
                  {link.label}
                </a>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={"current" in link && link.current ? "page" : undefined}
                className={className}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <nav className="hidden items-center gap-5 md:flex lg:hidden" aria-label="أقسام المتجر">
            {SHOP_SECTIONS.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm tracking-wide text-charcoal/80 transition-colors hover:text-charcoal"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="font-body text-sm tracking-wide text-charcoal/80 lg:hidden"
            aria-expanded={isOpen}
            aria-controls="shop-mobile-nav"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "إغلاق" : "القائمة"}
          </button>
        </div>
      </Container>

      {isOpen && (
        <div
          id="shop-mobile-nav"
          className="border-t border-charcoal/10 bg-cream/95 px-gutter py-6 backdrop-blur-md lg:hidden"
        >
          <nav className="flex flex-col gap-4" aria-label="تنقل الجوال">
            {PRIMARY_NAV.map((link) =>
              "external" in link && link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-display text-2xl text-charcoal"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-display text-2xl text-charcoal"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>
          <nav className="mt-8 flex flex-col gap-3 border-t border-charcoal/10 pt-6" aria-label="أقسام المتجر">
            {SHOP_SECTIONS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm tracking-wide text-charcoal/70"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </motion.header>
  );
}
