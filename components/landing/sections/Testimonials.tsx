import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { testimonials } from '@/components/landing/data';
import { SectionHeading } from '@/components/landing/primitives/SectionHeading';

type Testimonial = (typeof testimonials)[number];

function QuoteCard({ t, hidden = false }: { t: Testimonial; hidden?: boolean }) {
  const initials = t.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');
  return (
    <figure className="card-lit flex h-full w-[340px] shrink-0 flex-col justify-between gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/15 sm:w-[400px]">
      <blockquote className="text-[15px] leading-relaxed text-white/70">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] font-mono text-xs text-white/70">
          {initials}
        </span>
        <span className="flex flex-col">
          <a
            href={t.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={hidden ? -1 : undefined}
            aria-label={`${t.name} on LinkedIn — ${t.title}`}
            className="w-fit rounded-sm text-sm font-medium text-white underline-offset-2 outline-none transition-colors hover:text-white/80 hover:underline focus-visible:ring-1 focus-visible:ring-white/40"
          >
            {t.name}
          </a>
          <span className="text-xs text-white/40">{t.title}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * A single marquee row. Renders exactly one accessible copy of each quote; the
 * second copy exists only to make the loop seamless — it is hidden from
 * assistive tech and its links are removed from the tab order. The animation is
 * paused globally under prefers-reduced-motion.
 */
function MarqueeRow({
  items,
  reverse = false,
  duration,
}: {
  items: Testimonial[];
  reverse?: boolean;
  duration: string;
}) {
  return (
    <div
      className="group flex overflow-hidden [--gap:1.25rem] [gap:var(--gap)]"
      style={{ '--duration': duration } as CSSProperties}
    >
      {[false, true].map((clone) => (
        <ul
          key={clone ? 'clone' : 'real'}
          aria-hidden={clone || undefined}
          className={cn(
            'flex shrink-0 items-stretch [gap:var(--gap)] animate-marquee group-hover:[animation-play-state:paused]',
            reverse && '[animation-direction:reverse]',
          )}
        >
          {items.map((t) => (
            <li key={t.name}>
              <QuoteCard t={t} hidden={clone} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export function Testimonials() {
  const mid = Math.ceil(testimonials.length / 2);
  const rowA = testimonials.slice(0, mid);
  const rowB = testimonials.slice(mid);

  return (
    <section id="testimonials" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto mb-14 max-w-6xl px-6">
        <SectionHeading eyebrow="Testimonials" title="Trusted by the people I've worked with" align="center" />
      </div>

      <div className="relative flex flex-col gap-5">
        <MarqueeRow items={rowA} duration="44s" />
        <MarqueeRow items={rowB} duration="50s" reverse />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black-100 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black-100 to-transparent" />
      </div>
    </section>
  );
}
