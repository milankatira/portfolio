'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Projects } from '@/data/projects';
import { Reveal } from '@/components/landing/primitives/Reveal';
import { SectionHeading } from '@/components/landing/primitives/SectionHeading';

type Project = (typeof Projects)[number];

// Solid dark poster so the frame isn't blank before the clip loads (preload="none").
const VIDEO_POSTER =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='10'%3E%3Crect%20width='16'%20height='10'%20fill='%2307070d'/%3E%3C/svg%3E";

/** Lazy, hover-to-play preview. Plays on pointer hover, or on scroll-into-view
 *  for touch devices. `preload="none"` keeps 5 CDN videos off the critical path. */
function ProjectMedia({ src, accent, label }: { src: string; accent: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  // Autoplay only while in the viewport; pause when it scrolls away. Never
  // autoplays for users who prefer reduced motion (poster stays).
  useEffect(() => {
    const v = videoRef.current;
    const wrap = wrapRef.current;
    if (!v || !wrap || reduce) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play()
            .then(() => setPlaying(true))
            .catch(() => {});
        } else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.5 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div
      ref={wrapRef}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#07070d]"
    >
      {/* subtle accent wash behind the frame */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{ background: `radial-gradient(120% 90% at 50% 0%, ${accent}, transparent 60%)` }}
        aria-hidden
      />
      <video
        ref={videoRef}
        src={src}
        poster={VIDEO_POSTER}
        muted
        loop
        playsInline
        preload="none"
        aria-label={`${label} demo preview`}
        title={`${label} demo preview`}
        className="relative h-full w-full object-cover"
      />
      {/* Preview affordance — fades out once the clip starts */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-500',
          playing ? 'opacity-0' : 'opacity-100',
        )}
      >
        <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black-100/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm">
          <Play className="h-2.5 w-2.5 fill-current" />
          Preview
        </span>
      </div>
    </div>
  );
}

function TechPills({ items, max = 6 }: { items: string[]; max?: number }) {
  const shown = items.slice(0, max);
  const extra = items.length - shown.length;
  return (
    <div className="flex flex-wrap gap-2.5">
      {shown.map((t) => (
        <span
          key={t}
          className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] leading-none text-white/55"
        >
          {t}
        </span>
      ))}
      {extra > 0 && (
        <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] leading-none text-white/40">
          +{extra}
        </span>
      )}
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-5 pt-1">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit the ${project.title} live site (opens in a new tab)`}
        className="group/link inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-white/85 outline-none transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-white/40"
      >
        Live site
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
      </a>
      <a
        href={project.sourceCode}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View the ${project.title} source code on GitHub (opens in a new tab)`}
        className="inline-flex items-center gap-1.5 rounded-sm text-sm text-white/45 outline-none transition-colors hover:text-white/80 focus-visible:ring-1 focus-visible:ring-white/40"
      >
        <Github className="h-4 w-4" />
        Code
      </a>
    </div>
  );
}

function ProjectTitle({ project, size }: { project: Project; size: 'lg' | 'md' }) {
  return (
    <h3
      className={cn(
        'flex items-center gap-2.5 font-display font-semibold tracking-tight text-white',
        size === 'lg' ? 'text-2xl md:text-3xl' : 'text-xl',
      )}
    >
      <span
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: project.accentColor }}
        aria-hidden
      />
      {project.title}
    </h3>
  );
}

export function Work() {
  const featured = Projects.find((p) => p.featured) ?? Projects[0];
  const rest = Projects.filter((p) => p !== featured);

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="Selected work"
        title={
          <>
            Products I&rsquo;ve designed <span className="font-serif italic text-white/70">&amp;</span> shipped
          </>
        }
        description="A selection of full-stack SaaS products — from real-time infrastructure to polished product surfaces."
      />

      {/* Featured */}
      <Reveal className="mt-14">
        <article className="card-lit group grid grid-cols-1 gap-8 rounded-2xl border border-white/[0.08] bg-white/[0.015] p-4 transition-colors duration-500 hover:border-white/15 md:grid-cols-2 md:p-6 lg:gap-12">
          <ProjectMedia src={featured.short} accent={featured.accentColor} label={featured.title} />
          <div className="flex flex-col justify-center gap-5 md:py-4 md:pr-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">
              Featured
            </span>
            <ProjectTitle project={featured} size="lg" />
            <p className="max-w-md text-[15px] leading-relaxed text-white/60">
              {featured.description}
            </p>
            <TechPills items={featured.technologies} max={7} />
            <ProjectLinks project={featured} />
          </div>
        </article>
      </Reveal>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {rest.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06}>
            <article className="card-lit group flex h-full flex-col gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.015] p-4 transition-[transform,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-white/15 md:p-5">
              <ProjectMedia src={project.short} accent={project.accentColor} label={project.title} />
              <div className="flex flex-1 flex-col gap-4 px-1">
                <ProjectTitle project={project} size="md" />
                <p className="line-clamp-3 text-sm leading-relaxed text-white/55">
                  {project.description}
                </p>
                <div className="mt-auto flex flex-col gap-4">
                  <TechPills items={project.technologies} max={5} />
                  <ProjectLinks project={project} />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
