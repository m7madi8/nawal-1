/**
 * Moments gallery: stack carousel with prev/next and drag
 */
(function () {
  var transforms = [
    { x: -8, y: 8, r: -4 },
    { x: -4, y: 4, r: -2 },
    { x: 0, y: 0, r: 0 },
    { x: 4, y: -4, r: 2 },
    { x: 8, y: -8, r: 4 }
  ];

  function stackPosition(currentIndex, index, total) {
    var order = (index - currentIndex + total) % total;
    return (total - 1) - order;
  }

  function applyTransforms(wrap, currentIndex) {
    var cards = wrap.querySelectorAll('.stack-card');
    var total = cards.length;
    cards.forEach(function (card, index) {
      var pos = stackPosition(currentIndex, index, total);
      var t = transforms[pos] || transforms[0];
      card.style.zIndex = pos + 1;
      card.style.setProperty('--tx', t.x + 'px');
      card.style.setProperty('--ty', t.y + 'px');
      card.style.setProperty('--rotate', t.r + 'deg');
    });
  }

  function init() {
    var wrap = document.querySelector('.stack-wrap');
    if (!wrap) return;

    var cards = wrap.querySelectorAll('.stack-card');
    var total = cards.length;
    if (total === 0) return;

    var currentIndex = 0;
    var prevBtn = document.querySelector('.stack-btn--prev');
    var nextBtn = document.querySelector('.stack-btn--next');

    function goNext() {
      currentIndex = (currentIndex + 1) % total;
      applyTransforms(wrap, currentIndex);
    }

    function goPrev() {
      currentIndex = (currentIndex - 1 + total) % total;
      applyTransforms(wrap, currentIndex);
    }

    if (prevBtn) prevBtn.addEventListener('click', goPrev);
    if (nextBtn) nextBtn.addEventListener('click', goNext);

    applyTransforms(wrap, currentIndex);

    var touchStartX = 0;
    var touchEndX = 0;
    wrap.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    });
    wrap.addEventListener('touchend', function () {
      var diff = touchStartX - touchEndX;
      if (diff > 50) goNext();
      else if (diff < -50) goPrev();
    });
    wrap.addEventListener('touchmove', function (e) {
      touchEndX = e.touches[0].clientX;
    });

    var mouseStartX = 0;
    var mouseEndX = 0;
    wrap.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      wrap.classList.add('is-dragging');
      mouseStartX = e.clientX;
      mouseEndX = e.clientX;
      function onMouseMove(e) {
        mouseEndX = e.clientX;
      }
      function onMouseUp() {
        wrap.classList.remove('is-dragging');
        var diff = mouseStartX - mouseEndX;
        if (diff > 40) goNext();
        else if (diff < -40) goPrev();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
