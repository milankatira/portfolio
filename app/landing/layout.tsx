import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { landingFontVars } from '@/components/landing/fonts';

export const metadata: Metadata = {
  title: 'Milan Katira — Full-stack Engineer',
  description:
    'Full-stack engineer designing and shipping scalable SaaS products, media infrastructure, and polished web experiences.',
  // `/` is the canonical primary — this route points back to it to avoid duplicate content.
  alternates: { canonical: 'https://www.milankatira.com/' },
  openGraph: {
    title: 'Milan Katira — Full-stack Engineer',
    description:
      'Full-stack engineer designing and shipping scalable SaaS products, media infrastructure, and polished web experiences.',
    url: 'https://www.milankatira.com/',
    siteName: 'Milan Katira',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Milan Katira — Full-stack Engineer',
    description:
      'Full-stack engineer designing and shipping scalable SaaS products, media infrastructure, and polished web experiences.',
    creator: '@milankatira26',
  },
};

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${landingFontVars} min-h-dvh bg-black-100 font-sans text-white antialiased`}>
      {children}
    </div>
  );
}
