import Image from "next/image";
import { ServiceOptionsToggle } from "@/components/landing/service-options-toggle";
import { ServiceBannerVideo } from "@/components/landing/service-banner-video";

export function ServiceBanner() {
  return (
    <section id="services" className="bg-[#FDFCF4] px-5 py-8 sm:px-6 sm:py-10 md:px-8 md:py-14">
      <div className="relative mx-auto max-w-[1310px]">
        <div className="relative min-h-[280px] overflow-hidden rounded-[2px] sm:min-h-[340px] md:min-h-[520px] lg:min-h-[596px]">
          <ServiceBannerVideo />
          <div
            data-testid="service-banner-video-overlay"
            className="absolute inset-0 bg-black/[0.44]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,84,160,0.15),rgba(35,84,160,0.05))]" />
          <h2 className="absolute left-5 top-5 max-w-[240px] text-[26px] font-medium leading-none tracking-[0.01em] text-white sm:left-7 sm:top-7 sm:max-w-[320px] sm:text-[34px] md:left-[72px] md:top-[64px] md:max-w-[520px] md:text-[42px] lg:left-[103px] lg:top-[88px] lg:max-w-[616px] lg:text-[48px]">
            HOW CAN WE SERVE YOU?
          </h2>
          <ServiceOptionsToggle />
        </div>
        <div
          data-testid="service-submarine-frame"
          className="pointer-events-none relative ml-auto mr-[calc((100vw-100%)/-2)] -mt-[6rem] h-[154px] w-full max-w-[340px] sm:-mt-[8rem] sm:h-[220px] sm:max-w-[440px] md:-mt-[12rem] md:h-[316px] md:max-w-[560px] lg:-mt-[15.5rem] lg:h-[367px] lg:max-w-[650px]"
        >
          <Image
            src="/images/service-submarine.webp"
            alt=""
            fill
            sizes="(min-width: 1280px) 650px, (min-width: 768px) 560px, (min-width: 640px) 440px, 340px"
            className="object-contain object-right"
          />
        </div>
      </div>
    </section>
  );
}
