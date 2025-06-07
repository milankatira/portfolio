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
        demoUrl: 'https://shipright.example.com',
        repoUrl: 'https://github.com/yourname/shipright',
    },
];

export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) return notFound();

    return (
        <div className="container mx-auto px-4 py-12 text-white z-50">
            <div className="max-w-5xl mx-auto">
                <Link href="/#projects" className="text-primary hover:underline mb-6 inline-block">
                    &larr; Back to Projects
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
                {project.videoUrl && (
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
                )}

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
