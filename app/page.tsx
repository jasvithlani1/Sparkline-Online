import type { Metadata } from "next";
import { Faq } from "@/components/landing/faq";
import { FeatureIntro } from "@/components/landing/feature-intro";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { LogoGrid } from "@/components/landing/logo-grid";
import { NavbarServer as Navbar } from "@/components/landing/navbar-server";
import { ServiceBanner } from "@/components/landing/service-banner";
import { WorkGallery } from "@/components/landing/work-gallery";
import { getPortfolioProjects, getHomePage, getSiteSettings } from "@/sanity/lib/content";
import { buildMetadata, buildFaqLD } from "@/lib/seo";
import JsonLd from "@/components/json-ld";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [homeData, settings] = await Promise.all([getHomePage(), getSiteSettings()]);
  const seo = homeData?.seo;
  return buildMetadata({
    title: seo?.title,
    description: seo?.description,
    ogImageUrl: seo?.ogImageUrl,
    noIndex: seo?.noIndex,
    canonicalUrl: seo?.canonicalUrl,
    siteSettings: settings,
    path: "/",
  });
}

export default async function Home() {
  const projects = await getPortfolioProjects();
  const homeData = await getHomePage();
  const faqItems = homeData?.faq ?? [];

  return (
    <main className="min-h-screen bg-white">
      {faqItems.length > 0 && <JsonLd data={buildFaqLD(faqItems)} />}
      <div className="relative">
        <Navbar />
        <Hero data={homeData?.hero} />
      </div>
      <FeatureIntro data={homeData?.featuredIntro} />
      <div
        data-testid="midpage-gradient-band"
        className="bg-[linear-gradient(180deg,#0B349F_0%,#050C1E_100%)]"
      >
        <ServiceBanner data={homeData?.serviceBanner} />
        <LogoGrid data={homeData?.trustedBy} />
        <WorkGallery projects={projects} content={homeData?.workGallerySection} />
        <Faq
          items={homeData?.faq ?? undefined}
          lines={homeData?.faqSubtitle ? [homeData.faqSubtitle] : undefined}
        />
      </div>
      <Footer />
    </main>
  );
}
