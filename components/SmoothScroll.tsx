'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/** Honors the target's CSS `scroll-margin-top` (e.g. blog headings use scroll-mt-28). */
function targetOffset(el: HTMLElement) {
  return -(parseFloat(getComputedStyle(el).scrollMarginTop) || 0);
}

/**
 * Site-wide inertial smooth scrolling (Lenis) plus smooth, offset-aware jumps
 * for same-page anchor links like `#work` or `/#work`. Disabled automatically
 * for users who prefer reduced motion; native scrolling is used instead.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, wheelMultiplier: 1 });

    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const link = (event.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!link || link.target === '_blank') return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;

      const id = decodeURIComponent(url.hash.slice(1));
      const el = id === 'top' ? document.body : document.getElementById(id);
      if (!el) return;

      event.preventDefault();
      lenis.scrollTo(id === 'top' ? 0 : el, { offset: id === 'top' ? 0 : targetOffset(el) });
      if (window.location.hash !== url.hash) window.history.pushState(null, '', url.hash);
    };

    // Capture phase so this runs before next/link's handler, which then sees
    // defaultPrevented and skips its own (non-smooth) hash navigation.
    document.addEventListener('click', onClick, true);

    // Arriving from another page with a hash (e.g. /project-details → /#work):
    // re-align once layout has settled so the section clears the navbar.
    if (window.location.hash) {
      const el = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      if (el) requestAnimationFrame(() => lenis.scrollTo(el, { offset: targetOffset(el), immediate: true }));
    }

    return () => {
      document.removeEventListener('click', onClick, true);
      lenis.destroy();
    };
  }, []);

  return null;
}
