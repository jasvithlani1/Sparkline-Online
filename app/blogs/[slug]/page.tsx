import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { blogPosts } from "@/lib/content";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);
  if (!post) return { title: "Blog — Sparkline Marketing Firm" };
  return {
    title: `${post.title} — Sparkline Marketing Firm`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#050C1E]">
      <Navbar />

      <article className="pt-24 pb-20 md:pt-28 md:pb-24">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-6 md:px-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white"
          >
            <span aria-hidden="true">&larr;</span>
            All Blogs
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white/50 sm:text-[12px]">
            <span>{post.date}</span>
            <span className="text-white/25">|</span>
            <span>{post.category}</span>
          </div>

          <h1 className="mt-4 text-[36px] leading-[1.05] tracking-[-0.03em] text-white sm:text-[48px] md:text-[60px]">
            {post.title}
          </h1>

          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#0A1F57] md:mt-12">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 1024px) 1080px, 100vw"
              className={post.imageClassName}
            />
          </div>

          <p className="mt-10 text-[17px] leading-[1.75] text-white/78 sm:text-[18px] md:mt-12 md:text-[19px] md:leading-[1.8]">
            {post.body}
          </p>

          <div className="relative mt-12 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black md:mt-16">
            <iframe
              src={`https://www.youtube.com/embed/${post.videoId}`}
              title={post.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
