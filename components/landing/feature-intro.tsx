import { featuredIntro } from "@/lib/content";

export function FeatureIntro() {
  return (
    <section id="about-us" className="bg-[#FDFCF4] px-6 py-14 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-[1390px] gap-10 md:grid-cols-[550px_415px] md:justify-between">
        <div className="space-y-0.5 text-[40px] font-medium leading-[0.98] tracking-[0.01em] text-[#2A2C2F] md:text-[48px]">
          {featuredIntro.title.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="max-w-[415px] space-y-8 pt-2 text-[#2A2C2F]">
          <p className="text-base leading-7 md:text-lg md:leading-[1.35]">{featuredIntro.body}</p>
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
