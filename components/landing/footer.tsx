import Image from "next/image";
import { getSiteFooter } from "@/sanity/lib/content";

const FALLBACK_LOGO = "/logos/sparkline-new-logo.svg";
const FALLBACK_GRAPHIC =
  "https://app.paper.design/file-assets/01KNBNYP6N270CJVTY2FR1GV5J/01KNXFZD87Z01RFEZ99922PQC3.png";

function ContactIcon({ kind }: { kind: "phone" | "email" | "address" }) {
  const cls = "h-[14px] w-[14px] shrink-0";
  switch (kind) {
    case "phone":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "email":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "address":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
  }
}

function SocialIcon({ name }: { name: string }) {
  const cls = "h-[18px] w-[18px]";
  switch (name) {
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cls} fill="currentColor">
          <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.91h-2.33V22c4.78-.76 8.43-4.92 8.43-9.94Z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cls} fill="currentColor">
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.22 8h4.56v14H.22V8Zm7.45 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.48 3.04 5.48 6.99V22h-4.56v-6.18c0-1.47-.03-3.36-2.05-3.36-2.05 0-2.36 1.6-2.36 3.25V22H7.67V8Z" />
        </svg>
      );
    case "X":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cls} fill="currentColor">
          <path d="M18.244 2H21.5l-7.46 8.523L23 22h-6.86l-5.37-6.99L4.6 22H1.34l7.98-9.116L1 2h7.04l4.86 6.39L18.244 2Zm-1.2 18h1.9L7.06 4H5.05l11.99 16Z" />
        </svg>
      );
    default:
      return null;
  }
}

type FooterProps = {
  spacing?: "default" | "compactTop";
};

