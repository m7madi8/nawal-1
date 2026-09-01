import LegacyPage from '@/components/LegacyPage';

export const metadata = {
  title: 'Shop',
  description: 'The Nawal Yoga edit: a cork-and-rubber mat and a solid cork block, chosen with the same care as the practice itself.',
};

const shopScript = `(function(){
  var shopLinks = Array.prototype.slice.call(document.querySelectorAll('[data-shop-nav]'));
  var shopSections = shopLinks.map(function(link){ return document.querySelector(link.getAttribute('href')); }).filter(Boolean);
  function setActiveShopNav(id){
    shopLinks.forEach(function(link){
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
    });
  }
  if ('IntersectionObserver' in window && shopSections.length) {
    var navIo = new IntersectionObserver(function(entries){
      var visible = entries.filter(function(entry){ return entry.isIntersecting; })
        .sort(function(a, b){ return b.intersectionRatio - a.intersectionRatio; })[0];
      if (visible && visible.target.id) setActiveShopNav(visible.target.id);
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] });
    shopSections.forEach(function(section){ navIo.observe(section); });
  }
  document.querySelectorAll('[data-shop-swatches]').forEach(function(group){
    var section = group.closest('.shop-product');
    var image = section && section.querySelector('.shop-product__media img');
    group.addEventListener('click', function(event){
      var btn = event.target.closest('.shop-swatch');
      if (!btn || !group.contains(btn)) return;
      group.querySelectorAll('.shop-swatch').forEach(function(el){
        var on = el === btn;
        el.classList.toggle('is-selected', on);
        el.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      var src = btn.getAttribute('data-image');
      if (image && src) image.src = src;
    });
  });
})();`;

function headingLines(id, className, lines) {
  const spans = lines
    .map(
      (line) =>
        `          <span class="shop-heading-line${line.italic ? ' italic' : ''}" data-en="${line.en}" data-ar="${line.ar}">${line.en}</span>`,
    )
    .join('\n');
  return `<h2${id ? ` id="${id}"` : ''} class="${className}">\n${spans}\n        </h2>`;
}

function specCell(dtEn, dtAr, ddEn, ddAr) {
  return `          <div>
            <dt data-en="${dtEn}" data-ar="${dtAr}">${dtEn}</dt>
            <dd data-en="${ddEn}" data-ar="${ddAr}">${ddEn}</dd>
          </div>`;
}

const VISA_MARK = `<svg class="shop-pay-logo shop-pay-logo--visa" viewBox="0 0 48 16" aria-hidden="true"><rect width="48" height="16" rx="2.2" fill="#1A1F71"/><text x="24" y="11.6" text-anchor="middle" fill="#F7B600" font-family="Georgia, 'Times New Roman', serif" font-size="9.2" font-style="italic" font-weight="700" letter-spacing="0.6">VISA</text></svg>`;
const MASTERCARD_MARK = `<svg class="shop-pay-logo shop-pay-logo--mastercard" viewBox="0 0 32 20" aria-hidden="true"><circle cx="12.4" cy="10" r="7.2" fill="#EB001B"/><circle cx="19.6" cy="10" r="7.2" fill="#F79E1B"/><path d="M16 4.55a7.2 7.2 0 0 1 0 10.9 7.2 7.2 0 0 1 0-10.9Z" fill="#FF5F00"/></svg>`;
const PAYPAL_MARK = `<svg class="shop-pay-logo shop-pay-logo--paypal" viewBox="0 0 64 16" aria-hidden="true"><text x="0" y="12.4" fill="#003087" font-family="Verdana, Arial, sans-serif" font-size="11.2" font-weight="700">Pay</text><text x="24.2" y="12.4" fill="#009CDE" font-family="Verdana, Arial, sans-serif" font-size="11.2" font-weight="700">Pal</text></svg>`;
const CASH_MARK = `<svg class="shop-pay-logo shop-pay-logo--icon" viewBox="0 0 24 16" aria-hidden="true"><rect x="1.2" y="2.2" width="21.6" height="11.6" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="12" cy="8" r="2.3" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M4 5.2h1.6M18.4 10.8H20" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`;
const WHATSAPP_MARK = `<svg class="shop-pay-logo shop-pay-logo--icon" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 1.2A6.8 6.8 0 0 0 2.3 11.7L1.2 14.8l3.2-1A6.8 6.8 0 1 0 8 1.2Zm3.8 9.6c-.16.45-.94.86-1.32.91-.34.05-.77.08-1.24-.08-.29-.1-.65-.21-1.12-.41-1.97-.85-3.25-2.82-3.35-2.95-.1-.13-.8-1.06-.8-2.03 0-.96.5-1.44.68-1.64.18-.2.39-.25.52-.25h.38c.12 0 .29-.05.45.34.16.4.55 1.38.6 1.48.05.1.08.21 0 .34-.08.13-.12.21-.24.33-.12.12-.25.27-.36.36-.12.1-.24.2-.1.4.13.2.6.99 1.29 1.6.89.8 1.64 1.05 1.87 1.17.23.12.37.1.5-.06.14-.16.58-.67.73-.9.16-.23.31-.19.52-.11.21.08 1.34.63 1.57.75.23.12.38.18.44.28.05.1.05.58-.11 1.03Z"/></svg>`;

