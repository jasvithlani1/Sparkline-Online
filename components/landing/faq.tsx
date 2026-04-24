"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/landing/section-heading";
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

  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="py-14 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto flex max-w-[1208px] flex-col gap-10 px-5 sm:gap-12 sm:px-6 md:gap-14 md:px-8">
        <SectionHeading eyebrow={eyebrow} lines={lines} tone="dark" />

        <div className="mx-auto w-full max-w-[880px]">
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
                      <span className="block h-px w-3.5 bg-current" />
                      <span
                        className={`absolute block h-3.5 w-px bg-current transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                          isOpen ? "scale-y-0" : "scale-y-100"
                        }`}
                      />
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
                      <p className="max-w-[70ch] pb-6 pr-12 text-pretty text-[15px] leading-[1.7] text-white/70 sm:text-[16px] md:text-[17px]">
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
