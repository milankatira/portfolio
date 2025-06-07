import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { FloatingNav } from '@/components/ui/FloatingNavbar';
import { navItems } from '@/constant';
import Hero from '@/components/sections/Hero';
import ProjectSection from '@/components/sections/ProjectSection';
import Testimonials from '@/components/Testimonials';
import { BlogSection } from '@/components/sections/BlogSection';
import axios from 'axios';
import AboutSection from '@/components/sections/AboutSection';

export default async function Home() {
  interface BlogPost {
    _id: string;
    title: string;
    thumbnail: string;
  }
  async function getBlogPosts(): Promise<BlogPost[]> {
    try {
      const response = await axios.get("https://milankatira.vercel.app/api/blog");
      return response.data;
    } catch (error) {
      console.error("Error fetching blog posts:", error);
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
        <Testimonials />
      </main>
    </div>
  );
}
