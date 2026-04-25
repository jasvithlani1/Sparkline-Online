import { Fragment } from "react";
import Link from "next/link";
import { featuredIntro } from "@/lib/content";

const BRAND = "SPARKLINE MARKETING FIRM";
const SERVICES =
  "Digital Marketing, Brand Strategy, Website Design & Development, Branding & Design, Social Media, and Content Marketing";

function renderWithBold(paragraph: string, phrases: readonly string[]) {
  const hits = phrases
    .map((phrase) => ({ phrase, start: paragraph.indexOf(phrase) }))
    .filter((hit) => hit.start !== -1)
    .sort((a, b) => a.start - b.start);

  if (hits.length === 0) return paragraph;

  const parts: React.ReactNode[] = [];
  let cursor = 0;
  hits.forEach((hit, i) => {
    if (hit.start < cursor) return;
    parts.push(paragraph.slice(cursor, hit.start));
    parts.push(
      <strong key={i} className="font-semibold text-white">
        {hit.phrase}
      </strong>,
    );
    cursor = hit.start + hit.phrase.length;
  });
  parts.push(paragraph.slice(cursor));
  return <Fragment>{parts}</Fragment>;
}

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
        <div className="flex flex-col gap-5 sm:gap-6">
          {featuredIntro.body.map((paragraph, index) => {
            let content: React.ReactNode = paragraph;
            if (index === 0 && paragraph.startsWith(BRAND)) {
              content = (
                <>
                  <strong className="font-semibold text-white">{BRAND}</strong>
                  {paragraph.slice(BRAND.length)}
                </>
              );
            } else if (index === 1) {
              content = renderWithBold(paragraph, [SERVICES, BRAND]);
            }
            return (
              <p
                key={index}
                className="text-pretty text-[17px] leading-7 sm:text-lg md:text-[18px] md:leading-[1.55]"
              >
                {content}
              </p>
            );
          })}
        </div>
        <Link href="/about" className="inline-flex items-center gap-2 text-sm text-white/72 transition-colors hover:text-white">
          <span aria-hidden="true" className="text-lg leading-none">
            ›
          </span>
          {featuredIntro.cta}
        </Link>
      </div>
    </section>
  );
}
