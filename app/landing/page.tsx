import type { BlogPost } from '@/types/blog';
import { LandingNav } from '@/components/landing/sections/LandingNav';
import { Hero } from '@/components/landing/sections/Hero';
import { LogoMarquee } from '@/components/landing/sections/LogoMarquee';
import { Work } from '@/components/landing/sections/Work';
import { About } from '@/components/landing/sections/About';
import { Experience } from '@/components/landing/sections/Experience';
import { Testimonials } from '@/components/landing/sections/Testimonials';
import { Blog } from '@/components/landing/sections/Blog';
import { Contact } from '@/components/landing/sections/Contact';
import { Footer } from '@/components/ui/footer-section';

// Match the home page: revalidate blog data hourly.
export const revalidate = 3600;

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'https://www.milankatira.com'}/api/blog`,
      { next: { revalidate: 3600 } },
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function LandingPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <LandingNav />
      <main>
        <Hero />
        <LogoMarquee />
        <Work />
        <About />
        <Experience />
        <Testimonials />
        <Blog posts={posts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
