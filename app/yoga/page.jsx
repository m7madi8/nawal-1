import LegacyPage from '@/components/LegacyPage';

export const metadata = {
  title: 'Yoga',
  description: 'Yoga with Nawal in Haifa — Vinyasa, meditation and a supportive community by the sea.',
};

const html = `
<main class="ny-inner ny-world">
  <section class="ny-world-hero" aria-labelledby="yoga-title">
    <div class="ny-world-hero__media" aria-hidden="true">
      <img src="/media/home/1w.jpeg" alt="" width="1600" height="2000" decoding="async">
    </div>
    <div class="ny-world-hero__scrim" aria-hidden="true"></div>
    <div class="ny-world-hero__inner container">
      <a href="/" class="ny-world-hero__back" data-en="Back home" data-ar="العودة للرئيسية">Back home</a>
      <span class="eyebrow" data-en="02 — Move · Breathe · Practice" data-ar="٠٢ — تحرّكي · تنفّسي · مارسي">02 — Move · Breathe · Practice</span>
      <h1 id="yoga-title" class="display-xl ny-world-hero__title" data-en="Yoga" data-ar="اليوغا">Yoga</h1>
      <p class="body-l ny-world-hero__lead" data-en="Move with intention — on the mat, in the studio, and in community." data-ar="تحرّكي بنيّة — على السجادة، في الاستوديو، ومع المجتمع.">Move with intention — on the mat, in the studio, and in community.</p>
    </div>
  </section>

  <section class="ny-section ny-world-list">
    <div class="container">
      <div class="ny-door-grid">
        <a href="/workshops/haifa" class="ny-door reveal">
          <div class="ny-door__media" aria-hidden="true">
            <img src="/media/haifa/hero.jpg" alt="" width="1600" height="2000" loading="lazy" decoding="async">
          </div>
          <div class="ny-door__scrim" aria-hidden="true"></div>
          <span class="ny-door__num" aria-hidden="true">01</span>
          <div class="ny-door__copy">
            <span class="eyebrow" data-en="Haifa" data-ar="حيفا">Haifa</span>
            <h2 class="ny-door__title" data-en="Haifa Yoga" data-ar="يوغا حيفا">Haifa Yoga</h2>
            <p class="ny-door__text" data-en="Holistic Vinyasa, meditation and a supportive community by the sea." data-ar="فينياسا شمولية، تأمل، ومجتمع داعم بجانب البحر.">Holistic Vinyasa, meditation and a supportive community by the sea.</p>
            <span class="ny-door__cta" data-en="Explore Haifa" data-ar="اكتشفي حيفا">Explore Haifa</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</main>
`;

export default function Page() {
  return (
    <LegacyPage
      lang="en"
      dir="rtl"
      bodyClassName=""
      styles={[]}
      scripts={[]}
      inlineScripts={[]}
      html={html}
      currentNav="yoga"
    />
  );
}
