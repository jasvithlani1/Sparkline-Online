"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { SectionHeading } from "@/components/landing/section-heading";
import { workGallery } from "@/lib/content";

function getCarouselCards(node: HTMLDivElement) {
  return Array.from(node.querySelectorAll<HTMLElement>("[data-work-gallery-index]"));
}

function getLoopWidth(node: HTMLDivElement) {
  const cards = getCarouselCards(node);

  if (cards.length > workGallery.projects.length) {
    return cards[workGallery.projects.length].offsetLeft - cards[0].offsetLeft;
  }

  return node.scrollWidth / 2;
}

function normalizeCarouselScroll(node: HTMLDivElement) {
  const loopWidth = getLoopWidth(node);

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

export function WorkGallery() {
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

    const sequenceWidth = getLoopWidth(node);
    node.scrollLeft = sequenceWidth;

    let frameId = 0;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isPaused) {
        node.scrollLeft -= delta * 0.03;

        normalizeCarouselScroll(node);
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
  }, [isPaused]);

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
    normalizeCarouselScroll(node);
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

  const loopProjects = [...workGallery.projects, ...workGallery.projects];

  return (
    <section
      id="portfolio"
      data-testid="work-gallery-section"
      className="py-10 sm:py-12 md:py-14 lg:py-16"
    >
      <div className="mx-auto flex max-w-[1208px] flex-col gap-10 px-5 sm:gap-12 sm:px-6 md:gap-14 md:px-8">
        <SectionHeading eyebrow={workGallery.eyebrow} lines={workGallery.lines} tone="dark" />
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
          <div data-testid="work-gallery-track" className="flex w-max gap-6 pr-5 sm:gap-8 sm:pr-6 md:pr-8">
            {loopProjects.map((project, index) => {
              const isClone = index >= workGallery.projects.length;

              return (
                <article
                  key={`${project.id}-${isClone ? "clone" : "real"}`}
                  data-testid={isClone ? undefined : "work-gallery-card"}
                  data-work-gallery-index={index % workGallery.projects.length}
                  aria-hidden={isClone}
                  className="w-[min(80vw,880px)] shrink-0 overflow-hidden rounded-[32px] bg-[#0A1F57] px-4 py-4 shadow-[0_24px_60px_rgba(4,10,32,0.28)] sm:rounded-[40px] sm:px-6 sm:py-6"
                >
                  <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.95fr)] lg:items-stretch">
                    <div className="relative aspect-[750/530] overflow-hidden rounded-2xl bg-[#EEF0EE] outline outline-1 -outline-offset-1 outline-white/10">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        draggable={false}
                        sizes="(min-width: 1280px) 60vw, (min-width: 1024px) 66vw, 86vw"
                        className={project.imageClassName}
                      />
                    </div>
                    <div className="flex min-h-full flex-col justify-between gap-8 py-2 lg:px-2">
                      <div className="space-y-6">
                        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/52 sm:text-[12px]">
                          {project.date}
                        </p>
                        <div className="space-y-4">
                          <h3 className="max-w-[12ch] text-balance text-[30px] leading-[0.95] tracking-[-0.04em] text-white sm:text-[38px]">
                            {project.name}
                          </h3>
                          <p className="max-w-[48ch] text-pretty text-[15px] leading-6 text-white/80 sm:text-[17px] sm:leading-7">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-end border-t border-white/12 pt-5">
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/76 sm:text-[12px]">
                          {project.ctaLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-[1208px] flex-col gap-10 px-5 sm:mt-12 sm:gap-12 sm:px-6 md:mt-14 md:gap-14 md:px-8">
        <div data-testid="work-gallery-dot-nav" className="flex justify-center gap-3">
          {workGallery.projects.map((project, index) => (
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
            href={workGallery.cta.href}
            className="inline-flex items-center justify-center whitespace-nowrap text-white transition-transform hover:-translate-y-0.5 active:scale-[0.96]"
            style={{
              paddingInline: "12px",
              paddingBlock: "10px",
              borderRadius: "8px",
              backgroundImage: "linear-gradient(180deg, #8F57FF 0%, #4C2FFF 100%)",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#FFFFFF29",
              boxShadow:
                "#FFFFFF14 0px 0.5px 0.5px inset, #5F38D933 0px 1px 1px, #5F38D933 0px 1px 1px, #4C2FFF66 0px 2px 5px -2px, #4C2FFF 0px 0px 0px 1px",
              color: "#FFFFFF",
              fontSize: "15px",
              lineHeight: "18px",
              fontWeight: 600,
              fontFamily: '"Geist-SemiBold", "Geist", system-ui, sans-serif',
            }}
          >
            {workGallery.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
