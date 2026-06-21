import ProjectCard from "@/components/ProjectCard";

export default function ProjectSection() {
  return (
    <section className="container py-20 md:py-28" id="projects">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Featured <span className="text-brand">Projects</span>
        </h1>
      </div>

      <ProjectCard />
    </section>
  );
}
