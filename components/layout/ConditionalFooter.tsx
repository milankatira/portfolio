'use client';

import { usePathname } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';

/**
 * Renders the global site footer on every route except the bespoke
 * `/landing` experience, which ships its own premium footer.
 */
export function ConditionalFooter() {
  const pathname = usePathname();

  // The home page, /blog and project pages render their own footer.
  if (pathname === '/' || pathname?.startsWith('/blog') || pathname?.startsWith('/project-details')) {
    return null;
  }

  return (
    <div className="bg-black-100 max-w-7xl w-full flex justify-center items-center mx-auto sm:px-10 px-5">
      <Footer />
    </div>
  );
}
