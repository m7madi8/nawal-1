import LegacyPage from '@/components/LegacyPage';
import {
  RESHAPE_INSTAGRAM_URL,
  RESHAPE_STUDIO,
  reshapeWhatsAppUrl,
} from '@/lib/yogaContacts';

export const metadata = {
  title: 'Baqa al-Gharbiyye Yoga',
  description:
    'Power Yoga with Nawal Omar in Baqa al-Gharbiyye — every Wednesday at 7:20 PM at Reshape studio. Contact @reshape.pilates or WhatsApp.',
};

const whatsappDigits = RESHAPE_STUDIO.whatsapp.replace(/\D/g, '');
const waHref = reshapeWhatsAppUrl(
  'مرحبا، وصلت عليكم من موقع نوال يوغا بخصوص حصة Power Yoga مع نوال في Reshape studio بباقة الغربية (كل أربعاء الساعة 7:20 مساء). بدي أعرف تفاصيل أكتر.',
);

const html = `
<main class="baqa-main ny-inner" data-reshape-whatsapp="${whatsappDigits}">
  <section class="baqa-hero" aria-labelledby="baqa-title">
    <div class="baqa-shell">
      <div class="baqa-hero__intro">
        <p class="baqa-kicker" data-i18n="baqa_page_label">Baqa al-Gharbiyye</p>
        <h1 id="baqa-title" class="baqa-title" data-i18n="baqa_page_title">Baqa al-Gharbiyye Yoga</h1>
        <p class="baqa-lead" data-i18n="baqa_page_intro">Power Yoga with Nawal — a dynamic evening practice that builds strength, mobility, and presence.</p>
      </div>
    </div>
  </section>

  <section class="baqa-body" aria-labelledby="baqa-class-title">
    <div class="baqa-shell">
      <div class="baqa-grid">
        <div class="baqa-visual baqa-photo-panel baqa-reveal">
          <img
            src="/media/baqa/1000245792.jpg"
            alt=""
            width="1080"
            height="1624"
            loading="eager"
            decoding="async"
            class="baqa-photo"
            data-i18n-attr="alt:baqa_hero_img_alt"
          >
        </div>
        <article class="baqa-card">
          <div class="baqa-studio">
            <img
              src="/media/baqa/1000245772-removebg-preview.png"
              alt=""
              width="500"
              height="500"
              loading="lazy"
              decoding="async"
              class="baqa-studio__logo"
              data-i18n-attr="alt:baqa_logo_alt"
            >
          </div>
          <span class="baqa-class-day" data-i18n="baqa_class_day">Wednesday</span>
          <h2 id="baqa-class-title" class="baqa-class-name" data-i18n="baqa_class_title">Power Yoga</h2>
          <p class="baqa-class-desc" data-i18n="baqa_class_desc">An energizing evening practice that builds strength, mobility, and confidence — with clear guidance so every level can grow safely.</p>
          <p class="baqa-meta" data-i18n="baqa_class_meta">Wednesday · 19:20 · Reshape studio, Baqa al-Gharbiyye</p>
          <p class="baqa-host"><span data-i18n="baqa_host_label">Hosted at</span> <strong data-i18n="baqa_host_name">Reshape studio</strong></p>
          <a href="${RESHAPE_INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer" class="baqa-ig-link" data-i18n-attr="aria-label:baqa_ig_aria">
            <svg fill="currentColor" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            <span data-i18n="baqa_ig_handle">@reshape.pilates</span>
          </a>
        </article>
      </div>

      <div class="baqa-contact">
        <h3 class="baqa-contact__title" data-i18n="baqa_contact_title">Book or ask</h3>
        <p class="baqa-contact__text" data-i18n="baqa_contact_text">Contact Reshape studio on WhatsApp — your message will mention you came through the Nawal Yoga website.</p>
        <div class="baqa-contact__actions">
          <a href="${waHref}" data-baqa-wa target="_blank" rel="noopener noreferrer" class="baqa-contact__btn baqa-contact__btn--wa" data-i18n-attr="aria-label:baqa_wa_aria">
            <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span data-i18n="baqa_contact_btn">Contact on WhatsApp</span>
          </a>
        </div>
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
      styles={['/legacy/css/baqa-yoga.css']}
      scripts={[
        { src: '/legacy/js/i18n.js', attrs: '  ' },
        { src: '/legacy/js/baqa-yoga.js', attrs: '  ' },
      ]}
      inlineScripts={[]}
      html={html}
      currentNav="yoga"
    />
  );
}
