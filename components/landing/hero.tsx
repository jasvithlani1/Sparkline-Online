import Image from "next/image";

export function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="hero-rays hero-fade relative h-[100svh] min-h-[100svh] overflow-hidden bg-[#060B1A] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(82,103,160,0.25),transparent_42%)]" />
      <div className="absolute inset-x-0 top-0 h-[340px] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_85%)] opacity-40" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-[140px] bg-[linear-gradient(180deg,rgba(6,11,26,0),rgba(6,11,26,0.98))]" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-[170px] opacity-45 md:h-[220px]">
        <Image
          src="/images/hero-reef.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>
      <div className="relative z-20 mx-auto flex h-full max-w-[1440px] flex-col px-4 pt-28 text-center sm:pt-32 md:pt-36">
        <div className="flex flex-col items-center">
          <h1 className="hero-copy max-w-[860px] text-[65px] leading-[1.02] tracking-[-0.04em] sm:text-[82px] md:mt-14 md:text-[96px]">
            <span className="block">
              <span className="inline-block">Creative Marketing</span>
            </span>
            <span className="block">
              <span data-testid="hero-second-line" className="inline-block pb-[0.08em]">
                Supercharged
              </span>
            </span>
          </h1>
        </div>
        <div className="relative mt-auto flex w-full justify-end">
          <div
            data-testid="hero-submarine-frame"
            className="relative h-[38vh] min-h-[220px] w-full max-w-[864px] sm:h-[46vh] sm:max-w-[1080px] md:h-[58vh] md:max-w-[1296px]"
          >
            <Image
              src="/images/hero-submarine.webp"
              alt=""
              data-testid="hero-submarine-image"
              fill
              priority
              sizes="(min-width: 1280px) 1296px, (min-width: 640px) 90vw, 100vw"
              className="object-contain object-bottom scale-[1.3] origin-bottom md:origin-bottom-right md:object-right-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
