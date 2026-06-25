"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { SectionHeading } from "@/components/landing/section-heading";
import { ProjectCard, type ProjectCardProject } from "@/components/portfolio/project-card";
import { workGallery } from "@/lib/content";

type WorkGalleryProps = {
  projects?: readonly ProjectCardProject[];
  content?: {
    eyebrow?: string;
    lines?: string[];
    cta?: { label?: string; href?: string };
  };
};

// Seconds for one full loop of all cards (reuses logo-marquee keyframe from globals.css)
const DURATION_S = 32;

function getTrackTx(track: HTMLElement): number {
  const m = new DOMMatrix(window.getComputedStyle(track).transform);
  return m.m41; // negative value when translated left
}

export function WorkGallery({ projects = workGallery.projects, content }: WorkGalleryProps) {
  const displayProjects = projects.length > 0 ? projects : workGallery.projects;
  const eyebrow = content?.eyebrow ?? workGallery.eyebrow;
  const lines = content?.lines ?? workGallery.lines;
  const cta = content?.cta ?? workGallery.cta;
  const projectCount = displayProjects.length;

  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<number | undefined>(undefined);
  const dragState = useRef({ pointerId: null as number | null, startX: 0, startTx: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  // Start CSS animation once on mount
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.animation = `logo-marquee ${DURATION_S}s 0s linear infinite`;
    return () => {
      track.style.animation = "";
      if (resumeTimerRef.current !== undefined) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // Update active dot by reading animation progress each frame
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let rafId = 0;
    let lastIdx = -1;
    const tick = () => {
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0) {
        const tx = getTrackTx(track); // negative
        const offset = ((-tx % halfWidth) + halfWidth) % halfWidth;
        const idx = Math.floor((offset / halfWidth) * projectCount) % projectCount;
        if (idx !== lastIdx) {
          lastIdx = idx;
          setActiveIndex(idx);
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [projectCount]);

  // Restart animation from a specific positive pixel offset into the first set
  const restartFrom = (offset: number) => {
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;
    if (halfWidth <= 0) return;
    const safe = ((offset % halfWidth) + halfWidth) % halfWidth;
    const delay = -((safe / halfWidth) * DURATION_S);
    track.style.animation = "none";
    track.style.transform = "";
    track.offsetHeight; // force reflow so "none" takes effect
    track.style.animation = `logo-marquee ${DURATION_S}s ${delay}s linear infinite`;
  };

  const pauseAnimation = () => {
    const track = trackRef.current;
    if (track) track.style.animationPlayState = "paused";
    if (resumeTimerRef.current !== undefined) clearTimeout(resumeTimerRef.current);
  };

  const pauseTemporarily = () => {
    pauseAnimation();
    resumeTimerRef.current = window.setTimeout(() => {
      if (trackRef.current) trackRef.current.style.animationPlayState = "running";
    }, 1500);
  };

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    pauseAnimation();
    dragState.current = { pointerId: e.pointerId, startX: e.clientX, startTx: getTrackTx(track) };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || dragState.current.pointerId !== e.pointerId) return;
    const newTx = dragState.current.startTx + (e.clientX - dragState.current.startX);
    track.style.transform = `translateX(${newTx}px)`;
  };

  const handlePointerEnd = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragState.current.pointerId !== e.pointerId) return;
    const track = trackRef.current;
    if (track) restartFrom(-getTrackTx(track));
    dragState.current.pointerId = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    pauseTemporarily();
  };

  const jumpToIndex = (index: number) => {
    const track = trackRef.current;
    const carousel = carouselRef.current;
    if (!track || !carousel) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-work-gallery-index]"));
    // Use first (non-clone) card with this index
    const target = cards.find((c) => Number(c.dataset.workGalleryIndex) === index);
    if (!target) return;

    // offsetLeft is relative to offsetParent (carousel), includes carousel padding
    const offset = Math.max(0, target.offsetLeft + target.offsetWidth / 2 - carousel.clientWidth / 2);
    setActiveIndex(index);
    restartFrom(offset);
    pauseTemporarily();
  };

  const loopProjects = [...displayProjects, ...displayProjects];

  return (
    <section
      id="portfolio"
      data-testid="work-gallery-section"
      className="pt-6 pb-10 sm:pt-7 sm:pb-12 md:pt-8 md:pb-14 lg:pt-8 lg:pb-16"
    >
      <div className="mx-auto flex max-w-[1208px] flex-col gap-10 px-5 sm:gap-12 sm:px-6 md:gap-14 md:px-8">
        <SectionHeading eyebrow={eyebrow} lines={lines} tone="dark" />
      </div>

      <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2 sm:mt-12 md:mt-14">
        <div
          ref={carouselRef}
          data-testid="work-gallery-carousel"
          className="relative cursor-grab overflow-hidden px-5 active:cursor-grabbing sm:px-6 md:px-8"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onPointerLeave={handlePointerEnd}
          onWheel={pauseTemporarily}
        >
          <div
            ref={trackRef}
            data-testid="work-gallery-track"
            className="flex w-max gap-5 pr-5 sm:gap-6 sm:pr-6 md:pr-8"
          >
            {loopProjects.map((project, index) => {
              const isClone = index >= projectCount;
              return (
                <div
                  key={`${project.id}-${isClone ? "clone" : "real"}`}
                  data-work-gallery-index={index % projectCount}
                  aria-hidden={isClone}
                  className="w-[calc(100vw-2.5rem)] shrink-0 sm:w-[min(44vw,360px)] lg:w-[376px]"
                  draggable={false}
                >
                  <ProjectCard
                    project={project}
                    ctaLabel="See Project"
                    testId={isClone ? undefined : "work-gallery-card"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-3 flex max-w-[1208px] flex-col gap-10 px-5 sm:mt-4 sm:gap-12 sm:px-6 md:mt-5 md:gap-14 md:px-8">
        <div data-testid="work-gallery-dot-nav" className="flex justify-center gap-3">
          {displayProjects.map((project, index) => (
            <button
              key={`${project.id}-dot`}
              type="button"
              data-testid="work-gallery-dot"
              aria-label={`Go to ${project.name}`}
              aria-pressed={activeIndex === index}
              onClick={() => jumpToIndex(index)}
              className={`relative h-2.5 w-2.5 rounded-full transition-colors duration-200 before:absolute before:inset-[-15px] before:content-[''] ${
                activeIndex === index ? "bg-[#2C6BFF]" : "bg-white/38 hover:bg-white/55"
              }`}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            href={cta.href ?? "/portfolio"}
            className="inline-flex items-center justify-center whitespace-nowrap text-white transition-transform hover:-translate-y-0.5 active:scale-[0.96]"
            style={{
              paddingInline: "16px",
              paddingBlock: "10px",
              borderRadius: "8px",
              backgroundImage: "linear-gradient(180deg, #8F57FF 0%, #4C2FFF 100%)",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#FFFFFF29",
              boxShadow:
                "#FFFFFF14 0px 0.5px 0.5px inset, #5F38D933 0px 1px 1px, #5F38D933 0px 1px 1px, #4C2FFF66 0px 2px 5px -2px, #4C2FFF 0px 0px 0px 1px",
              fontSize: "15px",
              lineHeight: "18px",
              fontWeight: 600,
              fontFamily: '"Geist-SemiBold", "Geist", system-ui, sans-serif',
            }}
          >
            {cta.label ?? "View All Projects"}
          </Link>
        </div>
      </div>
    </section>
  );
}
