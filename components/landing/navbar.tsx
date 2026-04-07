"use client";

import { useState } from "react";
import Image from "next/image";
import { navLinks } from "@/lib/content";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-4 z-30 px-3 sm:px-4 md:top-5 md:px-6">
      <div className="glass-shell mx-auto flex w-full max-w-[1010px] flex-col rounded-2xl px-3 py-2.5 text-white sm:px-4 sm:py-3 md:px-5 md:py-4">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <a href="#" className="flex items-center">
            <Image
              src="/logos/sparkline-marketing-firm.svg"
              alt="SPARKLINE MARKETING FIRM"
              width={240}
              height={109}
              priority
              className="h-auto w-[58px] sm:w-[70px] md:w-[84px] lg:w-[91px]"
            />
          </a>
          <nav className="hidden items-center gap-5 text-sm text-white/72 lg:flex">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#contact-us"
              className="inline-flex items-center justify-center whitespace-nowrap text-[13px] text-white transition-transform hover:-translate-y-0.5 sm:text-[15px] md:text-base"
              style={{
                paddingInline: "12px",
                paddingBlock: "12px",
                borderRadius: "8px",
                backgroundImage:
                  "linear-gradient(in oklab 180deg, oklab(43.1% -0.018 -0.204) 1.39%, oklab(51.3% -0.023 -0.216) 101.39%)",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "#FFFFFF29",
                boxShadow:
                  "#FFFFFF14 0px 0.5px 0.5px inset, #2157E033 0px 1px 1px, #2157E033 0px 1px 1px, #2157E066 0px 2px 5px -2px, #0F64F2 0px 0px 0px 1px",
                fontSize: "16px",
                lineHeight: "20px",
                fontWeight: 600,
                fontFamily: '"Geist-SemiBold", "Geist", system-ui, sans-serif',
              }}
            >
              Book a Call
            </a>
            <button
              type="button"
              aria-label="Open navigation menu"
              aria-controls="mobile-nav-panel"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/8 text-white transition-colors hover:bg-white/12 lg:hidden"
            >
              <span className="flex flex-col gap-1.5">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            </button>
          </div>
        </div>
        {isMobileMenuOpen ? (
          <div
            id="mobile-nav-panel"
            data-testid="mobile-nav-panel"
            className="mt-3 grid gap-1 rounded-2xl border border-white/12 bg-[#0d1730]/95 p-2 text-sm text-white/82 shadow-[0_16px_40px_rgba(0,0,0,0.28)] lg:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 transition-colors hover:bg-white/8 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}
