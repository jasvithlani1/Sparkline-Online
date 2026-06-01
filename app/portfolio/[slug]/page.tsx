import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { getPortfolioProjectBySlug, getPortfolioProjects } from "@/sanity/lib/content";

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getPortfolioProjectBySlug(slug);
  if (!project) return { title: "Portfolio — Sparkline Marketing Firm" };
  return {
    title: `${project.name} — Sparkline Marketing Firm`,
    description: project.description,
  };
}

export default async function PortfolioProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getPortfolioProjects();
  const index = projects.findIndex((entry) => entry.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="min-h-screen bg-[#050C1E]">
      <Navbar />

      {/* Hero image — natural aspect on mobile (no crop), top-anchored cinematic crop on lg+ */}
      <section className="relative mt-[56px] aspect-[16/10] w-full overflow-hidden bg-[#050C1E] sm:mt-[64px] sm:aspect-[16/9] md:mt-[80px] lg:aspect-[16/9] lg:max-h-[calc(100svh-80px)]">
        <Image
          src={project.image}
          alt={project.name}
          fill
          priority
          sizes="100vw"
          className={`${project.imageClassName} max-lg:!object-contain lg:!object-top`}
        />

        {/* Bottom gradient for clean blend into next section */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#050C1E]" />
      </section>

      {/* Tagline, summary, services */}
      <section className="px-5 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-[1208px]">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Portfolio
          </Link>

          <div className="mt-10 grid grid-cols-1 gap-12 md:mt-12 md:grid-cols-[2fr_1fr] md:gap-16">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
                <h2 className="text-balance text-[28px] leading-[1.05] tracking-[-0.02em] text-white sm:text-[34px] md:text-[42px]">
                  {project.tagline}
                </h2>
                <span
                  aria-hidden="true"
                  className="h-[2px] w-16 rounded-full bg-[linear-gradient(90deg,#8F57FF_0%,#4C2FFF_100%)]"
                />
              </div>
              <p className="max-w-[62ch] whitespace-pre-line text-pretty text-[16px] leading-[1.7] text-white/75 sm:text-[17px] md:text-[18px]">
                {project.summary}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
                <h3 className="text-balance text-[28px] leading-[1.05] tracking-[-0.02em] text-white sm:text-[34px] md:text-[42px]">
                  Services
                </h3>
                <span
                  aria-hidden="true"
                  className="h-[2px] w-12 rounded-full bg-[linear-gradient(90deg,#8F57FF_0%,#4C2FFF_100%)]"
                />
              </div>
              <ul className="flex flex-col gap-2.5 text-[16px] font-medium leading-[1.5] text-white md:text-[17px]">
                {project.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Content sections */}
      {project.sections.map((section, idx) => (
        <section
          key={`${section.heading}-${idx}`}
          className="px-5 pb-10 sm:px-6 sm:pb-12 md:px-8 md:pb-14"
        >
          <div className="mx-auto max-w-[1310px]">
            <div className="flex flex-col items-center gap-3 border-t border-white/10 pt-10 text-center sm:items-start sm:text-left md:pt-12">
              <h2 className="text-balance text-[26px] leading-[1.05] tracking-[-0.02em] text-white sm:text-[32px] md:text-[40px]">
                {section.heading}
              </h2>
              <span
                aria-hidden="true"
                className="h-[2px] w-12 rounded-full bg-[linear-gradient(90deg,#8F57FF_0%,#4C2FFF_100%)]"
              />
            </div>

            {section.type === "image" ? (
              <div className="mt-8 overflow-hidden rounded-2xl bg-[#0A1F57] md:mt-10">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={section.images[0].src}
                    alt={section.images[0].alt}
                    fill
                    sizes="(min-width: 1280px) 1280px, 100vw"
                    className={section.images[0].className}
                  />
                </div>
              </div>
            ) : (
              <div
                className={`mt-8 grid grid-cols-1 gap-5 md:mt-10 md:gap-6 ${
                  section.images.length === 4 ? "sm:grid-cols-2" : "sm:grid-cols-3"
                }`}
              >
                {section.images.map((img, i) => (
                  <div
                    key={`${img.src}-${i}`}
                    className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#0A1F57]"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes={
                        section.images.length === 4
                          ? "(min-width: 640px) 50vw, 100vw"
                          : "(min-width: 640px) 33vw, 100vw"
                      }
                      className={img.className}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Up next */}
      <section className="px-5 pb-10 sm:px-6 sm:pb-12 md:px-8 md:pb-14">
        <div className="mx-auto max-w-[1310px]">
          <Link
            href={`/portfolio/${next.slug}`}
            className="group relative block overflow-hidden rounded-2xl outline outline-1 -outline-offset-1 outline-white/10"
          >
            <div className="relative aspect-[21/9] w-full bg-[#0A1F57]">
              <Image
                src={next.image}
                alt={next.name}
                fill
                sizes="(min-width: 1280px) 1280px, 100vw"
                className={`${next.imageClassName} transition-transform duration-500 group-hover:scale-[1.03]`}
              />
              <div className="absolute inset-0 bg-black/55 transition-colors duration-500 group-hover:bg-black/45" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center sm:items-start sm:px-10 sm:text-left md:px-14">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/70 sm:text-[12px]">
                  Up Next
                </p>
                <h3 className="hero-copy text-balance text-[36px] leading-[1.02] tracking-[-0.03em] sm:text-[56px] md:text-[72px]">
                  {next.name}
                </h3>
                <span className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-white/80">
                  View Project
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 pb-12 sm:px-6 sm:pb-14 md:px-8 md:pb-16">
        <div className="mx-auto max-w-[1208px]">
          <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,#0A1740_0%,#050C1E_100%)] px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20">
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-white/55 sm:text-left sm:text-[12px]">
              Have a project in mind?
            </p>
            <h2 className="hero-copy mt-4 text-center text-balance text-[32px] leading-[1.05] tracking-[-0.03em] text-white sm:text-left sm:text-[44px] md:text-[56px]">
              Let&apos;s build your next standout story.
            </h2>
            <p className="mx-auto mt-5 max-w-[58ch] text-left text-pretty text-[16px] leading-7 text-white/70 sm:mx-0 sm:text-[17px] md:text-[18px]">
              Bring your goals, brand, and ambition. We&apos;ll bring the strategy, design, and execution to make it happen.
            </p>
            <div className="mt-8 flex justify-center sm:justify-start">
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
                Contact Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
