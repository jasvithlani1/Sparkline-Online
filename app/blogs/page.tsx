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
      <section className="pt-32 pb-12 sm:pt-36 sm:pb-14 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-[1208px] px-5 sm:px-6 md:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50 sm:text-[12px]">
            OUR BLOG
          </p>
          <h1 className="mt-4 text-[36px] leading-[1.08] tracking-[-0.04em] text-white sm:text-[48px] md:text-[56px]">
            Blogs
          </h1>
          <p className="mt-4 max-w-[48ch] text-[16px] leading-7 text-white/60 sm:text-[17px]">
            Insights, strategies, and stories from our team.
          </p>
        </div>
      </section>
      <BlogList />
      <div className="pt-16 sm:pt-20 md:pt-24">
        <Footer />
      </div>
    </main>
  );
}
