const fs = require("fs");

const WA_SVG =
  '<svg viewBox=\\"0 0 24 24\\" width=\\"16\\" height=\\"16\\" fill=\\"currentColor\\" aria-hidden=\\"true\\"><path d=\\"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z\\"/></svg>';

function waLink(href) {
  return (
    '<div class=\\"ny-book-alt\\">' +
    '<a href=\\"' +
    href +
    '\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\" class=\\"ny-book-wa-link\\" data-i18n-attr=\\"aria-label:booking_wa_aria\\">' +
    WA_SVG +
    '<span data-i18n=\\"booking_wa_or\\">Or contact us on WhatsApp</span></a></div>'
  );
}

const waBtnRe =
  /<a href=\\"([^"]+)\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\" class=\\"[^"]*wa-secondary[^"]*\\"[^>]*>[\s\S]*?<\/a>/g;

function patch(file, opts = {}) {
  let s = fs.readFileSync(file, "utf8");
  const orig = s;

  s = s.replace(
    /class=\\"event-sh-actions\\"/g,
    'class=\\"event-sh-actions ny-book-actions\\"'
  );
  s = s.replace(
    /class=\\"ib-cta__actions\\"/g,
    'class=\\"ib-cta__actions ny-book-actions\\"'
  );
  s = s.replace(
    /class=\\"nc-hero__cta-row\\"/g,
    'class=\\"nc-hero__cta-row ny-book-actions\\"'
  );
  s = s.replace(
    /class=\\"nc-cta__actions\\"/g,
    'class=\\"nc-cta__actions ny-book-actions\\"'
  );

  s = s.replace(
    /class=\\"nc-hero__actions\\"/g,
    'class=\\"nc-hero__actions ny-book-actions\\"'
  );

  const primaryPatterns = [
    ['class=\\"event-sh-btn event-sh-btn--primary\\"', 'class=\\"event-sh-btn event-sh-btn--primary ny-book-btn-primary\\"'],
    ['class=\\"ib-cta__btn\\" data-ib-register', 'class=\\"ib-cta__btn ny-book-btn-primary\\" data-ib-register'],
    ['class=\\"nc-hero__cta\\" data-nc-register', 'class=\\"nc-hero__cta ny-book-btn-primary\\" data-nc-register'],
    ['class=\\"nc-cta__btn\\" data-nc-register', 'class=\\"nc-cta__btn ny-book-btn-primary\\" data-nc-register'],
    ['class=\\"dahab-cv-btn dahab-cv-btn--primary', 'class=\\"dahab-cv-btn dahab-cv-btn--primary ny-book-btn-primary'],
    ['class=\\"dahab-includes-cta\\"', 'class=\\"dahab-includes-cta ny-book-btn-primary\\"'],
  ];
  for (const [from, to] of primaryPatterns) {
    s = s.split(from).join(to);
  }

  s = s.replace(waBtnRe, (_, href) => waLink(href));

  s = s.replace(
    /class=\\"dahab-cv-final-wa\\"/g,
    'class=\\"dahab-cv-final-wa ny-book-wa-link\\"'
  );

  s = s.replace(
    /class=\\"sh-register-submit\\"/g,
    'class=\\"sh-register-submit ny-book-submit\\"'
  );
  s = s.replace(
    /class=\\"ib-register-submit\\"/g,
    'class=\\"ib-register-submit ny-book-submit\\"'
  );
  s = s.replace(
    /class=\\"nc-register-submit\\"/g,
    'class=\\"nc-register-submit ny-book-submit\\"'
  );
  s = s.replace(
    /type=\\"submit\\" class=\\"dahab-cv-btn dahab-cv-btn--primary dahab-cv-final-btn mt-3\\"/g,
    'type=\\"submit\\" class=\\"dahab-cv-btn dahab-cv-btn--primary dahab-cv-final-btn mt-3 ny-book-submit\\"'
  );

  s = s.replace(
    /            <a href=\\"\/register\/wadi-rum\\" class=\\"dahab-includes-cta\\">\r\n              <span data-i18n=\\"retreat_wadi_book_now\\">Book Wadi Rum retreat<\/span>\r\n              <span aria-hidden=\\"true\\">→<\/span>\r\n            <\/a>\r\n            <a href=\\"https:\/\/wa\.me\/972522496366\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\" class=\\"dahab-cv-final-wa mt-4\\" data-i18n-attr=\\"aria-label:booking_wa_aria\\">\r\n              <span data-i18n=\\"booking_wa_or\\">Or contact us on WhatsApp<\/span>\r\n            <\/a>/g,
    '            <div class=\\"ny-book-actions mx-auto max-w-md\\">' +
      '<a href=\\"/register/wadi-rum\\" class=\\"dahab-includes-cta ny-book-btn-primary\\">' +
      '<span data-i18n=\\"retreat_wadi_book_now\\">Book Wadi Rum retreat</span>' +
      '<span aria-hidden=\\"true\\">→</span></a>' +
      waLink("https://wa.me/972522496366") +
      "</div>"
  );

  if (opts.addStylesheet && !s.includes("booking-cta.css")) {
    s = s.replace(
      opts.stylesNeedle,
      opts.stylesReplacement
    );
  }

  if (s !== orig) {
    fs.writeFileSync(file, s);
    console.log("patched", file);
  } else {
    console.log("no changes", file);
  }
}

const pages = [
  {
    file: "app/events/sound-healing/page.jsx",
    addStylesheet: true,
    stylesNeedle: 'styles={["/legacy/css/events-page.css"]}',
    stylesReplacement:
      'styles={["/legacy/css/events-page.css","/legacy/css/booking-cta.css"]}',
  },
  {
    file: "app/events/ice-bath/page.jsx",
    addStylesheet: true,
    stylesNeedle: 'styles={["/legacy/css/ice-bath-event.css"]}',
    stylesReplacement:
      'styles={["/legacy/css/ice-bath-event.css","/legacy/css/booking-cta.css"]}',
  },
  {
    file: "app/events/nature-chocolate/page.jsx",
    addStylesheet: true,
    stylesNeedle: 'styles={["/legacy/css/nature-chocolate.css"]}',
    stylesReplacement:
      'styles={["/legacy/css/nature-chocolate.css","/legacy/css/booking-cta.css"]}',
  },
  {
    file: "app/retreats/dahab/page.jsx",
    addStylesheet: true,
    stylesNeedle:
      'styles={["/legacy/css/retreat-page.css","/legacy/css/retreat-premium.css","/legacy/css/dahab-guide.css","/legacy/css/dahab-conversion.css"]}',
    stylesReplacement:
      'styles={["/legacy/css/retreat-page.css","/legacy/css/retreat-premium.css","/legacy/css/dahab-guide.css","/legacy/css/dahab-conversion.css","/legacy/css/booking-cta.css"]}',
  },
  {
    file: "app/retreats/wadi-rum/page.jsx",
    addStylesheet: true,
    stylesNeedle:
      'styles={["/legacy/css/retreat-page.css","/legacy/css/retreat-premium.css"]}',
    stylesReplacement:
      'styles={["/legacy/css/retreat-page.css","/legacy/css/retreat-premium.css","/legacy/css/booking-cta.css"]}',
  },
];

for (const p of pages) patch(p.file, p);
