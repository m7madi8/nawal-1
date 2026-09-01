import LegacyPage from '@/components/LegacyPage';

export const metadata = {
  title: 'Retreats',
  description: 'The next Nawal Yoga retreat is being prepared — the place, the days, and the quiet in between.',
};

const html = `
<main class="ny-inner ny-world">
  <section class="ny-world-hero" aria-labelledby="retreats-title">
    <div class="ny-world-hero__media" aria-hidden="true">
      <img src="/media/1.jpg" alt="" width="1600" height="1200" decoding="async">
    </div>
    <div class="ny-world-hero__scrim" aria-hidden="true"></div>
    <div class="ny-world-hero__inner container">
      <a href="/" class="ny-world-hero__back" data-en="Back home" data-ar="العودة للرئيسية">Back home</a>
      <span class="eyebrow" data-en="03 — Go somewhere deeper" data-ar="٠٣ — اذهبي أعمق">03 — Go somewhere deeper</span>
      <h1 id="retreats-title" class="display-xl ny-world-hero__title" data-en="Retreats" data-ar="الرحلات">Retreats</h1>
      <p class="body-l ny-world-hero__lead" data-en="Leave everyday life behind, even if only for a few days." data-ar="اتركي يومياتك خلفك، ولو لأيام قليلة فقط.">Leave everyday life behind, even if only for a few days.</p>
    </div>
  </section>

  <section class="ny-empty" aria-labelledby="retreats-soon-title">
    <div class="ny-empty__inner">
      <span class="ny-empty__rule" aria-hidden="true"></span>
      <span class="eyebrow" data-en="In preparation" data-ar="قيد التحضير">In preparation</span>
      <h2 id="retreats-soon-title" class="ny-empty__title">
        <span data-en="The next retreat" data-ar="الرحلة القادمة">The next retreat</span>
        <span class="italic" data-en="is being prepared." data-ar="تُحضَّر الآن.">is being prepared.</span>
      </h2>
      <p class="ny-empty__text" data-en="The place, the days, and the quiet in between are still being woven. Details will arrive when they are ready." data-ar="المكان، والأيام، والهدوء بينهما ما زالت تُنسَج. التفاصيل تصل حين تكون جاهزة.">The place, the days, and the quiet in between are still being woven. Details will arrive when they are ready.</p>
      <span class="ny-empty__mark" data-en="Soon" data-ar="قريباً">Soon</span>
    </div>

    <article class="ny-door" hidden data-retreat-listing-hidden="zanzibar"></article>
    <article class="ny-door" hidden data-retreat-listing-hidden="dahab"></article>
    <article class="ny-door" hidden data-retreat-listing-hidden="wadi-rum"></article>
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
      currentNav="retreats"
    />
  );
}
