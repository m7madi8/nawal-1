import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const BENEFITS = [
  {
    title: "راحة بكل جلسة",
    text:
      "خامة ناعمة ومريحة تعطيك إحساس أفضل أثناء التمرين، من أول حركة لآخر نفس.",
  },
  {
    title: "ثبات تحتاجيه",
    text:
      "مصممة لتبقى ثابتة تحتك حتى تركزي على تمرينك بدون تشتيت.",
  },
  {
    title: "جودة تعيش معك",
    text:
      "اخترنا خامات متينة لترافقك في روتينك اليومي لفترة طويلة.",
  },
  {
    title: "اختيار واعي",
    text:
      "تفاصيل بسيطة وتصميم هادئ لأننا نؤمن أن القليل المصنوع بإتقان يكفي.",
  },
];


function IconMark({ index }: { index: number }) {
  const paths = [
    <path
      key="1"
      d="M12 3c-3 5-6 8-6 12a6 6 0 0 0 12 0c0-4-3-7-6-12Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />,

    <path
      key="2"
      d="M5 12h14M12 5v14"
      strokeLinecap="round"
    />,

    <path
      key="3"
      d="M4 12a8 8 0 1 0 16 0"
      strokeLinecap="round"
    />,

    <path
      key="4"
      d="M12 3c5 3 8 6 8 10a8 8 0 0 1-16 0c0-4 3-7 8-10Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />,
  ];

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      className="h-8 w-8 text-soft-brown-dark"
    >
      {paths[index % paths.length]}
    </svg>
  );
}


export function Benefits() {
  return (
    <section className="bg-cream py-section">

      <Container>

        <Reveal className="max-w-xl">

          <p className="
            font-body
            text-eyebrow
            uppercase
            text-soft-brown-dark
          ">
            لماذا نوال يوغا؟
          </p>


          <h2 className="
            mt-4
            font-display
            text-display-md
            text-charcoal
          ">
            تفاصيل صغيرة،
            <br />
            تصنع فرقًا كبيرًا.
          </h2>

        </Reveal>


        <div
          className="
            mt-20
            grid
            grid-cols-1
            gap-x-10
            gap-y-16
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {BENEFITS.map((benefit, i) => (

            <Reveal
              key={benefit.title}
              delay={i * 0.06}
            >

              <IconMark index={i} />

              <h3 className="
                mt-6
                font-display
                text-lg
                text-charcoal
              ">
                {benefit.title}
              </h3>


              <p className="
                mt-2
                font-body
                text-sm
                leading-relaxed
                text-charcoal/60
              ">
                {benefit.text}
              </p>

            </Reveal>

          ))}

        </div>

      </Container>

    </section>
  );
}