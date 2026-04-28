import Link from "next/link";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { featuredIntro, ourServices } from "@/lib/content";

const BRAND = "SPARKLINE MARKETING FIRM";

export const metadata = {
  title: "About — Sparkline Marketing Firm",
  description:
    "SPARKLINE MARKETING FIRM helps ambitious businesses build stronger brands, reach the right audience, and turn digital presence into measurable growth.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050C1E]">
      <Navbar />

      {/* Text-only hero */}
      <section className="pt-32 sm:pt-36 md:pt-44" />

      {/* Body — reuse featuredIntro with bold emphasis */}
      <section className="px-5 pb-10 sm:px-6 sm:pb-12 md:px-8 md:pb-14">
        <div className="mx-auto max-w-[1208px]">
          <div className="flex flex-col gap-6 text-white sm:gap-8">
            {featuredIntro.body.map((paragraph, index) => (
              <p
                key={index}
                className="text-pretty text-[17px] leading-[1.75] text-white/82 sm:text-[18px] md:text-[19px] md:leading-[1.8]"
              >
                {index === 0 && paragraph.startsWith(BRAND) ? (
                  <>
                    <strong className="font-semibold text-white">{BRAND}</strong>
                    {paragraph.slice(BRAND.length)}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* What we do — services overview */}
      <section className="px-5 pb-10 sm:px-6 sm:pb-12 md:px-8 md:pb-14">
        <div className="mx-auto max-w-[1208px]">
          <div className="flex flex-col gap-3 border-t border-white/10 pt-10 md:pt-14">
            <h2 className="text-balance text-[28px] leading-[1.05] tracking-[-0.02em] text-white sm:text-[34px] md:text-[42px]">
              What we do
            </h2>
            <span
              aria-hidden="true"
              className="h-[2px] w-12 rounded-full bg-[linear-gradient(90deg,#8F57FF_0%,#4C2FFF_100%)]"
            />
          </div>
          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
            {ourServices.cards.map((card) => (
              <Link
                key={card.id}
                href={`/services/${card.id}`}
                className="group flex flex-col gap-3 border-b border-white/10 pb-6 transition-colors hover:border-white/30"
              >
                <h3
                  className="whitespace-pre-line text-balance text-[22px] leading-[1.05] tracking-[-0.01em] text-white sm:text-[24px]"
                  style={{ fontFamily: "var(--font-cal-sans), Arial, sans-serif" }}
                >
                  {card.title.replace(/\n/g, " ")}
                </h3>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 transition-colors group-hover:text-white">
                  Explore
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-12 sm:px-6 sm:pb-14 md:px-8 md:pb-16">
        <div className="mx-auto max-w-[1208px]">
          <div className="rounded-2xl outline outline-1 -outline-offset-1 outline-white/10 bg-[linear-gradient(180deg,#0A1740_0%,#050C1E_100%)] px-6 py-12 text-center sm:px-10 sm:py-16 md:px-16 md:py-20">
            <h2 className="hero-copy text-balance text-[32px] leading-[1.05] tracking-[-0.03em] text-white sm:text-[44px] md:text-[56px]">
              Let&apos;s build something that grows.
            </h2>
            <p className="mx-auto mt-5 max-w-[58ch] text-pretty text-[16px] leading-7 text-white/70 sm:text-[17px] md:text-[18px]">
              Tell us what you&apos;re working on — we&apos;ll bring the strategy, design, and execution to match.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center whitespace-nowrap text-white transition-transform hover:-translate-y-0.5 active:scale-[0.96]"
                style={{
                  paddingInline: "20px",
                  paddingBlock: "12px",
                  borderRadius: "8px",
                  backgroundImage:
                    "linear-gradient(180deg, #8F57FF 0%, #4C2FFF 100%)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "#FFFFFF29",
                  boxShadow:
                    "#FFFFFF14 0px 0.5px 0.5px inset, #5F38D933 0px 1px 1px, #5F38D933 0px 1px 1px, #4C2FFF66 0px 2px 5px -2px, #4C2FFF 0px 0px 0px 1px",
                  fontSize: "15px",
                  lineHeight: "18px",
                  fontWeight: 600,
                  fontFamily: '"Geist-SemiBold", "Geist", system-ui, sans-serif',
                }}
              >
                Contact the crew
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
