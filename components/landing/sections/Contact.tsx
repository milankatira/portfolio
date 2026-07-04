import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import { Reveal } from '@/components/landing/primitives/Reveal';
import { CtaButton } from '@/components/landing/primitives/CtaButton';
import { GlowBackground } from '@/components/landing/primitives/GlowBackground';
import { profile } from '@/components/landing/data';

const socials = [
  { label: 'GitHub', href: profile.socials.github, Icon: Github },
  { label: 'LinkedIn', href: profile.socials.linkedin, Icon: Linkedin },
  { label: 'Twitter', href: profile.socials.twitter, Icon: Twitter },
];

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="card-lit relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.015] px-6 py-20 text-center md:py-28">
        <GlowBackground glow="center" />

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/45">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
              {profile.availability}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.02] tracking-tight text-white">
              Let&rsquo;s build something{' '}
              <span className="font-serif italic font-normal text-white/75">worth shipping.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
              Have a product in mind, a hard problem to untangle, or a role to fill? I read
              every message.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <CtaButton href={`mailto:${profile.email}`} variant="primary">
                {profile.email}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </CtaButton>
              <div className="flex items-center gap-2">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 transition-all hover:border-white/25 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
