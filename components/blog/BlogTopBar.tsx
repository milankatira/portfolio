import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { profile } from '@/components/landing/data';

export function BlogTopBar({ back = { href: '/blog', label: 'All posts' } }: { back?: { href: string; label: string } }) {
  return (
    <header className="absolute inset-x-0 top-0 z-40 flex justify-center px-4 pt-5">
      <nav aria-label="Blog" className="flex w-full max-w-6xl items-center justify-between px-2">
        <Link href="/" className="flex items-center gap-2.5 rounded-full font-display text-sm font-semibold tracking-tight text-white outline-none focus-visible:ring-1 focus-visible:ring-white/40">
          <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/15">
            <Image src={profile.photo} alt="" width={64} height={64} className="h-full w-full object-cover" />
          </span>
          {profile.name}
        </Link>
        <Link
          href={back.href}
          className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/70 outline-none backdrop-blur-sm transition-colors hover:border-white/20 hover:text-white focus-visible:ring-1 focus-visible:ring-white/40"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          {back.label}
        </Link>
      </nav>
    </header>
  );
}
