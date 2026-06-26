import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { Footer } from "@/components/landing/footer";
import { NavbarServer as Navbar } from "@/components/landing/navbar-server";
import Breadcrumb from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import { getBlogPostBySlug, getBlogPosts, getSiteSettings } from "@/sanity/lib/content";
import { buildMetadata, buildArticleLD, buildBreadcrumbLD } from "@/lib/seo";
import { ShareButtons } from "./share-buttons";
import { BlogFaq } from "./blog-faq";

export const revalidate = 60;

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-10 text-pretty text-[17px] leading-[1.75] text-white/78 first:mt-0 sm:text-[18px] md:text-[19px] md:leading-[1.8]">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 text-balance text-[28px] leading-[1.1] tracking-[-0.02em] text-white sm:text-[34px] md:text-[42px]">
        {children}
      </h2>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-10 border-l-2 border-white/20 pl-5 text-[18px] leading-8 text-white/75">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-8 list-disc space-y-3 pl-6 text-white/75">{children}</ul>,
    number: ({ children }) => <ol className="mt-8 list-decimal space-y-3 pl-6 text-white/75">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const openInNewTab = value?.openInNewTab === true;
      return (
        <a
          href={href}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
          className="text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
        >
          {children}
        </a>
      );
    },
  },
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getBlogPostBySlug(slug), getSiteSettings()]);
  if (!post) return { title: "Blog" };
  return buildMetadata({
    title: post.title,
    description: post.description,
    siteSettings: settings,
    path: `/blogs/${slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, settings, allPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getSiteSettings(),
    getBlogPosts(),
  ]);
  if (!post) notFound();

  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const siteUrl = settings?.siteUrl ?? "https://www.sparklinemarketingfirm.com";
  const siteName = settings?.siteTitle ?? "Sparkline Marketing Firm";
  const pageUrl = `${siteUrl}/blogs/${slug}`;

  const jsonLdBlocks = [
    buildBreadcrumbLD([{ name: "Blog", url: "/blogs" }, { name: post.title }], siteUrl),
    buildArticleLD({
      title: post.title,
      description: post.description,
      url: pageUrl,
      imageUrl: post.image || undefined,
      publishedAt: post.date || undefined,
      siteUrl,
      siteName,
    }),
  ];

  return (
    <main className="min-h-screen bg-[#050C1E]">
      <JsonLd data={jsonLdBlocks} />
      <Navbar />

      <article className="pt-24 pb-20 md:pt-28 md:pb-24">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-6 md:px-8">
          <Breadcrumb items={[{ name: "Blog", url: "/blogs" }, { name: post.title }]} variant="dark" />

          {/* Two-column layout: main content + sidebar */}
          <div className="mt-8 lg:grid lg:grid-cols-[1fr_300px] lg:gap-10 xl:grid-cols-[1fr_320px] xl:gap-14">

            {/* ── Main content ─────────────────────────────── */}
            <div>
              <div className="flex flex-wrap items-center justify-center gap-3 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-white/50 sm:text-[12px]">
                <span>{post.date}</span>
                <span className="text-white/25">|</span>
                <span>{post.category}</span>
              </div>

              <h1 className="mt-4 text-center text-balance text-[36px] leading-[1.05] tracking-[-0.03em] text-white sm:text-[48px] md:text-[60px]">
                {post.title}
              </h1>

              <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#0A1F57] outline outline-1 -outline-offset-1 outline-white/10 md:mt-12">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  sizes="(min-width: 1280px) 960px, (min-width: 1024px) calc(100vw - 380px), 100vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="mt-10 md:mt-12">
                {post.bodyBlocks?.length ? (
                  <PortableText value={post.bodyBlocks} components={portableTextComponents} />
                ) : (
                  <p className="text-pretty text-[17px] leading-[1.75] text-white/78 sm:text-[18px] md:text-[19px] md:leading-[1.8]">
                    {post.body}
                  </p>
                )}
              </div>

              {post.videoId ? (
                <div className="relative mt-12 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black md:mt-16">
                  <iframe
                    src={`https://www.youtube.com/embed/${post.videoId}`}
                    title={post.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              ) : null}

              {post.faqs?.length > 0 && <BlogFaq items={post.faqs} />}
            </div>

            {/* ── Sidebar ──────────────────────────────────── */}
            <aside className="mt-10 lg:mt-0 lg:self-start lg:sticky lg:top-28">
              <div className="flex flex-col gap-5">

                {/* Take the Next Step */}
                <div className="rounded-2xl bg-[#0A1628] p-6 outline outline-1 -outline-offset-1 outline-white/10">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#B08CFF]">
                    Take the Next Step
                  </p>
                  <h2 className="mt-2 text-[22px] font-semibold leading-snug tracking-[-0.02em] text-white">
                    Ready to grow your brand?
                  </h2>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/60">
                    Let&apos;s build a strategy that fits your business. Book a free discovery call with the Sparkline team.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#B08CFF] px-4 py-3 text-[12px] font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                  >
                    Get in Touch
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                  <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
                    <a
                      href="tel:+14708412335"
                      className="flex items-center gap-3 text-[13px] text-white/50 transition-colors hover:text-white"
                    >
                      <svg
                        className="h-4 w-4 shrink-0 text-[#B08CFF]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 7.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      (470) 841-2335
                    </a>
                    <a
                      href="mailto:info@sparklinemarketingfirm.com"
                      className="flex items-center gap-3 text-[13px] text-white/50 transition-colors hover:text-white"
                    >
                      <svg
                        className="h-4 w-4 shrink-0 text-[#B08CFF]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      info@sparklinemarketingfirm.com
                    </a>
                  </div>
                </div>

                {/* Share This Article */}
                <ShareButtons title={post.title} />

                {/* Related Intelligence */}
                {relatedPosts.length > 0 && (
                  <div className="rounded-2xl bg-[#0A1628] p-6 outline outline-1 -outline-offset-1 outline-white/10">
                    <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#B08CFF]">
                      Related Intelligence
                    </p>
                    <div className="space-y-5">
                      {relatedPosts.map((rp) => (
                        <Link
                          key={rp.slug}
                          href={`/blogs/${rp.slug}`}
                          className="group block border-b border-white/5 pb-5 last:border-0 last:pb-0"
                        >
                          <p className="text-[15px] font-medium leading-snug text-white transition-colors group-hover:text-[#B08CFF]">
                            {rp.title}
                          </p>
                          <span className="mt-2 flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 transition-colors group-hover:text-[#B08CFF]">
                            Read Article
                            <svg
                              className="h-3 w-3 transition-transform group-hover:translate-x-1"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </aside>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
