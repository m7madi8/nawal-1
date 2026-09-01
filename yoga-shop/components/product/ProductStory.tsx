import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Product } from "@/lib/types";

export function ProductStory({ product }: { product: Product }) {
  return (
    <section className="bg-warm-white py-section">
      <Container className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <Reveal>
          <PhotoPlaceholder
            label={`${product.name} — in-use, close crop`}
            tone="sand"
            aspect="aspect-[3/4]"
          />
        </Reveal>

        <div className="flex flex-col justify-center">
          <p className="font-body text-eyebrow uppercase text-soft-brown-dark">
            القصة
          </p>
          <div className="mt-6 space-y-6">
            {product.story.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="font-display text-xl leading-relaxed text-charcoal">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
