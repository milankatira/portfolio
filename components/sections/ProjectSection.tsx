import ProjectCard from "@/components/ProjectCard";

export default function ProjectSection() {
  return (
    <section className="container py-20" id="projects">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Featured <span className="text-cyan-500">Projects</span>
        </h1>
      </div>

      <ProjectCard />
    </section>
  );
}
