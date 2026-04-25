import Image from "next/image";

const logoImageUrl =
  "/logos/sparkline-new-logo.svg";
const footerGraphicUrl =
  "https://app.paper.design/file-assets/01KNBNYP6N270CJVTY2FR1GV5J/01KNXFZD87Z01RFEZ99922PQC3.png";

const footerColumns = [
  {
    heading: "OUR SERVICES",
    links: [
      { label: "Digital Marketing", href: "/services" },
      { label: "Brand Strategy", href: "/services" },
      { label: "Website Design & Development", href: "/services" },
      { label: "Branding & Design", href: "/services" },
      { label: "Social Media", href: "/services" },
      { label: "Content Marketing", href: "/services" },
    ],
  },
  {
    heading: "QUICK LINKS",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Services", href: "/services" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
  {
    heading: "FOLLOW US",
    links: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "X", href: "#" },
    ],
  },
  {
    heading: "CONTACT",
    links: [
      { label: "Phone Number", href: "/contact" },
      { label: "Email Address", href: "/contact" },
      { label: "Business Address", href: "/contact" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer
      id="contact-us"
      className='relative overflow-hidden bg-[oklch(15.6%_0.042_266.4)] text-white [font-family:"Arial",system-ui,sans-serif]'
    >
      <div className="mx-auto flex max-w-[1440px] flex-col px-[30px] pt-16 pb-20 sm:pt-20 sm:pb-24 md:pt-24 md:pb-28 lg:pt-[120px] lg:pb-32">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-[164px]">
          <div className="w-full max-w-[320px] shrink-0">
            <Image
              src={logoImageUrl}
              alt="Sparkline Marketing Firm"
              width={278}
              height={56}
              className="h-auto w-[190px]"
            />
            <p className="mt-4 text-pretty text-[13px] leading-[1.6] text-white/78">
              <strong className="font-semibold text-white">SPARKLINE MARKETING FIRM</strong> delivers strategic marketing, creative branding, and digital solutions that help businesses grow with confidence and clarity.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-2 lg:flex lg:items-start lg:justify-between lg:gap-x-10">
            {footerColumns.map((column) => (
              <div key={column.heading} className="min-w-0">
                <h2 className="mb-[17.5px] text-[14px] leading-[18px] text-white">{column.heading}</h2>
                <div className="space-y-[17.5px]">
                  {column.links.map((link) => (
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
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-16 border-t border-white/10 pt-6 sm:mt-20 md:mt-24 lg:mt-28">
          <p className="text-center text-[12px] leading-[1.6] text-white/60 sm:text-[13px]">
            © 2026 <span className="font-semibold text-white/80">SPARKLINE MARKETING FIRM</span>. All Rights Reserved.
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
        <Image
          src={footerGraphicUrl}
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
