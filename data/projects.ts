// Single source of truth for projects. Used by the home page Work section,
// the /project-details/[slug] pages and the sitemap.

const CDN = 'https://cdn.jsdelivr.net/gh/milankatira/project-videos';

export interface Project {
  slug: string;
  title: string;
  category: string;
  status: 'Completed' | 'In progress';
  /** One-line problem statement shown on the card and the details hero. */
  goal: string;
  /** Short summary for cards and meta descriptions. */
  description: string;
  /** Long-form overview for the details page (paragraphs separated by blank lines). */
  overview: string;
  /** Looping preview clip. */
  short: string;
  cover: string;
  images: string[];
  /** Headline features, shown first and on cards. */
  features: string[];
  /** Additional features listed only on the details page. */
  moreFeatures: string[];
  technologies: string[];
  link: string;
  sourceCode: string;
  featured: boolean;
  accentColor: string;
}

const shots = (folder: string, prefix: string, count: number) =>
  Array.from({ length: count }, (_, i) => `${CDN}/${folder}/${prefix}-${i + 1}.png`);

export const Projects: Project[] = [
  {
    title: 'Ping Panda',
    slug: 'pingpanda',
    category: 'SaaS · Event monitoring',
    status: 'Completed',
    goal: 'Real-time SaaS insights delivered as Discord alerts for the events that matter.',
    description:
      'Real-time event notifications (sales, sign-ups, errors) delivered straight to Discord, with a dashboard for tracking activity, Stripe-powered PRO plans and a simple API.',
    overview:
      'Ping Panda is a SaaS platform that turns application events (sales, sign-ups, errors and anything custom) into real-time Discord notifications.\n\nTeams send events through a small HTTP API, browse and filter them in a visual dashboard, and upgrade to a PRO plan through Stripe checkout. Authentication runs on Clerk and the whole codebase is written in TypeScript.',
    short: `${CDN}/ping-panda.mp4`,
    cover: `${CDN}/ping-panda/ping-panda-1.png`,
    images: shots('ping-panda', 'ping-panda', 5),
    features: [
      'Real-time event messages delivered via Discord',
      'Event monitoring dashboard with categories and filters',
      'Stripe checkout for PRO plans',
      'Authentication with Clerk',
    ],
    moreFeatures: [
      'Simple HTTP API to send custom events',
      'Marketing landing page included',
      'Modern UI built on shadcn/ui',
      '100% TypeScript',
    ],
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'Prisma', 'PostgreSQL', 'Stripe', 'Discord API', 'Clerk', 'Tailwind CSS'],
    link: 'https://pingpanda-fj5a.onrender.com/',
    sourceCode: 'https://github.com/milankatira/pingpanda',
    featured: true,
    accentColor: '#06b6d4',
  },
  {
    title: 'Uptime',
    slug: 'uptime',
    category: 'Monitoring · Incident response',
    status: 'Completed',
    goal: 'Real-time monitoring, alerting and incident management for websites and APIs.',
    description:
      'Production-grade uptime monitoring with latency analytics, BullMQ background checks, Redis caching, incident management and public status pages.',
    overview:
      'Uptime is a monitoring and incident-response platform built for 24/7 observability of web services: real-time uptime tracking, per-endpoint latency analytics and alerting.\n\nBackground checks run on BullMQ workers with Redis as the cache layer, so checks stay fast and asynchronous. Clerk handles authentication and organization-level access, letting multiple teams collaborate with role-based controls. The codebase is a TurboRepo monorepo with separate apps and shared packages.',
    short: `${CDN}/uptime.mp4`,
    cover: `${CDN}/uptime/uptime-main.png`,
    images: shots('uptime', 'uptime', 9),
    features: [
      'Real-time uptime and latency tracking per endpoint',
      'BullMQ workers for distributed background checks',
      'Redis cache layer for fast responses',
      'Incident management with logs, status and resolution flow',
    ],
    moreFeatures: [
      'Public status pages with live updates',
      'Heartbeat monitoring for servers and cron jobs',
      'Slack, Discord and email notifications with custom templates',
      'Organizations, team roles, invites and member access controls',
      'Dashboards for uptime and latency analytics',
    ],
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'TurboRepo', 'Redis', 'BullMQ', 'Prisma', 'MongoDB', 'Clerk', 'Chart.js', 'Zod', 'Tailwind CSS'],
    link: 'https://uptime.milankatira.com/',
    sourceCode: 'https://github.com/milankatira/uptime',
    featured: false,
    accentColor: '#EF4444',
  },
  {
    title: 'FeedSpark',
    slug: 'feedspark',
    category: 'SaaS · Feedback analytics',
    status: 'Completed',
    goal: 'Help product teams gather, analyze and act on customer feedback.',
    description:
      'Feedback analytics with customizable forms, sentiment and NPS dashboards, and Slack, email and Discord automations.',
    overview:
      'FeedSpark turns user opinions into actionable insights. Teams build branded feedback forms, collect responses from multiple touchpoints and see them broken down by sentiment, rating distribution and NPS.\n\nAutomations route feedback to Slack, email or Discord (for example, alerting the team when a rating is 2 or lower), so teams can close the loop quickly.',
    short: `${CDN}/feed-spark.mp4`,
    cover: `${CDN}/feed-spark/feed-spark-main.png`,
    images: shots('feed-spark', 'feed-spark', 8),
    features: [
      'Customizable feedback forms with live preview and theming',
      'Sentiment, rating distribution and NPS analytics',
      'Slack, email and Discord automations',
      'Trend and satisfaction charts',
    ],
    moreFeatures: [
      'Feedback dashboard with filters and CSV export',
      'Integrations module to manage and test connections',
      'Campaign-level feedback flows with submission counts',
      'Conditional automations, e.g. alert the team when rating ≤ 2',
      'GitHub sign-in with NextAuth.js',
    ],
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'MongoDB', 'React Query', 'React Hook Form', 'Zod', 'shadcn/ui', 'Tailwind CSS'],
    link: 'https://feed-spark.milankatira.com/',
    sourceCode: 'https://github.com/milankatira/feed-spark',
    featured: false,
    accentColor: '#FACC15',
  },
  {
    title: 'Shipright',
    slug: 'shipright',
    category: 'SaaS · Product feedback',
    status: 'Completed',
    goal: 'Let product teams collect feature requests and prioritize the roadmap by votes.',
    description:
      'Feature voting and user-feedback platform that helps product managers collect, prioritize and act on what users ask for.',
    overview:
      'Shipright is a user feedback and feature-voting platform. Product managers collect requests, let users vote on them, and track everything from one dashboard.\n\nBoards can be themed to match a brand, and real-time analytics show which requests are gaining momentum, so teams prioritize what users actually want.',
    short: `${CDN}/shipright.mp4`,
    cover: `${CDN}/shipright/shipright-1.png`,
    images: shots('shipright', 'shipright', 6),
    features: [
      'Feature voting with prioritization',
      'Real-time analytics dashboard',
      'Customizable themes and branding',
      'Authentication with Clerk',
    ],
    moreFeatures: ['Responsive on every device'],
    technologies: ['Next.js', 'React', 'TypeScript', 'Prisma', 'MongoDB', 'Clerk', 'Tailwind CSS'],
    link: 'https://shipright.milankatira.com/',
    sourceCode: 'https://github.com/milankatira/shipright',
    featured: false,
    accentColor: '#6366F1',
  },
  {
    title: 'UsePopup',
    slug: 'usepopup',
    category: 'SaaS · No-code widgets',
    status: 'Completed',
    goal: 'Create, customize and deploy notification popups across sites without writing code.',
    description:
      'No-code popup builder with a visual editor, live preview, targeting rules and a one-line embed script for any website.',
    overview:
      'UsePopup is a lightweight SaaS for building custom notification popups. A visual editor with live preview lets users design popups, then target and deploy them across multiple websites with a single embed script.\n\nEach site gets its own script, and targeting rules (schedules, triggers and domain filters) control when popups appear.',
    short: `${CDN}/popup.mp4`,
    cover: `${CDN}/use-popup/use-popup-1.png`,
    images: shots('use-popup', 'use-popup', 8),
    features: [
      'Visual popup editor with live preview',
      'Targeting by schedule, trigger and domain',
      'One-line embed script with auto loader',
      'Multiple websites under one dashboard',
    ],
    moreFeatures: [
      'Unique embed script per website',
      'Custom icons, text, styles and animations',
      'Edit, delete and manage popups from the dashboard',
      'Authentication and dark mode',
    ],
    technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Clerk', 'shadcn/ui', 'Tailwind CSS'],
    link: 'https://use-popup.milankatira.com/',
    sourceCode: 'https://github.com/milankatira/use-popup',
    featured: false,
    accentColor: '#2DD4BF',
  },
];

export const getProject = (slug: string) => Projects.find((p) => p.slug === slug);
