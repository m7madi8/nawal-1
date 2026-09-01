"use client";

import { Gallery } from "@/components/product/Gallery";
import { StickyPurchasePanel } from "@/components/product/StickyPurchasePanel";
import { Product } from "@/lib/types";
import { useState } from "react";

/**
 * Client boundary that owns the single piece of shared state (selected
 * color) between the image gallery and the purchase panel — kept as its
 * own component so the rest of the product page can stay server-rendered.
 */
export function ProductPurchaseExperience({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]!);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
      <Gallery color={selectedColor} />
      <StickyPurchasePanel
        product={product}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />
    </div>
  );
}
