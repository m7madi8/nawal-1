import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

const MATERIALS = [
  {
    name: "فلين طبيعي",
    english: "Natural Cork",
    text:
      "خامة دافئة وخفيفة بملمس طبيعي يمنحك إحساسًا مريحًا مع كل جلسة. اخترناها لأنها تجمع بين الجمال والعملية.",
    tone: "sand" as const,
  },
  {
    name: "مطاط طبيعي",
    english: "Natural Rubber",
    text:
      "مصمم ليمنحك ثباتًا أفضل أثناء الحركة، مع مرونة تدوم مع الاستخدام اليومي وتحافظ على جودة الفرشة.",
    tone: "stone" as const,
  },
];

export function Materials() {
  return (
    <section
      id="materials"
      className="bg-warm-white py-section"
    >

      <Container>

        <Reveal className="max-w-2xl">

          <p
            className="
              font-body
              text-eyebrow
              uppercase
              text-soft-brown-dark
            "
          >
            الخامات
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
            كل ما يلمسكِ...
            <br />
            اخترناه بعناية.
          </h2>


          <p
            className="
              mt-6
              max-w-xl
              font-body
              text-base
              leading-relaxed
              text-charcoal/65
            "
          >
            لأن الفرشة هي المساحة التي تبدأ منها رحلتك،
            اخترنا خامات طبيعية تمنحك راحة، ثبات،
            وإحساسًا أفضل في كل ممارسة.
          </p>

        </Reveal>



        <div
          className="
            mt-20
            grid
            grid-cols-1
            gap-16
            md:grid-cols-2
            md:gap-10
          "
        >

          {MATERIALS.map((material, i) => (

            <Reveal
              key={material.name}
              delay={i * 0.1}
            >

              <div className="group">

                <div
                  className="
                    overflow-hidden
                    rounded-3xl
                  "
                >

                  <PhotoPlaceholder
                    label={`${material.name} texture`}
                    tone={material.tone}
                    aspect="aspect-[4/3]"
                    className="
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />

                </div>


                <div className="mt-8">

                  <p
                    className="
                      font-body
                      text-xs
                      uppercase
                      tracking-[0.2em]
                      text-soft-brown-dark
                    "
                  >
                    {material.english}
                  </p>


                  <h3
                    className="
                      mt-3
                      font-display
                      text-3xl
                      text-charcoal
                    "
                  >
                    {material.name}
                  </h3>


                  <p
                    className="
                      mt-4
                      max-w-md
                      font-body
                      text-base
                      leading-relaxed
                      text-charcoal/65
                    "
                  >
                    {material.text}
                  </p>

                </div>

              </div>

            </Reveal>

          ))}

        </div>

      </Container>

    </section>
  );
}