import type { Metadata } from 'next';
import { BlogTopBar } from '@/components/blog/BlogTopBar';
import { PostCard } from '@/components/blog/PostCard';
import { GlowBackground } from '@/components/landing/primitives/GlowBackground';
import { Footer } from '@/components/ui/footer-section';
import { SITE_URL, getAllPosts } from '@/lib/blog';

export const revalidate = 3600;

const description =
  'Articles by Milan Katira on full-stack engineering, Node.js, React, Next.js, databases and building developer tools.';

export const metadata: Metadata = {
  title: 'Blog | Milan Katira',
  description,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: { title: 'Blog | Milan Katira', description, url: `${SITE_URL}/blog`, siteName: 'Milan Katira', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Blog | Milan Katira', description, creator: '@milankatira26' },
};

export default async function BlogListPage() {
  const posts = await getAllPosts();

  return (
    <>
      <BlogTopBar back={{ href: '/', label: 'Home' }} />
      <div className="relative">
        <GlowBackground />
        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-36 sm:px-8 md:pt-44">
          <header className="max-w-2xl">
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/45">
              <span className="h-px w-6 bg-white/25" aria-hidden />
              Writing
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              Notes from the <span className="font-serif font-normal italic">build</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/55">{description}</p>
          </header>

          {posts.length > 0 ? (
            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <PostCard key={post._id} post={post} priority={i < 3} />
              ))}
            </div>
          ) : (
            <p className="mt-14 text-white/55">New writing is on the way.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
