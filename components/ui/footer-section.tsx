'use client';

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { GithubIcon, LinkedinIcon, MailIcon, TwitterIcon } from 'lucide-react';

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  external?: boolean;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: 'Explore',
    links: [
      { title: 'Work', href: '#work' },
      { title: 'About', href: '#about' },
      { title: 'Experience', href: '#experience' },
      { title: 'Testimonials', href: '#testimonials' },
    ],
  },
  {
    label: 'Resources',
    links: [
      { title: 'Blog', href: '/blog' },
      { title: 'Resume', href: '/Milan_katira_resume.pdf', external: true },
      { title: 'Contact', href: '#contact' },
      { title: 'Home', href: '/' },
    ],
  },
  {
    label: 'Connect',
    links: [
      { title: 'GitHub', href: 'https://github.com/milankatira', icon: GithubIcon, external: true },
      { title: 'LinkedIn', href: 'https://www.linkedin.com/in/milan-katira/', icon: LinkedinIcon, external: true },
      { title: 'Twitter/X', href: 'https://twitter.com/milankatira26', icon: TwitterIcon, external: true },
      { title: 'Email', href: 'mailto:milankatira26@gmail.com', icon: MailIcon },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center rounded-t-4xl border-t border-white/[0.08] bg-[radial-gradient(35%_128px_at_50%_0%,rgba(255,255,255,0.08),transparent)] px-6 py-14 md:rounded-t-6xl lg:py-20">
      <div className="absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur" />

      <div className="grid w-full gap-10 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <a href="#top" className="flex items-center gap-2.5 font-display text-sm font-semibold tracking-tight text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[13px] font-bold text-black-100">
              MK
            </span>
            Milan Katira
          </a>
          <p className="max-w-xs text-sm leading-relaxed text-white/45">
            Full-stack engineer building products from interface to infrastructure.
          </p>
          <p className="mt-8 text-sm text-white/35 md:mt-0">
            © {new Date().getFullYear()} Milan Katira. All rights reserved.
          </p>
        </AnimatedContainer>

        <div className="mt-4 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-6 md:mb-0">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                  {section.label}
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        {...(link.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="inline-flex items-center rounded-sm outline-none transition-colors duration-300 hover:text-white focus-visible:ring-1 focus-visible:ring-white/40"
                      >
                        {link.icon && <link.icon className="me-1.5 size-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
