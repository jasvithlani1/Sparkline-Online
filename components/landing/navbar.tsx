"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/content";

const NAVBAR_SCROLL_THRESHOLD = 24;
const DEFAULT_BOOK_CALL_URL =
  "https://crm.sparklinemarketingfirm.com/widget/booking/fseh3NlrLcMcooAlLbLB";
const DEFAULT_LOGO = "/logos/sparkline-new-logo.svg";
const DEFAULT_LOGO_ALT = "SPARKLINE MARKETING FIRM";
const DEFAULT_CTA_LABEL = "Book a Call";

function NavLink({
  href,
  isHomePage,
  className,
  onClick,
  children,
}: {
  href: string;
  isHomePage: boolean;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (href.startsWith("#")) {
    const resolvedHref = isHomePage ? href : `/${href}`;
    return (
      <a href={resolvedHref} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

type NavbarProps = {
  logoUrl?: string;
  logoAlt?: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

export function Navbar({ logoUrl, logoAlt, ctaLabel, ctaUrl }: NavbarProps = {}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const logoSrc = logoUrl ?? DEFAULT_LOGO;
  const logoAltText = logoAlt ?? DEFAULT_LOGO_ALT;
  const bookCallUrl = ctaUrl ?? DEFAULT_BOOK_CALL_URL;
  const bookCallLabel = ctaLabel ?? DEFAULT_CTA_LABEL;


  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > NAVBAR_SCROLL_THRESHOLD);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className="fixed inset-x-0 top-0 z-40"
    >
      <div
        data-testid="site-navbar-shell"
        className={`flex w-full flex-col border-b px-3 py-2.5 text-white transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 sm:px-6 sm:py-3 md:px-8 md:py-4 ${
          isScrolled
            ? "border-white/10 bg-[#0d1730]/88 shadow-[0_14px_40px_rgba(4,10,24,0.28)] backdrop-blur-xl"
            : "border-white/12 bg-white/8 shadow-[0_10px_30px_rgba(5,12,28,0.12)] backdrop-blur-md"
        }`}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <Link href="/" className="flex items-center">
            <Image
              src={logoSrc}
              alt={logoAltText}
              width={278}
              height={56}
              priority
              className="h-auto w-[108px] sm:w-[126px] md:w-[146px] lg:w-[162px]"
            />
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-white/72 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                isHomePage={isHomePage}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={bookCallUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-[13px] text-white transition-transform hover:-translate-y-0.5 active:scale-[0.96] sm:px-3 sm:py-2.5 sm:text-[15px] md:text-base"
              style={{
                borderRadius: "8px",
                backgroundImage: "linear-gradient(180deg, #8F57FF 0%, #4C2FFF 100%)",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "#FFFFFF29",
                boxShadow:
                  "#FFFFFF14 0px 0.5px 0.5px inset, #5F38D933 0px 1px 1px, #5F38D933 0px 1px 1px, #4C2FFF66 0px 2px 5px -2px, #4C2FFF 0px 0px 0px 1px",
                lineHeight: "18px",
                fontWeight: 600,
                fontFamily: '"Geist-SemiBold", "Geist", system-ui, sans-serif',
              }}
            >
              {bookCallLabel}
            </a>
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-controls="mobile-nav-panel"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/8 text-white transition-[background-color,transform] duration-200 hover:bg-white/12 active:scale-[0.96] sm:h-11 sm:w-11 lg:hidden"
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
            className="mt-3 grid gap-1 rounded-2xl border border-white/12 bg-[#0d1730]/95 p-2 text-center text-sm text-white/82 shadow-[0_16px_40px_rgba(0,0,0,0.28)] lg:hidden"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                isHomePage={isHomePage}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 transition-colors hover:bg-white/8 hover:text-white"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}
