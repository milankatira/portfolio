import { Space_Grotesk, Instrument_Serif, JetBrains_Mono } from 'next/font/google';

// Display: oversized, tight-tracked headline face — the premium tell.
export const display = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

// Editorial accent: italic serif for emphasis words inside headlines.
export const serif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

// Labels / eyebrows / technical metadata.
export const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-mono',
});

// Combined variable classes to hang on the landing wrapper.
export const landingFontVars = `${display.variable} ${serif.variable} ${mono.variable}`;
