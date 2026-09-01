import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-cream">
      <Container className="text-center">
        <p className="font-body text-eyebrow uppercase text-soft-brown-dark">
          404
        </p>
        <h1 className="mt-4 font-display text-display-md text-charcoal">
          هذه الصفحة خرجت عن السجادة.
        </h1>
        <p className="mt-4 font-body text-base text-charcoal/60">
          الصفحة التي تبحثين عنها غير موجودة.
        </p>
        <LinkButton href="/" size="lg" className="mt-10">
          عودي إلى المتجر
        </LinkButton>
      </Container>
    </section>
  );
}
