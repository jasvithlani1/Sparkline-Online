"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/content";

const ALL = "All";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  imageClassName: string;
};

type BlogListProps = {
  posts?: readonly BlogPost[];
};

export function BlogList({ posts = blogPosts }: BlogListProps) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((post) => post.category)));
    return [ALL, ...unique];
  }, [posts]);

  const [activeCategory, setActiveCategory] = useState<string>(ALL);

  const filtered = useMemo(() => {
    if (activeCategory === ALL) return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory, posts]);

  return (
    <div className="mx-auto max-w-[1208px] px-5 sm:px-6 md:px-8">
      <div
        data-testid="blog-list-header"
        className="flex flex-col gap-4 pb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pb-10 md:pb-12"
      >
        <h2
          className="hero-copy text-[36px] leading-[1] tracking-[0.02em] sm:text-[52px] sm:leading-[0.95] md:text-[68px] lg:text-[80px]"
          style={{ wordSpacing: "0.25em" }}
        >
          BLOGS
        </h2>
        <label className="relative inline-flex items-center self-start sm:self-auto">
          <span className="sr-only">Filter by category</span>
          <select
            value={activeCategory}
            onChange={(event) => setActiveCategory(event.target.value)}
            className="appearance-none rounded-lg border border-white/12 bg-white/[0.04] py-2 pl-3.5 pr-10 text-[14px] font-normal text-white/75 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-[#8F57FF]/50"
            style={{ fontFamily: '"Geist", system-ui, sans-serif' }}
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
                className="bg-[#0d1730] text-white"
              >
                {category}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 text-white/60"
          >
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-[15px] text-white/60">
          No posts in this category yet.
        </p>
      ) : (
        filtered.map((post) => (
          <Link
            key={post.id}
            href={`/blogs/${post.slug}`}
            className="group block border-t border-white/10 py-8 sm:py-10 md:py-12"
          >
            <div className="flex flex-col gap-6 md:flex-row md:gap-10 lg:gap-14">
              <div className="relative aspect-[750/530] w-full shrink-0 overflow-hidden rounded-2xl bg-[#0A1F57] outline outline-1 -outline-offset-1 outline-white/10 transition-transform duration-300 group-hover:scale-[1.03] md:aspect-auto md:h-[198px] md:w-[280px] lg:h-[240px] lg:w-[340px]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 340px, (min-width: 768px) 280px, 100vw"
                  className={post.imageClassName}
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center gap-3">
                <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/50 sm:text-[12px]">
                  <span className="font-mono">{post.date}</span>
                  <span className="text-white/25">|</span>
                  <span className="font-mono">{post.category}</span>
                </div>

                <h2 className="text-balance text-[26px] leading-[1.1] tracking-[-0.03em] text-white sm:text-[30px] md:text-[34px]">
                  {post.title}
                </h2>

                <p className="max-w-[54ch] text-pretty text-[15px] leading-6 text-white/70 sm:text-[16px] sm:leading-7">
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
          </Link>
        ))
      )}
    </div>
  );
}
