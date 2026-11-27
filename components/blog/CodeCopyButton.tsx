'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CodeCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Copied' : 'Copy code'}
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/45 outline-none transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:ring-1 focus-visible:ring-white/40"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}
