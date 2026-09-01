"use client";

import Image from "next/image";
import { ColorVariant } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function Gallery({ color }: { color: ColorVariant }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const activeImage = color.images[activeIndex] ?? color.images[0]!;

  return (
    <div className="lg:sticky lg:top-28">
      <button
        type="button"
        onClick={() => setIsFullscreen(true)}
        aria-label="Open fullscreen preview"
        className="block w-full"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${color.id}-${activeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-editorial"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>
      </button>

      {/* Thumbnail strip */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {color.images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`View image ${index + 1}: ${image.type}`}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg opacity-60 transition-opacity duration-300 hover:opacity-100",
              index === activeIndex && "opacity-100 ring-2 ring-charcoal ring-offset-2 ring-offset-cream"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 200px"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-muted-black/95 p-8"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              type="button"
              aria-label="Close fullscreen preview"
              onClick={() => setIsFullscreen(false)}
              className="absolute right-8 top-8 font-body text-sm text-cream/70 hover:text-cream"
            >
              Close ✕
            </button>
            <div className="relative max-h-[85vh] w-full max-w-3xl aspect-[4/5]">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
