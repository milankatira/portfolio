'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-100 text-white">
      <h1 className="text-9xl font-bold text-cyan-500">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-lg mt-2 text-gray-400">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="mt-8">
        <Button>Go back to Home</Button>
      </Link>
    </div>
  );
}
