import dynamic from 'next/dynamic';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { FloatingNav } from '@/components/ui/FloatingNavbar';
import { navItems } from '@/constant';
import ProjectSection from '@/components/sections/ProjectSection';
import Testimonials from '@/components/Testimonials';
import { BlogSection } from '@/components/sections/BlogSection';
import AboutSection from '@/components/sections/AboutSection';
import { BlogPost } from '@/types/blog';

// Lazy load heavy animation components
const Hero = dynamic(() => import('@/components/sections/Hero'), {
  loading: () => <div className="h-screen bg-black-100" />,
  ssr: true,
});

const LazyTestimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="h-96 bg-black-100" />,
  ssr: true,
});

// Revalidate blog data every 1 hour (3600 seconds)
export const revalidate = 3600;

export default async function Home() {
  async function getBlogPosts(): Promise<BlogPost[]> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://www.milankatira.com'}/api/blog`, {
        cache: 'default',
        next: { revalidate: 3600 },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch blog posts: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }
  const blogdata = await getBlogPosts();
  return (
    <div className='bg-black-100'>
      <Hero />
      <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
        <FloatingNav navItems={navItems} />
        <AboutSection />
        <ExperienceSection />
        <div className="max-w-7xl w-full">
          <TechStackSection />
          <ProjectSection />
          <BlogSection blogdata={blogdata} />
        </div>
        <LazyTestimonials />
      </main>
    </div>
  );
}
