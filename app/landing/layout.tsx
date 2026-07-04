import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { landingFontVars } from '@/components/landing/fonts';

export const metadata: Metadata = {
  title: 'Milan Katira — Full-stack Engineer',
  description:
    'Milan Katira is a full-stack engineer building scalable products and media infrastructure. Selected work, experience, and ways to get in touch.',
  alternates: { canonical: 'https://www.milankatira.com/landing' },
  openGraph: {
    title: 'Milan Katira — Full-stack Engineer',
    description:
      'Full-stack engineer building scalable products and media infrastructure. Selected work and experience.',
    url: 'https://www.milankatira.com/landing',
    siteName: 'Milan Katira',
    type: 'website',
  },
};

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${landingFontVars} min-h-dvh bg-black-100 font-sans text-white antialiased`}>
      {children}
    </div>
  );
}
