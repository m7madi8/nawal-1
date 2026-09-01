"use client";

import Image from "next/image";
import { QuickView } from "@/components/product/QuickView";
import { Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  /** Alternates image/copy sides for an editorial rhythm down the page. */
  reverse?: boolean;
  index: number;
}

export function ProductCard({ product, reverse, index }: ProductCardProps) {
  const [activeColor, setActiveColor] = useState(product.colors[0]);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  return (
    <article
      id={product.slug === "the-mat" ? "mat" : product.slug === "the-block" ? "block" : product.slug}
      className={cn(
        "grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20",
        reverse && "lg:[&>*:first-child]:order-2"
      )}
    >
      <div className="group relative">
        <Link
          href={`/product/${product.slug}`}
          className="block"
          aria-label={`عرض تفاصيل ${product.name}`}
        >
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-editorial shadow-[0_30px_60px_-30px_rgba(43,38,34,0.25)]"
          >
            <div className="overflow-hidden">
              <div className="transition-transform duration-700 ease-editorial group-hover:scale-[1.04]">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={activeColor?.images[0]?.src || "/images/products/matt.png"}
                    alt={activeColor?.images[0]?.alt || `${product.name} — ${activeColor?.label}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Quick View — surfaces on hover (desktop) and stays reachable via keyboard focus */}
        <button
          type="button"
          onClick={() => setIsQuickViewOpen(true)}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-warm-white px-6 py-3 font-body text-sm tracking-wide text-charcoal opacity-0 shadow-lg transition-opacity duration-300 ease-editorial group-hover:opacity-100 focus-visible:opacity-100"
        >
          عرض سريع
        </button>
      </div>

      <QuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />

      <div className={cn("max-w-md", reverse ? "lg:pr-8" : "lg:pl-8")}>
        <span className="font-body text-eyebrow uppercase text-soft-brown-dark">
          {String(index + 1).padStart(2, "0")} — {product.colors.length} ألوان
        </span>

        <h3 className="mt-4 font-display text-display-sm text-charcoal">
          {product.name}
        </h3>

        <p className="mt-2 font-body text-base text-soft-brown-dark">
          {product.tagline}
        </p>

        <p className="mt-5 font-body text-base leading-relaxed text-charcoal/70">
          {product.shortDescription}
        </p>

        {/* Color selector — swaps the preview image, not just a swatch row */}
        <div className="mt-6 flex items-center gap-3">
          {product.colors.map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={() => setActiveColor(color)}
              aria-label={`معاينة ${color.label}`}
              aria-pressed={activeColor?.id === color.id}
              className={cn(
                "h-8 w-8 rounded-full border-2 transition-all duration-300",
                activeColor?.id === color.id
                  ? "border-charcoal scale-110"
                  : "border-transparent hover:scale-105"
              )}
              style={{ backgroundColor: color.swatch }}
            />
          ))}
          <span className="ml-1 font-body text-sm text-charcoal/50">
            {activeColor?.label}
          </span>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <span className="font-display text-2xl text-charcoal">
            يبدأ من {formatPrice(product.startingPrice, product.currency)}
          </span>
          <Link
            href={`/product/${product.slug}`}
            className="font-body text-sm tracking-wide text-charcoal underline underline-offset-4 decoration-charcoal/30 transition-colors hover:decoration-charcoal"
          >
            عرض التفاصيل ←
          </Link>
        </div>
      </div>
    </article>
  );
}
