'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const JEWEL = 18;

export default function ScrollRail() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return undefined;

    const rail = document.getElementById('nyScrollRail');
    const track = document.getElementById('nyScrollTrack');
    const thumb = document.getElementById('nyScrollThumb');
    const fill = document.getElementById('nyScrollFill');
    const index = document.getElementById('nyScrollIndex');
    if (!rail || !track || !thumb) return undefined;

    let dragging = false;
    let dragOffset = 0;
    let frame = 0;
    let idleTimer = 0;

    function hide() {
      rail.classList.add('is-hidden');
      document.documentElement.classList.remove('ny-has-scroll-rail');
    }

    function wake() {
      rail.classList.add('is-awake');
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        if (!dragging && !rail.matches(':hover')) rail.classList.remove('is-awake');
      }, 1600);
    }

    function metrics() {
      const root = document.documentElement;
      const docHeight = Math.max(root.scrollHeight, document.body?.scrollHeight || 0);
      const viewport = window.innerHeight;
      const scrollable = Math.max(0, docHeight - viewport);
      const trackHeight = track.clientHeight;
      const travel = Math.max(0, trackHeight - JEWEL);
      const y = window.scrollY || root.scrollTop || 0;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, y / scrollable)) : 0;
      return { root, viewport, scrollable, trackHeight, travel, progress };
    }

    function paint() {
      const { root, scrollable, trackHeight, travel, progress } = metrics();
      const coarse = window.matchMedia('(max-width: 980px), (hover: none)').matches;

      if (coarse || scrollable <= 24 || trackHeight < 80) {
        hide();
        return;
      }

      const offset = travel * progress;
      thumb.style.transform = `translate3d(-50%, ${offset}px, 0)`;
      if (fill) fill.style.height = `${offset + JEWEL / 2}px`;
      if (index) {
        index.textContent = String(Math.min(99, Math.max(1, Math.round(progress * 99)))).padStart(2, '0');
      }

      rail.classList.remove('is-hidden');
      root.classList.add('ny-has-scroll-rail');
    }

    function schedulePaint() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        paint();
      });
    }

    function scrollToOffset(nextOffset) {
      const { travel, scrollable } = metrics();
      const clamped = Math.min(Math.max(nextOffset, 0), travel);
      window.scrollTo({
        top: (clamped / (travel || 1)) * scrollable,
        behavior: dragging ? 'auto' : 'smooth',
      });
    }

    function scrollToClientY(clientY) {
      const rect = track.getBoundingClientRect();
      scrollToOffset(clientY - rect.top - JEWEL / 2);
    }

    function onScroll() {
      if (!dragging) schedulePaint();
      wake();
    }

    function onThumbDown(event) {
      dragging = true;
      dragOffset = event.clientY - thumb.getBoundingClientRect().top;
      thumb.classList.add('is-dragging');
      rail.classList.add('is-awake');
      document.body.classList.add('ny-scroll-dragging');
      event.preventDefault();
    }

    function onMove(event) {
      if (!dragging) return;
      scrollToClientY(event.clientY - dragOffset + JEWEL / 2);
      schedulePaint();
    }

    function onUp() {
      if (!dragging) return;
      dragging = false;
      thumb.classList.remove('is-dragging');
      document.body.classList.remove('ny-scroll-dragging');
      wake();
    }

    function onTrackDown(event) {
      if (event.target.closest('#nyScrollThumb')) return;
      scrollToClientY(event.clientY);
      schedulePaint();
      wake();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedulePaint);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    thumb.addEventListener('mousedown', onThumbDown);
    track.addEventListener('mousedown', onTrackDown);
    rail.addEventListener('mouseenter', wake);

    const observer = new ResizeObserver(schedulePaint);
    observer.observe(document.documentElement);
    if (document.body) observer.observe(document.body);

    schedulePaint();
    wake();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', schedulePaint);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      thumb.removeEventListener('mousedown', onThumbDown);
      track.removeEventListener('mousedown', onTrackDown);
      rail.removeEventListener('mouseenter', wake);
      observer.disconnect();
      window.clearTimeout(idleTimer);
      if (frame) window.cancelAnimationFrame(frame);
      document.body.classList.remove('ny-scroll-dragging');
      document.documentElement.classList.remove('ny-has-scroll-rail');
    };
  }, [pathname]);

  if (pathname?.startsWith('/admin')) return null;

  return (
    <div className="ny-scroll-rail is-hidden" id="nyScrollRail" aria-hidden="true">
      <span className="ny-scroll-rail__index" id="nyScrollIndex">01</span>
      <div className="ny-scroll-rail__column">
        <span className="ny-scroll-rail__tick ny-scroll-rail__tick--top" />
        <div className="ny-scroll-rail__track" id="nyScrollTrack">
          <div className="ny-scroll-rail__stem">
            <div className="ny-scroll-rail__fill" id="nyScrollFill" />
          </div>
          <div className="ny-scroll-rail__jewel" id="nyScrollThumb">
            <span className="ny-scroll-rail__diamond" />
          </div>
        </div>
        <span className="ny-scroll-rail__tick ny-scroll-rail__tick--bottom" />
      </div>
    </div>
  );
}
