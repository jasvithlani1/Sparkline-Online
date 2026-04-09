import { featuredIntro } from "@/lib/content";

export function FeatureIntro() {
  return (
    <section id="about-us" data-testid="feature-intro" className="bg-white px-5 py-12 sm:px-6 sm:py-14 md:px-8 md:py-18 lg:py-20">
      <div
        data-testid="feature-intro-content"
        className="mx-auto flex max-w-[1308px] flex-col gap-6 px-2 text-[#2A2C2F] sm:gap-8 sm:px-4"
      >
        <p className="text-[17px] leading-7 sm:text-lg md:text-[18px] md:leading-[1.35]">
          {featuredIntro.body}
        </p>
        <a href="#portfolio" className="inline-flex items-center gap-2 text-sm text-black/70">
          <span aria-hidden="true" className="text-lg leading-none">
            ›
          </span>
          {featuredIntro.cta}
        </a>
      </div>
    </section>
  );
}
