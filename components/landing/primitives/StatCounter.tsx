'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface StatCounterProps {
  value: number;
  suffix?: string;
  /** Decimal places (default 0). */
  decimals?: number;
  /** Milliseconds for the count-up sweep. */
  duration?: number;
}

const format = (n: number, decimals: number, suffix: string): string =>
  `${n.toFixed(decimals)}${suffix}`;

/**
 * Renders the final value as real text (present without JS, for screen readers,
 * and as the fallback if the element never intersects). When it scrolls into
 * view — and only if motion is allowed — an aria-hidden visual layer counts up
 * from zero. The accessible copy always reads the final value.
 */
export function StatCounter({ value, suffix = '', decimals = 0, duration = 1400 }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const final = format(value, decimals, suffix);

  // null → not animating (final text is shown). string → visual count-up frame.
  const [animated, setAnimated] = useState<string | null>(null);

  useEffect(() => {
    if (!inView || reduce) return; // reduced-motion / never-in-view → keep final
    let raf = 0;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      if (progress < 1) {
        setAnimated(format(value * eased, decimals, suffix));
        raf = requestAnimationFrame(step);
      } else {
        setAnimated(null); // settle back onto the real final text
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, decimals, suffix, duration]);

  return (
    <span ref={ref} aria-live="polite" className="tabular-nums">
      {/* Accessible + no-JS + fallback: the real final value, always in the DOM */}
      <span className={animated !== null ? 'sr-only' : undefined}>{final}</span>
      {/* Decorative visual count-up, hidden from assistive tech */}
      {animated !== null && <span aria-hidden="true">{animated}</span>}
    </span>
  );
}
