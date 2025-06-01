"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toSlug } from '@/utils/slug';

interface BlogPost {
    _id: string;
    title: string;
    thumbnail: string;
}

export function BlogSection({blogdata}:{blogdata:BlogPost[]}) {

    return (
        <section id="blog" className="py-20 w-full">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white tracking-tight">
                    All of my <span className="text-cyan-500">Technical Knowledge</span> in one place
                </h2>
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto text-center mb-12 font-light">
                    {`I'm obsessed with writing bad code. I'm also obsessed with writing. Here, I write about my experiences with code and the things I've learned along the way.`}
                </p>



                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogdata.map((post) => (
                            <motion.div
                                key={post._id}
                                className="relative group rounded-xl overflow-hidden shadow-lg border border-gray-800/80 backdrop-blur-sm bg-gray-900/30 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-cyan-500/20 max-w-[370px]"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link href={`/blog/${toSlug(post.title)}`} className="block">
                                    {post.thumbnail && (
                                        <div className="relative w-full h-full max-w-[370px] max-h-[370px] overflow-hidden">
                                            <Image
                                                src={post.thumbnail}
                                                alt={post.title}
                                                width={370}
                                                height={370}
                                                objectFit="cover"
                                                className="transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors whitespace-pre-line">
                                            {post.title}
                                        </h3>
                                        <span className="inline-flex items-center text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-wider">
                                            Read More <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

            </div>
        </section>
    );
}
