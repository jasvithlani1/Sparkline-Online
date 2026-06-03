import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { BlogList } from "@/components/blogs/blog-list";
import { getBlogPosts } from "@/sanity/lib/content";

export const metadata = {
  title: "Blog — Sparkline Marketing Firm",
};

export const revalidate = 60;

export default async function BlogsPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen bg-[#050C1E]">
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
