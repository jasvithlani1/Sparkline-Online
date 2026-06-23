import Image from "next/image";

type HeroProps = {
  data?: {
    title?: string;
  };
};

export function Hero({ data }: HeroProps) {
  return (
    <section
      data-testid="hero-section"
      className="hero-rays hero-fade relative h-[100svh] min-h-[100svh] overflow-hidden bg-[#060B1A] text-white"
    >
      <video
        data-testid="hero-background-video"
        className="absolute inset-x-0 top-0 z-0 h-[76%] w-full translate-y-0 object-cover md:inset-0 md:h-full"
        src="/videos/hero-background.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(82,103,160,0.25),transparent_42%)]" />
      <div className="absolute inset-x-0 top-0 h-[340px] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_85%)] opacity-40" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-[52%] bg-[linear-gradient(180deg,rgba(6,11,26,0)_0%,rgba(6,11,26,0.98)_18%,#060B1A_100%)] md:hidden" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-[140px] bg-[linear-gradient(180deg,rgba(6,11,26,0),rgba(6,11,26,0.98))]" />
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(6,11,26,0.25)_0%,rgba(6,11,26,0.16)_38%,rgba(6,11,26,0.72)_100%)]" />
      <div
        data-testid="hero-bottom-artwork"
        className="pointer-events-none absolute inset-x-0 -bottom-4 z-10 flex justify-center px-4 sm:px-6 md:px-8"
      >
        <Image
          src="/images/hero-bottom-artwork.png"
          alt="Decorative underwater artwork"
          width={5056}
          height={1584}
          priority
          className="hero-bottom-float h-auto w-full max-w-[840px] opacity-95 motion-reduce:animate-none"
        />
      </div>
      <div
        data-testid="hero-content"
        className="relative z-20 mx-auto flex h-full max-w-[1440px] -translate-y-8 flex-col items-center justify-center px-4 pt-24 text-center sm:-translate-y-12 sm:px-6 sm:pt-28 md:-translate-y-16 md:px-8 md:pt-32 lg:-translate-y-20 lg:pt-36"
      >
        <div className="flex flex-col items-center">
          <h1
            className="hero-copy max-w-[960px] text-balance text-[48px] leading-[1.04] tracking-[-0.04em] opacity-60 sm:text-[72px] md:mt-10 md:text-[88px] lg:mt-14 lg:text-[96px]"
            style={{
              fontFamily: '"Logotype", var(--font-cal-sans), Arial, Helvetica, sans-serif',
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)",
              textShadow: "0 0 1px rgba(255, 255, 255, 0.5)",
            }}
          >
            <span data-testid="hero-second-line" className="inline-block pb-[0.08em]">
              {data?.title ?? "Marketing Supercharged"}
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
