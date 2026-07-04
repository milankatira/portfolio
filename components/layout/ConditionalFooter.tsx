'use client';

import { usePathname } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';

/**
 * Renders the global site footer on every route except the bespoke
 * `/landing` experience, which ships its own premium footer.
 */
export function ConditionalFooter() {
  const pathname = usePathname();

  if (pathname?.startsWith('/landing')) {
    return null;
  }

  return (
    <div className="bg-black-100 max-w-7xl w-full flex justify-center items-center mx-auto sm:px-10 px-5">
      <Footer />
    </div>
  );
}
