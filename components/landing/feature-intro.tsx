import { Fragment } from "react";
import { featuredIntro as fallbackFeaturedIntro } from "@/lib/content";

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

type FeatureIntroProps = {
  data?: {
    body?: string[];
  };
};

export function FeatureIntro({ data }: FeatureIntroProps) {
  const body = data?.body && data.body.length > 0 ? data.body : fallbackFeaturedIntro.body;

  return (
    <section
      id="about-us"
      data-testid="feature-intro"
      className="bg-[#050C1E] px-5 pt-8 pb-8 sm:px-6 sm:pt-10 sm:pb-10 md:px-8 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
    >
      <div
        data-testid="feature-intro-content"
        className="mx-auto flex max-w-[1308px] flex-col gap-6 px-2 text-white sm:gap-8 sm:px-4"
      >
        <div className="flex flex-col gap-5 sm:gap-6">
          {body.map((paragraph, index) => {
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
      </div>
    </section>
  );
}
