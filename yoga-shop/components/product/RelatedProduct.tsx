import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export function RelatedProduct({
  product,
}: {
  product: Product;
}) {
  return (
    <section className="bg-warm-white py-section">

      <Container>


        <Reveal>

          <p
            className="
              font-body
              text-eyebrow
              uppercase
              text-soft-brown-dark
            "
          >
            اكتشفي المجموعة
          </p>


          <h2
            className="
              mt-4
              max-w-xl
              font-display
              text-display-md
              text-charcoal
            "
          >
            قطعة أخرى تكمل
            <br />
            لحظتك اليومية.
          </h2>

        </Reveal>



        <Reveal delay={0.1}>


          <Link

            href={`/product/${product.slug}`}

            className="
              group
              mt-12
              grid
              grid-cols-1
              items-center
              gap-10
              lg:grid-cols-2
              lg:gap-20
            "

          >


            {/* Image */}

            <div
              className="
                relative aspect-[4/5]
                overflow-hidden
                rounded-editorial
              "
            >

              <div
                className="
                  transition-transform
                  duration-700
                  ease-editorial
                  group-hover:scale-[1.04]
                "
              >

                <Image
                  src={product.colors[0]?.images[0]?.src || "/images/products/1.webp"}
                  alt={`${product.name} — ${product.colors[0]?.label}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

              </div>

            </div>



            {/* Content */}


            <div>


              <h3
                className="
                  font-display
                  text-display-sm
                  text-charcoal
                "
              >
                {product.name}
              </h3>



              <p
                className="
                  mt-5
                  max-w-md
                  font-body
                  text-base
                  leading-relaxed
                  text-charcoal/65
                "
              >
                {product.shortDescription}
              </p>



              <p
                className="
                  mt-7
                  font-display
                  text-xl
                  text-charcoal
                "
              >
                ابتداءً من{" "}
                {formatPrice(
                  product.startingPrice,
                  product.currency
                )}
              </p>



              <span
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  font-body
                  text-sm
                  text-charcoal
                  underline
                  underline-offset-4
                  decoration-charcoal/30
                  transition
                  group-hover:decoration-charcoal
                "
              >
                اكتشفي المنتج
                <span>
                  →
                </span>
              </span>


            </div>


          </Link>


        </Reveal>


      </Container>


    </section>
  );
} 