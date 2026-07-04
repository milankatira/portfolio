import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  /** Animate the sheen position slowly across the text. */
  animate?: boolean;
}

/**
 * Monochrome "silver" type treatment — bright white fading to muted grey.
 * No hue, just a premium metallic sheen for accent words in headlines.
 */
export function GradientText({ children, className, animate = false }: GradientTextProps) {
  return (
    <span
      className={cn(
        'bg-gradient-to-b from-white via-white to-white/45 bg-clip-text text-transparent',
        animate && 'bg-[length:100%_200%] animate-gradient-x',
        className,
      )}
    >
      {children}
    </span>
  );
}
