import { Metadata } from 'next';

interface MetaTagsProps {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  keywords?: string;
}

export function generateMetadata({
  title,
  description,
  ogImage = '/images/og-image.png',
  canonical,
  keywords,
}: MetaTagsProps): Metadata {
  const siteUrl = 'https://feedspark.com';

  return {
    title: `${title} | FeedSpark`,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [ogImage],
      type: 'website',
      siteName: 'FeedSpark',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonical || siteUrl,
    },
  };
}
