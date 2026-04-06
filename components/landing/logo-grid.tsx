import { SectionHeading } from "@/components/landing/section-heading";
import { trustedBy } from "@/lib/content";

export function LogoGrid() {
  return (
    <section className="bg-[#FDFCF4] px-6 py-16 md:px-8 md:py-24">
      <div className="mx-auto flex max-w-[1208px] flex-col items-center gap-16">
        <SectionHeading eyebrow={trustedBy.eyebrow} lines={trustedBy.lines} />
        <div className="grid w-full grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {trustedBy.logos.map((logo) => (
            <div
              key={logo}
              className="flex min-h-[72px] items-center justify-center text-center text-lg font-medium text-black/80"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
