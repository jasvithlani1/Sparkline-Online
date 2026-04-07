import { SectionHeading } from "@/components/landing/section-heading";
import { trustedBy } from "@/lib/content";

export function LogoGrid() {
  return (
    <section className="bg-[#FDFCF4] px-5 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:py-24">
      <div className="mx-auto flex max-w-[1208px] flex-col items-center gap-12 sm:gap-14 md:gap-16">
        <SectionHeading eyebrow={trustedBy.eyebrow} lines={trustedBy.lines} />
        <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4">
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
