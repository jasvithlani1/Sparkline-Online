import { featuredIntro } from "@/lib/content";

export function FeatureIntro() {
  return (
    <section
      id="about-us"
      data-testid="feature-intro"
      className="bg-[#050C1E] px-5 pt-12 pb-12 sm:px-6 sm:pt-14 sm:pb-14 md:px-8 md:pt-18 md:pb-18 lg:pt-20 lg:pb-20"
    >
      <div
        data-testid="feature-intro-content"
        className="mx-auto flex max-w-[1308px] flex-col gap-6 px-2 text-white sm:gap-8 sm:px-4"
      >
        <p className="text-[17px] leading-7 sm:text-lg md:text-[18px] md:leading-[1.35]">
          {featuredIntro.body}
        </p>
        <a href="#portfolio" className="inline-flex items-center gap-2 text-sm text-white/72">
          <span aria-hidden="true" className="text-lg leading-none">
            ›
          </span>
          {featuredIntro.cta}
        </a>
      </div>
    </section>
  );
}
