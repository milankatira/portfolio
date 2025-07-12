import { Projects } from "@/data/projects";
import Link from "next/link";

import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ProjectCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Projects.map((project, index) => (
        <div
          key={index}
          className="bg-gray-900/30 border border-gray-800/80 rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <video
            src={project.short}
            autoPlay={true}
            loop
            muted
            playsInline
            className="w-full h-48 object-cover"
          ></video>

          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed h-24 overflow-hidden">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech) => (
                <Badge
                  key={tech}
                  className="bg-gray-800 text-cyan-400 border-none text-xs"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4">
              <div className="flex gap-2">
                {project.link && (
                  <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="text-white">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </Button>
                  </Link>
                )}
                {project.sourceCode && (
                  <Link href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="text-white">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  </Link>
                )}
              </div>
              <Link href={`/project-details/${project.slug}`} passHref>
                <Button size="sm" className="bg-cyan-500 text-black hover:bg-cyan-400">
                  Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

