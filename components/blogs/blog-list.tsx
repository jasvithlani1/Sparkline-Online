import Image from "next/image";
import { blogPosts } from "@/lib/content";

export function BlogList() {
  return (
    <div className="mx-auto max-w-[1208px] px-5 sm:px-6 md:px-8">
      {blogPosts.map((post) => (
        <article
          key={post.id}
          className="group border-t border-white/10 py-8 first:border-t-0 sm:py-10 md:py-12"
        >
          <div className="flex flex-col gap-6 md:flex-row md:gap-10 lg:gap-14">
            {/* Thumbnail */}
            <div className="relative aspect-[750/530] w-full shrink-0 overflow-hidden rounded-2xl bg-[#0A1F57] md:w-[280px] md:aspect-auto md:h-[198px] lg:w-[340px] lg:h-[240px] transition-transform duration-300 group-hover:scale-[1.03]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 340px, (min-width: 768px) 280px, 100vw"
                className={post.imageClassName}
              />
            </div>

            {/* Details */}
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-3">
              <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/50 sm:text-[12px]">
                <span className="font-mono">{post.date}</span>
                <span className="text-white/25">|</span>
                <span className="font-mono">{post.category}</span>
              </div>

              <h2 className="text-[26px] leading-[1.1] tracking-[-0.03em] text-white sm:text-[30px] md:text-[34px]">
                {post.title}
              </h2>

              <p className="max-w-[54ch] text-[15px] leading-6 text-white/70 sm:text-[16px] sm:leading-7">
                {post.description}
              </p>

              <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.18em] text-white/70 transition-colors group-hover:text-white">
                Read More
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
