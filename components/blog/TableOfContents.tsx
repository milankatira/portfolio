'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { TocItem } from '@/lib/blog';

function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return active;
}

function TocList({ items, active, onNavigate }: { items: TocItem[]; active?: string; onNavigate?: () => void }) {
  return (
    <ol className="space-y-1 border-l border-white/[0.08]">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={onNavigate}
            aria-current={active === item.id ? 'location' : undefined}
            className={cn(
              '-ml-px block border-l py-1 pr-2 text-[13.5px] leading-snug outline-none transition-colors focus-visible:text-white',
              item.level === 3 ? 'pl-7' : 'pl-4',
              active === item.id
                ? 'border-white text-white'
                : 'border-transparent text-white/45 hover:border-white/30 hover:text-white/80',
            )}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Sticky desktop sidebar with scroll-spy. */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const active = useActiveHeading(items.map((i) => i.id));
  if (items.length < 2) return null;
  return (
    <nav aria-label="Table of contents" className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto pb-6">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">On this page</p>
      <TocList items={items} active={active} />
    </nav>
  );
}

/** Collapsible TOC for small screens, shown above the article. */
export function MobileTableOfContents({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);
  if (items.length < 2) return null;
  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      className="group mb-10 rounded-xl border border-white/10 bg-white/[0.02] lg:hidden"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/55 [&::-webkit-details-marker]:hidden">
        On this page
        <span className="text-base leading-none text-white/40 transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="px-4 pb-4">
        <TocList items={items} onNavigate={() => setOpen(false)} />
      </div>
    </details>
  );
}
