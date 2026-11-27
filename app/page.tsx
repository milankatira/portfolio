import type { Metadata } from 'next';
import type { BlogPost } from '@/types/blog';
import { landingFontVars } from '@/components/landing/fonts';
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
import { getAllPosts } from '@/lib/blog';

// Revalidate blog data hourly.
export const revalidate = 3600;

const title = 'Milan Katira — Full-stack Engineer';
const description =
  'Full-stack engineer with 5+ years designing and shipping scalable SaaS products, media infrastructure, and polished web experiences.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://www.milankatira.com/' },
  openGraph: { title, description, url: 'https://www.milankatira.com/', siteName: 'Milan Katira', type: 'website' },
  twitter: { card: 'summary_large_image', title, description, creator: '@milankatira26' },
};

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    return (await getAllPosts()) as unknown as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <div className={`${landingFontVars} min-h-dvh bg-black-100 font-sans text-white antialiased`}>
      <LandingNav />
      <main>
        <Hero />
        <About />
        <LogoMarquee />
        <Work />
        <Experience />
        <Testimonials />
        <Blog posts={posts} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
