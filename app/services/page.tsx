import { Faq } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { OurServices } from "@/components/landing/our-services";
import { getServicesContent } from "@/sanity/lib/content";

export const metadata = {
  title: "Services — Sparkline Marketing Firm",
};

export default async function ServicesPage() {
  const servicesContent = await getServicesContent();

  return (
    <main className="min-h-screen bg-[#050C1E]">
      <Navbar />

      {/* Video hero */}
      <section className="relative h-[68svh] min-h-[460px] w-full overflow-hidden sm:h-[72svh] md:h-[82svh] lg:h-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none absolute inset-x-0 top-0 h-[76%] w-full translate-y-0 object-cover object-center md:inset-0 md:h-[110%]"
        >
          <source src="/videos/services-hero-v2.mp4" type="video/mp4" />
        </video>

        {/* Dark tint for text legibility */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient overlay — blends bottom of video into page background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050C1E]/50 via-transparent to-[#050C1E]" />

      </section>

      <OurServices content={servicesContent} />
      <Faq spacing="compactTop" />
      <Footer />
    </main>
  );
}
