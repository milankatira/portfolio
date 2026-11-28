import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { Projects, getProject } from '@/data/projects';
import { SITE_URL } from '@/lib/site';
import { landingFontVars } from '@/components/landing/fonts';
import { LandingNav } from '@/components/landing/sections/LandingNav';
import { Footer } from '@/components/ui/footer-section';
import { Reveal } from '@/components/landing/primitives/Reveal';
import { CtaButton } from '@/components/landing/primitives/CtaButton';
import { GlowBackground } from '@/components/landing/primitives/GlowBackground';

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Project not found' };
  const url = `${SITE_URL}/project-details/${project.slug}`;
  const description =
    project.description.length > 160 ? `${project.description.slice(0, 157).trimEnd()}…` : project.description;
  const full = `${project.title}: ${project.goal.replace(/\.$/, '')}`;
  const title = full.length <= 60 ? full : `${full.slice(0, 60).replace(/\s+\S*$/, '')}…`;
  return {
    title,
    description,
    keywords: project.technologies,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: `${project.title} | Milan Katira`,
      description,
      images: [{ url: project.cover, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Milan Katira`,
      description,
      images: [project.cover],
      creator: '@milankatira26',
    },
  };
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/45">
      <span className="h-px w-6 bg-white/25" aria-hidden />
      {children}
    </h2>
  );
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return notFound();

  const index = Projects.indexOf(project);
  const prev = Projects[(index - 1 + Projects.length) % Projects.length];
  const next = Projects[(index + 1) % Projects.length];
  const allFeatures = [...project.features, ...project.moreFeatures];
  const screenshots = project.images.filter((src) => src !== project.cover);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    image: project.images,
    url: `${SITE_URL}/project-details/${project.slug}`,
    sameAs: project.sourceCode,
    author: { '@type': 'Person', name: 'Milan Katira', url: SITE_URL },
  };

  return (
    <div className={`${landingFontVars} min-h-dvh bg-black-100 font-sans text-white antialiased`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <LandingNav />

      <main>
        {/* Hero */}
        <section id="top" className="relative overflow-hidden px-6 pb-16 pt-32 md:pb-20 md:pt-40">
          <GlowBackground glow="top" />
          <div className="relative z-10 mx-auto max-w-5xl">
            <Reveal>
              <Link
                href="/#work"
                className="group inline-flex items-center gap-1.5 rounded-sm text-sm text-white/55 outline-none transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-white/40"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                All projects
              </Link>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mt-10 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-white/45">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: project.accentColor }} aria-hidden />
                {project.category} · {project.status}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 font-display text-[clamp(2.5rem,7vw,4.75rem)] font-semibold leading-[1] tracking-[-0.03em]">
                {project.title}
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">{project.goal}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <CtaButton href={project.link} variant="primary" external>
                  Visit live site
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </CtaButton>
                <CtaButton href={project.sourceCode} variant="ghost" external>
                  <Github className="h-4 w-4" />
                  Source code
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Cover */}
        <section className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="card-lit relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#07070d]">
              <Image
                src={project.cover}
                alt={`${project.title} dashboard`}
                width={1600}
                height={1000}
                priority
                sizes="(min-width: 1152px) 1104px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </section>

        {/* Overview + stack */}
        <section className="mx-auto grid max-w-5xl grid-cols-1 gap-14 px-6 py-24 md:grid-cols-[1.6fr_1fr] md:py-28">
          <div className="flex flex-col gap-6">
            <SectionLabel>Overview</SectionLabel>
            {project.overview.split('\n\n').map((para) => (
              <p key={para.slice(0, 32)} className="text-[17px] leading-relaxed text-white/70">
                {para}
              </p>
            ))}
          </div>
          <aside className="flex flex-col gap-5">
            <SectionLabel>Stack</SectionLabel>
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 font-mono text-xs leading-none text-white/65"
                >
                  {t}
                </span>
              ))}
            </div>
          </aside>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-5xl px-6 pb-24 md:pb-28">
          <SectionLabel>Key features</SectionLabel>
          <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
            {allFeatures.map((f, i) => (
              <li key={f} className="flex items-start gap-4 bg-black-100 p-5 md:p-6">
                <span className="font-mono text-xs text-white/30">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[15px] leading-relaxed text-white/70">{f}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Screenshots */}
        {screenshots.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 pb-24 md:pb-28">
            <div className="mx-auto max-w-5xl">
              <SectionLabel>Screenshots</SectionLabel>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {screenshots.map((src, i) => (
                <Reveal key={src} delay={(i % 2) * 0.06}>
                  <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#07070d]">
                    <Image
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      width={1200}
                      height={750}
                      sizes="(min-width: 768px) 540px, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Prev / next */}
        <nav aria-label="More projects" className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-6 pb-24 md:pb-32">
          {[
            { p: prev, label: 'Previous', Icon: ArrowLeft, align: 'items-start text-left' },
            { p: next, label: 'Next', Icon: ArrowRight, align: 'items-end text-right' },
          ].map(({ p, label, Icon, align }) => (
            <Link
              key={label}
              href={`/project-details/${p.slug}`}
              className={`card-lit group flex flex-col gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.015] p-5 transition-colors hover:border-white/15 md:p-6 ${align}`}
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                {label === 'Previous' && <Icon className="h-3.5 w-3.5" />}
                {label} project
                {label === 'Next' && <Icon className="h-3.5 w-3.5" />}
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-white md:text-xl">{p.title}</span>
            </Link>
          ))}
        </nav>
      </main>

      <Footer />
    </div>
  );
}
