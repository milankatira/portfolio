import Link from 'next/link';
import React from 'react';
import { toSlug } from '@/utils/slug';

interface BlogPost {
  _id: string;
  title: string;
  slug?: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch("https://www.milankatira.com/api/blog", { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error('Failed to fetch blog posts');
  }
  return res.json();
}

export default async function BlogListPage() {
  const blogs = await getBlogPosts();

  return (
    <div className="container mx-auto py-20">
      <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">All Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link href={`/blog/${blog.slug || toSlug(blog.title)}`} key={blog._id}>
            <div className="bg-gray-900/30 border border-gray-800/80 rounded-lg p-6 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
              <h2 className="text-xl font-semibold text-white mb-2">{blog.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
