"use client";
import { motion } from 'framer-motion';
import { toSlug } from '@/utils/slug';
import { HoverEffect } from '@/components/ui/card-hover-effect';

interface BlogPost {
  _id: string;
  title: string;
  excerpt?: string;
  readTime?: string;
}

interface BlogSectionProps {
  blogdata: BlogPost[];
}

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

  console.log(blogdata,"blogdata")
  // map your posts into the shape HoverEffect expects
  const items = blogdata.map((post) => ({
    title: post.title,
    description: post.excerpt ?? post.readTime ?? '',
    link: `/blog/${toSlug(post.title)}`
  }));

  return (
    <section id="blog" className="py-20 w-full relative">
      <div className="container mx-auto px-4">
        {/* Header */}
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

        {/* Hover cards (no images) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          <HoverEffect
            items={items}
            className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          />
        </motion.div>
      </div>
    </section>
  );
}
