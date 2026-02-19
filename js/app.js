/**
 * App global: audio consent, keyboard nav, custom cursor
 */
(function () {
  var AUDIO_CONSENT_KEY = 'audio-consent-v2';

  function initAudioConsent() {
    var promptEl = document.getElementById('audio-consent-prompt');
    if (!promptEl) return;

    var saved = null;
    try {
      saved = localStorage.getItem(AUDIO_CONSENT_KEY);
    } catch (e) {}

    if (saved === 'accepted' || saved === 'declined') {
      promptEl.hidden = true;
      return;
    }

    promptEl.hidden = false;

    var acceptBtn = promptEl.querySelector('[data-audio-accept]');
    var declineBtn = promptEl.querySelector('[data-audio-decline]');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        try {
          localStorage.setItem(AUDIO_CONSENT_KEY, 'accepted');
        } catch (e) {}
        promptEl.hidden = true;
        window.dispatchEvent(new CustomEvent('audio-consent-unlock'));
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', function () {
        try {
          localStorage.setItem(AUDIO_CONSENT_KEY, 'declined');
        } catch (e) {}
        promptEl.hidden = true;
      });
    }
  }

  function initKeyboardNav() {
    document.documentElement.style.scrollBehavior = 'auto';

    function handleKeyDown(e) {
      var target = e.target;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;

      var scrollStep = 80;
      var pageStep = window.innerHeight * 0.8;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          window.scrollBy({ top: scrollStep, behavior: 'auto' });
          break;
        case 'ArrowUp':
          e.preventDefault();
          window.scrollBy({ top: -scrollStep, behavior: 'auto' });
          break;
        case 'PageDown':
          e.preventDefault();
          window.scrollBy({ top: pageStep, behavior: 'auto' });
          break;
        case 'PageUp':
          e.preventDefault();
          window.scrollBy({ top: -pageStep, behavior: 'auto' });
          break;
        case 'Home':
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'auto' });
          break;
        case 'End':
          e.preventDefault();
          window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'auto' });
          break;
      }
    }

    document.addEventListener('keydown', handleKeyDown);
  }

  function initCursor() {
    var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced) return;

    var cursorEl = document.getElementById('custom-cursor');
    if (!cursorEl) return;

    cursorEl.style.display = 'block';
    var x = 0;
    var y = 0;
    var scale = 1;

    function updateStyle() {
      cursorEl.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) scale(' + scale + ')';
    }

    window.addEventListener('mousemove', function (e) {
      x = e.clientX;
      y = e.clientY;
      scale = 1.1;
      updateStyle();
    });
    window.addEventListener('mouseleave', function () {
      scale = 0.8;
      updateStyle();
    });
    window.addEventListener('mouseenter', function () {
      scale = 1;
      updateStyle();
    });
  }

  function init() {
    initAudioConsent();
    initKeyboardNav();
    initCursor();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
