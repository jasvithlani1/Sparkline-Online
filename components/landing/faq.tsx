"use client";

import { useState } from "react";
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
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const subline = lines.join(" ").replace(/\s+/g, " ").trim();

  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="py-10 sm:py-12 md:py-14 lg:py-16"
    >
      <div className="mx-auto grid max-w-[1208px] grid-cols-1 gap-10 px-5 sm:px-6 md:gap-12 md:px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start lg:gap-6">
          <h2
            className="hero-copy text-[36px] leading-[1] tracking-[0.02em] sm:text-[48px] sm:leading-[0.95] md:text-[60px] lg:text-[72px]"
            style={{ wordSpacing: "0.25em" }}
          >
            {eyebrow}
          </h2>
          <p className="max-w-[36ch] text-pretty text-[15px] leading-[1.6] text-white/65 sm:text-[16px] md:text-[17px]">
            {subline}
          </p>
        </div>

        <div className="w-full">
          <ul className="flex flex-col">
            {items.map((item, index) => {
              const isOpen = openId === item.id;
              const isFirst = index === 0;
              return (
                <li
                  key={item.id}
                  className={`border-b border-white/10 ${isFirst ? "border-t border-white/10" : ""}`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    id={`faq-trigger-${item.id}`}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors sm:py-6"
                  >
                    <span className="text-pretty text-[17px] leading-[1.4] tracking-[-0.01em] text-white/90 transition-colors group-hover:text-white sm:text-[19px] md:text-[21px]">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/80 transition-[background-color,border-color,transform] duration-200 group-hover:border-white/30 group-hover:bg-white/[0.08] group-active:scale-[0.96]"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-[14px] w-[14px] transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <path d="m4 6 4 4 4-4" />
                      </svg>
                    </span>
                  </button>

                  <div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${item.id}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[60ch] pb-6 pr-12 text-pretty text-[15px] leading-[1.7] text-white/70 sm:text-[16px] md:text-[17px]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
