import React from 'react';
import Markdown from '@/components/Markdown';
import { revertSlug, toSlug } from '@/utils/slug';
import axios from 'axios';

interface BlogPost {
    _id: string;
    title: string;
    thumbnail: string;
    content: string;
    description?: string;
    date?: string;
    slug?: string;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { slug } = await params;

    const response = await axios.get(`https://milankatira.vercel.app/api/blog/${revertSlug(slug)}`);
    const blog: BlogPost = response.data;
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
    const response = await axios.get(`https://milankatira.vercel.app/api/blog/${revertSlug(slug)}`);
    const blog: BlogPost = response.data;

    return (
        <main className='bg-black-100'>
            <section className="relative py-20 bg-black-100 text-white overflow-hidden ">
                <div className="w-full mx-auto px-4 relative z-10">
                    <div className="max-w-[1200px] mx-auto text-center">
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
export const revalidate = 60;
