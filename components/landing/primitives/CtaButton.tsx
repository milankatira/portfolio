import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface CtaButtonProps {
  children: ReactNode;
  href: string;
  variant?: 'primary' | 'ghost';
  className?: string;
  external?: boolean;
}

/**
 * Anchor-based CTA. Primary carries the iris→cyan signature fill; ghost is a
 * quiet bordered secondary. Subtle scale + sheen on hover, no layout shift.
 */
export function CtaButton({
  children,
  href,
  variant = 'primary',
  className,
  external = false,
}: CtaButtonProps) {
  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium ' +
    'transition-all duration-300 ease-out will-change-transform focus-visible:outline-none ' +
    'focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black-100 ' +
    'active:scale-[0.98]';

  const variants = {
    primary:
      'bg-white text-black-100 font-semibold shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset] ' +
      'hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.35)]',
    ghost:
      'border border-white/12 bg-white/[0.02] text-white/80 backdrop-blur-sm ' +
      'hover:border-white/25 hover:bg-white/[0.05] hover:text-white',
  };

  return (
    <a
      href={href}
      className={cn(base, variants[variant], className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
