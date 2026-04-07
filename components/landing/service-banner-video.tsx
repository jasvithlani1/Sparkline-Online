"use client";

import { useEffect, useRef } from "react";

export function ServiceBannerVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const playVideo = () => {
      void video.play().catch(() => {
        // Ignore autoplay rejections; the poster remains visible.
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      playVideo();
      return () => {
        video.pause();
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          playVideo();
          return;
        }

        video.pause();
      },
      { threshold: 0.35 },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      data-testid="service-banner-video"
      className="absolute inset-0 h-full w-full object-cover object-center"
      muted
      loop
      playsInline
      preload="metadata"
      poster="/images/service-banner-ocean-poster.webp"
      aria-hidden="true"
    >
      <source src="/videos/service-banner-ocean.webm" type="video/webm" />
      <source src="/videos/service-banner-ocean.mp4" type="video/mp4" />
    </video>
  );
}
