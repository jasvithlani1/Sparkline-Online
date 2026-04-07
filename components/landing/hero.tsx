export function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="hero-rays hero-fade relative h-[100svh] min-h-[100svh] overflow-hidden bg-[#060B1A] text-white"
    >
      <video
        data-testid="hero-background-video"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src="/videos/hero-background.webm"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(82,103,160,0.25),transparent_42%)]" />
      <div className="absolute inset-x-0 top-0 h-[340px] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_85%)] opacity-40" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-[140px] bg-[linear-gradient(180deg,rgba(6,11,26,0),rgba(6,11,26,0.98))]" />
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(6,11,26,0.25)_0%,rgba(6,11,26,0.16)_38%,rgba(6,11,26,0.72)_100%)]" />
      <div
        data-testid="hero-content"
        className="relative z-20 mx-auto flex h-full max-w-[1440px] -translate-y-20 flex-col items-center justify-center px-4 pt-28 text-center sm:pt-32 md:-translate-y-20 md:pt-36"
      >
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
      </div>
    </section>
  );
}
