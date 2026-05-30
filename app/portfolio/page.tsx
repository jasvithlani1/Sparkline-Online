import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { ProjectList } from "@/components/portfolio/project-list";
import { getPortfolioProjects } from "@/sanity/lib/content";

export const metadata = {
  title: "Portfolio — Sparkline Marketing Firm",
};

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

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
          className="pointer-events-none absolute inset-x-0 top-0 h-[76%] w-full translate-y-0 object-cover object-top md:inset-0 md:h-[110%]"
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
      <section
        data-testid="portfolio-projects-section"
        className="pt-10 pb-0 sm:pt-12 sm:pb-0 md:pt-14 md:pb-2"
      >
        <ProjectList projects={projects} />
      </section>

      <Footer spacing="compactTop" />
    </main>
  );
}
