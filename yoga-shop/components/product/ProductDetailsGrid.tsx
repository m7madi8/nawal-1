import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Product } from "@/lib/types";

export function ProductDetailsGrid({ product }: { product: Product }) {
  return (
    <section className="bg-cream py-section">

      <Container>


        {/* Benefits */}

        <Reveal className="max-w-xl">

          <p
            className="
              font-body
              text-eyebrow
              uppercase
              text-soft-brown-dark
            "
          >
            لماذا ستعجبك؟
          </p>


          <h2
            className="
              mt-4
              font-display
              text-display-sm
              leading-tight
              text-charcoal
            "
          >
            صُممت لترافق
            <br />
            لحظاتك اليومية.
          </h2>

        </Reveal>



        <div
          className="
            mt-14
            grid
            grid-cols-1
            gap-8
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >

          {product.benefits.map((benefit, i) => (

            <Reveal
              key={benefit.title}
              delay={i * 0.05}
            >

              <div
                className="
                  rounded-3xl
                  bg-white/40
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >

                <h3
                  className="
                    font-display
                    text-xl
                    text-charcoal
                  "
                >
                  {benefit.title}
                </h3>


                <p
                  className="
                    mt-3
                    font-body
                    text-sm
                    leading-relaxed
                    text-charcoal/60
                  "
                >
                  {benefit.description}
                </p>

              </div>

            </Reveal>

          ))}

        </div>



        {/* Details */}

        <div
          className="
            mt-28
            grid
            grid-cols-1
            gap-16
            border-t
            border-charcoal/10
            pt-20
            lg:grid-cols-2
            lg:gap-24
          "
        >

          {/* Materials */}

          <Reveal>

            <p
              className="
                font-body
                text-eyebrow
                uppercase
                text-soft-brown-dark
              "
            >
              الخامة
            </p>


            <div className="mt-8 space-y-8">

              {product.materials.map((material) => (

                <div key={material.name}>

                  <h3
                    className="
                      font-display
                      text-2xl
                      text-charcoal
                    "
                  >
                    {material.name}
                  </h3>


                  <p
                    className="
                      mt-2
                      font-body
                      text-sm
                      leading-relaxed
                      text-charcoal/60
                    "
                  >
                    {material.description}
                  </p>

                </div>

              ))}

            </div>

          </Reveal>



          {/* Specifications */}

          <Reveal delay={0.1}>

            <p
              className="
                font-body
                text-eyebrow
                uppercase
                text-soft-brown-dark
              "
            >
              التفاصيل
            </p>


            <dl
              className="
                mt-8
                divide-y
                divide-charcoal/10
              "
            >

              {product.specifications.map((spec) => (

                <div
                  key={spec.label}
                  className="
                    flex
                    justify-between
                    py-4
                    font-body
                    text-sm
                  "
                >

                  <dt className="text-charcoal/50">
                    {spec.label}
                  </dt>


                  <dd className="text-charcoal">
                    {spec.value}
                  </dd>

                </div>

              ))}

            </dl>


            <div
              className="
                mt-8
                rounded-2xl
                bg-sand
                p-5
              "
            >

              <p
                className="
                  font-body
                  text-sm
                  leading-relaxed
                  text-charcoal/60
                "
              >
                {product.shipping}
              </p>

            </div>


          </Reveal>


        </div>


      </Container>

    </section>
  );
}