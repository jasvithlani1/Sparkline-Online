import { SectionHeading } from "@/components/landing/section-heading";
import { trustedBy } from "@/lib/content";

export function LogoGrid() {
  const marqueeRows = [false, true] as const;

  return (
    <section className="bg-white px-5 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:py-24">
      <div className="mx-auto flex max-w-[1208px] flex-col items-center gap-12 sm:gap-14 md:gap-16">
        <SectionHeading eyebrow={trustedBy.eyebrow} lines={trustedBy.lines} />
        <div data-testid="trusted-by-marquee" className="relative w-full overflow-hidden py-2">
          <div
            data-testid="trusted-by-marquee-left-mask"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-[linear-gradient(90deg,#FFFFFF,rgba(255,255,255,0))] sm:w-20 md:w-28"
          />
          <div
            data-testid="trusted-by-marquee-right-mask"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-[linear-gradient(270deg,#FFFFFF,rgba(255,255,255,0))] sm:w-20 md:w-28"
          />

          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
            {marqueeRows.map((isReverse, index) => (
              <div
                key={index}
                data-testid={`trusted-by-row-${index}`}
                className={`logo-marquee-track ${isReverse ? "logo-marquee-track--reverse" : ""}`}
              >
                {[0, 1].map((copyIndex) => (
                  <div
                    key={copyIndex}
                    aria-hidden={copyIndex === 1}
                    className="flex shrink-0 items-center gap-8 pr-8 sm:gap-10 sm:pr-10 md:gap-14 md:pr-14 lg:gap-16 lg:pr-16"
                  >
                    {trustedBy.logos.map((logo) => (
                      <span
                        key={`${logo}-${copyIndex}-${index}`}
                        className="whitespace-nowrap text-base font-medium text-black/80 sm:text-lg md:text-[1.2rem]"
                      >
                        {logo}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
