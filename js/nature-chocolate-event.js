/**
 * Nature & Chocolate day — GSAP / ScrollTrigger motion layer.
 * Warm, playful, sensory register. Direction-aware for EN/AR RTL.
 * Mirrors ice-bath-event.js init pattern.
 */
(function () {
  'use strict';

  var page = document.querySelector('.nc-page');
  if (!page) return;

  var reduceMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function isRtl() {
    return document.documentElement.getAttribute('dir') === 'rtl';
  }

  function enterX(px) {
    var n = typeof px === 'number' ? px : 24;
    return isRtl() ? -n : n;
  }

  /* ── 1. Hero ── */
  function initHero(gsap) {
    var panel = document.querySelector('.nc-hero__panel');
    var badge = document.querySelector('.nc-hero__badge');
    var title = document.querySelector('.nc-hero__title');
    var divider = document.querySelector('.nc-hero__divider');
    var meta = document.querySelector('.nc-hero__meta');
    var cta = document.querySelector('.nc-hero__cta');

    if (!panel) return;

    var parts = [badge, title, divider, meta, cta].filter(Boolean);

    gsap.set(panel, { autoAlpha: 0, y: 22 });
    if (parts.length) gsap.set(parts, { autoAlpha: 0, y: 16 });

    var tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: function () {
        panel.classList.add('is-settled');
        if (cta) cta.classList.add('nc-cta--glow');
      }
    });

    tl.to(panel, { autoAlpha: 1, y: 0, duration: 0.95 }, 0.12);

    if (parts.length) {
      tl.to(
        parts,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1
        },
        0.28
      );
    }
  }

  function initReduced() {
    var panel = document.querySelector('.nc-hero__panel');
    var cta = document.querySelector('.nc-hero__cta');
    if (panel) panel.classList.add('is-settled');
    if (!window.gsap) return;

    var gsap = window.gsap;
    gsap.fromTo(
      '.nc-hero__panel',
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.4, ease: 'power1.out' }
    );
  }

  function initMotion() {
    if (!window.gsap || !window.ScrollTrigger) return;

    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    page.classList.add('nc-page--motion');

    initHero(gsap);

    /* Later sections will plug in here */
  }

  function boot() {
    if (reduceMotion) {
      initReduced();
    } else {
      initMotion();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  /* Expose helpers for later section passes */
  window.ncMotion = {
    isRtl: isRtl,
    enterX: enterX,
    reduceMotion: reduceMotion
  };
})();
