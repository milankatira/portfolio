import type { MetadataRoute } from 'next';
import { Projects } from '@/data/projects';
import { getAllPosts, postSlug } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: Awaited<ReturnType<typeof getAllPosts>> = [];
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error('sitemap: failed to load posts', error);
  }

  const latestPost = posts[0]?.updatedAt || posts[0]?.createdAt;

  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${postSlug(post)}`,
    lastModified: post.updatedAt || post.createdAt,
    changeFrequency: 'monthly',
    priority: 0.8,
    images: post.thumbnail ? [post.thumbnail] : undefined,
  }));

  const projectUrls: MetadataRoute.Sitemap = Projects.map((project) => ({
    url: `${SITE_URL}/project-details/${project.slug}`,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [
    { url: SITE_URL, lastModified: latestPost, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: latestPost, changeFrequency: 'weekly', priority: 0.9 },
    ...blogUrls,
    ...projectUrls,
  ];
}
