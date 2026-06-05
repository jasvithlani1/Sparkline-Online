import Image from "next/image";
import { SectionHeading } from "@/components/landing/section-heading";
import { trustedBy } from "@/lib/content";

export function LogoGrid() {
  return (
    <section
      data-testid="trusted-by-section"
      className="pt-0 pb-4 sm:pt-2 sm:pb-5 md:pt-3 md:pb-6 lg:pt-4 lg:pb-8"
    >
      <div className="mx-auto flex max-w-[1208px] flex-col items-center gap-12 px-5 sm:gap-14 sm:px-6 md:gap-16 md:px-8">
        <SectionHeading eyebrow={trustedBy.eyebrow} lines={trustedBy.lines} tone="dark" />
      </div>
      <div
        data-testid="trusted-by-marquee"
        className="relative left-1/2 mt-12 w-screen -translate-x-1/2 overflow-hidden py-2 sm:mt-14 md:mt-16"
      >
        <div className="flex flex-col">
          <div data-testid="trusted-by-row-0" className="logo-marquee-track">
            {[0, 1].map((copyIndex) => (
              <div
                key={copyIndex}
                aria-hidden={copyIndex === 1}
                className="flex shrink-0 items-center gap-[30px] pr-[30px] sm:gap-9 sm:pr-9 md:gap-[42px] md:pr-[42px]"
              >
                {trustedBy.logos.map((logo) => (
                  <Image
                    key={`${logo.src}-${copyIndex}`}
                    src={logo.src}
                    alt={copyIndex === 0 ? logo.alt : ""}
                    width={128}
                    height={128}
                    sizes="(min-width: 768px) 128px, (min-width: 640px) 112px, 96px"
                    draggable={false}
                    className="aspect-square h-24 w-24 select-none rounded-[8px] object-cover shadow-[0_14px_34px_rgba(4,10,32,0.2)] outline outline-1 -outline-offset-1 outline-white/10 sm:h-28 sm:w-28 md:h-32 md:w-32"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
