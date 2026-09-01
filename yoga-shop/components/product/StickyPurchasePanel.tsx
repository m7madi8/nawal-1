"use client";

import { Button } from "@/components/ui/Button";
import { Product, ColorVariant } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";
import { useState } from "react";

interface StickyPurchasePanelProps {
  product: Product;
  selectedColor: ColorVariant;
  onColorChange: (color: ColorVariant) => void;
}

export function StickyPurchasePanel({
  product,
  selectedColor,
  onColorChange,
}: StickyPurchasePanelProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "added">("idle");

  function handleAddToCart() {
    setStatus("loading");
    // Placeholder for real cart mutation (Supabase / commerce backend).
    // See README.md → "Commerce integration" for the intended seam.
    window.setTimeout(() => setStatus("added"), 700);
    window.setTimeout(() => setStatus("idle"), 2400);
  }

  return (
    <div className="lg:sticky lg:top-28">
      <p className="font-body text-eyebrow uppercase text-soft-brown-dark">
        {product.tagline}
      </p>
      <h1 className="mt-4 font-display text-display-md text-charcoal">
        {product.name}
      </h1>
      <p className="mt-4 font-display text-2xl text-charcoal">
        {formatPrice(product.startingPrice, product.currency)}
      </p>

      <p className="mt-6 max-w-md font-body text-base leading-relaxed text-charcoal/70">
        {product.shortDescription}
      </p>

      {/* Color selector */}
      <div className="mt-8">
        <span className="font-body text-sm text-charcoal/60">
          اللون — {selectedColor.label}
        </span>
        <div className="mt-3 flex items-center gap-3">
          {product.colors.map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={() => onColorChange(color)}
              aria-label={`اختيار ${color.label}`}
              aria-pressed={selectedColor.id === color.id}
              className={cn(
                "h-10 w-10 rounded-full border-2 transition-all duration-300 ease-editorial",
                selectedColor.id === color.id
                  ? "border-charcoal scale-110"
                  : "border-transparent hover:scale-105"
              )}
              style={{ backgroundColor: color.swatch }}
            />
          ))}
        </div>
      </div>

      <Button
        size="lg"
        className="mt-8 w-full"
        onClick={handleAddToCart}
        disabled={status === "loading"}
      >
        {status === "idle" && "أضيفي للسلة"}
        {status === "loading" && "جاري الإضافة…"}
        {status === "added" && "تمت الإضافة ✓"}
      </Button>

      <dl className="mt-10 space-y-3 border-t border-charcoal/10 pt-6">
        {product.specifications.slice(0, 4).map((spec) => (
          <div key={spec.label} className="flex justify-between font-body text-sm">
            <dt className="text-charcoal/50">{spec.label}</dt>
            <dd className="text-charcoal">{spec.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 font-body text-xs leading-relaxed text-charcoal/45">
        {product.shipping}
      </p>
    </div>
  );
}
