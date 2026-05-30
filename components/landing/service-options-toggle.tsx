"use client";

import Link from "next/link";
import { serviceOptions } from "@/lib/content";

type ServiceOptionId = (typeof serviceOptions)[number]["id"];

function ServiceOptionIcon({ id, isActive }: { id: ServiceOptionId; isActive: boolean }) {
  const stroke = isActive ? "#9A8CFF" : "rgba(255,255,255,0.96)";

  switch (id) {
    case "strategy":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7">
          <circle cx="24" cy="21" r="15" fill="none" stroke={stroke} strokeWidth="3.5" />
          <circle cx="24" cy="21" r="7" fill={stroke} opacity="0.9" />
          <path d="M6 42H42" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "story-voice":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7">
          <path
            d="M11 30C8 27 6 23 6 19C6 12 12 7 20 7H28C36 7 42 12 42 19C42 26 36 31 28 31H19L10 37L11 30Z"
            fill="none"
            stroke={stroke}
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path d="M15 17H33M15 23H29" fill="none" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />
        </svg>
      );
    case "design":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7">
          <rect x="7" y="9" width="14" height="14" rx="2.8" fill="none" stroke={stroke} strokeWidth="3.2" />
          <rect x="27" y="9" width="14" height="10" rx="2.8" fill="none" stroke={stroke} strokeWidth="3.2" />
          <rect x="7" y="27" width="14" height="12" rx="2.8" fill="none" stroke={stroke} strokeWidth="3.2" />
          <rect x="25" y="23" width="16" height="16" rx="2.8" fill="none" stroke={stroke} strokeWidth="3.2" />
        </svg>
      );
    case "development":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7">
          <path
            d="M8 12L18 7L28 12L38 7V35L28 40L18 35L8 40V12ZM18 7V35M28 12V40"
            fill="none"
            stroke={stroke}
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "media-video":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7">
          <path
            d="M8 28L28 20L31 29L11 37L8 28ZM28 20L36 15L39 24L31 29M17 33L21 41M12 35L15 42"
            fill="none"
            stroke={stroke}
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "brand-strategy":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7">
          <circle cx="24" cy="24" r="16" fill="none" stroke={stroke} strokeWidth="3.2" />
          <circle cx="24" cy="24" r="7" fill="none" stroke={stroke} strokeWidth="3.2" />
          <path
            d="M32 16L24 24M24 24L38 10M24 24L18 34"
            fill="none"
            stroke={stroke}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export function ServiceOptionsToggle() {
  return (
    <div
      data-testid="service-options-toggle"
      className="relative z-20 mt-24 ml-0 w-full max-w-[307px] sm:mt-28 md:mt-36 md:ml-[72px] lg:mt-44 lg:ml-[103px]"
    >
      <div>
        {serviceOptions.map((option) => {
          const isActive = option.id === serviceOptions[0].id;

          return (
            <div
              key={option.id}
              className="border-b border-white/90 last:border-b-0"
            >
              <Link
                href={option.href}
                aria-label={option.title}
                className={`relative flex w-full flex-col items-start px-3 py-3 text-left transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.96] sm:px-4 sm:py-4 md:px-5 md:py-5 ${
                  isActive ? "before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-[#7A6BFF]" : ""
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <ServiceOptionIcon id={option.id} isActive={isActive} />
                  <span
                    className={`text-[13px] leading-none tracking-[-0.04em] sm:text-[15px] md:text-[17px] ${
                      isActive ? "text-[#9A8CFF]" : "text-white"
                    }`}
                  >
                    {option.title}
                  </span>
                </div>
                <p
                  className={`mt-2.5 max-w-[26ch] text-[11px] leading-[1.2] tracking-[-0.03em] sm:text-[13px] md:mt-3 md:max-w-[28ch] md:text-[14px] ${
                    isActive ? "text-white" : "text-white"
                  }`}
                >
                  {option.description}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
