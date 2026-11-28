import Image from 'next/image';
import { Download } from 'lucide-react';
import { CtaButton } from '@/components/landing/primitives/CtaButton';
import { Reveal } from '@/components/landing/primitives/Reveal';
import { StatCounter } from '@/components/landing/primitives/StatCounter';
import { YEARS, stats, capabilities, profile } from '@/components/landing/data';

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
              I build software that holds up under load{' '}
              <span className="font-serif italic text-white/70">and reads clean</span>{' '}
              the whole way down.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-lg text-[15px] leading-relaxed text-white/60">
              Most of my work lives where the pressure is real: Node.js memory and
              streaming, APIs under heavy traffic, real-time booking and chat, and the
              design systems that keep it all coherent. {YEARS}+ years in, I still care
              about the last pixel as much as the first schema.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-lg text-[15px] leading-relaxed text-white/60">
              Along the way I&rsquo;ve mentored junior developers, interviewed 20+
              engineering candidates, and written about what I learn on the blog.
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

          <Reveal delay={0.2}>
            <div className="mt-2">
              <CtaButton href={profile.resume} variant="ghost" external>
                <Download className="h-4 w-4" />
                Download Resume
              </CtaButton>
            </div>
          </Reveal>
        </div>

        {/* Portrait */}
        <Reveal delay={0.1} className="lg:self-start">
          <figure className="group relative ml-auto w-full max-w-[360px]">
            {/* Ambient glow behind the frame */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-[radial-gradient(65%_65%_at_50%_30%,rgba(139,124,255,0.22),rgba(56,189,248,0.10),transparent_72%)] opacity-90 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
            />
            <div className="card-lit relative aspect-square w-full overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] ring-1 ring-inset ring-white/[0.08] transition-colors duration-500 group-hover:border-white/25">
              <Image
                src={profile.photo}
                alt={`${profile.name}, full-stack engineer`}
                width={400}
                height={400}
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 320px, 80vw"
                className="h-full w-full object-cover object-center contrast-[1.05] saturate-[1.05] transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              {/* Subtle bottom fade so the chip stays legible */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black-100/60 to-transparent"
              />
              {/* Location chip */}
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black-100/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 backdrop-blur-md">
                {profile.location}
              </span>
            </div>
            <figcaption className="mt-4 text-right font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
              {profile.name}&nbsp;/&nbsp;{profile.role}
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* Stats band */}
      <Reveal delay={0.15}>
        <div className="card-lit mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-4 md:mt-16">
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
    </section>
  );
}
