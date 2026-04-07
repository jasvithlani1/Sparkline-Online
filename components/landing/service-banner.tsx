import Image from "next/image";
import { ServiceBannerVideo } from "@/components/landing/service-banner-video";

export function ServiceBanner() {
  return (
    <section id="services" className="bg-[#FDFCF4] px-6 py-8 md:px-8 md:py-14">
      <div className="relative mx-auto max-w-[1310px]">
        <div className="relative min-h-[280px] overflow-hidden rounded-[2px] md:min-h-[596px]">
          <ServiceBannerVideo />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,84,160,0.15),rgba(35,84,160,0.05))]" />
          <h2 className="absolute left-8 top-8 max-w-[616px] text-[34px] font-medium leading-none tracking-[0.01em] text-white md:left-[103px] md:top-[88px] md:text-[48px]">
            HOW CAN WE SERVE YOU?
          </h2>
        </div>
        <div
          data-testid="service-submarine-frame"
          className="pointer-events-none relative mx-auto -mt-10 h-[110px] w-full max-w-[260px] sm:h-[150px] sm:max-w-[320px] md:-mt-[9rem] md:ml-auto md:h-[262px] md:max-w-[464px]"
        >
          <Image
            src="/images/service-submarine.webp"
            alt=""
            fill
            sizes="(min-width: 1280px) 464px, (min-width: 640px) 320px, 260px"
            className="object-contain object-center md:object-right"
          />
        </div>
      </div>
    </section>
  );
}
