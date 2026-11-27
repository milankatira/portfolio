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
import { PERSON, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site';

// Revalidate blog data hourly.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: PERSON.name,
      url: SITE_URL,
      image: PERSON.image,
      jobTitle: PERSON.jobTitle,
      worksFor: { '@type': 'Organization', name: PERSON.worksFor },
      knowsAbout: PERSON.knowsAbout,
      sameAs: PERSON.sameAs,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profile`,
      url: SITE_URL,
      name: SITE_TITLE,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': `${SITE_URL}/#person` },
    },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
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
