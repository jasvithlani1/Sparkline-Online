import { SectionHeading } from "@/components/landing/section-heading";
import { trustedBy } from "@/lib/content";

export function LogoGrid() {
  const marqueeRows = [false, true] as const;

  return (
    <section
      data-testid="trusted-by-section"
      className="pt-4 pb-10 sm:pt-6 sm:pb-12 md:pt-8 md:pb-14 lg:pt-10 lg:pb-16"
    >
      <div className="mx-auto flex max-w-[1208px] flex-col items-center gap-12 px-5 sm:gap-14 sm:px-6 md:gap-16 md:px-8">
        <SectionHeading eyebrow={trustedBy.eyebrow} lines={trustedBy.lines} tone="dark" />
      </div>
      <div
        data-testid="trusted-by-marquee"
        className="relative left-1/2 mt-12 w-screen -translate-x-1/2 overflow-hidden py-2 sm:mt-14 md:mt-16"
      >
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
                  className="flex shrink-0 items-center gap-8 px-5 sm:gap-10 sm:px-6 md:gap-14 md:px-8 lg:gap-16"
                >
                  {trustedBy.logos.map((logo) => (
                    <span
                      key={`${logo}-${copyIndex}-${index}`}
                      className="whitespace-nowrap text-base font-medium text-white/78 sm:text-lg md:text-[1.2rem]"
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
    </section>
  );
}
