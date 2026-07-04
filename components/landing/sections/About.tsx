import { Reveal } from '@/components/landing/primitives/Reveal';
import { StatCounter } from '@/components/landing/primitives/StatCounter';
import { stats, capabilities } from '@/components/landing/data';

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        {/* Narrative */}
        <div className="flex flex-col gap-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/45">
              <span className="h-px w-6 bg-white/25" aria-hidden />
              About
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="font-display text-2xl font-medium leading-snug tracking-tight text-white md:text-[2rem]">
              I turn ambiguous ideas into{' '}
              <span className="font-serif italic text-white/70">resilient, well-crafted</span>{' '}
              software — and I care about how it feels, not just that it works.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-lg text-[15px] leading-relaxed text-white/60">
              For 5+ years, I&rsquo;ve shipped production systems across media infrastructure,
              real-time platforms, and design systems — most recently owning core media
              services at GoHighLevel. I move comfortably from database and Node.js internals
              to the last pixel of an interface.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-2 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {capabilities.map((c) => (
                <li key={c} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-white/40" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Stats */}
        <Reveal delay={0.1} className="self-center">
          <div className="card-lit grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04]">
            {stats.map((s) => (
              <div key={s.label} className="bg-black-100 p-6 md:p-8">
                <div className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
                  <StatCounter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <p className="mt-2 text-[13px] leading-snug text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
