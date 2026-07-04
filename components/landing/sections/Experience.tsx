'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { experience } from '@/components/landing/data';
import { parseTextWithBold } from '@/utils/parseTextWithBold';
import { SectionHeading } from '@/components/landing/primitives/SectionHeading';

export function Experience() {
  const [activeId, setActiveId] = useState(experience[0].id);
  const active = experience.find((e) => e.id === activeId) ?? experience[0];

  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've built"
        description="Five years across media infrastructure, edtech at scale, and product engineering."
      />

      <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr] lg:gap-10">
        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Companies"
          className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
        >
          {experience.map((e) => {
            const selected = e.id === activeId;
            return (
              <button
                key={e.id}
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(e.id)}
                className={cn(
                  'group flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-300 lg:shrink',
                  selected
                    ? 'border-white/12 bg-white/[0.05]'
                    : 'border-transparent text-white/45 hover:bg-white/[0.02] hover:text-white/70',
                )}
              >
                <span
                  className={cn('h-2 w-2 shrink-0 rounded-full transition-opacity', selected ? 'opacity-100' : 'opacity-30')}
                  style={{ backgroundColor: e.color }}
                  aria-hidden
                />
                <span className="flex flex-col">
                  <span className={cn('text-sm font-medium tracking-tight', selected ? 'text-white' : '')}>
                    {e.company}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/35">
                    {e.duration.split('–')[0].trim()}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="card-lit rounded-2xl border border-white/[0.08] bg-white/[0.015] p-6 md:p-8"
          >
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <h3 className="font-display text-xl font-semibold tracking-tight text-white md:text-2xl">
                {active.title}
              </h3>
              <span className="text-white/30">/</span>
              <span className="font-display text-xl font-medium tracking-tight text-white/70 md:text-2xl">
                {active.company}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-xs text-white/40">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {active.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {active.location}
              </span>
            </div>

            <div className="my-6 h-px w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent" />

            <ul className="space-y-3.5">
              {active.details.map((detail, i) => {
                const nested = detail.startsWith('  - ');
                const content = nested ? detail.slice(4) : detail;
                return (
                  <li key={i} className={cn('flex items-start gap-3', nested && 'ml-6')}>
                    <span
                      className={cn('mt-2 shrink-0 rounded-full bg-white/40', nested ? 'h-1 w-1' : 'h-1.5 w-1.5')}
                      aria-hidden
                    />
                    <p className="text-[15px] leading-relaxed text-white/60">
                      {parseTextWithBold(content)}
                    </p>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
