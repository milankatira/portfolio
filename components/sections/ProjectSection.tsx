import ProjectCard from "@/components/ProjectCard";

export default function ProjectSection() {
  return (
    <section className="container py-20" id="projects">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Featured <span className="text-cyan-500">Projects</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-4 font-light">
          A collection of my best work, showcasing my skills in creating modern and scalable web applications.
        </p>
      </div>

      <ProjectCard />
    </section>
  );
}
