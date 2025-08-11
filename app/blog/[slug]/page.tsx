import React from 'react';
import Markdown from '@/components/Markdown';
import { revertSlug, toSlug } from '@/utils/slug';
import BackButton from '@/components/sections/blog/BackButton';
import Script from 'next/script';

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

async function getBlogPost(slug: string): Promise<BlogPost> {
    const res = await fetch(`https://www.milankatira.com/api/blog/${revertSlug(slug)}`, { next: { revalidate: 3600 } });
    if (!res.ok) {
        throw new Error('Failed to fetch blog post');
    }
    return res.json();
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
export const revalidate = false;

export async function generateStaticParams() {
    const res = await fetch("https://www.milankatira.com/api/blog");
    const blogs: BlogPost[] = await res.json();
    return blogs.map((blog) => ({
        slug: blog.slug || toSlug(blog.title),
    }));
}
