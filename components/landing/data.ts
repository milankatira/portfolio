// Single source of truth for home-page content (profile, stats, experience,
// testimonials). Projects live in data/projects.ts.
import { Projects } from '@/data/projects';

export interface LandingNavLink {
  label: string;
  href: string;
}

// Same order as the sections on the page. Hrefs are root-relative so the nav
// also works from /project-details/* pages.
export const landingNav: LandingNavLink[] = [
  { label: 'About', href: '/#about' },
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Writing', href: '/#blog' },
];

export const profile = {
  name: 'Milan Katira',
  role: 'Full-stack engineer',
  currentRole: 'SDE-II at GoHighLevel',
  location: 'Remote · India',
  email: 'milankatira26@gmail.com',
  availability: 'Available for select work',
  resume: '/Milan_katira_resume.pdf',
  photo: '/milan_katira.jpeg',
  socials: {
    github: 'https://github.com/milankatira',
    linkedin: 'https://www.linkedin.com/in/milan-katira/',
    twitter: 'https://twitter.com/milankatira26',
  },
} as const;

// Professional experience started Oct 2021 (ICS).
const CAREER_START = new Date('2021-10-01');
export const YEARS = Math.floor(
  (Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 60 * 60 * 1000),
);

export interface Stat {
  value: number;
  suffix: string;
  /** Decimal places for the animated value (default 0). */
  decimals?: number;
  label: string;
}

// Every figure here comes from the experience entries below or data/projects.ts.
export const stats: Stat[] = [
  { value: YEARS, suffix: '+', label: 'Years shipping production software' },
  { value: 8.7, suffix: 'M', decimals: 1, label: 'API requests served in 48 hours' },
  { value: 20, suffix: 'k+', label: 'Students using my UI every week' },
  { value: Projects.length, suffix: '', label: 'SaaS products designed & shipped' },
];

// Short capability lines for the About section (editorial, not a skills wall).
export const capabilities: string[] = [
  'Product engineering, end to end',
  'Scalable Node.js & media infrastructure',
  'Design systems & component libraries',
  'Real-time features & integrations',
];

export interface Testimonial {
  name: string;
  title: string;
  quote: string;
  linkedin: string;
}

// One entry per person (no duplication). The marquee generates its loop clones
// in the component and marks them aria-hidden.
// TODO: replace the LinkedIn people-search URLs with exact profile URLs.
export const testimonials: Testimonial[] = [
  {
    name: 'Shraddha Choudhary',
    title: 'Senior Software Developer at York IE',
    linkedin: 'https://www.linkedin.com/search/results/people/?keywords=Shraddha%20Choudhary%20York%20IE',
    quote:
      'I highly recommend Milan for any full-stack development project. His technical expertise, attention to detail, and problem-solving skills are second to none.',
  },
  {
    name: 'Bhavik Lotia',
    title: 'Senior Software Engineer at ShineInfosoft',
    linkedin: 'https://www.linkedin.com/search/results/people/?keywords=Bhavik%20Lotia%20ShineInfosoft',
    quote:
      'Working with Milan was a pleasure. He has a deep understanding of both front-end and back-end development and delivered a high-quality product within a tight deadline.',
  },
  {
    name: 'Rohit Raj',
    title: 'Software Engineer at Cerebry',
    linkedin: 'https://www.linkedin.com/search/results/people/?keywords=Rohit%20Raj%20Cerebry',
    quote:
      'Milan is an exceptional full-stack developer. He seamlessly integrates different technologies and platforms to create robust, scalable solutions that meet business needs.',
  },
  {
    name: 'Ashish Gupta',
    title: 'QA Analyst at InstaService',
    linkedin: 'https://www.linkedin.com/search/results/people/?keywords=Ashish%20Gupta%20InstaService',
    quote:
      "Milan's ability to architect complex systems while keeping code clean and maintainable is impressive. He delivered our enterprise solution ahead of schedule with zero critical bugs.",
  },
  {
    name: 'Mukesh Singh',
    title: 'Senior QA at Cerebry',
    linkedin: 'https://www.linkedin.com/search/results/people/?keywords=Mukesh%20Singh%20Cerebry',
    quote:
      'As an independent contractor, Milan designed a highly scalable architecture that now handles 5x our original traffic with minimal resource usage. His end-to-end ownership makes him invaluable.',
  },
];

