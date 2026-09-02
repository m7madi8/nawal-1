/**
 * Baqa Yoga — WhatsApp link with Nawal Yoga referral text (updates on language change).
 */
(function () {
  function t(key) {
    var lang = (window.nawalI18n && window.nawalI18n.getLang && window.nawalI18n.getLang()) || 'ar';
    if (window.nawalI18n && window.nawalI18n.t) return window.nawalI18n.t(lang, key);
    return key;
  }

  function updateWaLinks() {
    var phone = '';
    var root = document.querySelector('[data-reshape-whatsapp]');
    if (root) phone = (root.getAttribute('data-reshape-whatsapp') || '').replace(/\D/g, '');
    if (!phone) return;

    var msg = t('baqa_wa_prefill');
    var href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
    document.querySelectorAll('[data-baqa-wa]').forEach(function (a) {
      a.setAttribute('href', href);
    });
  }

  function init() {
    updateWaLinks();
    window.addEventListener('nawal-lang-change', updateWaLinks);
    document.addEventListener('nawal:langchange', updateWaLinks);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
