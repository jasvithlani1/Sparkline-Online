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
          <source src="/videos/portfolio-hero.webm" type="video/webm" />
          <source src="/videos/portfolio-hero.mp4" type="video/mp4" />
        </video>

        {/* Dark tint for text legibility */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050C1E]/60 via-transparent to-[#050C1E]" />

      </section>

      {/* Projects */}
      <section className="py-10 sm:py-12 md:py-14">
        <ProjectList />
      </section>

      <Footer />
    </main>
  );
}
