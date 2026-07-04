'use client';

import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/landing/primitives/Reveal';
import { Pill } from '@/components/landing/primitives/Pill';
import { GradientText } from '@/components/landing/primitives/GradientText';
import { CtaButton } from '@/components/landing/primitives/CtaButton';
import { GlowBackground } from '@/components/landing/primitives/GlowBackground';
import { profile } from '@/components/landing/data';

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32"
    >
      <GlowBackground glow="top" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <Reveal delay={0}>
          <Pill dot>{profile.availability}</Pill>
        </Reveal>

        <h1 className="mt-8 font-display text-[clamp(2.75rem,8.5vw,6.25rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-white">
          <Reveal delay={0.08} y={22}>
            <span className="block">I design & ship</span>
          </Reveal>
          <Reveal delay={0.16} y={22}>
            <span className="block">
              <GradientText className="font-serif text-[1.06em] font-normal italic" animate>
                full-stack products
              </GradientText>
            </span>
          </Reveal>
          <Reveal delay={0.24} y={22}>
            <span className="block">that scale.</span>
          </Reveal>
        </h1>

        <Reveal delay={0.36}>
          <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
            5+ years turning ambiguous ideas into resilient web apps and media
            infrastructure — currently&nbsp;
            <span className="text-white/85">SDE-II at GoHighLevel</span>.
          </p>
        </Reveal>

        <Reveal delay={0.46}>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <CtaButton href="#work" variant="primary">
              View selected work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </CtaButton>
            <CtaButton href="#contact" variant="ghost">
              Get in touch
            </CtaButton>
          </div>
        </Reveal>

        <Reveal delay={0.58}>
          <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">
            {profile.location} &nbsp;/&nbsp; open to collaborations
          </p>
        </Reveal>
      </div>

      {/* Quiet scroll cue */}
      <a
        href="#work"
        aria-label="Scroll to work"
        className="group absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/30 transition-colors hover:text-white/60"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="h-8 w-px overflow-hidden bg-white/15">
          <span className="block h-3 w-px bg-white/60 motion-safe:animate-[scrollcue_1.8s_ease-in-out_infinite]" />
        </span>
      </a>
    </section>
  );
}
