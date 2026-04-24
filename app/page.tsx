import { Faq } from "@/components/landing/faq";
import { FeatureIntro } from "@/components/landing/feature-intro";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { LogoGrid } from "@/components/landing/logo-grid";
import { Navbar } from "@/components/landing/navbar";
import { ServiceBanner } from "@/components/landing/service-banner";
import { WorkGallery } from "@/components/landing/work-gallery";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="relative">
        <Navbar />
        <Hero />
      </div>
      <FeatureIntro />
      <div
        data-testid="midpage-gradient-band"
        className="bg-[linear-gradient(180deg,#0B349F_0%,#050C1E_100%)]"
      >
        <ServiceBanner />
        <LogoGrid />
        <WorkGallery />
        <Faq />
      </div>
      <Footer />
    </main>
  );
}
