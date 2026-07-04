import { cn } from '@/lib/utils';

interface GlowBackgroundProps {
  className?: string;
  /** Vertical position of the single soft glow. */
  glow?: 'top' | 'center';
}

/**
 * The one background treatment for the landing page: a fine fading grid plus a
 * single soft iris glow. Deliberately restrained — no aurora, no orbs.
 */
export function GlowBackground({ className, glow = 'top' }: GlowBackgroundProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      {/* Fine grid, masked to fade toward the edges */}
      <div
        className="absolute inset-0 bg-grid-small-white/[0.025]"
        style={{
          maskImage: 'radial-gradient(ellipse 100% 70% at 50% 0%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 70% at 50% 0%, black 30%, transparent 75%)',
        }}
      />
      {/* Single soft neutral glow — colourless, just light lifting off black */}
      <div
        className="absolute left-1/2 h-[520px] w-[820px] max-w-[120vw] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          top: glow === 'top' ? '-16rem' : '8%',
          background:
            'radial-gradient(closest-side, rgba(255,255,255,0.10), rgba(255,255,255,0.03) 55%, transparent)',
        }}
      />
    </div>
  );
}
