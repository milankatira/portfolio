import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { ExternalLink, Github } from 'lucide-react'; // Assuming you have lucide-react installed
import Image from 'next/image'; // Assuming you use Next.js Image component
import Link from 'next/link';

// This function is required for Next.js dynamic routes with generateStaticParams
// It tells Next.js which slugs to pre-render at build time.


interface ProjectDetailsPageProps {
    params: {
        slug: string;
    };
}

export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
    // data/projects.ts

    const project =
    {
        slug: 'awesome-project',
        title: 'Awesome Project',
        category: 'web',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        fullDescription: 'This is an awesome web project showcasing my frontend skills.',
        technologies: ['React', 'Next.js', 'Tailwind CSS'],
        features: [
            'Responsive Design',
            'SEO Optimized',
            'Fast Loading',
        ],
        images: [
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          ],
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        demoUrl: 'https://example.com/awesome-project',
        repoUrl: 'https://github.com/yourname/awesome-project',
    }


    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Back button */}
                <Link href="/#projects" className="text-primary hover:underline mb-8 inline-block">
                    &larr; Back to Projects
                </Link>

                {/* Project Title */}
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>

                {/* Project Category */}
                <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary mb-8 inline-block">
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                </span>

                {/* Main Image */}
                {project.image && (
                    <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden mb-8">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Full Description */}
                <div className="prose dark:prose-invert max-w-none mb-8">
                    <p>{project.fullDescription}</p>
                    {/* You can add more structured content here based on your data */}
                </div>

                {/* Technologies Used */}
                {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Features */}
                {project.features && project.features.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            {project.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Additional Images */}
                {project.images && project.images.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {project.images.map((imgSrc, index) => (
                                <div key={index} className="relative w-full h-48 rounded-lg overflow-hidden">
                                    <Image
                                        src={imgSrc}
                                        alt={`${project.title} Screenshot ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Video */}
                {project.videoUrl && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Video Demo</h2>
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                            {/* You might need a component to handle different video sources (YouTube, Vimeo, etc.) */}
                            <iframe
                                src={project.videoUrl.replace("watch?v=", "embed/")} // Basic YouTube embed conversion
                                title={`${project.title} Video Demo`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                )}


                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-8">
                    {project.demoUrl && (
                        <Button asChild size="lg">
                            <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-5 w-5 mr-2" />
                                View Live Demo
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
