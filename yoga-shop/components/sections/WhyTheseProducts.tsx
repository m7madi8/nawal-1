import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const REASONS = [
  {
    number: "01",
    title: "اخترنا الجودة قبل الكثرة",
    text:
      "ما أردنا نعمل عشرات المنتجات فقط لنملأ الرفوف. ركّزنا على القطع التي فعلًا تحتاجيها في رحلتك.",
  },
  {
    number: "02",
    title: "كل تفصيل محسوب",
    text:
      "من اختيار الخامة إلى الإحساس تحت اليدين والقدمين، كل خطوة صُممت لتعطيك تجربة يوغا أكثر راحة وثبات.",
  },
  {
    number: "03",
    title: "البساطة تصنع الفرق",
    text:
      "أحيانًا لا نحتاج الكثير. فرشة مريحة ومساحتك الخاصة تكفي لتصنعي لحظة هدوء كل يوم.",
  },
];

export function WhyTheseProducts() {
  return (
    <section className="bg-sand py-section">

      <Container>

        <div
          className="
            grid
            grid-cols-1
            gap-16
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-24
          "
        >

          <Reveal>

            <p
              className="
                font-body
                text-eyebrow
                uppercase
                text-soft-brown-dark
              "
            >
              فلسفة نوال يوغا
            </p>


            <h2
              className="
                mt-4
                font-display
                text-display-md
                leading-tight
                text-charcoal
              "
            >
              لم نصنع الكثير...
              <br />
              صنعنا ما يستحق.
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
              لأن تجربة اليوغا لا تحتاج للكثير،
              تحتاج فقط لأدوات تشعرك بالراحة
              وترافقك في كل جلسة.
            </p>

          </Reveal>


          <div className="flex flex-col gap-10">

            {REASONS.map((reason, i) => (

              <Reveal
                key={reason.number}
                delay={i * 0.08}
              >

                <div
                  className="
                    flex
                    gap-6
                    border-t
                    border-charcoal/10
                    pt-8
                  "
                >

                  <span
                    className="
                      font-display
                      text-sm
                      text-soft-brown-dark
                    "
                  >
                    {reason.number}
                  </span>


                  <div>

                    <h3
                      className="
                        font-display
                        text-xl
                        text-charcoal
                      "
                    >
                      {reason.title}
                    </h3>


                    <p
                      className="
                        mt-3
                        max-w-md
                        font-body
                        text-base
                        leading-relaxed
                        text-charcoal/65
                      "
                    >
                      {reason.text}
                    </p>

                  </div>

                </div>

              </Reveal>

            ))}

          </div>

        </div>

      </Container>

    </section>
  );
}