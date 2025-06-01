import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ProgressBarWrapper } from '@/components/progress-bar';

import { ClerkThemeProvider } from '@/components/clerk-provider';
import { constructMetadata } from '@/config/metadata';

export const metadata = constructMetadata({
  title: 'FeedSpark - User Feedback Management Platform',
  description:
    "Transform your user feedback into actionable insights. Collect, analyze, and improve your product with FeedSpark's powerful feedback management platform.",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <ClerkThemeProvider>
            <ProgressBarWrapper />
            <Toaster />
            {children}
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
