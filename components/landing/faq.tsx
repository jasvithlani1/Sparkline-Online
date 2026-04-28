"use client";

import { faqSection } from "@/lib/content";

type FaqItem = { id: string; question: string; answer: string };

type FaqProps = {
  eyebrow?: string;
  lines?: readonly string[];
  items?: readonly FaqItem[];
};

export function Faq({
  eyebrow = faqSection.eyebrow,
  lines = faqSection.lines,
  items = faqSection.items,
}: FaqProps = {}) {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="py-10 sm:py-12 md:py-14 lg:py-16"
    >
      <div className="mx-auto flex max-w-[1370px] flex-col gap-10 px-5 sm:gap-12 sm:px-6 md:gap-14 md:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center sm:gap-5 md:gap-6">
          <p className="text-[14px] uppercase tracking-[0.28em] text-white/55 sm:text-[16px] sm:tracking-[0.32em] md:text-[18px]">
            {eyebrow}
          </p>
          <p className="text-balance text-[28px] leading-[1.2] text-white/88 sm:text-[32px] sm:leading-[1.22] md:text-[40px] md:leading-[1.22]">
            {lines.join(" ").replace(/\s+/g, " ").trim()}
          </p>
        </div>

        <div className="grid grid-cols-12 gap-5">
          {items.map((item, i) => {
            const total = items.length;
            const remainderLg = total % 3;
            const remainderMd = total % 2;
            const fromEnd = total - 1 - i;

            let lgSpan = "lg:col-span-4";
            if (remainderLg === 1 && fromEnd < 4) lgSpan = "lg:col-span-3";
            if (remainderLg === 2 && fromEnd < 2) lgSpan = "lg:col-span-6";

            let mdSpan = "md:col-span-6";
            if (remainderMd === 1 && fromEnd === 0) mdSpan = "md:col-span-12";

            return (
              <article
                key={item.id}
                className={`col-span-12 ${mdSpan} ${lgSpan} rounded-[14px] bg-white/[0.04] p-6 outline outline-1 -outline-offset-1 outline-white/8 backdrop-blur-sm sm:p-7`}
              >
                <h3 className="text-pretty text-[15px] font-semibold leading-[1.4] tracking-[-0.005em] text-white sm:text-[16px]">
                  {item.question}
                </h3>
                <p className="mt-3 text-pretty text-[14px] leading-[1.55] text-white/68 sm:text-[15px]">
                  {item.answer}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
