import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ConditionalFooter } from '@/components/layout/ConditionalFooter';
import { Toaster } from '@/components/ui/toaster';
import { ProgressBarWrapper } from '@/components/progress-bar-wrapper';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Swap system font while loading custom font
  variable: '--font-inter', // CSS variable for font
});


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: ['Milan Katira', 'Full-stack Engineer', 'Full-Stack Developer', 'React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'SaaS', 'Portfolio'],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  icons: { icon: '/milan_katira.jpeg', apple: '/milan_katira.jpeg' },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    url: SITE_URL,
    type: 'website',
    locale: 'en_US',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: '@milankatira26',
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black-100`}>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-L77M2ZG6HP" strategy="afterInteractive" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L77M2ZG6HP');
          `}
        </Script>
        <ProgressBarWrapper />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <main className="flex-grow">{children}</main>
          </div>
          <Toaster />
          <ConditionalFooter />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
