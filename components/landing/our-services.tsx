import { Fragment } from "react";
import Link from "next/link";
import { ourServices } from "@/lib/content";

const BRAND = "SPARKLINE MARKETING FIRM";
const PARAGRAPH_BOLD: Record<number, readonly string[]> = {
  1: ["Digital Marketing", "Brand Strategy", "Website Design & Development"],
  2: ["Branding & Design", "Social Media", "Content Creation"],
};

function renderWithBold(text: string, phrases: readonly string[]) {
  const hits = phrases
    .map((phrase) => ({ phrase, start: text.indexOf(phrase) }))
    .filter((hit) => hit.start !== -1)
    .sort((a, b) => a.start - b.start);

  if (hits.length === 0) return text;

  const parts: React.ReactNode[] = [];
  let cursor = 0;
  hits.forEach((hit, i) => {
    if (hit.start < cursor) return;
    parts.push(text.slice(cursor, hit.start));
    parts.push(
      <strong key={i} className="font-semibold text-white">
        {hit.phrase}
      </strong>,
    );
    cursor = hit.start + hit.phrase.length;
  });
  parts.push(text.slice(cursor));
  return <Fragment>{parts}</Fragment>;
}

export function OurServices() {
  return (
    <section
      id="our-services"
      data-testid="our-services"
      className="scroll-mt-24 bg-[#050C1E] px-5 pt-16 pb-20 sm:px-6 sm:pt-20 sm:pb-24 md:scroll-mt-28 md:px-8 md:pt-24 md:pb-28 lg:pt-28 lg:pb-32"
    >
      <div className="mx-auto max-w-[1310px]">
        <div
          data-testid="our-services-header"
          className="flex flex-col gap-6 text-white md:gap-8"
        >
          <div className="flex flex-col gap-4">
            <h2 className="hero-copy text-[44px] leading-[0.95] tracking-[-0.01em] sm:text-[60px] md:text-[72px] lg:text-[84px]">
              OUR CORE SERVICES
            </h2>
            <span
              aria-hidden="true"
              className="h-[2px] w-20 rounded-full bg-[linear-gradient(90deg,#8F57FF_0%,#4C2FFF_100%)]"
            />
          </div>
          <div className="flex max-w-[1024px] flex-col gap-5 sm:gap-6">
            {ourServices.intro.map((paragraph, index) => {
              const phrases = [BRAND, ...(PARAGRAPH_BOLD[index] ?? [])];
              return (
                <p
                  key={index}
                  className="text-pretty text-[16px] leading-[1.7] text-white/72 sm:text-[17px] md:text-[18px] md:leading-[1.72]"
                >
                  {renderWithBold(paragraph, phrases)}
                </p>
              );
            })}
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-white/10 md:mt-14" />

        <div
          data-testid="our-services-grid"
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:mt-16 lg:grid-cols-3"
        >
          {ourServices.cards.map((card) => (
            <article
              key={card.id}
              data-testid="our-services-card"
              className="flex h-full flex-col gap-6 border-b border-white/10 px-0 py-10 last:border-b-0 sm:px-8 sm:py-12 sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:border-r-white/10 sm:[&:nth-last-child(-n+2)]:border-b-0 md:px-10 md:py-14 lg:!border-r lg:!border-r-white/10 lg:[&:nth-child(3n)]:!border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
            >
              <div className="flex flex-col gap-4">
                <h3
                  className="hero-copy whitespace-pre-line text-balance text-[28px] leading-[1] tracking-[-0.005em] sm:text-[32px] md:text-[38px]"
                  style={{ fontFamily: "var(--font-cal-sans), Arial, sans-serif" }}
                >
                  {card.title}
                </h3>
                <span aria-hidden="true" className="h-px w-full bg-white/10" />
              </div>
              <ul className="flex flex-1 flex-col gap-2 text-[15px] leading-[1.45] text-white/70 md:text-[16px]">
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div>
                <Link
                  href={`/services/${card.id}`}
                  className="inline-flex items-center justify-center whitespace-nowrap text-white transition-transform hover:-translate-y-0.5 active:scale-[0.96]"
                  style={{
                    paddingInline: "16px",
                    paddingBlock: "10px",
                    borderRadius: "8px",
                    backgroundImage: "linear-gradient(180deg, #8F57FF 0%, #4C2FFF 100%)",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "#FFFFFF29",
                    boxShadow:
                      "#FFFFFF14 0px 0.5px 0.5px inset, #5F38D933 0px 1px 1px, #5F38D933 0px 1px 1px, #4C2FFF66 0px 2px 5px -2px, #4C2FFF 0px 0px 0px 1px",
                    fontSize: "15px",
                    lineHeight: "18px",
                    fontWeight: 600,
                    fontFamily: '"Geist-SemiBold", "Geist", system-ui, sans-serif',
                  }}
                >
                  Learn More
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
