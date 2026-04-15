import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { OurServices } from "@/components/landing/our-services";

export const metadata = {
  title: "Services — Sparkline Marketing Firm",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#050C1E]">
      <Navbar />

      {/* Full-viewport video hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none absolute inset-0 h-[110%] w-full object-cover object-center"
        >
          <source src="/videos/services-hero-v2.mp4" type="video/mp4" />
        </video>

        {/* Dark tint for text legibility */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient overlay — blends bottom of video into page background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050C1E]/50 via-transparent to-[#050C1E]" />

        {/* Hero text */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60 sm:text-[12px]">
            WHAT WE DO
          </p>
          <h1 className="mt-4 text-[42px] leading-[1.08] tracking-[-0.04em] text-white sm:text-[56px] md:text-[72px]">
            Services
          </h1>
          <p className="mt-4 max-w-[48ch] text-[16px] leading-7 text-white/60 sm:text-[17px]">
            Strategy, design, development, and media — all under one crew.
          </p>
        </div>
      </section>

      <OurServices />
      <Footer />
    </main>
  );
}
