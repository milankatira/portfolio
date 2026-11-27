'use client';

import { useState } from 'react';
import { Check, Link2, Linkedin, Twitter } from 'lucide-react';

const btn =
  'inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 outline-none transition-colors hover:border-white/25 hover:text-white focus-visible:ring-1 focus-visible:ring-white/40';

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="flex items-center gap-2">
      <a className={btn} href={`https://twitter.com/intent/tweet?url=${u}&text=${t}&via=milankatira26`} target="_blank" rel="noopener noreferrer" aria-label="Share on X / Twitter">
        <Twitter className="h-4 w-4" />
      </a>
      <a className={btn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
        <Linkedin className="h-4 w-4" />
      </a>
      <button type="button" className={btn} onClick={copy} aria-label={copied ? 'Link copied' : 'Copy link'}>
        {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
