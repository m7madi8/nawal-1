import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";

export function CTA() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-cream
        py-section
      "
    >

      

      <Container
        className="
          relative
          flex
          flex-col
          items-center
          text-center
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
            ابدئي رحلتك
          </p>


          <h2
            className="
              mt-5
              max-w-3xl
              font-display
              text-display-md
              leading-tight
              text-charcoal
            "
          >
            مساحتك الخاصة تبدأ
            <br />
            من أول نفس.
          </h2>


          <p
            className="
              mx-auto
              mt-6
              max-w-md
              font-body
              leading-relaxed
              text-charcoal/60
            "
          >
            اختاري فرشتك واصنعي لحظتك اليومية
            للهدوء، الحركة، والاهتمام بنفسك.
          </p>

        </Reveal>


        <Reveal
          delay={0.1}
          className="mt-10"
        >

          <LinkButton
            href="#departments"
            size="lg"
          >
            اكتشفي المجموعة
          </LinkButton>

        </Reveal>


      </Container>

    </section>
  );
}