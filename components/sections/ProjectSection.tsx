import ProjectCard from "@/components/ProjectCard";

export default function ProjectSection() {
  return (
    <section className="container py-16" id="projects">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-12">
      Featured Projects
      </h1>

      <ProjectCard />
    </section>
  );
}
