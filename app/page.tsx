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
      <ServiceBanner />
      <LogoGrid />
      <WorkGallery />
      <Footer />
    </main>
  );
}
