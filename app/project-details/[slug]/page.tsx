import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectDetailsPageProps {
    params: {
        slug: string;
    };
}

const projects = [
    {
        slug: 'pingpanda',
        title: 'Ping Panda',
        category: 'Web Application',
        status: 'Completed',
        goal: 'Provide real‑time SaaS insights via Discord alerts for custom and critical events',
        image: 'https://cdn.jsdelivr.net/gh/milankatira/project-videos/ping-panda/ping-panda-1.png',
        fullDescription: 'Ping Panda is a modern SaaS platform that delivers real‑time event notifications (sales, sign‑ups, errors, etc.) to Discord, featuring a visual dashboard for tracking activity, Stripe-powered PRO plans, and easy setup through an intuitive API.',
        technologies: [
            'Next.js',
            'Prisma (database ORM)',
            'Node.js',
            'TypeScript',
            'Stripe API',
            'Postgresql',
            'Discord API',
            'Tailwind CSS'
        ],
        features: [
            'Complete SaaS built in modern Next.js',
            'Beautiful landing page included',
            'Custom artworks made by a professional illustrator',
            'Real-time event messages via Discord',
            'Clean & intuitive event monitoring dashboard',
            'Secure payments using Stripe',
            'Customers can purchase your PRO plan',
            'Clean, modern UI on top of shadcn-ui',
            'Authentication using Clerk',
            '100% written in TypeScript'
        ],
        images: [
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/ping-panda/ping-panda-1.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/ping-panda/ping-panda-2.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/ping-panda/ping-panda-3.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/ping-panda/ping-panda-4.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/ping-panda/ping-panda-5.png'
        ],
        videoUrl: 'https://www.youtube.com/watch?v=pingpanda-demo',
        repoUrl: 'https://github.com/milankatira/pingpanda'
    },
    {
        slug: 'shipright',
        title: 'Shipright',
        category: 'Web Application',
        status: 'Completed',
        goal: 'Build a user feedback tool for product teams to prioritize roadmap items.',
        image: 'https://cdn.jsdelivr.net/gh/milankatira/project-videos/shipright/shipright-1.png',
        fullDescription:
            'Shipright is a comprehensive user feedback and feature voting platform. It empowers product managers to collect, manage, and act on user insights efficiently through a visual dashboard. With features like customizable themes and real-time analytics, Shipright helps businesses prioritize what truly matters to their users.',
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Clerk', 'Prisma', 'MongoDB'],
        features: [
            'Feature voting system with prioritization',
            'Real-time analytics dashboard',
            'Customizable themes and branding',
            'User authentication integration',
            'Responsive design for all devices',
        ],
        images: [
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/shipright/shipright-1.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/shipright/shipright-2.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/shipright/shipright-3.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/shipright/shipright-4.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/shipright/shipright-5.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/shipright/shipright-6.png',
        ],
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        demoUrl: 'https://shipright.milankatira.com/',
        repoUrl: 'https://github.com/milankatira/shipright',
    },
    {
        slug: 'usepopup',
        title: 'UsePopup',
        category: 'SaaS Web Application',
        status: 'Completed',
        goal: 'Enable users to create, customize, and deploy notification popups across multiple domains without writing code',
        image: 'https://cdn.jsdelivr.net/gh/milankatira/project-videos/use-popup/use-popup-1.png',
        fullDescription: `
      UsePopup is a lightweight yet powerful SaaS platform for building custom notification popups. With a visual editor and live preview, users can design, target, and deploy popups across multiple websites using a simple embed script—no coding required. Backed by authentication, domain management, and soon, analytics, UsePopup streamlines engagement and conversion via modal messages.
        `.trim(),
        technologies: [
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
            'MongoDB',
            'Clerk (Auth)',
            'Shadcn UI',
            'Lucide Icons',
        ],
        features: [
            'Manage multiple websites/domains under one dashboard',
            'Unique embed script per website for easy integration',
            'Visual popup editor with custom icons, text, styles, and animations',
            'Advanced targeting: schedules, triggers, domain filtering',
            'One-click script installation with auto loader',
            'Live preview during design',
            'User authentication and dark mode support',
            'Responsive design across devices',
            'Popup edit, delete, and management from the dashboard',
            '📊 Analytics coming soon: view impressions, clicks, and CTR',
        ],
        images: [
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/use-popup/use-popup-1.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/use-popup/use-popup-2.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/use-popup/use-popup-3.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/use-popup/use-popup-4.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/use-popup/use-popup-5.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/use-popup/use-popup-6.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/use-popup/use-popup-7.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/use-popup/use-popup-8.png',
        ],
        videoUrl: '',
        repoUrl: 'https://github.com/milankatira/use-popup'
    },
    {
        slug: 'feedspark',
        title: 'FeedSpark',
        category: 'SaaS Web Application',
        status: 'Completed',
        goal: 'Empower product teams to gather, analyze, and act on customer feedback to improve engagement and retention.',
        image: 'https://cdn.jsdelivr.net/gh/milankatira/project-videos/feed-spark/feed-spark-main.png',
        fullDescription: `
      FeedSpark is a full-featured feedback analytics platform that helps product teams turn user opinions into actionable insights. With customizable feedback forms, sentiment analysis, and detailed dashboards, teams can gather feedback from multiple touchpoints and understand what truly matters to their users. The platform includes automation via Slack/Email/Discord integrations and allows teams to close the loop with real-time updates and feedback workflows. Built with a full modern stack and clean UI, FeedSpark simplifies feedback collection, analytics, and response automation.
        `.trim(),
        technologies: [
            'Next.js 14 (App Router)',
            'TypeScript',
            'Tailwind CSS',
            'Shadcn UI',
            'Lucide Icons',
            'Prisma ORM',
            'Mongodb',
            'Zod',
            'React Hook Form',
            'React Query',
        ],
        features: [
            'Customizable feedback forms with live preview and theming',
            'Real-time analytics: sentiment breakdown, rating distribution, NPS',
            'Feedback dashboard with filters and download options',
            'Multi-channel automation: Slack, Email, Discord',
            'Integrations module to manage and test connections',
            'Insightful charts: customer trends, satisfaction scores, sentiment graphs',
            'Campaign-level feedback flows with submission counts',
            'Authentication using NextAuth.js (e.g., GitHub)',
            'Responsive dark-mode UI using Shadcn UI & Tailwind',
            'Feedback-based conditional automations (e.g., if rating ≤ 2, alert team)'
        ],
        images: [
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/feed-spark/feed-spark-1.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/feed-spark/feed-spark-2.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/feed-spark/feed-spark-3.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/feed-spark/feed-spark-4.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/feed-spark/feed-spark-5.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/feed-spark/feed-spark-6.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/feed-spark/feed-spark-7.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/feed-spark/feed-spark-8.png',
        ],
        videoUrl: '',
        demoUrl: 'https://feed-spark.milankatira.com/',
        repoUrl: 'https://github.com/milankatira/feed-spark'
    },
    {
        slug: 'uptime',
        title: 'Uptime',
        category: 'Monitoring Dashboard',
        status: 'Completed',
        goal: 'Provide real-time monitoring, alerting, and incident management for websites and APIs with rich visual dashboards.',
        image: 'https://cdn.jsdelivr.net/gh/milankatira/project-videos/uptime/uptime-main.png',
        fullDescription: `
        Uptime is a production-grade monitoring and incident response platform designed to ensure 24/7 uptime and observability for web services. Built with scalability and performance at its core, it offers a powerful dashboard for website and API health, real-time uptime tracking, detailed latency analytics, and rich alerting systems.

        It leverages **Redis** for caching and **BullMQ** workers to run background uptime checks efficiently and asynchronously. Built with **Clerk** for secure user authentication and organization-level access management, Uptime enables multi-team collaboration with role-based controls.

        This project combines UI excellence with backend robustness—ideal for dev teams and ops engineers managing mission-critical deployments.
          `.trim(),
        technologies: [
            'TurboRepo (Monorepo)',
            'Next.js 15 (App Router)',
            'TypeScript',
            'Tailwind CSS',
            'Shadcn UI',
            'Prisma ORM',
            'MongoDB',
            'Redis',
            'BullMQ',
            'Lucide Icons',
            'NextAuth.js',
            'Zod',
            'Chart.js',
            'Clerk (Auth & Org Management)',
            'Turbo repo',
            'Node js'
        ],
        features: [
            'Real-time uptime and latency tracking per endpoint',
            'Redis-powered cache layer for efficient response handling',
            'BullMQ-based background workers for distributed uptime checks',
            'Incident management with logs, status, and resolution flow',
            'Custom heartbeat monitoring for server or cron activity',
            'Slack, Discord, and Email notifications (custom templates)',
            'Public Status Page generator with live updates',
            'User authentication and organization management via Clerk',
            'Team roles, invites, and member access controls',
            'TurboRepo monorepo with multiple packages and apps',
            'Interactive dashboards with analytics on uptime, latency, NPS'
        ],
        images: [
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/uptime/uptime-1.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/uptime/uptime-2.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/uptime/uptime-3.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/uptime/uptime-4.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/uptime/uptime-5.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/uptime/uptime-6.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/uptime/uptime-7.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/uptime/uptime-8.png',
            'https://cdn.jsdelivr.net/gh/milankatira/project-videos/uptime/uptime-9.png',
        ],
        videoUrl: '', // Optional: embed YouTube video demo if available
        demoUrl: 'https://uptime.milankatira.com/',
        repoUrl: 'https://github.com/milankatira/uptime'
    }


];

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) return notFound();

    return (
        <div className="container mx-auto px-4 py-12 text-white z-50 relative">
            <div className="max-w-5xl mx-auto">
                <Link
                    href="/"
                >
                    <div
                        className="text-primary  mb-6 inline-block cursor-pointer"
                    >
                        &larr; Back to Projects
                    </div>
                </Link>

                <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>

                <span className="inline-block mb-6 px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                    {project.category}
                </span>

                {project.image && (
                    <div className="relative w-full h-80 md:h-[28rem] rounded-xl overflow-hidden mb-10 shadow-lg">
                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                    </div>
                )}

                {/* Overview Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                    <div className="prose dark:prose-invert max-w-none">
                        <p>{project.fullDescription}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-sm text-muted-foreground">
                        <div>
                            <strong>Status:</strong> {project.status}
                        </div>
                        <div>
                            <strong>Goal:</strong> {project.goal}
                        </div>
                    </div>
                </section>

                {/* Technologies */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                            <span
                                key={i}
                                className="bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Features */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        {project.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                        ))}
                    </ul>
                </section>

                {/* Screenshots */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
                    <div className='flex gap-4 flex-col'>
                        {project.images.map((src, i) => (
                            <div key={i} className="relative w-full h-full rounded-lg overflow-hidden shadow">
                                <Image
                                    src={src}
                                    alt={`${project.title} Screenshot ${i + 1}`}
                                    width={1000}
                                    height={1000}
                                    className="object-cover h-full w-full"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Video */}
                {/* {project.videoUrl && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">Video Demo</h2>
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                            <iframe
                                src={project.videoUrl.replace('watch?v=', 'embed/')}
                                title={`${project.title} Demo`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full"
                            ></iframe>
                        </div>
                    </section>
                )} */}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-10">
                    {project.demoUrl && (
                        <Button asChild size="lg">
                            <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-5 w-5 mr-2" />
                                Live Demo
                            </Link>
                        </Button>
                    )}
                    {project.repoUrl && (
                        <Button asChild variant="outline" size="lg">
                            <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-5 w-5 mr-2" />
                                View Code
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
