/**
 * Scroll fade: add .in-view when section/content enters viewport, remove when it leaves (fade in / fade out)
 */
(function () {
  var threshold = 0.1;
  var rootMargin = '0px 0px -8% 0px';

  function init() {
    var sections = document.querySelectorAll('.animate-section');
    var contents = document.querySelectorAll('.animate-content');

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold: threshold, rootMargin: rootMargin }
    );

    sections.forEach(function (el) { observer.observe(el); });
    contents.forEach(function (el) { observer.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
