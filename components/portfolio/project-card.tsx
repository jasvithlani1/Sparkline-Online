import Image from "next/image";
import Link from "next/link";

export type ProjectCardProject = {
  id: string;
  slug: string;
  name: string;
  date: string;
  description: string;
  ctaLabel: string;
  image: string;
  imageClassName: string;
};

type ProjectCardProps = {
  project: ProjectCardProject;
  ctaLabel?: string;
  testId?: string;
};

export function ProjectCard({ project, ctaLabel = project.ctaLabel, testId = "project-card" }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      data-testid={testId}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl bg-[#0A1F57] shadow-[0_18px_44px_rgba(4,10,32,0.24)] transition-transform duration-300 hover:-translate-y-1 active:scale-[0.96]"
    >
      <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-[#081943]">
        <Image
          src={project.image}
          alt={project.name}
          fill
          draggable={false}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={`${project.imageClassName} transition-transform duration-300 group-hover:scale-105`}
        />
      </div>

      <div className="flex min-h-0 grow flex-col items-center gap-2 p-4 text-center sm:items-start sm:text-left">
        <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50 sm:justify-start sm:text-[11px]">
          <span className="font-mono">{project.date}</span>
        </div>

        <h3 className="line-clamp-2 text-balance text-[18px] leading-[1.15] tracking-[-0.02em] text-white sm:text-[20px]">
          {project.name}
        </h3>

        <p className="line-clamp-3 text-pretty text-[13px] leading-5 text-white/70 sm:text-[14px] sm:leading-6">
          {project.description}
        </p>

        <div className="mt-auto inline-flex min-h-6 items-center justify-center gap-1.5 pt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 transition-colors group-hover:text-white sm:justify-start">
          {ctaLabel}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </div>
      </div>

      {/* Border overlay — rendered after the image so it paints on top of it */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20 transition-colors duration-300 group-hover:ring-white/35"
      />
    </Link>
  );
}
