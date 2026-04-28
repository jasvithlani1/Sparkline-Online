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
          <source src="/videos/blog-hero.webm" type="video/webm" />
          <source src="/videos/blog-hero.mp4" type="video/mp4" />
        </video>

        {/* Dark tint for text legibility */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Gradient overlay — matches work/portfolio hero for seamless blend into bg-[#050C1E] */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050C1E]/60 via-transparent to-[#050C1E]" />

      </section>

      {/* Blog posts */}
      <section className="py-10 sm:py-12 md:py-14">
        <BlogList />
      </section>

      <Footer />
    </main>
  );
}
