"use client";

import Image from "next/image";
import { Button, LinkButton } from "@/components/ui/Button";
import { Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface QuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickView({
  product,
  isOpen,
  onClose,
}: QuickViewProps) {

  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]!
  );


  useEffect(() => {
    setSelectedColor(product.colors[0]!);
  }, [product]);


  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);


  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };

  }, [isOpen, onClose]);


  return (
    <AnimatePresence>

      {isOpen && (

        <motion.div

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          exit={{ opacity: 0 }}

          className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            bg-muted-black/60 p-4
          "

          onClick={onClose}

        >


          <motion.div

            initial={{
              opacity: 0,
              y: 20,
              scale: 0.98,
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}

            exit={{
              opacity: 0,
              y: 20,
              scale: 0.98,
            }}

            onClick={(e) => e.stopPropagation()}

            className="
              grid w-full max-w-3xl
              overflow-hidden
              rounded-editorial
              bg-warm-white
              sm:grid-cols-2
            "

          >


            {/* صورة المنتج */}

            <div className="relative aspect-square p-4">

              <Image
                src={selectedColor.images[0]?.src || "/images/products/1.webp"}
                alt={`${product.name} — ${selectedColor.label}`}
                fill
                className="object-cover rounded-editorial"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

            </div>



            {/* معلومات المنتج */}

            <div className="flex flex-col p-6">


              <button

                type="button"

                onClick={onClose}

                className="
                  ml-auto
                  text-sm
                  text-charcoal/50
                "

              >
                إغلاق ✕
              </button>



              <span
                className="
                  mt-6
                  font-body
                  text-eyebrow
                  uppercase
                  text-soft-brown-dark
                "
              >
                {product.tagline}
              </span>



              <h2
                className="
                  mt-3
                  font-display
                  text-display-sm
                  text-charcoal
                "
              >
                {product.name}
              </h2>



              <p
                className="
                  mt-3
                  font-body
                  text-sm
                  leading-relaxed
                  text-charcoal/65
                "
              >
                {product.shortDescription}
              </p>




              {/* الألوان */}

              <div className="mt-6">

                <p
                  className="
                    mb-3
                    font-body
                    text-sm
                    text-charcoal/50
                  "
                >
                  اختاري اللون
                </p>


                <div className="flex gap-3">

                  {product.colors.map((color) => (

                    <button

                      key={color.id}

                      type="button"

                      onClick={() => setSelectedColor(color)}

                      aria-label={`اختيار ${color.label}`}

                      className={cn(
                        "h-8 w-8 rounded-full transition",
                        selectedColor.id === color.id
                          ? "ring-2 ring-charcoal"
                          : ""
                      )}

                      style={{
                        backgroundColor: color.swatch,
                      }}

                    />

                  ))}

                </div>

              </div>



              <p
                className="
                  mt-6
                  font-display
                  text-xl
                  text-charcoal
                "
              >
                {formatPrice(
                  product.startingPrice,
                  product.currency
                )}
              </p>



              <div
                className="
                  mt-auto
                  flex
                  flex-col
                  gap-3
                  pt-8
                "
              >

                <Button size="md">
                  أضيفي للسلة
                </Button>


                <LinkButton

                  href={`/product/${product.slug}`}

                  variant="secondary"

                  size="md"

                >
                  اكتشفي التفاصيل
                </LinkButton>


              </div>


            </div>


          </motion.div>


        </motion.div>

      )}

    </AnimatePresence>
  );
}