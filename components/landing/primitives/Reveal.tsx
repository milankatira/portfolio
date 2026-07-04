'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds of entrance delay (use for staggering siblings). */
  delay?: number;
  /** Vertical offset the element travels in from. */
  y?: number;
  /** Play once when scrolled into view (default) vs. every time. */
  once?: boolean;
}

/**
 * Subtle blur-up + translate scroll reveal. Collapses to a plain, instant
 * render when the user prefers reduced motion.
 */
export function Reveal({ children, className, delay = 0, y = 16, once = true }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