function paymentMarks() {
  return `<div class="shop-pay-marks">
            <p class="shop-pay-marks__label" data-en="Payment methods" data-ar="طرق الدفع">Payment methods</p>
            <ul class="shop-pay-marks__list">
              <li class="shop-pay-mark" title="Visa">${VISA_MARK}<span class="visually-hidden">Visa</span></li>
              <li class="shop-pay-mark" title="Mastercard">${MASTERCARD_MARK}<span class="visually-hidden">Mastercard</span></li>
              <li class="shop-pay-mark" title="PayPal">${PAYPAL_MARK}<span class="visually-hidden">PayPal</span></li>
              <li class="shop-pay-mark" title="Cash on delivery">${CASH_MARK}<span data-en="Cash" data-ar="كاش">Cash</span></li>
              <li class="shop-pay-mark" title="WhatsApp">${WHATSAPP_MARK}<span>WhatsApp</span></li>
            </ul>
          </div>`;
}

function productSection({
  id,
  reverse,
  bone,
  indexEn,
  indexAr,
  titleEn,
  titleAr,
  titleId,
  tagEn,
  tagAr,
  descEn,
  descAr,
  priceEn,
  priceAr,
  priceUsd,
  img,
  imgBlack,
  imgPink,
  imgAltEn,
  imgAltAr,
  specs,
}) {
  const specHtml = specs.map((s) => specCell(s.dtEn, s.dtAr, s.ddEn, s.ddAr)).join('\n');
  const orderAttrs = `data-shop-order data-product="${id}" data-product-en="${titleEn}" data-product-ar="${titleAr}" data-price="${priceUsd}"`;
  return `
  <section class="section${bone ? ' section--bone' : ''} shop-product${reverse ? ' shop-product--reverse' : ''}" id="${id}" aria-labelledby="${titleId}">
    <div class="container shop-product__layout">
      <div class="shop-product__media-col reveal">
        <div class="editorial-image shop-product__media">
          <img
            src="${img}"
            alt="${imgAltEn}"
            data-en-alt="${imgAltEn}"
            data-ar-alt="${imgAltAr}"
            width="800"
            height="1000"
            loading="lazy"
            decoding="async"
          >
        </div>
      </div>
      <div class="shop-product__info reveal reveal-delay-1">
        <span class="eyebrow shop-product__index" data-en="${indexEn}" data-ar="${indexAr}">${indexEn}</span>
        <h2 id="${titleId}" class="display-l shop-product__title" data-en="${titleEn}" data-ar="${titleAr}">${titleEn}</h2>
        <p class="shop-product__tagline" data-en="${tagEn}" data-ar="${tagAr}">${tagEn}</p>
        <p class="shop-product__desc" data-en="${descEn}" data-ar="${descAr}">${descEn}</p>
        <div class="shop-swatches" data-shop-swatches role="group" aria-label="Colourways">
          <button type="button" class="shop-swatch is-selected" aria-pressed="true" data-image="${imgBlack}" data-color="black" data-color-en="Black" data-color-ar="أسود">
            <i style="background:#1A1714" aria-hidden="true"></i>
            <span data-en="Black" data-ar="أسود">Black</span>
          </button>
          <button type="button" class="shop-swatch" aria-pressed="false" data-image="${imgPink}" data-color="pink" data-color-en="Soft Pink" data-color-ar="وردي هادئ">
            <i style="background:#E3C2C2" aria-hidden="true"></i>
            <span data-en="Soft Pink" data-ar="وردي هادئ">Soft Pink</span>
          </button>
        </div>
        <div class="shop-product__cta-row">
          <p class="shop-product__price" data-en="${priceEn}" data-ar="${priceAr}">${priceEn}</p>
          <div class="shop-product__actions">
            <button type="button" class="btn btn--primary" ${orderAttrs} data-en="Order" data-ar="اطلبي">Order</button>
          </div>
        </div>
        ${paymentMarks()}
        <dl class="shop-specs">
${specHtml}
        </dl>
      </div>
    </div>
  </section>`;
}

