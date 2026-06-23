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

function getCarouselCards(node: HTMLDivElement) {
  return Array.from(node.querySelectorAll<HTMLElement>("[data-work-gallery-index]"));
}

function getLoopWidth(node: HTMLDivElement, projectCount: number) {
  const cards = getCarouselCards(node);

  if (projectCount > 0 && cards.length > projectCount) {
    return cards[projectCount].offsetLeft - cards[0].offsetLeft;
  }

  return node.scrollWidth / 2;
}

function normalizeCarouselScroll(node: HTMLDivElement, projectCount: number) {
  const loopWidth = getLoopWidth(node, projectCount);

  if (node.scrollLeft <= 0) {
    node.scrollLeft += loopWidth;
    return;
  }

  if (node.scrollLeft > loopWidth) {
    node.scrollLeft -= loopWidth;
  }
}

function getActiveCardIndex(node: HTMLDivElement) {
  const cards = getCarouselCards(node);

  if (!cards.length) {
    return 0;
  }

  const viewportCenter = node.scrollLeft + node.clientWidth / 2;
  let activeIndex = 0;
  let shortestDistance = Number.POSITIVE_INFINITY;

  for (const card of cards) {
    const cardIndex = Number(card.dataset.workGalleryIndex ?? 0);
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = Math.abs(cardCenter - viewportCenter);

    if (distance < shortestDistance) {
      shortestDistance = distance;
      activeIndex = cardIndex;
    }
  }

  return activeIndex;
}

export function WorkGallery({ projects = workGallery.projects, content }: WorkGalleryProps) {
  const displayProjects = projects.length > 0 ? projects : workGallery.projects;
  const eyebrow = content?.eyebrow ?? workGallery.eyebrow;
  const lines = content?.lines ?? workGallery.lines;
  const cta = content?.cta ?? workGallery.cta;
  const projectCount = displayProjects.length;
  const carouselRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<number | undefined>(undefined);
  const dragState = useRef({
    pointerId: null as number | null,
    startX: 0,
    startScrollLeft: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const node = carouselRef.current;

    if (!node) {
      return;
    }

    const sequenceWidth = getLoopWidth(node, projectCount);
    node.scrollLeft = sequenceWidth;

    let frameId = 0;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isPaused) {
        normalizeCarouselScroll(node, projectCount);
        setActiveIndex(getActiveCardIndex(node));
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      if (resumeTimerRef.current !== undefined) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, [isPaused, projectCount]);

  const pauseTemporarily = () => {
    setIsPaused(true);

    if (resumeTimerRef.current !== undefined) {
      window.clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = window.setTimeout(() => {
      setIsPaused(false);
    }, 1200);
  };

  const normalizeScroll = () => {
    const node = carouselRef.current;

    if (!node) {
      return;
    }
    normalizeCarouselScroll(node, projectCount);
    setActiveIndex(getActiveCardIndex(node));
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const node = carouselRef.current;

    if (!node) {
      return;
    }

    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: node.scrollLeft,
    };

    setIsPaused(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const node = carouselRef.current;

    if (!node || dragState.current.pointerId !== event.pointerId) {
      return;
    }

    node.scrollLeft = dragState.current.startScrollLeft - (event.clientX - dragState.current.startX);
    normalizeScroll();
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragState.current.pointerId !== event.pointerId) {
      return;
    }

    dragState.current.pointerId = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    pauseTemporarily();
  };

  const jumpToIndex = (index: number) => {
    const node = carouselRef.current;

    if (!node) {
      return;
    }

    const candidates = getCarouselCards(node).filter(
      (card) => Number(card.dataset.workGalleryIndex ?? -1) === index,
    );

    if (!candidates.length) {
      return;
    }

    const viewportCenter = node.scrollLeft + node.clientWidth / 2;
    const target = candidates.reduce((closest, candidate) => {
      const closestDistance = Math.abs(closest.offsetLeft + closest.offsetWidth / 2 - viewportCenter);
      const candidateDistance = Math.abs(candidate.offsetLeft + candidate.offsetWidth / 2 - viewportCenter);

      return candidateDistance < closestDistance ? candidate : closest;
    });

    pauseTemporarily();
    node.scrollTo({
      left: target.offsetLeft,
      behavior: "smooth",
    });
    setActiveIndex(index);
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
          className="work-gallery-scrollbar relative cursor-grab overflow-x-auto overscroll-x-contain px-5 active:cursor-grabbing sm:px-6 md:px-8"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onPointerLeave={handlePointerEnd}
          onWheel={pauseTemporarily}
          onTouchStart={pauseTemporarily}
        >
          <div data-testid="work-gallery-track" className="flex w-max gap-5 pr-5 sm:gap-6 sm:pr-6 md:pr-8">
            {loopProjects.map((project, index) => {
              const isClone = index >= projectCount;

              return (
                <div
                  key={`${project.id}-${isClone ? "clone" : "real"}`}
                  data-work-gallery-index={index % projectCount}
                  aria-hidden={isClone}
                  className="w-[calc(100vw-2.5rem)] shrink-0 sm:w-[min(44vw,360px)] lg:w-[376px]"
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
