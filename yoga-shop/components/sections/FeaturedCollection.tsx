import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS } from "@/lib/products";

export function FeaturedCollection() {
  return (
    <section
      id="collection"
      className="bg-cream py-section"
    >

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
            المجموعة
          </p>


          <h2
            className="
              mt-4
              max-w-xl
              font-display
              text-display-md
              leading-tight
              text-charcoal
            "
          >
            قطعتان فقط...
            <br />
            لكن كل تفصيل فيهما محسوب.
          </h2>


          <p
            className="
              mt-6
              max-w-md
              font-body
              leading-relaxed
              text-charcoal/60
            "
          >
            اخترنا الأساسيات التي تحتاجينها في رحلة اليوغا:
            فرشة تمنحك الراحة والثبات،
            وقطعة تكمل ممارستك اليومية.
          </p>

        </Reveal>


        <div
          className="
            mt-24
            flex
            flex-col
            gap-28
            lg:gap-36
          "
        >

          {PRODUCTS.map((product, index) => (

            <Reveal
              key={product.slug}
              distance={40}
            >

              <ProductCard
                product={product}
                reverse={index % 2 === 1}
                index={index}
              />

            </Reveal>

          ))}

        </div>

      </Container>

    </section>
  );
}