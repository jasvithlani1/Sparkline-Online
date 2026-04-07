import { featuredIntro } from "@/lib/content";

export function FeatureIntro() {
  return (
    <section id="about-us" className="bg-[#FDFCF4] px-5 py-12 sm:px-6 sm:py-14 md:px-8 md:py-18 lg:py-20">
      <div className="mx-auto grid max-w-[1390px] gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(280px,415px)] md:gap-10 md:justify-between">
        <div className="space-y-0.5 text-[34px] font-medium leading-[0.98] tracking-[0.01em] text-[#2A2C2F] sm:text-[40px] md:text-[44px] lg:text-[48px]">
          {featuredIntro.title.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="max-w-[415px] space-y-6 pt-1 text-[#2A2C2F] sm:space-y-8 sm:pt-2">
          <p className="text-[15px] leading-7 sm:text-base md:text-lg md:leading-[1.35]">
            {featuredIntro.body}
          </p>
          <a href="#portfolio" className="inline-flex items-center gap-2 text-sm text-black/70">
            <span aria-hidden="true" className="text-lg leading-none">
              ›
            </span>
            {featuredIntro.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
