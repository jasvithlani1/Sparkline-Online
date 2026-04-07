import { footerContent } from "@/lib/content";

function SocialIcon({ label }: { label: "Instagram" | "Pinterest" }) {
  if (label === "Instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-white">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.7A4.05 4.05 0 0 0 3.7 7.75v8.5A4.05 4.05 0 0 0 7.75 20.3h8.5a4.05 4.05 0 0 0 4.05-4.05v-8.5a4.05 4.05 0 0 0-4.05-4.05h-8.5Zm8.95 2.05a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.7A3.3 3.3 0 1 0 12 15.3 3.3 3.3 0 0 0 12 8.7Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-white">
      <path d="M12.04 2C6.9 2 4 5.68 4 9.68c0 2.44 1.37 5.5 3.57 6.47.33.15.5.08.58-.22l.38-1.48c.06-.25.04-.34-.14-.55-.4-.49-.72-1.39-.72-2.23 0-2.16 1.64-4.25 4.42-4.25 2.4 0 4.09 1.64 4.09 3.98 0 2.65-1.34 4.48-3.08 4.48-.96 0-1.68-.79-1.44-1.77.28-1.16.81-2.41.81-3.25 0-.75-.4-1.37-1.24-1.37-.98 0-1.77 1.01-1.77 2.37 0 .86.29 1.45.29 1.45s-.97 4.08-1.14 4.84c-.2.84-.12 2.03-.03 2.8C9.37 21.67 10.68 22 12.04 22 17.08 22 20 18.32 20 14.32 20 7.9 15.37 2 12.04 2Z" />
    </svg>
  );
}

const columnHeadingClass =
  'text-[1.45rem] font-semibold uppercase leading-none tracking-[-0.02em] text-white sm:text-[1.55rem]';

const textLinkClass =
  "text-lg font-light leading-8 text-white/88 transition-colors hover:text-white sm:text-[1.15rem]";

export function Footer() {
  return (
    <footer id="contact-us" className="bg-[#05081d] text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#01031A]" />
        <div
          data-testid="footer-top-image"
          className="absolute inset-0 bg-top bg-cover bg-no-repeat opacity-30"
          style={{
            backgroundImage:
              "url(https://app.paper.design/file-assets/01KNBNYP6N270CJVTY2FR1GV5J/01KNM3TZFN7NEMTXCM43KXZS5B.png)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(58,92,198,0.16),transparent_34%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />

        <div
          data-testid="footer-top-grid"
          className="relative mx-auto grid max-w-[1470px] gap-12 px-5 py-14 sm:px-6 sm:py-16 md:grid-cols-2 md:gap-x-10 md:gap-y-14 md:px-8 lg:px-10 xl:grid-cols-[320px_minmax(260px,1fr)_425px] xl:gap-x-16 xl:py-20"
        >
          <div className="space-y-6">
            <h2 className={columnHeadingClass}>{footerContent.companyHeading}</h2>
            <nav className="flex flex-col items-start gap-1.5" aria-label="Company footer links">
              {footerContent.company.map((item) => (
                <a key={item.label} href={item.href} className={textLinkClass}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h2 className={columnHeadingClass}>{footerContent.getInTouchHeading}</h2>
            <nav className="flex flex-col items-start gap-1.5" aria-label="Get in touch footer links">
              {footerContent.getInTouch.map((item) => (
                <a key={item.label} href={item.href} className={textLinkClass}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-6 md:col-span-2 xl:col-span-1">
            <h2 className={columnHeadingClass}>{footerContent.backgroundHeading}</h2>
            <div className="max-w-[425px] space-y-5 text-[1.05rem] font-light leading-8 text-white/88 sm:text-[1.125rem]">
              <p>{footerContent.background.body}</p>
              <p>{footerContent.background.socialsLabel}</p>
            </div>
            <div className="flex items-center gap-3">
              {footerContent.socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#2441DF] transition-transform hover:-translate-y-0.5"
                >
                  <SocialIcon label={item.label} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#01031A]">
        <div
          data-testid="footer-legal-row"
          className="mx-auto flex max-w-[1470px] flex-col gap-4 px-5 py-6 text-[0.95rem] leading-6 text-white sm:px-6 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10"
        >
          <p>{footerContent.legal.copyright}</p>
          <nav
            className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:justify-end"
            aria-label="Footer legal links"
          >
            {footerContent.legal.links.map((item) => (
              <a key={item.label} href={item.href} className="text-white/88 transition-colors hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
