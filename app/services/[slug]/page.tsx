import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Faq } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { ourServices, serviceDetails } from "@/lib/content";

const BRAND = "SPARKLINE MARKETING FIRM";

function withBrandBold(text: string) {
  const parts = text.split(BRAND);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 ? (
        <strong className="font-semibold text-white">{BRAND}</strong>
      ) : null}
    </Fragment>
  ));
}

type ServiceCard = (typeof ourServices.cards)[number];

const detailEntries = ourServices.cards
  .map((card) => {
    const detail = serviceDetails[card.id as keyof typeof serviceDetails];
    if (!detail) return null;
    return { card, detail };
  })
  .filter((entry): entry is { card: ServiceCard; detail: (typeof serviceDetails)[keyof typeof serviceDetails] } => entry !== null);

export function generateStaticParams() {
  return detailEntries.map(({ card }) => ({ slug: card.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = detailEntries.find(({ card }) => card.id === slug);
  if (!entry) return { title: "Services — Sparkline Marketing Firm" };
  const plainTitle = entry.card.title.replace(/\n/g, " ");
  return {
    title: `${plainTitle} — Sparkline Marketing Firm`,
    description: entry.detail.lead,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = detailEntries.find(({ card }) => card.id === slug);
  if (!entry) notFound();

  const { card, detail } = entry;

  return (
    <main className="min-h-screen bg-[#050C1E]">
      <Navbar />

      {/* Text-only hero + intro */}
      <section className="px-5 pt-32 pb-16 sm:px-6 sm:pt-36 sm:pb-20 md:px-8 md:pt-44 md:pb-24">
        <div className="mx-auto max-w-[1208px]">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Services
          </Link>

          <div className="mt-10 flex flex-col gap-6 md:mt-14 md:gap-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60 sm:text-[12px]">
              {detail.eyebrow}
            </p>
            <h1 className="hero-copy max-w-[22ch] text-balance text-[36px] leading-[1.05] tracking-[-0.04em] text-white sm:text-[52px] md:text-[68px] lg:text-[80px]">
              {detail.title}
            </h1>
            <span
              aria-hidden="true"
              className="h-[2px] w-20 rounded-full bg-[linear-gradient(90deg,#8F57FF_0%,#4C2FFF_100%)]"
            />
            <p className="max-w-[72ch] text-pretty text-[17px] leading-[1.7] text-white/80 sm:text-[18px] md:text-[20px] md:leading-[1.7]">
              {withBrandBold(detail.lead)}
            </p>
            <p className="max-w-[72ch] text-pretty text-[16px] leading-[1.7] text-white/65 sm:text-[17px] md:text-[18px]">
              {withBrandBold(detail.intro)}
            </p>
          </div>
        </div>
      </section>

      {/* Why Sparkline */}
      <section className="px-5 pb-16 sm:px-6 sm:pb-20 md:px-8 md:pb-24">
        <div className="mx-auto max-w-[1208px]">
          <div className="grid grid-cols-1 gap-10 border-t border-white/10 pt-10 md:grid-cols-[1fr_1.6fr] md:gap-16 md:pt-14">
            <div className="flex flex-col gap-3">
              <h2 className="text-balance text-[28px] leading-[1.05] tracking-[-0.02em] text-white sm:text-[34px] md:text-[42px]">
                {detail.whyUs.heading}
              </h2>
              <span
                aria-hidden="true"
                className="h-[2px] w-12 rounded-full bg-[linear-gradient(90deg,#8F57FF_0%,#4C2FFF_100%)]"
              />
            </div>
            <p className="max-w-[62ch] text-pretty text-[16px] leading-[1.7] text-white/75 sm:text-[17px] md:text-[18px]">
              {withBrandBold(detail.whyUs.body)}
            </p>
          </div>
        </div>
      </section>

      {/* Image placeholder — banner after Why Sparkline */}
      <section className="px-5 pb-16 sm:px-6 sm:pb-20 md:px-8 md:pb-24">
        <div className="mx-auto max-w-[1310px]">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#0A1740_0%,#050C1E_100%)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(143,87,255,0.22),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(76,47,255,0.22),transparent_55%)]" />
            <div className="relative z-10 flex h-full items-center justify-center">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/45 sm:text-[12px]">
                Image
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Problems we solve */}
      <section className="px-5 pb-16 sm:px-6 sm:pb-20 md:px-8 md:pb-24">
        <div className="mx-auto max-w-[1208px]">
          <div className="flex flex-col gap-3 border-t border-white/10 pt-10 md:pt-14">
            <h2 className="text-balance text-[28px] leading-[1.05] tracking-[-0.02em] text-white sm:text-[34px] md:text-[42px]">
              {detail.problems.heading}
            </h2>
            <span
              aria-hidden="true"
              className="h-[2px] w-12 rounded-full bg-[linear-gradient(90deg,#8F57FF_0%,#4C2FFF_100%)]"
            />
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-3 text-[16px] leading-[1.55] text-white/75 sm:grid-cols-2 md:mt-10 md:text-[17px]">
            {detail.problems.items.map((problem) => (
              <li
                key={problem}
                className="flex gap-3 border-b border-white/5 py-3"
              >
                <span
                  aria-hidden="true"
                  className="mt-[9px] h-[6px] w-[6px] flex-none rounded-full bg-[linear-gradient(180deg,#8F57FF_0%,#4C2FFF_100%)]"
                />
                <span>{problem}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cornerstones + Expertise */}
      <section className="px-5 pb-16 sm:px-6 sm:pb-20 md:px-8 md:pb-24">
        <div className="mx-auto max-w-[1208px]">
          <div className="grid grid-cols-1 gap-12 border-t border-white/10 pt-10 md:grid-cols-2 md:gap-16 md:pt-14">
            <div>
              <div className="flex flex-col gap-3">
                <h2 className="text-balance text-[26px] leading-[1.05] tracking-[-0.02em] text-white sm:text-[32px] md:text-[38px]">
                  {detail.cornerstones.heading}
                </h2>
                <span
                  aria-hidden="true"
                  className="h-[2px] w-10 rounded-full bg-[linear-gradient(90deg,#8F57FF_0%,#4C2FFF_100%)]"
                />
              </div>
              <ol className="mt-8 flex flex-col text-[16px] leading-[1.5] text-white/80 md:text-[17px]">
                {detail.cornerstones.items.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-5 border-b border-white/10 py-3 last:border-b-0"
                  >
                    <span className="font-mono text-[12px] tracking-[0.18em] text-white/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <div className="flex flex-col gap-3">
                <h2 className="text-balance text-[26px] leading-[1.05] tracking-[-0.02em] text-white sm:text-[32px] md:text-[38px]">
                  Our Specialties
                </h2>
                <span
                  aria-hidden="true"
                  className="h-[2px] w-10 rounded-full bg-[linear-gradient(90deg,#8F57FF_0%,#4C2FFF_100%)]"
                />
              </div>
              <ul className="mt-8 flex flex-wrap gap-2">
                {((detail as { specialties?: readonly string[] }).specialties ?? card.items).map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[14px] leading-[1.2] text-white/80 md:text-[15px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Image placeholder — banner after Cornerstones */}
      <section className="px-5 pb-16 sm:px-6 sm:pb-20 md:px-8 md:pb-24">
        <div className="mx-auto max-w-[1310px]">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#0A1740_0%,#050C1E_100%)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(143,87,255,0.22),transparent_55%),radial-gradient(circle_at_20%_80%,rgba(76,47,255,0.22),transparent_55%)]" />
            <div className="relative z-10 flex h-full items-center justify-center">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/45 sm:text-[12px]">
                Image
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-5 pb-16 sm:px-6 sm:pb-20 md:px-8 md:pb-24">
        <div className="mx-auto max-w-[1208px]">
          <div className="grid grid-cols-1 gap-10 border-t border-white/10 pt-10 md:grid-cols-[1fr_1.6fr] md:gap-16 md:pt-14">
            <div className="flex flex-col gap-3">
              <h2 className="text-balance text-[28px] leading-[1.05] tracking-[-0.02em] text-white sm:text-[34px] md:text-[42px]">
                {detail.process.heading}
              </h2>
              <span
                aria-hidden="true"
                className="h-[2px] w-12 rounded-full bg-[linear-gradient(90deg,#8F57FF_0%,#4C2FFF_100%)]"
              />
            </div>
            <p className="max-w-[62ch] text-pretty text-[16px] leading-[1.7] text-white/75 sm:text-[17px] md:text-[18px]">
              {withBrandBold(detail.process.body)}
            </p>
          </div>
        </div>
      </section>

      {(detail as { faq?: readonly { id: string; question: string; answer: string }[] }).faq ? (
        <Faq
          items={(detail as { faq: readonly { id: string; question: string; answer: string }[] }).faq}
        />
      ) : null}

      {/* CTA */}
      <section className="px-5 pb-20 sm:px-6 sm:pb-24 md:px-8 md:pb-28">
        <div className="mx-auto max-w-[1208px]">
          <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,#0A1740_0%,#050C1E_100%)] px-6 py-12 text-center sm:px-10 sm:py-16 md:px-16 md:py-20">
            <h2 className="hero-copy text-balance text-[32px] leading-[1.05] tracking-[-0.03em] text-white sm:text-[44px] md:text-[56px]">
              {detail.cta.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-[58ch] text-pretty text-[16px] leading-7 text-white/70 sm:text-[17px] md:text-[18px]">
              {detail.cta.body}
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
                {(detail.cta as { label?: string }).label ?? "Contact the crew"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
