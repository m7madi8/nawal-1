import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PRODUCTS } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";

const DEPARTMENTS = [
  {
    href: "#mat",
    index: "01",
    slug: "the-mat",
    name: "السجادة",
    copy: "سطح هادئ لعالم صاخب.",
    image: "/images/products/matt.png",
  },
  {
    href: "#block",
    index: "02",
    slug: "the-block",
    name: "البلوك",
    copy: "دعم، دون اعتذار.",
    image: "/images/products/block.png",
  },
] as const;

export function Departments() {
  return (
    <section id="departments" className="bg-warm-white py-section">
      <Container>
        <Reveal>
          <p className="font-body text-eyebrow uppercase text-soft-brown-dark">
            الأقسام
          </p>
          <h2 className="mt-4 max-w-xl font-display text-display-md leading-tight text-charcoal">
            قسمان فقط.
            <br />
            بلا زيادة.
          </h2>
          <p className="mt-6 max-w-md font-body leading-relaxed text-charcoal/60">
            تسوّقي حسب القطعة — سجادة للممارسة اليومية، وبلوك يسندك في الوضعيات التي تحتاج دعماً.
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
          {DEPARTMENTS.map((dept, i) => {
            const product = PRODUCTS.find((item) => item.slug === dept.slug);

            return (
              <Reveal key={dept.slug} delay={i * 0.08}>
                <Link
                  href={dept.href}
                  className="group block"
                  aria-label={`ادخلي إلى قسم ${dept.name}`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-editorial">
                    <Image
                      src={product?.colors[0]?.images[0]?.src || dept.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="mt-6 flex gap-5">
                    <span className="font-display text-xl text-soft-brown-dark">
                      {dept.index}
                    </span>
                    <div>
                      <h3 className="font-display text-display-sm text-charcoal">
                        {dept.name}
                      </h3>
                      <p className="mt-2 max-w-xs font-body text-charcoal/60">
                        {dept.copy}
                      </p>
                      <span className="mt-4 inline-block font-body text-sm tracking-wide text-charcoal underline decoration-charcoal/30 underline-offset-4 transition-colors group-hover:decoration-charcoal">
                        ادخلي ←
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
