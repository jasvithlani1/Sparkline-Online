import Image from "next/image";

export function Hero() {
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
    </section>
  );
}
