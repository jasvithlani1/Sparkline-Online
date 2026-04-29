import type { CSSProperties } from "react";
import Image from "next/image";
import { ServiceOptionsToggle } from "@/components/landing/service-options-toggle";
import { ServiceBannerVideo } from "@/components/landing/service-banner-video";

const submarineBubbles: Array<{
  id: string;
  size: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
  driftX: string;
}> = [
  { id: "bubble-1", size: 8, left: "39%", top: "12%", delay: "0s", duration: "4.5s", driftX: "-4px" },
  { id: "bubble-2", size: 10, left: "40.5%", top: "9.5%", delay: "0.6s", duration: "4.2s", driftX: "5px" },
  { id: "bubble-3", size: 7, left: "42%", top: "7.5%", delay: "1.1s", duration: "4.8s", driftX: "-3px" },
  { id: "bubble-4", size: 9, left: "41%", top: "13.5%", delay: "1.7s", duration: "4.1s", driftX: "6px" },
  { id: "bubble-5", size: 6, left: "43.5%", top: "10.5%", delay: "2.2s", duration: "4.7s", driftX: "-2px" },
  { id: "bubble-6", size: 11, left: "44.5%", top: "8.5%", delay: "2.8s", duration: "4.4s", driftX: "4px" },
  { id: "bubble-7", size: 7, left: "40%", top: "15%", delay: "3.3s", duration: "4.9s", driftX: "-5px" },
  { id: "bubble-8", size: 8, left: "42.5%", top: "11.5%", delay: "3.8s", duration: "4.3s", driftX: "3px" },
];

export function ServiceBanner() {
  return (
    <section id="services" className="px-5 pt-0 pb-2 sm:px-6 sm:pt-0 sm:pb-3 md:px-8 md:pt-0 md:pb-4">
      <div className="relative mx-auto max-w-[1310px]">
        <div
          data-testid="service-banner-shell"
          className="relative left-1/2 w-screen -translate-x-1/2"
        >
          <div className="relative isolate min-h-[280px] overflow-hidden rounded-[2px] px-[max(1.25rem,calc((100vw-1310px)/2))] sm:min-h-[340px] sm:px-[max(1.5rem,calc((100vw-1310px)/2))] md:min-h-[520px] md:px-[max(2rem,calc((100vw-1310px)/2))] lg:min-h-[596px]">
            <ServiceBannerVideo />
            <div className="absolute inset-0 bg-black/48" />
            <div
              data-testid="service-banner-video-overlay"
              className="absolute inset-0 bg-[#4D84CB]/60 mix-blend-color"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,25,58,0.42),rgba(10,25,58,0.24))]" />
            <h2 className="absolute left-5 top-5 max-w-[240px] text-[26px] font-medium leading-none tracking-[0.01em] text-white sm:left-7 sm:top-7 sm:max-w-[320px] sm:text-[34px] md:left-[72px] md:top-[64px] md:max-w-[520px] md:text-[42px] lg:left-[103px] lg:top-[88px] lg:max-w-[616px] lg:text-[48px]">
              HOW CAN WE SERVE YOU?
            </h2>
            <ServiceOptionsToggle />
          </div>
        </div>
        <div
          data-testid="service-submarine-frame"
          className="group/service-submarine pointer-events-auto relative ml-auto mr-[calc((100vw-100%)/-2)] -mt-[6rem] h-[154px] w-full max-w-[340px] sm:-mt-[8rem] sm:h-[220px] sm:max-w-[440px] md:-mt-[12rem] md:h-[316px] md:max-w-[560px] lg:-mt-[15.5rem] lg:h-[367px] lg:max-w-[650px]"
        >
          <div
            data-testid="service-submarine-bubbles"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 translate-x-[10%] overflow-visible motion-reduce:hidden sm:translate-x-0"
          >
            {submarineBubbles.map((bubble) => (
              <span
                key={bubble.id}
                data-testid="service-submarine-bubble"
                className="service-submarine-bubble absolute rounded-full border border-white/45 bg-white/25 shadow-[0_0_12px_rgba(255,255,255,0.18)]"
                style={
                  {
                    left: bubble.left,
                    top: bubble.top,
                    width: `${bubble.size}px`,
                    height: `${bubble.size}px`,
                    "--bubble-delay": bubble.delay,
                    "--bubble-duration": bubble.duration,
                    "--bubble-drift-x": bubble.driftX,
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <div
            data-testid="service-submarine-fan"
            aria-hidden="true"
            className="submarine-fan-spin pointer-events-none absolute right-[2%] top-[14%] z-[4] h-[22px] w-[22px] sm:right-[3%] sm:top-[16%] sm:h-[32px] sm:w-[32px] md:right-[4%] md:top-[18%] md:h-[46px] md:w-[46px] lg:right-[5%] lg:top-[20%] lg:h-[60px] lg:w-[60px]"
          >
            <Image
              src="/images/submarine-fan.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 60px, (min-width: 768px) 46px, (min-width: 640px) 32px, 22px"
              className="h-full w-full object-contain drop-shadow-[0_0_10px_rgba(78,108,170,0.4)]"
            />
          </div>
          <Image
            src="/images/service-submarine.webp"
            alt=""
            fill
            sizes="(min-width: 1280px) 650px, (min-width: 768px) 560px, (min-width: 640px) 440px, 340px"
            className="relative z-[5] h-full w-full object-contain object-right motion-reduce:transform-none motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/service-submarine:translate-x-3 group-hover/service-submarine:-translate-y-2"
          />
        </div>
      </div>
    </section>
  );
}
