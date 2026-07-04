import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface PillProps {
  children: ReactNode;
  className?: string;
  /** Show a pulsing status dot on the left (e.g. "available"). */
  dot?: boolean;
}

/** Small mono-label pill used for eyebrows and status chips. */
export function Pill({ children, className, dot = false }: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5',
        'font-mono text-[11px] uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm',
        className,
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
      )}
      {children}
    </span>
  );
}
