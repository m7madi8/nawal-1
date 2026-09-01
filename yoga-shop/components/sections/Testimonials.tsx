import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "من أول ما استخدمتها حسّيت بالفرق. مريحة وثابتة، وصارت جزء من روتيني الصباحي قبل ما أبلّش يومي.",
    author: "سارة",
    location: "الناصرة",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "عنجد حبيت كل التفاصيل فيها، من الخامة للراحة. بتحسّي إنها معمولة عشان تعطيكي لحظة هدوء وراحة إلك.",
    author: "ليان",
    location: "حيفا",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "صارت فرشتي معي بكل جلسة يوغا. جودتها بتجنّن وإحساسها غير عن أي فرشة جرّبتها قبل.",
    author: "نور",
    location: "القدس",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="bg-warm-white py-section">
      <Container>

        <Reveal className="max-w-xl">
          <p className="font-body text-eyebrow uppercase text-soft-brown-dark">
            تجارب من مجتمع نوال
          </p>

          <h2 className="mt-4 font-display text-display-md text-charcoal">
            لحظات هدوء بدأت من مساحة صغيرة.
          </h2>

          <p className="mt-5 max-w-md font-body text-charcoal/60 leading-relaxed">
            تجارب حقيقية من نساء فلسطين يستخدمن نوال يوغا في لحظاتهن اليومية
            للراحة، التركيز، والاهتمام بالنفس.
          </p>
        </Reveal>


        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((review, i) => (
            <Reveal key={review.id} delay={i * 0.08}>
              <article className="
                flex h-full flex-col
                rounded-editorial
                bg-cream
                p-8
                transition-all
                duration-300
                hover:-translate-y-1
              ">

                <div className="flex gap-1" aria-hidden>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      viewBox="0 0 20 20"
                      className="h-3.5 w-3.5"
                      fill={index < review.rating ? "#8B7355" : "none"}
                      stroke="#8B7355"
                      strokeWidth={1}
                    >
                      <path d="M10 1.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.65l5.9-.85L10 1.5z" />
                    </svg>
                  ))}
                </div>


                <p className="
                  mt-6
                  flex-1
                  font-display
                  text-lg
                  leading-relaxed
                  text-charcoal
                ">
                  "{review.quote}"
                </p>


                <div className="mt-8 border-t border-charcoal/10 pt-5">

                  <p className="font-body text-sm text-charcoal">
                    {review.author}
                  </p>

                  <p className="mt-1 font-body text-xs text-charcoal/50">
                    {review.location}
                  </p>

                </div>

              </article>
            </Reveal>
          ))}
        </div>

      </Container>
    </section>
  );
}