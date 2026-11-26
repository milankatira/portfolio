import React from 'react';
import Markdown from '@/components/Markdown';
import { revertSlug, toSlug } from '@/utils/slug';
import BackButton from '@/components/sections/blog/BackButton';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import connectDB from '@/utils/db';
import BlogPostModel from '@/model/BlogPost';

interface BlogPost {
    _id: string;
    title: string;
    thumbnail: string;
    content: string;
    description?: string;
    date?: string;
    slug?: string;
}


interface BlogPost {
    _id: string;
    title: string;
    thumbnail: string;
    content: string;
    description?: string;
    date?: string;
    slug?: string;
}

async function getAllPosts(): Promise<BlogPost[]> {
    await connectDB();
    const posts = await BlogPostModel.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(posts));
}

async function getBlogPost(slug: string): Promise<BlogPost> {
    const wanted = decodeURIComponent(slug).toLowerCase();
    const posts = await getAllPosts();
    const post =
        posts.find((p) => (p.slug || toSlug(p.title)) === wanted) ||
        posts.find((p) => p.title.toLowerCase() === revertSlug(wanted).toLowerCase());
    if (!post) {
        notFound();
    }
    return post;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const blog: BlogPost = await getBlogPost(slug);

    return {
        title: `${blog.title} | Milan Katira`,
        description: blog.description || blog.title,
        openGraph: {
            title: blog.title,
            description: blog.description || blog.title,
            images: [blog.thumbnail],
            url: `/blog/${blog.slug || toSlug(blog.title)}/`,
            type: 'article',
            siteName: 'Milan Katira',
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.title,
            description: blog.description || blog.title,
            images: [blog.thumbnail],
            creator: '@milankatira26',
        },
    };
}

const BlogDetailsDark = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params;
    const blog: BlogPost = await getBlogPost(slug);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blog.title,
        image: blog.thumbnail,
        author: {
            '@type': 'Person',
            name: 'Milan Katira',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Milan Katira',
            logo: {
                '@type': 'ImageObject',
                url: 'https://www.milankatira.com/milan_katira.jpeg',
            },
        },
        datePublished: blog.date,
        description: blog.description || blog.title,
    };

    return (
        <main className='bg-black-100 z-50'>
            <Script id="json-ld" type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </Script>
            <section className="relative py-20 bg-black-100 text-white overflow-hidden ">
                <div className="w-full mx-auto px-4 relative z-10">
                    <div className="max-w-[1200px] mx-auto text-center">
                        <BackButton />
                        {blog.date && (
                            <p className="text-sm text-gray-400 mb-2">{blog.date}</p>
                        )}
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                            {blog.title}
                        </h1>
                    </div>
                </div>
            </section>
            <div className="w-full mx-auto px-4 py-12 max-w-[1200px] text-gray-300 bg-black-100">
                <Markdown content={blog.content} />
            </div>
        </main>
    );
};

export default BlogDetailsDark;
export const revalidate = 3600;

export async function generateStaticParams() {
    const blogs = await getAllPosts();
    return blogs.map((blog) => ({
        slug: blog.slug || toSlug(blog.title),
    }));
}
