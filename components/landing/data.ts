// Landing-specific content. Reuses existing sources where possible
// (Projects, testimonials, companies) and copies the experience data so the
// existing home page / ExperienceSection stays untouched.

export interface LandingNavLink {
  label: string;
  href: string;
}

export const landingNav: LandingNavLink[] = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Writing', href: '#blog' },
];

export const profile = {
  name: 'Milan Katira',
  role: 'Full-stack engineer',
  location: 'Remote · India',
  email: 'milankatira26@gmail.com',
  availability: 'Available for select work',
  resume: '/Milan_katira_resume.pdf',
  socials: {
    github: 'https://github.com/milankatira',
    linkedin: 'https://www.linkedin.com/in/milan-katira/',
    twitter: 'https://twitter.com/milankatira26',
  },
} as const;

// Headline metrics — edit these freely.
export const YEARS = 5;
export const PRODUCTS = 5;
export const API_REQUESTS_48H = 8.7; // rendered as "8.7M" — real ICS figure (8.7M requests / 48h)
export const WEEKLY_USERS = 20; // rendered as "20k+" — real Cerebry figure (20,000+ weekly students)

export interface Stat {
  value: number;
  suffix: string;
  /** Decimal places for the animated value (default 0). */
  decimals?: number;
  label: string;
}

export const stats: Stat[] = [
  { value: YEARS, suffix: '+', label: 'Years shipping production software' },
  { value: PRODUCTS, suffix: '', label: 'SaaS products designed & built' },
  { value: API_REQUESTS_48H, suffix: 'M', decimals: 1, label: 'API requests handled in 48h' },
  { value: WEEKLY_USERS, suffix: 'k+', label: 'Weekly active users served' },
];

// Short capability lines for the About section (editorial, not a skills wall).
export const capabilities: string[] = [
  'Product engineering, end to end',
  'Scalable Node.js & media infrastructure',
  'Design systems & component libraries',
  'Real-time features & data pipelines',
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

// Copied from components/sections/ExperienceSection.tsx to keep `/` zero-risk.
export const experience: ExperienceEntry[] = [
  {
    id: 'gohighlevel',
    company: 'GoHighLevel',
    title: 'SDE-II',
    duration: 'Sep 2025 – Present',
    location: 'Remote',
    color: '#f59e0b',
    details: [
      'Manage core **media service infrastructure** and partnered cross-functionally to deliver a scalable media model, robust REST APIs, and seamless editor integrations.',
      'Resolved critical **Node.js heap exhaustion** and OOM failures through memory profiling and by refactoring payload handling into **non-blocking stream-based flows**.',
      'Engineered a **multipart upload API** for files up to **500 MB** with constant memory usage, replacing inefficient buffer-heavy processing.',
      'Improved system throughput with **Redis-backed caching**, intelligent request batching, and **distributed rate limiting**.',
      'Architected a resilient **Canva integration** to ingest large design assets into internal media systems reliably at scale.',
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
      '**Led frontend development** of Instaservice.com and bo.instaservice.com, using **TypeScript, React, React Query, and Tailwind CSS**.',
      '**Designed and maintained** a scalable design system and reusable component library with **Storybook**, supporting consistent UI/UX across apps.',
      'Built **advanced booking experiences**: smart timezone-aware calendar UI, on-demand booking, rescheduling, and **recurring bookings** with full payment edge-case handling.',
      'Developed **real-time features** such as customer–provider chat and **live location tracking** during service sessions.',
      'Integrated **monitoring and analytics** including **PostHog and Sentry** to track behavior and proactively address production issues.',
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
      'Contributed to the frontend of a **high-scale AI-powered edtech platform** used by **20,000+ active students weekly**.',
      'Built **responsive, scalable interfaces** with **React and Preact**, styled in **SCSS**, integrating charting for learning-progress visualization.',
      'Improved UX through design collaboration — a **15% reduction in friction** and a **10% increase in task completion**.',
      '**Mentored three junior developers** and deployed features in coordination with backend **Node.js services** via **CI/CD pipelines**.',
      'Conducted **technical interviews for 20+ candidates**, onboarding three successful hires.',
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
      'Developed **full-stack applications** with **React, Next.js, Node.js, and MongoDB**, applying **test-driven development**.',
      'Engineered a backend system that handled **8.7 million API requests within 48 hours** and **15,000+ unique daily users**.',
      'Built a comprehensive **interview & hiring platform** with **Google Meet / Zoom** integration and coding assessments (**1.2 GB RAM handling 300+ sessions**).',
      'Wrote utility functions with **100% unit test coverage** for a global retail technology project.',
      'Deployed **Solidity smart contracts** integrating **Binance Smart Chain** and **Hedera Hashgraph**.',
    ],
  },
];
