import type { Metadata } from "next";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { ProjectList } from "@/components/portfolio/project-list";
import Breadcrumb from "@/components/breadcrumb";
import { getPortfolioProjects, getSiteSettings } from "@/sanity/lib/content";
import { buildMetadata, buildBreadcrumbLD } from "@/lib/seo";
import JsonLd from "@/components/json-ld";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: "Portfolio",
    description: "Explore Sparkline Marketing Firm's portfolio of brand, digital, and content projects.",
    siteSettings: settings,
    path: "/portfolio",
  });
}

export default async function PortfolioPage() {
  const [projects, settings] = await Promise.all([getPortfolioProjects(), getSiteSettings()]);
  const siteUrl = settings?.siteUrl ?? "https://www.sparklinemarketingfirm.com";
  const breadcrumbLD = buildBreadcrumbLD([{ name: "Portfolio" }], siteUrl);

  return (
    <main className="min-h-screen bg-[#050C1E]">
      <JsonLd data={breadcrumbLD} />
      <Navbar />

      {/* Video hero */}
      <section className="relative h-[68svh] min-h-[460px] w-full overflow-hidden sm:h-[72svh] md:h-[82svh] lg:h-screen">
        {/* Video hero */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none absolute inset-x-0 top-0 h-full w-full translate-y-0 object-cover object-top md:inset-0 md:h-[110%]"
        >
          <source src="/videos/portfolio-hero.webm" type="video/webm" />
          <source src="/videos/portfolio-hero.mp4" type="video/mp4" />
        </video>

        {/* Dark tint for text legibility */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050C1E]/60 via-transparent to-[#050C1E]" />

        {/* Breadcrumb */}
        <div className="absolute bottom-8 left-0 right-0 z-10 px-5 sm:px-6 md:px-8">
          <div className="mx-auto max-w-[1208px]">
            <Breadcrumb items={[{ name: "Portfolio" }]} variant="dark" />
          </div>
        </div>
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
