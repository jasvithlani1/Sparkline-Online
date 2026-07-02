import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/footer";
import { NavbarServer as Navbar } from "@/components/landing/navbar-server";
import JsonLd from "@/components/json-ld";
import { getPortfolioProjects, getSiteSettings } from "@/sanity/lib/content";
import { buildMetadata, buildBreadcrumbLD } from "@/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [projects, settings] = await Promise.all([getPortfolioProjects(), getSiteSettings()]);
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Portfolio" };
  return buildMetadata({
    title: project.seo?.title ?? project.name,
    description: project.seo?.description ?? project.description,
    ogImageUrl: project.seo?.ogImageUrl,
    noIndex: project.seo?.noIndex,
    canonicalUrl: project.seo?.canonicalUrl,
    siteSettings: settings,
    path: `/portfolio/${slug}`,
  });
}

function toCanvaEmbedUrl(url: string): string {
  const base = url.split("?")[0];
  return `${base}?embed`;
}

export default async function PortfolioProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [projects, settings] = await Promise.all([getPortfolioProjects(), getSiteSettings()]);
  const index = projects.findIndex((entry) => entry.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const siteUrl = settings?.siteUrl ?? "https://www.sparklinemarketingfirm.com";
  const breadcrumbLD = buildBreadcrumbLD(
    [{ name: "Portfolio", url: "/portfolio" }, { name: project.name }],
    siteUrl,
  );

  return (
    <main className="min-h-screen bg-[#050C1E]">
      <JsonLd data={breadcrumbLD} />
      <Navbar />

      {/* Canva embed */}
      <div className="mt-[56px] sm:mt-[64px] md:mt-[80px]">
        {project.canvaUrl ? (
          <iframe
            src={toCanvaEmbedUrl(project.canvaUrl)}
            title={project.name}
            allow="fullscreen"
            allowFullScreen
            loading="lazy"
            className="w-full border-0"
            style={{ height: "78svh" }}
          />
        ) : (
          <div className="flex flex-1 items-center justify-center px-5 py-24 text-center">
            <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-white/40">
              Presentation coming soon
            </p>
          </div>
        )}
      </div>

      {/* Prev / Next navigation */}
      <section className="border-t border-white/10 px-5 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-[1208px]">
          <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.24em] text-white/40 sm:text-left">
            More Work
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Previous */}
            <Link
              href={`/portfolio/${prev.slug}`}
              className="group relative overflow-hidden rounded-2xl outline outline-1 -outline-offset-1 outline-white/10 transition-all duration-300 hover:outline-white/25"
            >
              <div className="relative aspect-[16/9] w-full bg-[#0A1F57]">
                <Image
                  src={prev.image}
                  alt={prev.name}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className={`${prev.imageClassName} transition-transform duration-500 group-hover:scale-[1.04]`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050C1E]/90 via-[#050C1E]/30 to-transparent" />
                <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5 sm:p-6">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50 transition-colors duration-200 group-hover:text-[#B08CFF] sm:text-[11px]">
                  <svg className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                  </svg>
                  Previous
                </span>
                <p className="text-[18px] font-semibold leading-snug tracking-[-0.02em] text-white sm:text-[20px]">
                  {prev.name}
                </p>
              </div>
            </Link>

            {/* Next */}
            <Link
              href={`/portfolio/${next.slug}`}
              className="group relative overflow-hidden rounded-2xl outline outline-1 -outline-offset-1 outline-white/10 transition-all duration-300 hover:outline-white/25"
            >
              <div className="relative aspect-[16/9] w-full bg-[#0A1F57]">
                <Image
                  src={next.image}
                  alt={next.name}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className={`${next.imageClassName} transition-transform duration-500 group-hover:scale-[1.04]`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050C1E]/90 via-[#050C1E]/30 to-transparent" />
                <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5 sm:p-6">
                <span className="inline-flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50 transition-colors duration-200 group-hover:text-[#B08CFF] sm:text-[11px]">
                  Next
                  <svg className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                <p className="text-right text-[18px] font-semibold leading-snug tracking-[-0.02em] text-white sm:text-[20px]">
                  {next.name}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
