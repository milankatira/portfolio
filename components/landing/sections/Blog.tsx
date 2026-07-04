import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { toSlug } from '@/utils/slug';
import type { BlogPost } from '@/types/blog';
import { Reveal } from '@/components/landing/primitives/Reveal';
import { SectionHeading } from '@/components/landing/primitives/SectionHeading';

interface BlogProps {
  posts: BlogPost[];
}

function formatDate(value: Date | string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function Blog({ posts }: BlogProps) {
  const latest = posts?.slice(0, 3) ?? [];
  const hasPosts = latest.length > 0;

  return (
    <section id="blog" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow="Writing" title="Notes from the build" />
        <Reveal>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 rounded-sm text-sm text-white/60 outline-none transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-white/40"
          >
            All posts
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>

      {hasPosts ? (
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {latest.map((post, i) => (
            <Reveal key={post._id} delay={i * 0.06}>
              <Link
                href={`/blog/${toSlug(post.title)}`}
                className="card-lit group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.015] transition-[transform,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-white/15"
              >
                {post.thumbnail && (
                  <div className="aspect-[16/9] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.thumbnail}
                      alt={`Cover image for “${post.title}”`}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3.5 p-6">
                  {post.createdAt && (
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/35">
                      {formatDate(post.createdAt)}
                    </span>
                  )}
                  <h3 className="font-display text-lg font-medium leading-snug tracking-tight text-white">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="line-clamp-2 text-sm leading-relaxed text-white/55">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal className="mt-12">
          <div className="card-lit flex flex-col items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.015] px-6 py-16 text-center">
            <p className="max-w-sm text-[15px] leading-relaxed text-white/55">
              New writing on product engineering and scaling systems is on the way.
            </p>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-white outline-none transition-colors hover:text-white/80 focus-visible:ring-1 focus-visible:ring-white/40"
            >
              Visit the blog
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
      )}
    </section>
  );
}
