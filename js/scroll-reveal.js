/**
 * Scroll reveal: add .is-visible to .section-reveal when in viewport
 */
(function () {
  var threshold = 0.05;
  var rootMargin = '0px 0px -5% 0px';

  function init() {
    var els = document.querySelectorAll('.section-reveal');
    if (!els.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: threshold, rootMargin: rootMargin }
    );

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
