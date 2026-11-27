import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { ArticleBody } from '@/components/blog/ArticleBody';
import { BlogTopBar } from '@/components/blog/BlogTopBar';
import { PostCard } from '@/components/blog/PostCard';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { MobileTableOfContents, TableOfContents } from '@/components/blog/TableOfContents';
import { GlowBackground } from '@/components/landing/primitives/GlowBackground';
import { profile } from '@/components/landing/data';
import { Footer } from '@/components/ui/footer-section';
import {
  SITE_URL,
  extractToc,
  formatDate,
  getAllPosts,
  getPostBySlug,
  postDescription,
  postSlug,
  readingMinutes,
  wordCount,
} from '@/lib/blog';

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: postSlug(post) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post not found | Milan Katira' };

  const description = postDescription(post);
  const url = `${SITE_URL}/blog/${postSlug(post)}`;
  const images = post.thumbnail ? [{ url: post.thumbnail, width: 1200, height: 630, alt: post.title }] : [];

  return {
    title: `${post.title} | Milan Katira`,
    description,
    keywords: post.tags,
    authors: [{ name: profile.name, url: SITE_URL }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description,
      siteName: profile.name,
      images,
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [SITE_URL],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.thumbnail ? [post.thumbnail] : [],
      creator: '@milankatira26',
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const all = await getAllPosts();
  const related = all.filter((p) => p._id !== post._id).slice(0, 3);
  const toc = extractToc(post.content);
  const minutes = readingMinutes(post.content);
  const description = postDescription(post);
  const url = `${SITE_URL}/blog/${postSlug(post)}`;
  const tags = post.tags ?? [];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description,
      image: post.thumbnail ? [post.thumbnail] : undefined,
      datePublished: post.createdAt,
      dateModified: post.updatedAt || post.createdAt,
      wordCount: wordCount(post.content),
      timeRequired: `PT${minutes}M`,
      keywords: tags.length ? tags.join(', ') : undefined,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      url,
      inLanguage: 'en',
      author: {
        '@type': 'Person',
        name: profile.name,
        url: SITE_URL,
        sameAs: [profile.socials.github, profile.socials.linkedin, profile.socials.twitter],
      },
      publisher: {
        '@type': 'Person',
        name: profile.name,
        url: SITE_URL,
        image: `${SITE_URL}/milan_katira.jpeg`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <ReadingProgress targetId="article" />
      <BlogTopBar />

      <div className="relative">
        <GlowBackground />

        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 md:pt-40">
          {/* Header */}
          <header className="mx-auto max-w-3xl text-center">
            <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
              <ol className="flex items-center justify-center gap-2">
                <li><Link href="/" className="transition-colors hover:text-white">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/blog" className="transition-colors hover:text-white">Blog</Link></li>
              </ol>
            </nav>

            <h1 className="text-balance font-display text-[2.15rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[3.5rem]">
              {post.title}
            </h1>

            {description !== post.title && (
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/55 md:text-xl">{description}</p>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-white/50">
              <span className="flex items-center gap-2.5">
                <span className="relative h-7 w-7 overflow-hidden rounded-full border border-white/15">
                  <Image src={profile.photo} alt="" width={56} height={56} className="h-full w-full object-cover" />
                </span>
                <span className="text-white/80">{profile.name}</span>
              </span>
              <span className="h-1 w-1 rounded-full bg-white/25" aria-hidden />
              {post.createdAt && <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>}
              <span className="h-1 w-1 rounded-full bg-white/25" aria-hidden />
              <span>{minutes} min read</span>
            </div>
          </header>

          {/* Cover */}
          {post.thumbnail && (
            <div className="relative mx-auto mt-12 aspect-[1200/630] max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:mt-16">
              <Image
                src={post.thumbnail}
                alt={`Cover image for ${post.title}`}
                fill
                priority
                sizes="(min-width: 1100px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          {/* Body + TOC */}
          <div className="mx-auto mt-14 grid max-w-5xl gap-12 md:mt-20 lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-16">
            <article id="article" className="min-w-0 max-w-[44rem]">
              <MobileTableOfContents items={toc} />
              <ArticleBody content={post.content} />

              {tags.length > 0 && (
                <ul className="mt-14 flex flex-wrap gap-2" aria-label="Tags">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-white/55"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
                <p className="text-sm text-white/50">Found this useful? Share it.</p>
                <ShareButtons url={url} title={post.title} />
              </div>

              {/* Author */}
              <aside className="card-lit mt-10 flex flex-col gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:flex-row sm:items-center">
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-white/15">
                  <Image src={profile.photo} alt={profile.name} width={112} height={112} className="h-full w-full object-cover" />
                </span>
                <div className="flex-1">
                  <p className="font-display text-base font-semibold text-white">Written by {profile.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">
                    {profile.role} building scalable SaaS products and developer tools. I write about what I learn shipping them.
                  </p>
                </div>
                <Link
                  href="/#contact"
                  className="group inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-white px-4 py-2 text-sm font-medium text-black-100 transition-colors hover:bg-white/85 sm:self-center"
                >
                  Get in touch
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </aside>
            </article>

            <aside className="hidden lg:block">
              <TableOfContents items={toc} />
            </aside>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="more-posts" className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <div className="flex items-end justify-between gap-6">
              <h2 id="more-posts" className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Keep reading
              </h2>
              <Link href="/blog" className="group inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white">
                All posts
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p._id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
