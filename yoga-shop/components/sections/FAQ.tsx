import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

const GENERAL_FAQ = [
  {
    question: "هل الفرشة مناسبة للمبتدئات؟",
    answer:
      "أكيد. صممناها لتكون مريحة وثابتة سواء كنتِ تبدأين أول جلسة يوغا أو تمارسينها بشكل يومي.",
  },
  {
    question: "ما الذي يميز فرشة نوال يوغا؟",
    answer:
      "اخترنا خامات تعطي توازن بين الراحة والثبات، حتى تحصلي على جلسة أكثر راحة بدون إحساس الفرش التقليدية الخفيفة.",
  },
  {
    question: "هل الفرشة تنزلق أثناء التمرين؟",
    answer:
      "السطح مصمم ليعطيكِ ثبات أفضل أثناء الحركات المختلفة، مع إحساس مريح تحت اليدين والقدمين.",
  },
  {
    question: "أين يتم التوصيل؟",
    answer:
      "نوصل لجميع المناطق في فلسطين والداخل المحتل، ونعمل على تجهيز طلبك بعناية حتى توصلك الفرشة بأفضل حالة.",
  },
  {
    question: "كيف أحافظ على الفرشة؟",
    answer:
      "يكفي تنظيفها بقطعة قماش رطبة بعد الاستخدام وتركها تجف بشكل طبيعي للحفاظ على جودتها لفترة أطول.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="
        bg-sand
        py-section
      "
    >
      <Container className="max-w-3xl">

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
              text-display-md
              text-charcoal
            "
          >
            كل شيء قبل ما تبدأي.
          </h2>

          <p
            className="
              mt-5
              max-w-xl
              font-body
              leading-relaxed
              text-charcoal/60
            "
          >
            جمعنا أكثر الأسئلة التي تساعدك تختاري فرشتك
            وتبدئي رحلة اليوغا براحة وثقة.
          </p>

        </Reveal>


        <Reveal
          delay={0.1}
          className="mt-16"
        >
          <Accordion items={GENERAL_FAQ} />
        </Reveal>

      </Container>
    </section>
  );
}