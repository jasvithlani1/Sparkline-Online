import type { Metadata } from "next";
import { Faq } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { OurServices } from "@/components/landing/our-services";
import Breadcrumb from "@/components/breadcrumb";
import { getServicesContent, getSiteSettings } from "@/sanity/lib/content";
import { buildMetadata, buildBreadcrumbLD } from "@/lib/seo";
import JsonLd from "@/components/json-ld";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: "Services",
    description: "Explore Sparkline Marketing Firm's full range of digital marketing, brand strategy, and content services.",
    siteSettings: settings,
    path: "/services",
  });
}

export default async function ServicesPage() {
  const [servicesContent, settings] = await Promise.all([getServicesContent(), getSiteSettings()]);
  const siteUrl = settings?.siteUrl ?? "https://www.sparklinemarketingfirm.com";
  const breadcrumbLD = buildBreadcrumbLD([{ name: "Services" }], siteUrl);

  return (
    <main className="min-h-screen bg-[#050C1E]">
      <JsonLd data={breadcrumbLD} />
      <Navbar />

      {/* Video hero */}
      <section className="relative h-[68svh] min-h-[460px] w-full overflow-hidden sm:h-[72svh] md:h-[82svh] lg:h-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none absolute inset-x-0 top-0 h-full w-full translate-y-0 object-cover object-center md:inset-0 md:h-[110%]"
        >
          <source src="/videos/services-hero-v2.mp4" type="video/mp4" />
        </video>

        {/* Dark tint for text legibility */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient overlay — blends bottom of video into page background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050C1E]/50 via-transparent to-[#050C1E]" />

        {/* Breadcrumb */}
        <div className="absolute bottom-8 left-0 right-0 z-10 px-5 sm:px-6 md:px-8">
          <div className="mx-auto max-w-[1208px]">
            <Breadcrumb items={[{ name: "Services" }]} variant="dark" />
          </div>
        </div>
      </section>

      <OurServices content={servicesContent} />
      <Faq
        eyebrow={servicesContent.faq.eyebrow}
        lines={servicesContent.faq.lines}
        items={servicesContent.faq.items}
        spacing="compactTop"
      />
      <Footer />
    </main>
  );
}
