import type { ReactNode } from 'react';
import { landingFontVars } from '@/components/landing/fonts';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <div className={`${landingFontVars} min-h-dvh bg-black-100 text-white antialiased`}>{children}</div>;
}
