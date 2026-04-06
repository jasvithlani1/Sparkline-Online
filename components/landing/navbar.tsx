import { navLinks } from "@/lib/content";

export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-6 z-30 px-4 md:top-[24px]">
      <div className="glass-shell mx-auto flex w-full max-w-[1010px] items-center justify-between gap-4 rounded-2xl px-4 py-3 text-white md:px-5 md:py-4">
        <a href="#" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/8 text-xs">
            ◔
          </span>
          <span className="max-w-[148px] text-[9px] font-semibold uppercase leading-[1.15] tracking-[0.18em] sm:max-w-[170px] sm:text-[10px] md:max-w-[205px] md:text-[11px]">
            SPARKLINE MARKETING FIRM
          </span>
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
          className="rounded-xl bg-fuchsia-500 px-3.5 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(168,85,247,0.5)] transition-transform hover:-translate-y-0.5"
        >
          Book a Call
        </a>
      </div>
    </header>
  );
}
