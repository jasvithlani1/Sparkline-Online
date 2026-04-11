import Image from "next/image";

const logoImageUrl =
  "https://app.paper.design/file-assets/01KNBNYP6N270CJVTY2FR1GV5J/01KNXFQ01SPKABAC6T65W71EJ2.png";
const footerGraphicUrl =
  "https://app.paper.design/file-assets/01KNBNYP6N270CJVTY2FR1GV5J/01KNXFZD87Z01RFEZ99922PQC3.png";

const footerColumns = [
  {
    heading: "FEATURES",
    links: ["Create", "Produce", "Extend"],
  },
  {
    heading: "GLYPHS",
    links: ["Learn", "Tools", "Buy", "EULA"],
  },
  {
    heading: "COMMUNITY",
    links: ["Forum", "Events", "News", "Resources"],
  },
  {
    heading: "ABOUT",
    links: ["Contact", "Press", "Privacy", "VPAT"],
  },
  {
    heading: "SOCIALS",
    links: ["Instagram", "Facebook", "LinkedIn", "X / Twitter"],
  },
] as const;

export function Footer() {
  return (
    <footer
      id="contact-us"
      className='relative overflow-hidden bg-[oklch(15.6%_0.042_266.4)] text-white [font-family:"Arial",system-ui,sans-serif]'
    >
      <div className="mx-auto flex max-w-[1440px] flex-col px-[30px] pt-16 pb-28 sm:pt-20 md:pt-24 md:pb-40 lg:pt-[120px] lg:pb-[320px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-[164px]">
          <div className="w-full max-w-[190px] shrink-0 lg:-mt-8">
            <Image
              src={logoImageUrl}
              alt="Sparkline Marketing Firm"
              width={156}
              height={156}
              className="h-[156px] w-[156px]"
            />
            <p className="mt-[10px] text-[12px] leading-[14px] text-white">Make Things You Love</p>
          </div>

          <div className="grid w-full grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-4">
            {footerColumns.map((column) => (
              <div key={column.heading} className="min-w-0">
                <h2 className="mb-[17.5px] text-[14px] leading-[18px] text-white">{column.heading}</h2>
                <div className="space-y-[17.5px]">
                  {column.links.map((link) => (
                    <a
                      key={link}
                      href="#contact-us"
                      className="block text-[14px] leading-[18px] text-white transition-opacity hover:opacity-80"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
