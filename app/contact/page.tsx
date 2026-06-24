import type { Metadata } from "next";
import { Footer } from "@/components/landing/footer";
import { NavbarServer as Navbar } from "@/components/landing/navbar-server";
import Breadcrumb from "@/components/breadcrumb";
import { getContactPage, getSiteSettings } from "@/sanity/lib/content";
import { ContactForm } from "@/components/landing/contact-form";
import { buildMetadata, buildBreadcrumbLD } from "@/lib/seo";
import JsonLd from "@/components/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: "Contact",
    description: "Get in touch with Sparkline Marketing Firm. We'd love to hear about your business goals.",
    siteSettings: settings,
    path: "/contact",
  });
}

export default async function ContactPage() {
  const [contactData, settings] = await Promise.all([getContactPage(), getSiteSettings()]);
  const siteUrl = settings?.siteUrl ?? "https://www.sparklinemarketingfirm.com";
  const breadcrumbLD = buildBreadcrumbLD([{ name: "Contact" }], siteUrl);
  const details = contactData?.contactDetails;

  const phone = details?.phone || "(470) 841-2335";
  const email = details?.email || "info@sparklinemarketingfirm.com";
  const location = details?.location || "524 Sawnee Village Boulevard, Cumming, Georgia 30040";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050C1E]">
      <JsonLd data={breadcrumbLD} />
      {/* Ambient background video — blended heavily into bg-[#050C1E] */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster=""
          className="absolute inset-x-0 top-0 h-[76%] w-full translate-y-0 object-cover opacity-[0.28] mix-blend-screen md:inset-0 md:h-full"
        >
          <source src="/videos/contact-water-light.webm" type="video/webm" />
          <source src="/videos/contact-water-light.mp4" type="video/mp4" />
        </video>
        {/* Deep tint to fuse the footage into the site background */}
        <div className="absolute inset-0 bg-[#050C1E]/70" />
        {/* Edge vignette — softens corners so the video reads as ambience, not content */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050C1E_95%)]" />
        {/* Top & bottom fades so navbar + footer seam cleanly */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050C1E] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#050C1E] to-transparent" />
      </div>

      <Navbar />

      <section
        id="contact-us"
        data-testid="contact-page-section"
        className="relative z-10 pt-32 pb-0 sm:pt-36 sm:pb-0 md:pt-40 md:pb-2"
      >
        <div className="mx-auto max-w-[1208px] px-5 sm:px-6 md:px-8">
          <Breadcrumb items={[{ name: "Contact" }]} variant="dark" className="mb-8" />
          {/* Header */}
          <div className="mb-12 md:mb-16" />

          <div className="grid gap-12 lg:grid-cols-[340px_1fr] lg:gap-20">
            {/* Contact info — left */}
            <div className="space-y-10 text-center">
              <div>
                <div className="flex items-center justify-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/70"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Phone
                  </h3>
                </div>
                <a
                  href={`tel:+1${phone.replace(/[^0-9]/g, "")}`}
                  style={{ color: "#ffffff" }}
                  className="mt-3 block text-[16px] transition-opacity hover:opacity-80"
                >
                  {phone}
                </a>
              </div>

              <div>
                <div className="flex items-center justify-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/70"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Email
                  </h3>
                </div>
                <a
                  href={`mailto:${email}`}
                  style={{ color: "#ffffff" }}
                  className="mt-3 block break-all text-[16px] transition-opacity hover:opacity-80"
                >
                  {email}
                </a>
              </div>

              <div>
                <div className="flex items-center justify-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/70"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Location
                  </h3>
                </div>
                <p className="mt-3 text-[16px] leading-7 text-white">
                  {location}
                </p>
              </div>
            </div>

            {/* Form — right */}
            <ContactForm />
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <Footer spacing="compactTop" />
      </div>
    </main>
  );
}
