import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Product } from "@/lib/types";

export function ProductReviewsAndFAQ({
  product,
}: {
  product: Product;
}) {
  return (
    <section className="bg-sand py-section">

      <Container
        className="
          grid
          grid-cols-1
          gap-20
          lg:grid-cols-2
        "
      >

        {/* Reviews */}

        <div>

          <Reveal>

            <p
              className="
                font-body
                text-eyebrow
                uppercase
                text-soft-brown-dark
              "
            >
              تجارب العميلات
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
              لحظات حقيقية
              <br />
              مع نوال يوغا.
            </h2>

          </Reveal>



          <div className="mt-10 space-y-8">

            {product.reviews.map((review, i) => (

              <Reveal
                key={review.id}
                delay={i * 0.06}
              >

                <div
                  className="
                    rounded-3xl
                    bg-cream
                    p-7
                  "
                >

                  <div
                    className="
                      flex
                      gap-1
                    "
                    aria-hidden
                  >

                    {Array.from({ length: 5 }).map((_, starIndex) => (

                      <svg
                        key={starIndex}
                        viewBox="0 0 20 20"
                        className="h-3.5 w-3.5"
                        fill={
                          starIndex < review.rating
                            ? "#8B7355"
                            : "none"
                        }
                        stroke="#8B7355"
                        strokeWidth={1}
                      >

                        <path d="M10 1.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.65l5.9-.85L10 1.5z" />

                      </svg>

                    ))}

                  </div>



                  <p
                    className="
                      mt-5
                      font-display
                      text-lg
                      leading-relaxed
                      text-charcoal
                    "
                  >
                    "{review.quote}"
                  </p>



                  <p
                    className="
                      mt-5
                      font-body
                      text-sm
                      text-charcoal/50
                    "
                  >
                    {review.author}

                    {review.practiceStyle &&
                      ` · ${review.practiceStyle}`}
                  </p>


                </div>

              </Reveal>

            ))}

          </div>

        </div>



        {/* FAQ */}

        <div>

          <Reveal>

            <p
              className="
                font-body
                text-eyebrow
                uppercase
                text-soft-brown-dark
              "
            >
              الأسئلة الشائعة
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
              كل ما تحتاجين
              <br />
              معرفته.
            </h2>


            <p
              className="
                mt-5
                font-body
                leading-relaxed
                text-charcoal/60
              "
            >
              تفاصيل بسيطة تساعدك تختاري
              الفرشة المناسبة وتبدئي تجربتك براحة.
            </p>

          </Reveal>



          <Reveal
            delay={0.1}
            className="mt-10"
          >

            <Accordion items={product.faq} />

          </Reveal>


        </div>


      </Container>

    </section>
  );
}