import { ServiceOptionsToggle } from "@/components/landing/service-options-toggle";
import { ServiceBannerVideo } from "@/components/landing/service-banner-video";

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
      </div>
    </section>
  );
}
