'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { landingNav, profile } from '@/components/landing/data';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight the nav item for the section crossing mid-viewport.
  useEffect(() => {
    const els = landingNav
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          'flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5',
          scrolled
            ? 'border border-white/10 bg-black-100/70 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl'
            : 'border border-transparent bg-transparent',
        )}
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5 rounded-full pl-1 pr-3 font-display text-sm font-semibold tracking-tight text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[13px] font-bold text-black-100">
            MK
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {landingNav.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-sm outline-none transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-white/40',
                  isActive ? 'bg-white/[0.06] text-white' : 'text-white/55 hover:text-white',
                )}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="group hidden items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-4 py-1.5 text-sm text-white/85 transition-all hover:border-white/25 hover:text-white sm:inline-flex"
          >
            Let&rsquo;s talk
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-white/80 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div className="fixed inset-0 top-0 z-40 flex flex-col bg-black-100/95 px-6 pb-10 pt-24 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {landingNav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-4 font-display text-2xl text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-black-100"
          >
            Let&rsquo;s talk
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </header>
  );
}
