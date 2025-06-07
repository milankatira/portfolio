"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toSlug } from '@/utils/slug';
import { ChevronRight } from 'lucide-react';

interface BlogPost {
    _id: string;
    title: string;
    thumbnail: string;
    excerpt?: string;
    publishedAt?: string;
    readTime?: string;
}

interface BlogSectionProps {
    blogdata: BlogPost[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12
        }
    }
};

export function BlogSection({ blogdata }: BlogSectionProps) {
    if (!blogdata?.length) {
        return (
            <section id="blog" className="py-20 w-full">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl text-gray-400 mb-4">No blog posts available</h2>
                    <p className="text-gray-500">Check back soon for new content!</p>
                </div>
            </section>
        );
    }

    return (
        <section id="blog" className="py-20 w-full relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                        Technical <span className="text-cyan-500">Knowledge</span> Hub
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
                        Insights, tutorials, and experiences from my journey in software development.
                        Sharing knowledge one post at a time.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
                >
                    {blogdata.map((post) => (
                        <motion.article
                            key={post._id}
                            variants={cardVariants}
                            className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/30 border border-gray-800/50 backdrop-blur-lg shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 max-w-sm w-full"
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            <Link href={`/blog/${toSlug(post.title)}`} className="block">
                                <div>
                                    <Image
                                        src={post.thumbnail}
                                        alt={post.title}
                                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                        priority={false}
                                        width={370}
                                        height={390}
                                    />

                                </div>

                                <div className="p-6 space-y-4">
                                    <h3 className="text-xl font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                                        {post.title}
                                    </h3>

                                    {post.excerpt && (
                                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center text-cyan-400 font-medium text-sm group-hover:text-cyan-300 transition-colors">
                                            Read Article
                                            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>

                                        {post.readTime && (
                                            <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-full">
                                                {post.readTime}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="absolute inset-0 border border-transparent group-hover:border-cyan-500/30 rounded-2xl transition-all duration-300" />
                            </Link>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