export async function Footer({ spacing = "default" }: FooterProps = {}) {
  const data = await getSiteFooter();

  const logoUrl = data?.logo?.assetUrl ?? data?.logo?.fallbackUrl ?? FALLBACK_LOGO;
  const logoAlt = data?.logo?.alt ?? "Sparkline Marketing Firm";
  const tagline =
    data?.tagline ??
    "SPARKLINE MARKETING FIRM delivers strategic marketing, creative branding, and digital solutions that help businesses grow with confidence and clarity.";
  const copyrightText =
    data?.copyrightText ?? "© 2026 SPARKLINE MARKETING FIRM. All Rights Reserved.";
  const bottomGraphicUrl = data?.bottomGraphicUrl ?? FALLBACK_GRAPHIC;

  const servicesHeading = data?.servicesColumn?.heading ?? "OUR SERVICES";
  const servicesLinks = data?.servicesColumn?.links ?? [
    { label: "Digital Marketing", href: "/services/digital-marketing" },
    { label: "Brand Strategy", href: "/services/brand-strategy" },
    { label: "Website Design & Development", href: "/services/website-design-development" },
    { label: "Branding & Design", href: "/services/branding-design" },
    { label: "Social Media", href: "/services/social-media-management" },
    { label: "Content Marketing", href: "/services/content-marketing" },
  ];

  const quickLinksHeading = data?.quickLinksColumn?.heading ?? "QUICK LINKS";
  const quickLinks = data?.quickLinksColumn?.links ?? [
    { label: "About Us", href: "/about" },
    { label: "Our Services", href: "/services" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  const contactHeading = data?.contactColumn?.heading ?? "CONTACT";
  const phone = data?.contactColumn?.phone ?? "(470) 841-2335";
  const phoneHref = data?.contactColumn?.phoneHref ?? "tel:+14708412335";
  const email = data?.contactColumn?.email ?? "info@sparklinemarketingfirm.com";
  const emailHref = data?.contactColumn?.emailHref ?? "mailto:info@sparklinemarketingfirm.com";
  const address =
    data?.contactColumn?.address ?? "524 Sawnee Village Boulevard, Cumming, Georgia 30040";
  const addressHref = data?.contactColumn?.addressHref ?? "/contact";

  const socialHeading = data?.socialColumn?.heading ?? "FOLLOW US";
  const socialLinks = data?.socialColumn?.links ?? [
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61589700706177" },
    { label: "Instagram", href: "https://www.instagram.com/sparklinemarketingfirm" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/sparkline-marketing-firm/?viewAsMember=true" },
    { label: "X", href: "https://x.com/SparklineMF" },
  ];

  const contentSpacingClass =
    spacing === "compactTop"
      ? "pt-8 pb-20 sm:pt-10 sm:pb-24 md:pt-12 md:pb-28 lg:pt-14 lg:pb-32"
      : "pt-16 pb-20 sm:pt-20 sm:pb-24 md:pt-24 md:pb-28 lg:pt-[120px] lg:pb-32";

  return (
    <footer
      id="contact-us"
      className='relative overflow-hidden bg-[oklch(15.6%_0.042_266.4)] text-white [font-family:"Arial",system-ui,sans-serif]'
    >
      <div
        data-testid="footer-content"
        className={`mx-auto flex max-w-[1440px] flex-col px-[30px] ${contentSpacingClass}`}
      >
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-[164px]">
          {/* Brand column */}
          <div className="w-full max-w-[320px] shrink-0">
            <Image
              src={logoUrl}
              alt={logoAlt}
              width={278}
              height={56}
              className="h-auto w-[190px]"
            />
            <p className="mt-4 text-pretty text-[13px] leading-[1.6] text-white/78">
              {tagline}
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-2 lg:flex lg:items-start lg:justify-between lg:gap-x-10">
            {/* Services column */}
            <div className="min-w-0">
              <h2 className="mb-[17.5px] bg-[linear-gradient(90deg,#B08CFF_0%,#8F57FF_100%)] bg-clip-text text-[14px] font-semibold leading-[18px] tracking-[0.06em] text-transparent">
                {servicesHeading}
              </h2>
              <div className="space-y-[17.5px]">
                {servicesLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-[14px] leading-[18px] text-white transition-opacity hover:opacity-80"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links column */}
            <div className="min-w-0">
              <h2 className="mb-[17.5px] bg-[linear-gradient(90deg,#B08CFF_0%,#8F57FF_100%)] bg-clip-text text-[14px] font-semibold leading-[18px] tracking-[0.06em] text-transparent">
                {quickLinksHeading}
              </h2>
              <div className="space-y-[17.5px]">
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-[14px] leading-[18px] text-white transition-opacity hover:opacity-80"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact column */}
            <div className="min-w-0 col-span-2 md:col-span-1">
              <h2 className="mb-[17.5px] bg-[linear-gradient(90deg,#B08CFF_0%,#8F57FF_100%)] bg-clip-text text-[14px] font-semibold leading-[18px] tracking-[0.06em] text-transparent">
                {contactHeading}
              </h2>
              <div className="space-y-[14px]">
                {phone && (
                  <a
                    href={phoneHref}
                    className="flex items-start gap-2.5 text-[14px] leading-[1.45] text-white transition-opacity hover:opacity-80"
                  >
                    <span aria-hidden="true" className="mt-[3px] inline-flex text-[#B08CFF]">
                      <ContactIcon kind="phone" />
                    </span>
                    <span className="break-words">{phone}</span>
                  </a>
                )}
                {email && (
                  <a
                    href={emailHref}
                    className="flex items-start gap-2.5 text-[14px] leading-[1.45] text-white transition-opacity hover:opacity-80"
                  >
                    <span aria-hidden="true" className="mt-[3px] inline-flex text-[#B08CFF]">
                      <ContactIcon kind="email" />
                    </span>
                    <span className="break-words">{email}</span>
                  </a>
                )}
                {address && (
                  <a
                    href={addressHref}
                    className="flex items-start gap-2.5 text-[14px] leading-[1.45] text-white transition-opacity hover:opacity-80"
                  >
                    <span aria-hidden="true" className="mt-[3px] inline-flex text-[#B08CFF]">
                      <ContactIcon kind="address" />
                    </span>
                    <span className="break-words">{address}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Social column */}
            <div className="min-w-0 col-span-2 md:col-span-1">
              <h2 className="mb-[17.5px] bg-[linear-gradient(90deg,#B08CFF_0%,#8F57FF_100%)] bg-clip-text text-[14px] font-semibold leading-[18px] tracking-[0.06em] text-transparent">
                {socialHeading}
              </h2>
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white transition-[background-color,border-color,transform] duration-200 hover:border-white/30 hover:bg-white/[0.08] active:scale-[0.96]"
                  >
                    <SocialIcon name={link.label} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-8 border-t border-white/10 pt-6 sm:mt-10 md:mt-12 lg:mt-14">
          <p className="text-center text-[12px] leading-[1.6] text-white/60 sm:text-[13px]">
            {copyrightText}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
        <Image
          src={bottomGraphicUrl}
          alt=""
          aria-hidden="true"
          data-testid="footer-bottom-graphic"
          width={1320}
          height={60}
          className="h-auto w-[92vw] max-w-[1320px]"
        />
      </div>
    </footer>
  );
}