const html = `
<main class="ny-inner shop-page-inner">

  <section class="shop-hero" aria-labelledby="shop-hero-title">
    <div class="container shop-hero__grid">
      <div class="shop-hero__copy reveal">
        <div class="shop-hero__kicker">
          <span class="eyebrow" data-en="05 — Nawal at Home" data-ar="٠٥ — نوال في بيتك">05 — Nawal at Home</span>
          <p class="shop-hero__crumb">
            <a href="/" data-en="Home" data-ar="الرئيسية">Home</a>
            <span aria-hidden="true"> · </span>
            <span data-en="Shop" data-ar="المتجر">Shop</span>
          </p>
        </div>
        <h1 id="shop-hero-title" class="display-xl shop-hero__title">
          <span class="shop-heading-line" data-en="Practice," data-ar="مارسي،">Practice,</span>
          <span class="shop-heading-line italic" data-en="at home." data-ar="من بيتك.">at home.</span>
        </h1>
        <p class="body-l text-muted shop-hero__lead" data-en="Two pieces. Chosen with the same care as the practice itself — a quiet mat, and the block that holds you." data-ar="قطعتان فقط. اخترناهما بنفس العناية التي نضعها في الممارسة — سجادة هادئة، وبلوك يسندك.">Two pieces. Chosen with the same care as the practice itself — a quiet mat, and the block that holds you.</p>
        <div class="shop-hero__actions">
          <a href="#departments" class="btn btn--primary" data-en="Shop the edit" data-ar="تسوّقي التشكيلة">Shop the edit</a>
          <a href="#mat" class="btn btn--ghost" data-en="Begin with the mat" data-ar="ابدئي من السجادة">Begin with the mat</a>
        </div>
        <dl class="shop-hero__meta">
          <div>
            <dt data-en="The edit" data-ar="التشكيلة">The edit</dt>
            <dd data-en="Two pieces, two colourways" data-ar="قطعتان، ولونان لكل منهما">Two pieces, two colourways</dd>
          </div>
          <div>
            <dt data-en="Materials" data-ar="الخامات">Materials</dt>
            <dd data-en="Natural cork &amp; rubber" data-ar="فلين ومطاط طبيعي">Natural cork &amp; rubber</dd>
          </div>
        </dl>
      </div>

      <div class="shop-hero__media-wrap reveal reveal-delay-1">
        <span class="shop-hero__ghost" aria-hidden="true">05</span>
        <div class="editorial-image shop-hero__media">
          <img
            src="/media/products/nawal-prod.png"
            alt="Nawal Yoga products"
            data-en-alt="Nawal Yoga products"
            data-ar-alt="منتجات نوال يوغا"
            width="720"
            height="900"
            decoding="async"
          >
        </div>
      </div>
    </div>
  </section>

  <nav class="shop-subnav" aria-label="Shop sections">
    <div class="container">
      <div class="shop-subnav__list">
        <a href="#departments" data-shop-nav data-en="Departments" data-ar="الأقسام">Departments</a>
        <a href="#mat" data-shop-nav data-en="The Mat" data-ar="السجادة">The Mat</a>
        <a href="#block" data-shop-nav data-en="The Block" data-ar="البلوك">The Block</a>
        <a href="#materials" data-shop-nav data-en="Materials" data-ar="الخامات">Materials</a>
        <a href="#faq" data-shop-nav data-en="Questions" data-ar="الأسئلة">Questions</a>
      </div>
    </div>
  </nav>

  <section class="section" id="departments" aria-labelledby="shop-depts-title">
    <div class="container">
      <div class="shop-depts__head reveal">
        <span class="eyebrow" data-en="Shop by piece" data-ar="تسوّقي حسب القطعة">Shop by piece</span>
        ${headingLines('shop-depts-title', 'display-l shop-depts__title', [
          { en: 'Two departments.', ar: 'قسمان فقط.' },
          { en: 'Nothing extra.', ar: 'بلا زيادة.' },
        ])}
      </div>

      <div class="shop-depts__grid">
        <a href="#mat" class="shop-dept reveal">
          <div class="editorial-image shop-dept__media">
            <img src="/media/products/pink-matt.png" alt="" width="720" height="900" loading="lazy" decoding="async">
          </div>
          <div class="shop-dept__caption">
            <span class="shop-dept__index" aria-hidden="true">01</span>
            <div>
              <span class="display-m shop-dept__name" data-en="The Mat" data-ar="السجادة">The Mat</span>
              <p class="body-l text-muted shop-dept__copy" data-en="A quiet surface for a noisy world." data-ar="سطح هادئ لعالم صاخب.">A quiet surface for a noisy world.</p>
              <span class="text-link shop-dept__cta"><span data-en="Enter" data-ar="ادخلي">Enter</span> <span class="arrow" data-en="→" data-ar="←">→</span></span>
            </div>
          </div>
        </a>

        <a href="#block" class="shop-dept reveal reveal-delay-1">
          <div class="editorial-image shop-dept__media">
            <img src="/media/products/black-blocks.png" alt="" width="720" height="900" loading="lazy" decoding="async">
          </div>
          <div class="shop-dept__caption">
            <span class="shop-dept__index" aria-hidden="true">02</span>
            <div>
              <span class="display-m shop-dept__name" data-en="The Block" data-ar="البلوك">The Block</span>
              <p class="body-l text-muted shop-dept__copy" data-en="Support, without apology." data-ar="دعم، دون اعتذار.">Support, without apology.</p>
              <span class="text-link shop-dept__cta"><span data-en="Enter" data-ar="ادخلي">Enter</span> <span class="arrow" data-en="→" data-ar="←">→</span></span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
${productSection({
  id: 'mat',
  reverse: false,
  bone: true,
  indexEn: '01 — The Mat',
  indexAr: '٠١ — السجادة',
  titleEn: 'Yoga Mat',
  titleAr: 'سجادة اليوغا',
  titleId: 'mat-title',
  tagEn: 'A quiet surface for a noisy world.',
  tagAr: 'سطح هادئ لعالم صاخب.',
  descEn: 'Natural cork over rubber. Warm underfoot, steady through the practice, folded again at dusk. This is the first thing that meets the floor when the rest of the day has not begun.',
  descAr: 'فلين طبيعي فوق مطاط. دافئة تحت القدم، ثابتة طوال الممارسة، وتُطوى من جديد عند الغسق. أول شيء يلتقي بالأرض قبل أن يبدأ باقي اليوم.',
  priceEn: 'From $128',
  priceAr: 'يبدأ من ١٢٨ $',
  priceUsd: 128,
  img: '/media/products/matt.png',
  imgBlack: '/media/products/matt.png',
  imgPink: '/media/products/pink-matt.png',
  imgAltEn: 'Nawal Yoga mat',
  imgAltAr: 'سجادة نوال يوغا',
  specs: [
    { dtEn: 'Size', dtAr: 'الأبعاد', ddEn: '183 × 68 cm', ddAr: '١٨٣ × ٦٨ سم' },
    { dtEn: 'Thickness', dtAr: 'السماكة', ddEn: '4 mm', ddAr: '٤ مم' },
    { dtEn: 'Surface', dtAr: 'السطح', ddEn: 'Natural cork', ddAr: 'فلين طبيعي' },
    { dtEn: 'Base', dtAr: 'القاعدة', ddEn: 'Natural tree rubber', ddAr: 'مطاط شجري طبيعي' },
  ],
})}
${productSection({
  id: 'block',
  reverse: true,
  bone: false,
  indexEn: '02 — The Block',
  indexAr: '٠٢ — البلوك',
  titleEn: 'Yoga Block',
  titleAr: 'بلوك اليوغا',
  titleId: 'block-title',
  tagEn: 'Support, without apology.',
  tagAr: 'دعم، دون اعتذار.',
  descEn: 'Pressed from a single dense cork form. Heavy in the hand, stable under real weight. Made to be seen — not forgotten in a basket.',
  descAr: 'مضغوط من شكل فلين كثيف واحد. ثقيل في اليد، مستقر تحت وزن حقيقي. صُمم ليُرى — لا ليُنسى في سلة.',
  priceEn: 'From $48',
  priceAr: 'يبدأ من ٤٨ $',
  priceUsd: 48,
  img: '/media/products/black-blocks.png',
  imgBlack: '/media/products/black-blocks.png',
  imgPink: '/media/products/block.png',
  imgAltEn: 'Nawal Yoga block',
  imgAltAr: 'بلوك نوال يوغا',
  specs: [
    { dtEn: 'Size', dtAr: 'الأبعاد', ddEn: '23 × 15 × 10 cm', ddAr: '٢٣ × ١٥ × ١٠ سم' },
    { dtEn: 'Weight', dtAr: 'الوزن', ddEn: '0.7 kg', ddAr: '٠٫٧ كجم' },
    { dtEn: 'Material', dtAr: 'المادة', ddEn: 'Solid natural cork', ddAr: 'فلين طبيعي صلب' },
    { dtEn: 'Finish', dtAr: 'التشطيب', ddEn: 'Plant-based seal', ddAr: 'مانع نباتي' },
  ],
})}

  <section class="section section--bone" id="materials" aria-labelledby="materials-title">
    <div class="container">
      <div class="shop-section-head shop-section-head--wide reveal">
        <span class="eyebrow" data-en="Materials" data-ar="الخامات">Materials</span>
        ${headingLines('materials-title', 'display-l shop-section-head__title shop-section-head__title--flow', [
          { en: 'Everything that touches you,', ar: 'كل ما يلمسكِ،' },
          { en: 'chosen slowly.', ar: 'اخترناه بتمهّل.' },
        ])}
      </div>
      <div class="shop-materials__grid">
        <article class="shop-material reveal">
          <p class="shop-material__label" data-en="Natural Cork" data-ar="فلين طبيعي">Natural Cork</p>
          <h3 class="display-m shop-material__title" data-en="Cork" data-ar="فلين">Cork</h3>
          <p class="body-l text-muted shop-material__copy" data-en="Harvested without cutting the tree. Naturally antimicrobial, warmer with use, and a grip that deepens as you do." data-ar="يُحصد دون قطع الشجرة. مضاد للميكروبات طبيعياً، يدفأ مع الاستخدام، وتمسّكه يزداد كلما احتجتِ إليه أكثر.">Harvested without cutting the tree. Naturally antimicrobial, warmer with use, and a grip that deepens as you do.</p>
        </article>
        <article class="shop-material reveal reveal-delay-1">
          <p class="shop-material__label" data-en="Natural Rubber" data-ar="مطاط طبيعي">Natural Rubber</p>
          <h3 class="display-m shop-material__title" data-en="Rubber" data-ar="مطاط">Rubber</h3>
          <p class="body-l text-muted shop-material__copy" data-en="Tapped from certified groves, not synthesised. Density that cushions joints without going soft over time." data-ar="يُستخرج من مزارع معتمدة، لا يُصنع. كثافة تحمي المفاصل دون أن تلين مع الوقت.">Tapped from certified groves, not synthesised. Density that cushions joints without going soft over time.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="why-title">
    <div class="container">
      <div class="shop-section-head shop-section-head--wide reveal">
        <span class="eyebrow" data-en="The edit" data-ar="التشكيلة">The edit</span>
        ${headingLines('why-title', 'display-l shop-section-head__title shop-section-head__title--flow', [
          { en: 'We did not make more.', ar: 'لم نصنع الكثير.' },
          { en: 'We made what lasts.', ar: 'صنعنا ما يدوم.' },
        ])}
      </div>
      <div class="shop-why__grid">
      <p class="body-l text-muted shop-why__lead reveal" data-en="A yoga practice does not ask for a full shelf. It asks for tools that feel like they belong in the room." data-ar="ممارسة اليوغا لا تطلب رفّاً ممتلئاً. تطلب أدوات تشعر أنها تنتمي إلى الغرفة.">A yoga practice does not ask for a full shelf. It asks for tools that feel like they belong in the room.</p>
      <div class="shop-why__list">
        <article class="shop-why__item reveal">
          <span class="shop-why__num" aria-hidden="true">01</span>
          <div>
            <h3 data-en="Quality before quantity" data-ar="الجودة قبل الكثرة">Quality before quantity</h3>
            <p class="text-muted" data-en="Two pieces you will actually use — not a catalogue built to fill a grid." data-ar="قطعتان تستخدمينهما فعلاً — لا كتالوج مُلئ ليغطي الشبكة.">Two pieces you will actually use — not a catalogue built to fill a grid.</p>
          </div>
        </article>
        <article class="shop-why__item reveal reveal-delay-1">
          <span class="shop-why__num" aria-hidden="true">02</span>
          <div>
            <h3 data-en="Every detail is considered" data-ar="كل تفصيل محسوب">Every detail is considered</h3>
            <p class="text-muted" data-en="From the cork under the palm to the weight of the block — made for daily return, not a single season." data-ar="من الفلين تحت الكف إلى وزن البلوك — صُنعت للعودة اليومية، لا لموسم واحد.">From the cork under the palm to the weight of the block — made for daily return, not a single season.</p>
          </div>
        </article>
        <article class="shop-why__item reveal reveal-delay-2">
          <span class="shop-why__num" aria-hidden="true">03</span>
          <div>
            <h3 data-en="Quiet by design" data-ar="هدوء في التصميم">Quiet by design</h3>
            <p class="text-muted" data-en="No logos shouting from the floor. Objects that can sit in the room when practice is over." data-ar="لا شعارات تصرخ من الأرض. أشياء يمكن أن تبقى في الغرفة بعد انتهاء الممارسة.">No logos shouting from the floor. Objects that can sit in the room when practice is over.</p>
          </div>
        </article>
      </div>
      </div>
    </div>
  </section>

  <section class="section section--bone" id="faq" aria-labelledby="faq-title">
    <div class="container shop-faq">
      <div class="shop-section-head reveal">
        <span class="eyebrow" data-en="Questions" data-ar="الأسئلة">Questions</span>
        ${headingLines('faq-title', 'display-l shop-section-head__title', [
          { en: 'Before you begin.', ar: 'قبل أن تبدأي.' },
        ])}
      </div>
      <div class="shop-faq__list reveal reveal-delay-1">
        <details class="shop-faq__item">
          <summary data-en="Is the mat suitable for beginners?" data-ar="هل السجادة مناسبة للمبتدئات؟">Is the mat suitable for beginners?</summary>
          <p class="shop-faq__answer text-muted" data-en="Yes. It is made to feel steady in a first class and familiar in a daily one — grip, cushion, and a surface that does not ask for attention." data-ar="نعم. صُممت لتكون ثابتة في الحصة الأولى ومألوفة في التمرين اليومي — تمسّك، وسادة، وسطح لا يسرق الانتباه.">Yes. It is made to feel steady in a first class and familiar in a daily one — grip, cushion, and a surface that does not ask for attention.</p>
        </details>
        <details class="shop-faq__item">
          <summary data-en="Does the cork feel slippery when dry?" data-ar="هل يشعر سطح الفلين بالانزلاق وهو جاف؟">Does the cork feel slippery when dry?</summary>
          <p class="shop-faq__answer text-muted" data-en="Cork grips more as it warms and as you do. The first sessions may feel like a short settling-in; it steadies within a week or two of regular use." data-ar="الفلين يتمسّك أكثر كلما دفئ وكلما تعرّقتِ. في الجلسات الأولى قد تلاحظين فترة تكييف خفيفة — وتستقر خلال أسبوع إلى أسبوعين من الاستخدام المنتظم.">Cork grips more as it warms and as you do. The first sessions may feel like a short settling-in; it steadies within a week or two of regular use.</p>
        </details>
        <details class="shop-faq__item">
          <summary data-en="How do I care for the pieces?" data-ar="كيف أحافظ على القطع؟">How do I care for the pieces?</summary>
          <p class="shop-faq__answer text-muted" data-en="A damp cloth after practice is enough. For a deeper clean, diluted white vinegar works — avoid oily or silicone sprays that weaken natural cork grip." data-ar="قطعة قماش رطبة بعد التمرين كافية. لتنظيف أعمق، خل أبيض مخفف يعمل جيداً — تجنّبي البخاخات الزيتية أو السيليكونية التي تضعف تمسّك الفلين.">A damp cloth after practice is enough. For a deeper clean, diluted white vinegar works — avoid oily or silicone sprays that weaken natural cork grip.</p>
        </details>
        <details class="shop-faq__item">
          <summary data-en="Where do you deliver?" data-ar="أين يتم التوصيل؟">Where do you deliver?</summary>
          <p class="shop-faq__answer text-muted" data-en="We deliver across Palestine and the interior. Pay by Visa, Mastercard, PayPal, cash on delivery, or WhatsApp — we confirm timing, colourway, and shipping with care." data-ar="نوصل لجميع المناطق في فلسطين والداخل. ادفعِ بفيزا أو ماستركارد أو بايبال أو عند الاستلام أو واتساب — ونؤكّد التوقيت واللون والشحن بعناية.">We deliver across Palestine and the interior. Pay by Visa, Mastercard, PayPal, cash on delivery, or WhatsApp — we confirm timing, colourway, and shipping with care.</p>
        </details>
        <details class="shop-faq__item">
          <summary data-en="Does one block give different heights?" data-ar="هل البلوك يعطي ارتفاعات مختلفة؟">Does one block give different heights?</summary>
          <p class="shop-faq__answer text-muted" data-en="Yes — 10, 15 and 23 cm depending on orientation. One block covers most postures without needing a second." data-ar="نعم — ١٠ و ١٥ و ٢٣ سم حسب الاتجاه. بلوك واحد يكفي لمعظم الوضعيات دون الحاجة لثانٍ.">Yes — 10, 15 and 23 cm depending on orientation. One block covers most postures without needing a second.</p>
        </details>
      </div>
    </div>
  </section>

  <section class="final-cta" id="join">
    <img src="/media/products/bac.jpg" alt="" class="final-cta__image" aria-hidden="true">
    <div class="final-cta__overlay" aria-hidden="true"></div>
    <div class="final-cta__content reveal">
      <h2 class="display-l shop-cta__title">
        <span class="shop-heading-line" data-en="Your practice does not end" data-ar="ممارستك لا تنتهي">Your practice does not end</span>
        <span class="shop-heading-line" data-en="when you leave." data-ar="حين تغادرين.">when you leave.</span>
      </h2>
      <a href="#departments" class="btn btn--primary final-cta__cta" data-en="Return to the edit" data-ar="عودي إلى التشكيلة">Return to the edit</a>
    </div>
  </section>

  <div id="shop-checkout" class="shop-checkout" hidden>
    <div id="shop-checkout-backdrop" class="shop-checkout__backdrop"></div>
    <div class="shop-checkout__panel" role="dialog" aria-modal="true" aria-labelledby="shop-checkout-title">
      <div class="shop-checkout__head">
        <div>
          <p class="eyebrow" data-en="Checkout" data-ar="إتمام الطلب">Checkout</p>
          <h2 id="shop-checkout-title" class="display-m" data-en="Place your order" data-ar="أتمّي طلبك">Place your order</h2>
        </div>
        <button type="button" class="shop-checkout__close" id="shop-checkout-close" data-en-label="Close" data-ar-label="إغلاق" aria-label="Close">&times;</button>
      </div>
      <p class="shop-checkout__summary">
        <strong id="shop-checkout-product">Yoga Mat</strong>
        <span id="shop-checkout-color">Black</span>
        <span id="shop-checkout-total">$128</span>
      </p>
      <form id="shop-checkout-form" class="shop-checkout__form" novalidate>
        <label class="shop-checkout__field">
          <span data-en="Full name" data-ar="الاسم الكامل">Full name</span>
          <input name="fullName" type="text" autocomplete="name" required>
        </label>
        <label class="shop-checkout__field">
          <span data-en="Phone" data-ar="الهاتف">Phone</span>
          <input name="phone" type="tel" autocomplete="tel" required>
        </label>
        <label class="shop-checkout__field">
          <span data-en="City" data-ar="المدينة">City</span>
          <input name="city" type="text" autocomplete="address-level2">
        </label>
        <div class="shop-checkout__qty">
          <span data-en="Quantity" data-ar="الكمية">Quantity</span>
          <div class="shop-checkout__stepper">
            <button type="button" data-shop-qty="-1" aria-label="Decrease">−</button>
            <input id="shop-qty" name="qty" type="number" min="1" max="5" value="1" readonly>
            <button type="button" data-shop-qty="1" aria-label="Increase">+</button>
          </div>
        </div>
        <fieldset class="shop-checkout__pay">
          <legend data-en="Payment" data-ar="الدفع">Payment</legend>
          <label class="shop-pay">
            <input type="radio" name="payment" value="stripe">
            <span class="shop-pay__mark shop-pay__mark--cards" aria-hidden="true">${VISA_MARK}${MASTERCARD_MARK}</span>
            <span>
              <strong data-en="Visa · Mastercard" data-ar="فيزا · ماستركارد">Visa · Mastercard</strong>
              <em data-en="Secure card payment." data-ar="دفع آمن بالبطاقة.">Secure card payment.</em>
            </span>
          </label>
          <label class="shop-pay">
            <input type="radio" name="payment" value="paypal">
            <span class="shop-pay__mark" aria-hidden="true">${PAYPAL_MARK}</span>
            <span>
              <strong>PayPal</strong>
              <em data-en="We will send a PayPal payment request." data-ar="سنرسل لكِ طلب دفع عبر بايبال.">We will send a PayPal payment request.</em>
            </span>
          </label>
          <label class="shop-pay">
            <input type="radio" name="payment" value="cash">
            <span class="shop-pay__mark shop-pay__mark--icon" aria-hidden="true">${CASH_MARK}</span>
            <span>
              <strong data-en="Cash on delivery" data-ar="الدفع عند الاستلام">Cash on delivery</strong>
              <em data-en="Pay when the piece arrives." data-ar="ادفعِ عند وصول القطعة.">Pay when the piece arrives.</em>
            </span>
          </label>
          <label class="shop-pay">
            <input type="radio" name="payment" value="whatsapp" checked>
            <span class="shop-pay__mark shop-pay__mark--icon" aria-hidden="true">${WHATSAPP_MARK}</span>
            <span>
              <strong data-en="WhatsApp" data-ar="واتساب">WhatsApp</strong>
              <em data-en="Send the order and we will confirm with you." data-ar="أرسلي الطلب وسنؤكّد معكِ.">Send the order and we will confirm with you.</em>
            </span>
          </label>
        </fieldset>
        <p id="shop-checkout-error" class="shop-checkout__error" hidden></p>
        <button type="submit" class="btn btn--primary shop-checkout__submit" id="shop-checkout-submit" data-en="Continue" data-ar="متابعة">Continue</button>
      </form>
    </div>
  </div>

</main>
`;

export default function Page() {
  return (
    <LegacyPage
      lang="en"
      dir="rtl"
      bodyClassName="shop-page"
      styles={['/css/shop.css']}
      scripts={[{ src: '/js/shop-order.js' }]}
      inlineScripts={[shopScript]}
      currentNav="shop"
      splitHeadings={false}
      html={html}
    />
  );
}
