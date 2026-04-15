import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { BlogList } from "@/components/blogs/blog-list";

export const metadata = {
  title: "Blog — Sparkline Marketing Firm",
};

export default function BlogsPage() {
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
          <source src="/videos/blog-hero.mp4" type="video/mp4" />
        </video>

        {/* Dark tint for text legibility */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Gradient overlay — matches work/portfolio hero for seamless blend into bg-[#050C1E] */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050C1E]/60 via-transparent to-[#050C1E]" />

        {/* Hero text */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60 sm:text-[12px]">
            OUR BLOG
          </p>
          <h1 className="mt-4 text-[42px] leading-[1.08] tracking-[-0.04em] text-white sm:text-[56px] md:text-[72px]">
            Blogs
          </h1>
          <p className="mt-4 max-w-[48ch] text-[16px] leading-7 text-white/60 sm:text-[17px]">
            Insights, strategies, and stories from our team.
          </p>
        </div>
      </section>

      {/* Blog posts */}
      <section className="py-16 sm:py-20 md:py-24">
        <BlogList />
      </section>

      <Footer />
    </main>
  );
}
