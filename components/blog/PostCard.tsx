import Link from 'next/link';
import Image from 'next/image';
import { formatDate, postDescription, postSlug, readingMinutes, type Post } from '@/lib/blog';

export function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <Link
      href={`/blog/${postSlug(post)}`}
      className="card-lit group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.015] outline-none transition-[transform,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-white/15 focus-visible:ring-1 focus-visible:ring-white/40"
    >
      {post.thumbnail && (
        <div className="relative aspect-[16/9] overflow-hidden bg-white/[0.03]">
          <Image
            src={post.thumbnail}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-80 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/35">
          {formatDate(post.createdAt)} · {readingMinutes(post.content)} min read
        </span>
        <h3 className="font-display text-lg font-medium leading-snug tracking-tight text-white">{post.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-white/55">{postDescription(post)}</p>
      </div>
    </Link>
  );
}
