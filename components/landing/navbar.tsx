import Image from "next/image";
import { navLinks } from "@/lib/content";

export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-6 z-30 px-4 md:top-[24px]">
      <div className="glass-shell mx-auto flex w-full max-w-[1010px] items-center justify-between gap-4 rounded-2xl px-4 py-3 text-white md:px-5 md:py-4">
        <a href="#" className="flex items-center">
          <Image
            src="/logos/sparkline-marketing-firm.svg"
            alt="SPARKLINE MARKETING FIRM"
            width={240}
            height={109}
            priority
            className="h-auto w-[67px] sm:w-[79px] md:w-[91px]"
          />
        </a>
        <nav className="hidden items-center gap-5 text-sm text-white/72 lg:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact-us"
          className="inline-flex items-center justify-center whitespace-nowrap text-white transition-transform hover:-translate-y-0.5"
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
      </div>
    </header>
  );
}
