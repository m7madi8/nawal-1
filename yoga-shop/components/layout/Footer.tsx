import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";
import Link from "next/link";

const FOOTER_LINKS = {
  اكتشفي: [
    { href: SITE.experiences, label: "التجارب", external: true },
    { href: SITE.yoga, label: "اليوغا", external: true },
    { href: SITE.retreats, label: "الرحلات", external: true },
    { href: SITE.wellbeing, label: "العناية", external: true },
    { href: SITE.shop, label: "المتجر" },
  ],
  التشكيلة: [
    { href: "/product/the-mat", label: "السجادة" },
    { href: "/product/the-block", label: "البلوك" },
    { href: "/#departments", label: "الأقسام" },
  ],
  نوال: [
    { href: SITE.home, label: "الموقع", external: true },
    { href: SITE.journal, label: "المدوّنة", external: true },
    { href: "/#faq", label: "الأسئلة الشائعة" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-charcoal/10 bg-warm-white pb-10 pt-section">
      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a href={SITE.home} className="font-display text-3xl tracking-tight text-charcoal">
              نوال يوغا
            </a>
            <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-charcoal/60">
              يوغا ورحلات وتجارب للحظات التي تحتاجين فيها أن تتباطئي، تتنفّسي بعمق، وتشعري من جديد.
            </p>
            <p className="mt-5 font-body text-xs text-soft-brown-dark">
              فلسطين · الداخل الفلسطيني
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-body text-xs uppercase tracking-[0.2em] text-charcoal/40">
                {heading}
              </h3>
              <ul className="mt-6 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        className="font-body text-sm text-charcoal/70 transition-colors hover:text-charcoal"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="font-body text-sm text-charcoal/70 transition-colors hover:text-charcoal"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-charcoal/10 pt-8 font-body text-xs text-charcoal/40 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} نوال يوغا. جميع الحقوق محفوظة.</span>
          <div className="flex gap-6">
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="transition hover:text-charcoal/70">
              واتساب
            </a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="transition hover:text-charcoal/70">
              إنستغرام
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
