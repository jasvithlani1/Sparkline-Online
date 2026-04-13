import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { ProjectList } from "@/components/portfolio/project-list";

export const metadata = {
  title: "Portfolio — Sparkline Marketing Firm",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#050C1E]">
      <Navbar />

      {/* Full-viewport video hero */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Video — cropped ~10% off bottom to hide watermark */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none absolute inset-0 h-[110%] w-full object-cover object-top"
        >
          <source src="/videos/portfolio-hero.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050C1E]/60 via-transparent to-[#050C1E]" />

        {/* Hero text */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60 sm:text-[12px]">
            OUR WORK
          </p>
          <h1 className="mt-4 text-[42px] leading-[1.08] tracking-[-0.04em] text-white sm:text-[56px] md:text-[72px]">
            Portfolio
          </h1>
          <p className="mt-4 max-w-[48ch] text-[16px] leading-7 text-white/60 sm:text-[17px]">
            A selection of the best projects crafted by our team.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 sm:py-20 md:py-24">
        <ProjectList />
      </section>

      <Footer />
    </main>
  );
}
