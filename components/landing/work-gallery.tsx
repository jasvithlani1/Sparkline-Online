import Image from "next/image";
import { SectionHeading } from "@/components/landing/section-heading";
import { workGallery } from "@/lib/content";

export function WorkGallery() {
  return (
    <section id="portfolio" className="bg-[#FDFCF4] px-5 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:py-24">
      <div className="mx-auto flex max-w-[1208px] flex-col gap-10 sm:gap-12 md:gap-14">
        <SectionHeading eyebrow={workGallery.eyebrow} lines={workGallery.lines} />
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {workGallery.projects.map((project) => (
            <article key={project.name} className="space-y-3 sm:space-y-4">
              <div className="relative aspect-[596/600] overflow-hidden rounded-[20px] bg-[#f3efe7]">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(min-width: 1024px) 596px, 100vw"
                  className={project.imageClassName}
                />
              </div>
              <div className="space-y-1 px-1 text-[13px] text-black/55 sm:text-sm">
                <h3 className="text-[15px] text-black/80 sm:text-base">{project.name}</h3>
                <p>{project.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
