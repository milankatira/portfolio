'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface StatCounterProps {
  value: number;
  suffix?: string;
  /** Milliseconds for the count-up sweep. */
  duration?: number;
}

const format = (n: number, target: number): string => {
  // Preserve one decimal only when the target itself is fractional (e.g. 8.7).
  const isFractional = !Number.isInteger(target);
  return isFractional ? n.toFixed(1) : Math.round(n).toString();
};

/** Counts up from 0 to `value` once when scrolled into view. */
export function StatCounter({ value, suffix = '', duration = 1400 }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(display, value)}
      {suffix}
    </span>
  );
}
