import { Projects } from "@/data/projects";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ProjectCard() {
  return (
    <div className="space-y-24">
      {Projects.map((project, index) => (
        <article
          key={index}
          className="flex flex-col lg:flex-row items-start justify-center gap-12"
        >
          {/* Media Section */}
          <div className="w-full lg:w-1/2 order-1 lg:order-none">
            <video
              src={project.short}
              autoPlay
              loop
              muted
              playsInline
              title={project.title}
              className="rounded-xl w-full max-h-[300px] object-cover shadow-lg"
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            <header className="space-y-3">
              <h3 className="text-3xl lg:text-4xl font-bold leading-tight">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-base">
                {project.description}
              </p>
            </header>

            {project.features.length > 0 && (
              <ul className="space-y-2 pl-4 list-disc text-sm text-muted-foreground">
                {project.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            )}

            {project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {project.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    className="
          inline-flex items-center font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-black-100 hover:bg-black-300 text-white border border-black-300 py-1.5 px-4 text-sm rounded-full transition-colors duration-200"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-2">
              {project.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full sm:w-fit">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                </Link>
              )}
              {project.sourceCode && (
                <Link
                  href={project.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full sm:w-fit">
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </Button>
                </Link>
              )}
              <Link href={`/project-details/${project.slug}`} passHref>
                <Button variant="outline" className="w-full sm:w-fit">
                  Project Details
                </Button>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
