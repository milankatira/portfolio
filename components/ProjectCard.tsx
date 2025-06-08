"use client";
import Link from "next/link";

import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Projects = [
  {
    title: "Ping Panda",
    slug: 'pingpanda',
    description: "Ping Panda is a modern SaaS platform that delivers real‑time event notifications (sales, sign‑ups, errors, etc.) to Discord, featuring a visual dashboard for tracking activity, Stripe-powered PRO plans, and easy setup through an intuitive API.",
    short: "https://cdn.jsdelivr.net/gh/milankatira/project-videos/ping-panda.mp4",
    features: [
      'Complete SaaS built in modern Next.js',
      'Real-time event messages via Discord',
      'Clean & intuitive event monitoring dashboard',
      'Secure payments using Stripe',
      'Authentication using Clerk',
    ],
    technologies: [
      'Next.js',
      'Prisma',
      'Node.js',
      'TypeScript',
      'Stripe API',
      'Postgresql',
      'Discord API',
      'Tailwind CSS'
    ],
    link: "https://pingpanda-ll7i.onrender.com/",
    sourceCode: "https://github.com/milankatira/pingpanda",
  },
  {
    title: "Shipright",
    slug: 'shipright',
    description: "Shipright is a comprehensive user feedback and feature voting platform. It empowers product managers to collect, manage, and act on user insights efficiently through a visual dashboard. With features like customizable themes and real-time analytics, Shipright helps businesses prioritize what truly matters to their users.",
    short: "https://cdn.jsdelivr.net/gh/milankatira/project-videos/shipright.mp4",
    features: [
      'Feature voting system with prioritization',
      'Real-time analytics dashboard',
      'Customizable themes and branding',
      'User authentication integration',
      'Responsive design for all devices',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Clerk', 'Prisma', 'MongoDB'],
    link: "https://shipright.example.com",
    sourceCode: "https://github.com/yourname/shipright",
  },
  {
    title: "UsePopup",
    slug: 'usepopup',
    description: "UsePopup is a lightweight yet powerful SaaS platform for building custom notification popups. With a visual editor and live preview, users can design, target, and deploy popups across multiple websites using a simple embed script—no coding required. Backed by authentication, domain management, and soon, analytics, UsePopup streamlines engagement and conversion via modal messages.",
    short: "https://cdn.jsdelivr.net/gh/milankatira/project-videos/popup.mp4",
    features: [
      'Manage multiple websites/domains under one dashboard',
      'Visual popup editor with custom icons, text, styles, and animations',
      'Advanced targeting: schedules, triggers, domain filtering',
      'One-click script installation with auto loader',
      'Live preview during design',
    ],
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'MongoDB',
      'Clerk (Auth)',
      'Shadcn UI',
      'Lucide Icons',
    ],
    link: "https://use-popup.vercel.app/",
    sourceCode: "https://github.com/milankatira/use-popup",
  },
  {
    title: "FeedSpark",
    slug: 'feedspark',
    description: "FeedSpark is a full-featured feedback analytics platform that helps product teams turn user opinions into actionable insights. With customizable feedback forms, sentiment analysis, and detailed dashboards, teams can gather feedback from multiple touchpoints and understand what truly matters to their users.",
    short: "https://cdn.jsdelivr.net/gh/milankatira/project-videos/feed-spark.mp4",
    features: [
      'Customizable feedback forms with live preview and theming',
      'Real-time analytics: sentiment breakdown, rating distribution, NPS',
      'Multi-channel automation: Slack, Email, Discord',
      'Insightful charts: customer trends, satisfaction scores, sentiment graphs',
      'Authentication using NextAuth.js (e.g., GitHub)',
    ],
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
    link: "https://feed-spark.vercel.app/",
    sourceCode: "https://github.com/milankatira/feed-spark",
  },
  {
    title: "Uptime",
    slug: 'uptime',
    description: "Uptime is a production-grade monitoring and incident response platform designed to ensure 24/7 uptime and observability for web services. Built with scalability and performance at its core, it offers a powerful dashboard for website and API health, real-time uptime tracking, detailed latency analytics, and rich alerting systems.",
    short: "https://cdn.jsdelivr.net/gh/milankatira/project-videos/uptime.mp4",
    features: [
      'Real-time uptime and latency tracking per endpoint',
      'Redis-powered cache layer for efficient response handling',
      'BullMQ-based background workers for distributed uptime checks',
      'Incident management with logs, status, and resolution flow',
      'Public Status Page generator with live updates',
    ],
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
      'Node js'
    ],
    link: "https://uptime-snowy.vercel.app/",
    sourceCode: "https://github.com/milankatira/uptime",
  }
];

export default function ProjectCard() {
  return (
    <div className="space-y-28">
      {Projects.map((project, index) => (
        <div
          key={index}
          className="flex flex-col lg:flex-row justify-center gap-10"
        >
          <section className="lg:w-1/2">
            <video
              src={project.short}
              autoPlay={true}
              loop
              muted
              playsInline
            className="rounded-2xl w-full h-auto max-h-[280px] object-cover"
            ></video>
          </section>

          <section className="flex gap-4 pt-3 lg:w-1/2">

            <div className="space-y-4 lg:space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl lg:text-4xl font-bold">
                  {project.title}
                </h3>

                <p>{project.description}</p>

                <ul className="space-y-4">
                  {project.features.map((feature, index) => (
                    <li
                      key={index}
                      className="text-sm text-muted-foreground flex gap-1"
                    >
                      <span>-</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className={`hover:opacity-90 transition-opacity px-4 py-2 text-xs`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-2">
                {project.link && (
                  <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full lg:w-fit">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>
                  </Link>
                )}
                {
                  project.sourceCode && (
                    <Link href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full lg:w-fit">
                        <Github className="h-4 w-4 mr-2" />
                        View Code
                      </Button>
                    </Link>
                  )}

                <Link
                  href={`/project-details/${project.slug}`}
                  passHref
                >
                  <Button variant="outline" className="w-full lg:w-fit">
                    Project Details
                  </Button>
                </Link>

              </div>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}
