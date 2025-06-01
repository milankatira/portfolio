import ProjectCard from "@/components/ProjectCard";

export default function ProjectSection() {
  return (
    // <section id="about">
    <section className="container py-16" id="about">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-12">
        All My Projects
      </h1>

      <ProjectCard />
    </section>
  );
}
