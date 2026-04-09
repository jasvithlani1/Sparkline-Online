"use client";

import { useState } from "react";
import { serviceOptions } from "@/lib/content";

type ServiceOptionId = (typeof serviceOptions)[number]["id"];

function ServiceOptionIcon({ id, isActive }: { id: ServiceOptionId; isActive: boolean }) {
  const stroke = isActive ? "#2C6BFF" : "rgba(16,18,24,0.72)";

  switch (id) {
    case "strategy":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6">
          <circle cx="24" cy="21" r="15" fill="none" stroke={stroke} strokeWidth="3.5" />
          <circle cx="24" cy="21" r="7" fill={stroke} opacity="0.9" />
          <path d="M6 42H42" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "story-voice":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6">
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
        <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6">
          <rect x="7" y="9" width="14" height="14" rx="2.8" fill="none" stroke={stroke} strokeWidth="3.2" />
          <rect x="27" y="9" width="14" height="10" rx="2.8" fill="none" stroke={stroke} strokeWidth="3.2" />
          <rect x="7" y="27" width="14" height="12" rx="2.8" fill="none" stroke={stroke} strokeWidth="3.2" />
          <rect x="25" y="23" width="16" height="16" rx="2.8" fill="none" stroke={stroke} strokeWidth="3.2" />
        </svg>
      );
    case "development":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6">
          <path
            d="M8 12L19 6V42L8 36V12ZM29 6L40 12V36L29 42V6ZM19 6L29 11V42L19 37V6Z"
            fill="none"
            stroke={stroke}
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "media-video":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6">
          <path
            d="M9 19H27V33H9V19ZM27 23L40 17V35L27 29"
            fill="none"
            stroke={stroke}
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path d="M13 15L17 10M21 15L25 10" fill="none" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />
        </svg>
      );
  }
}

export function ServiceOptionsToggle() {
  const [activeId, setActiveId] = useState<ServiceOptionId>(serviceOptions[0].id);

  return (
    <div
      data-testid="service-options-toggle"
      className="relative z-20 mt-24 ml-4 w-[calc(100%-2rem)] max-w-[360px] rounded-[20px] border border-white/38 bg-white/62 p-2 shadow-[0_16px_32px_rgba(15,23,42,0.14)] backdrop-blur-md sm:mt-28 sm:ml-7 sm:w-[calc(100%-3.5rem)] sm:p-[10px] md:mt-36 md:ml-[72px] md:w-full md:p-3 lg:mt-44 lg:ml-[103px]"
    >
      <div className="divide-y divide-black/10">
        {serviceOptions.map((option) => {
          const isActive = option.id === activeId;

          return (
            <div key={option.id} className="py-1.5 first:pt-0 last:pb-0 sm:py-2">
              <button
                type="button"
                aria-label={option.title}
                aria-pressed={isActive}
                onClick={() => setActiveId(option.id)}
                className="flex w-full items-start gap-1.5 text-left sm:gap-2"
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-xl transition-colors sm:h-7 sm:w-7 ${
                    isActive ? "bg-[#2C6BFF]/10" : "bg-black/6"
                  }`}
                >
                  <ServiceOptionIcon id={option.id} isActive={isActive} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`text-[15px] leading-none tracking-[-0.03em] sm:text-[20px] md:text-[24px] ${
                        isActive ? "text-[#2C6BFF]" : "text-black/78"
                      }`}
                    >
                      {option.title}
                    </span>
                    <span
                      className={`mt-0.5 h-[2px] w-6 shrink-0 rounded-full transition-colors sm:w-8 ${
                        isActive ? "bg-[#2C6BFF]" : "bg-black/12"
                      }`}
                    />
                  </div>
                  <p
                    className={`mt-1.5 max-w-[280px] text-[12px] leading-[1.35] transition-colors sm:text-[14px] ${
                      isActive ? "text-black/72" : "text-black/48"
                    }`}
                  >
                    {option.description}
                  </p>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
