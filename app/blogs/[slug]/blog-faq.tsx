"use client";

import { useState } from "react";

type FaqItem = { id: string; question: string; answer: string };

export function BlogFaq({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (!items.length) return null;

  return (
    <div className="mt-14 md:mt-16">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#B08CFF]">
        FAQ
      </p>
      <h2 className="text-balance text-[28px] leading-[1.1] tracking-[-0.02em] text-white sm:text-[34px]">
        Frequently Asked Questions
      </h2>

      <ul className="mt-8 flex flex-col">
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
                aria-controls={`blog-faq-panel-${item.id}`}
                id={`blog-faq-trigger-${item.id}`}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
              >
                <span className="text-pretty text-[16px] leading-[1.4] tracking-[-0.01em] text-white/90 transition-colors group-hover:text-white sm:text-[18px]">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/80 transition-[background-color,border-color] duration-200 group-hover:border-[#B08CFF]/50 group-hover:bg-[#B08CFF]/10"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`h-[13px] w-[13px] transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <path d="m4 6 4 4 4-4" />
                  </svg>
                </span>
              </button>

              <div
                id={`blog-faq-panel-${item.id}`}
                role="region"
                aria-labelledby={`blog-faq-trigger-${item.id}`}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-[60ch] pb-6 pr-12 text-pretty text-[15px] leading-[1.7] text-white/70 sm:text-[16px]">
                    {item.answer}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
