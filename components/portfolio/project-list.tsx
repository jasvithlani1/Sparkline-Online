import { workGallery } from "@/lib/content";
import { ProjectCard, type ProjectCardProject } from "./project-card";

type ProjectListProps = {
  projects?: readonly ProjectCardProject[];
};

export function ProjectList({ projects = workGallery.projects }: ProjectListProps) {
  return (
    <div data-testid="project-list" className="mx-auto max-w-[1208px] px-5 sm:px-6 md:px-8">
      <div className="flex flex-col items-center gap-4 pb-8 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pb-10 sm:text-left md:pb-12">
        <h2
          className="hero-copy text-[36px] leading-[1] tracking-[0.02em] sm:text-[52px] sm:leading-[0.95] md:text-[68px] lg:text-[80px]"
          style={{ wordSpacing: "0.25em" }}
        >
          PORTFOLIO
        </h2>
      </div>
      <div className="h-px w-full bg-white/10" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
