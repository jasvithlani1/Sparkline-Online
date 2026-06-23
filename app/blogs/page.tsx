import type { Metadata } from "next";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { BlogList } from "@/components/blogs/blog-list";
import Breadcrumb from "@/components/breadcrumb";
import { getBlogPosts, getSiteSettings } from "@/sanity/lib/content";
import { buildMetadata, buildBreadcrumbLD } from "@/lib/seo";
import JsonLd from "@/components/json-ld";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: "Blog",
    description: "Marketing insights, strategy tips, and creative inspiration from Sparkline Marketing Firm.",
    siteSettings: settings,
    path: "/blogs",
  });
}

export default async function BlogsPage() {
  const [posts, settings] = await Promise.all([getBlogPosts(), getSiteSettings()]);
  const siteUrl = settings?.siteUrl ?? "https://www.sparklinemarketingfirm.com";
  const breadcrumbLD = buildBreadcrumbLD([{ name: "Blog" }], siteUrl);

  return (
    <main className="min-h-screen bg-[#050C1E]">
      <JsonLd data={breadcrumbLD} />
      <Navbar />

      {/* Full-viewport video hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src="/videos/blog-hero.webm" type="video/webm" />
          <source src="/videos/blog-hero.mp4" type="video/mp4" />
        </video>

        {/* Dark tint for text legibility */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Gradient overlay — matches work/portfolio hero for seamless blend into bg-[#050C1E] */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050C1E]/60 via-transparent to-[#050C1E]" />

        {/* Breadcrumb */}
        <div className="absolute bottom-8 left-0 right-0 z-10 px-5 sm:px-6 md:px-8">
          <div className="mx-auto max-w-[1208px]">
            <Breadcrumb items={[{ name: "Blog" }]} variant="dark" />
          </div>
        </div>
      </section>

      {/* Blog posts */}
      <section
        data-testid="blog-posts-section"
        className="pt-10 pb-0 sm:pt-12 sm:pb-0 md:pt-14 md:pb-2"
      >
        <BlogList posts={posts} />
      </section>

      <Footer spacing="compactTop" />
    </main>
  );
}
