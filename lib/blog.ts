import { cache } from 'react';
import connectDB from '@/utils/db';
import BlogPostModel from '@/model/BlogPost';
import { revertSlug, toSlug } from '@/utils/slug';

export { SITE_URL } from '@/lib/site';

export interface Post {
  _id: string;
  title: string;
  thumbnail: string;
  content: string;
  excerpt?: string;
  description?: string;
  tags?: string[];
  isPublic?: boolean;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/** All posts, newest first. Cached per request so metadata + page share one query. */
export const getAllPosts = cache(async (): Promise<Post[]> => {
  await connectDB();
  const posts = await BlogPostModel.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(posts));
});

export function postSlug(post: Pick<Post, 'slug' | 'title'>): string {
  return post.slug || toSlug(post.title);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const wanted = decodeURIComponent(slug).toLowerCase();
  const posts = await getAllPosts();
  return (
    posts.find((p) => postSlug(p) === wanted) ||
    posts.find((p) => p.title.toLowerCase() === revertSlug(wanted).toLowerCase())
  );
}

export function postDescription(post: Post): string {
  return (post.description || post.excerpt || post.title).trim();
}

export function readingMinutes(markdown: string): number {
  const words = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function wordCount(markdown: string): number {
  return markdown.split(/\s+/).filter(Boolean).length;
}

export function formatDate(value?: string): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/** URL-safe id for a heading. Must stay in sync between the TOC and the rendered headings. */
export function slugifyHeading(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'section'
  );
}

/** Returns a function that hands out unique ids in document order (like github-slugger). */
export function createSlugger() {
  const seen = new Map<string, number>();
  return (text: string) => {
    const base = slugifyHeading(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };
}

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

/** Table of contents from markdown h1-h3 (h1/h2 → level 2, h3 → level 3), skipping fenced code. */
export function extractToc(markdown: string): TocItem[] {
  const slug = createSlugger();
  const items: TocItem[] = [];
  let inFence = false;
  for (const raw of markdown.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(raw)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{1,3})\s+(.+?)\s*#*\s*$/.exec(raw);
    if (!m) continue;
    const text = stripInlineMarkdown(m[2]);
    if (!text) continue;
    items.push({ id: slug(text), text, level: m[1].length === 3 ? 3 : 2 });
  }
  return items;
}
