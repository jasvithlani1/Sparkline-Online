"use client";

import Image from "next/image";
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
    <section id="portfolio" className="bg-white px-5 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:py-24">
      <div className="mx-auto flex max-w-[1208px] flex-col gap-10 sm:gap-12 md:gap-14">
        <SectionHeading eyebrow={workGallery.eyebrow} lines={workGallery.lines} />
        <div className="relative">
          <div
            data-testid="work-gallery-left-mask"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-[linear-gradient(90deg,#FFFFFF,rgba(255,255,255,0))] sm:w-16"
          />
          <div
            data-testid="work-gallery-right-mask"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-[linear-gradient(270deg,#FFFFFF,rgba(255,255,255,0))] sm:w-16"
          />
          <div
            ref={carouselRef}
            data-testid="work-gallery-carousel"
            className="work-gallery-scrollbar relative cursor-grab overflow-x-auto overscroll-x-contain active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onPointerLeave={handlePointerEnd}
            onWheel={pauseTemporarily}
            onTouchStart={pauseTemporarily}
          >
            <div data-testid="work-gallery-track" className="flex w-max gap-6 pr-6 sm:gap-8 sm:pr-8">
              {loopProjects.map((project, index) => {
                const isClone = index >= workGallery.projects.length;

                return (
                  <article
                    key={`${project.id}-${isClone ? "clone" : "real"}`}
                    data-testid={isClone ? undefined : "work-gallery-card"}
                    data-work-gallery-index={index % workGallery.projects.length}
                    aria-hidden={isClone}
                    className="w-[min(88vw,900px)] shrink-0 overflow-hidden rounded-[28px] bg-white px-5 py-5 shadow-[0_24px_60px_rgba(34,47,48,0.08)] sm:px-8 sm:py-8"
                  >
                    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.95fr)] lg:items-stretch">
                      <div className="relative aspect-[750/530] overflow-hidden rounded-[20px] bg-[#EEF0EE]">
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          draggable={false}
                          sizes="(min-width: 1024px) 55vw, 88vw"
                          className={project.imageClassName}
                        />
                      </div>
                      <div className="flex min-h-full flex-col justify-between gap-8 py-2 lg:px-2">
                        <div className="space-y-6">
                          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#222F30]/50 sm:text-[12px]">
                            {project.date}
                          </p>
                          <div className="space-y-4">
                            <h3 className="max-w-[12ch] text-[30px] leading-[0.95] tracking-[-0.04em] text-[#222F30]/85 sm:text-[38px]">
                              {project.name}
                            </h3>
                            <p className="max-w-[48ch] text-[15px] leading-6 text-[#222F30]/78 sm:text-[17px] sm:leading-7">
                              {project.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-end border-t border-black/8 pt-5">
                          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#222F30]/75 sm:text-[12px]">
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
        <div data-testid="work-gallery-dot-nav" className="flex justify-center gap-3">
          {workGallery.projects.map((project, index) => (
            <button
              key={`${project.id}-dot`}
              type="button"
              data-testid="work-gallery-dot"
              aria-label={`Go to ${project.name}`}
              aria-pressed={activeIndex === index}
              onClick={() => jumpToIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${
                activeIndex === index ? "bg-[#2C6BFF]" : "bg-black/18"
              }`}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <a
            href={workGallery.cta.href}
            className="inline-flex items-center justify-center whitespace-nowrap text-white transition-transform hover:-translate-y-0.5"
            style={{
              paddingInline: "12px",
              paddingBlock: "12px",
              borderRadius: "8px",
              backgroundImage:
                "linear-gradient(in oklab 180deg, oklab(43.1% -0.018 -0.204) 1.39%, oklab(51.3% -0.023 -0.216) 101.39%)",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#FFFFFF29",
              boxShadow:
                "#FFFFFF14 0px 0.5px 0.5px inset, #2157E033 0px 1px 1px, #2157E033 0px 1px 1px, #2157E066 0px 2px 5px -2px, #0F64F2 0px 0px 0px 1px",
              color: "#FFFFFF",
              fontSize: "16px",
              lineHeight: "20px",
              fontWeight: 600,
              fontFamily: '"Geist-SemiBold", "Geist", system-ui, sans-serif',
            }}
          >
            {workGallery.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