export interface ExperienceEntry {
  id: string;
  company: string;
  title: string;
  duration: string;
  location: string;
  color: string;
  details: string[];
}

// Nested bullets start with "  - ".
export const experience: ExperienceEntry[] = [
  {
    id: 'gohighlevel',
    company: 'GoHighLevel',
    title: 'SDE-II',
    duration: 'Sep 2025 – Present',
    location: 'Remote',
    color: '#f59e0b',
    details: [
      'Own core **media service infrastructure**, partnering cross-functionally to deliver a scalable media model, robust REST APIs and seamless editor integrations.',
      'Resolved critical **Node.js heap exhaustion** and OOM failures through memory profiling and by moving payload handling to **non-blocking, stream-based flows**.',
      'Engineered a **multipart upload API** for files up to **500 MB** at constant memory, replacing buffer-heavy processing.',
      'Raised throughput with **Redis-backed caching**, request batching and **distributed rate limiting**.',
      'Architected a resilient **Canva integration** that ingests large design assets into internal media systems at scale.',
    ],
  },
  {
    id: 'instaservice',
    company: 'Instaservice',
    title: 'Senior Software Engineer',
    duration: 'Jul 2023 – Sep 2025',
    location: 'Remote (USA)',
    color: '#06b6d4',
    details: [
      '**Led frontend development** of Instaservice.com and bo.instaservice.com with **TypeScript, React, React Query and Tailwind CSS**.',
      '**Designed and maintained** a design system and reusable component library in **Storybook** for consistent UI across apps.',
      'Built **advanced booking experiences**:',
      '  - **Smart calendar UI**: 7-day dynamic view with slot rendering, blocked dates and timezone-aware scheduling.',
      '  - **On-demand booking**, rescheduling, provider selection and quote requests for large projects.',
      '  - **Recurring bookings** with full payment edge-case handling: retries, failures and fallback states.',
      'Developed **real-time features**: customer–provider chat and **live location tracking** during service sessions.',
      '**Automated CI/CD** with formatting, linting and type-check gates (**Prettier, ESLint, TypeScript**) before production builds.',
      'Integrated **PostHog and Sentry** to track user behavior and catch production issues early.',
    ],
  },
  {
    id: 'cerebry',
    company: 'Cerebry',
    title: 'Senior Software Engineer',
    duration: 'Feb 2023 – Aug 2023',
    location: 'Remote (Singapore)',
    color: '#6366F1',
    details: [
      'Built the frontend of an **AI-powered edtech platform** used by **20,000+ active students weekly**.',
      'Shipped **responsive interfaces** in **React and Preact** with **SCSS**, including charts that visualize learning progress.',
      'Partnered with design to cut user friction by **15%** and raise task completion by **10%**.',
      'Instrumented key interactions with **Google Analytics and Google Tag Manager**.',
      '**Mentored three junior developers** and shipped features alongside backend **Node.js services** via **CI/CD pipelines**.',
      'Ran **technical interviews for 20+ candidates**, resulting in **three hires**.',
    ],
  },
  {
    id: 'ics',
    company: 'ICS',
    title: 'Junior Software Engineer',
    duration: 'Oct 2021 – Feb 2023',
    location: 'Ahmedabad, India',
    color: '#2DD4BF',
    details: [
      'Built and maintained **full-stack applications** with **React, Next.js, Node.js and MongoDB** using **test-driven development**.',
      'Designed **REST APIs** and **scalable data models** for multiple production systems:',
      '  - A backend that handled **8.7 million API requests in 48 hours** and **15,000+ unique users per day**.',
      '  - An **interview & hiring platform** with **Google Meet and Zoom** integration, coding and MCQ assessments, running **300+ sessions on 1.2 GB RAM**.',
      '  - **Reusable UI components** and dynamic flows for a high-volume video content platform.',
      'Wrote utility functions with **100% unit test coverage** for a global retail technology project.',
      'Deployed **Solidity smart contracts** on **Binance Smart Chain** and **Hedera Hashgraph**.',
      'Integrated **Contentful, Customer.io and JW Player** in a distributed application ecosystem.',
    ],
  },
];
