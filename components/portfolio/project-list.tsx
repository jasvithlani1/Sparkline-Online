import Image from "next/image";
import Link from "next/link";
import { workGallery } from "@/lib/content";

type PortfolioProject = {
  id: string;
  slug: string;
  name: string;
  date: string;
  description: string;
  ctaLabel: string;
  image: string;
  imageClassName: string;
};

type ProjectListProps = {
  projects?: readonly PortfolioProject[];
};

export function ProjectList({ projects = workGallery.projects }: ProjectListProps) {
  return (
    <div data-testid="project-list" className="mx-auto max-w-[1208px] px-5 sm:px-6 md:px-8">
      <div className="flex flex-col gap-4 pb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pb-10 md:pb-12">
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
          <Link
            key={project.id}
            href={`/portfolio/${project.slug}`}
            data-testid="project-card"
            className="group block overflow-hidden rounded-xl bg-[#0A1F57] transition-transform duration-300 hover:-translate-y-1"
          >
            {/* 1:1 Image */}
            <div className="relative aspect-square w-full overflow-hidden outline outline-1 -outline-offset-1 outline-white/10">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className={`${project.imageClassName} transition-transform duration-300 group-hover:scale-105`}
              />
            </div>

            {/* Details */}
            <div className="flex flex-col gap-2 p-4">
              <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50 sm:text-[11px]">
                <span className="font-mono">{project.date}</span>
              </div>

              <h2 className="text-balance text-[18px] leading-[1.15] tracking-[-0.03em] text-white sm:text-[20px]">
                {project.name}
              </h2>

              <p className="text-pretty text-[13px] leading-5 text-white/70 sm:text-[14px] sm:leading-6 line-clamp-2">
                {project.description}
              </p>

              <div className="mt-0.5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 transition-colors group-hover:text-white">
                {project.ctaLabel}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
