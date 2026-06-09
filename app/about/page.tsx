import Image from "next/image";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";

const BRAND = "SPARKLINE MARKETING FIRM";

const ashlanBio = [
  "The title that means the most to me has nothing to do with marketing. It is Aunt Sassy. My nieces gave me that name, and being their aunt has shaped the way I approach both life and work. Family has always been my foundation, teaching me the value of showing up, paying attention, and caring deeply about the people around me.",
  "I am a self-taught marketer, designer, and creative strategist. My path was built through curiosity, experience, and a commitment to learning by doing. Over the years, I discovered that lasting results come from consistency, thoughtful strategy, and genuine effort.",
  "Early in my career, I helped build the marketing foundation for a company that moved from relying on paid advertising to generating steady organic growth. That experience showed me the power of building something sustainable rather than chasing short-term wins.",
  "I later co-founded Sparkline Marketing Firm with my sister, Ruby. Together, we built a business focused on trust, creativity, and meaningful growth. We care about helping business owners create brands that feel authentic and reflect who they truly are.",
  "If we work together, you can expect someone who brings creativity, attention to detail, and a genuine commitment to helping your business grow for the long run.",
] as const;

const rubyBio = [
  "I love what I do and I love the people I get to do it with even more. I come from a big family and I was taught early on that the way you show up for people matters. That has never left me.",
  "Travel has always been my thing. Every place I visit I find myself completely absorbed in how people live, what they value and how they tell their story. I carry that same curiosity into every business I work with.",
  "One of the projects closest to my heart was working alongside a pastor and his church in Bermuda. We built their website from the ground up and captured the warmth, the color and the vibrant culture of the island and made someone feel it the second they landed on the page. When we got it right it did not just look good. It felt like them.",
  "I studied Marketing at the University of Alabama and spent my early career as a Marketing Specialist learning how businesses actually grow from the inside out. Not from textbooks but from being in the room where the real decisions were made. That foundation is what eventually led me to cofound Sparkline with my sister Ashlan, which is honestly the thing I am most proud of in my life. Not just because of what we have built but because of who I get to build it with every single day.",
  "If you work with me you are getting someone who is genuine, who actually cares about your business and who is all in from day one. That is just how I am wired.",
] as const;

const founders = [
  {
    name: "Ashlan Leazer",
    portrait: "/images/about-ashlan-leazer.jpeg",
    portraitWidth: 1600,
    portraitHeight: 1600,
    bio: ashlanBio,
    imageSide: "left",
    imageClassName: "scale-[1.08]",
  },
  {
    name: "Ruby Leazer",
    portrait: "/images/about-second-founder.jpeg",
    portraitWidth: 1200,
    portraitHeight: 1600,
    bio: rubyBio,
    imageSide: "right",
  },
] as const;

const aboutGalleryMoments = [
  {
    src: "/images/about-founders-first.png",
    alt: "Outdoor Sparkline founder moment",
    width: 4032,
    height: 3024,
    caption: "Real moments behind the work.",
  },
  {
    src: "/images/about-founders-birthday.jpg",
    alt: "Ashlan and Ruby Leazer celebrating together",
    width: 2048,
    height: 1365,
    caption: "Built together, with heart.",
  },
  {
    src: "/images/about-gallery-2760.jpg",
    alt: "Sparkline family portrait outdoors",
    width: 1800,
    height: 1257,
    caption: "Family first, always.",
  },
  {
    src: "/images/about-gallery-3600.jpg",
    alt: "Quiet at-home Sparkline moment",
    width: 1350,
    height: 1800,
    caption: "Grounded in everyday care.",
  },
  {
    src: "/images/about-gallery-4749.jpg",
    alt: "Sparkline family moment in the mountains",
    width: 1800,
    height: 1200,
    caption: "Joy we carry forward.",
  },
  {
    src: "/images/about-gallery-6945.jpg",
    alt: "Ashlan and Ruby Leazer at dinner",
    width: 1800,
    height: 1350,
    caption: "Sisters beyond the screen.",
  },
  {
    src: "/images/about-gallery-7356.jpg",
    alt: "Sparkline travel memory",
    width: 1350,
    height: 1800,
    caption: "Inspired by every place.",
  },
  {
    src: "/images/about-gallery-9541.jpg",
    alt: "Sparkline founder memory",
    width: 1350,
    height: 1800,
    caption: "Care shows up everywhere.",
  },
] as const;

export const metadata = {
  title: "About — Sparkline Marketing Firm",
  description:
    "Learn about SPARKLINE MARKETING FIRM, a strategy-led marketing firm built with care, creative attention, and a long-term mindset.",
};

function FounderProfile({
  founder,
  index,
}: {
  founder: (typeof founders)[number];
  index: number;
}) {
  const imageFirst = founder.imageSide === "left";

  return (
    <section
      data-testid="about-founder-profile"
      className="border-t border-white/10 py-14 sm:py-16 md:py-20"
    >
      <div
        className={`grid gap-8 md:grid-cols-[minmax(280px,0.78fr)_minmax(0,1fr)] md:items-center md:gap-12 lg:gap-16 ${
          imageFirst ? "" : "md:grid-cols-[minmax(0,1fr)_minmax(280px,0.78fr)]"
        }`}
      >
        <div className={`w-full ${imageFirst ? "" : "md:order-2"}`}>
          <div className="aspect-[4/5] w-full overflow-hidden rounded-[18px] bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.34)] outline outline-1 -outline-offset-1 outline-white/10">
            <Image
              src={founder.portrait}
              alt={founder.name}
              width={founder.portraitWidth}
              height={founder.portraitHeight}
              sizes="(min-width: 1024px) 35vw, (min-width: 768px) 42vw, 100vw"
              className={`h-full w-full object-cover object-center ${
                "imageClassName" in founder ? founder.imageClassName : ""
              }`}
              priority={index === 0}
            />
          </div>
        </div>

        <div className={imageFirst ? "" : "md:order-1"}>
          <p className="text-center font-mono text-[13px] uppercase tracking-[0.22em] text-[#B08CFF] sm:text-[14px]">
            {String(index + 1).padStart(2, "0")} / Co-Founder
          </p>
          <h2 className="mt-4 text-center text-balance text-[36px] leading-[0.98] tracking-[-0.03em] text-white sm:text-[48px] md:text-[56px]">
            {founder.name}
          </h2>
          <div className="mt-8 space-y-5 text-pretty text-[15px] leading-[1.85] text-white/72 sm:text-[16px]">
            {founder.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050C1E]">
      <Navbar />

      <section
        data-testid="about-company-intro"
        className="px-5 pt-32 pb-14 sm:px-6 sm:pt-36 sm:pb-16 md:px-8 md:pt-44 md:pb-20"
      >
        <div className="mx-auto max-w-[1208px]">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[#B08CFF]">
            Where it all begins
          </p>
          <h1 className="mx-auto mt-5 max-w-[980px] text-center text-balance text-[44px] leading-[0.95] tracking-[-0.04em] text-white sm:text-[64px] md:text-[82px]">
            Where strategy meets care.
          </h1>
          <div className="mt-8 grid gap-6 text-pretty text-[17px] leading-[1.75] text-white/76 sm:text-[18px] md:grid-cols-2 md:gap-10 md:text-[19px] md:leading-[1.8]">
            <p>
              <strong className="font-semibold text-white">{BRAND}</strong> was built for business owners who want marketing that feels intentional, human and built to last. We help service based businesses build a clear, confident online presence that actually drives growth, not just noise.
            </p>
            <p>
              We work with brands that offer real value but struggle to communicate it online. Our role is to bring clarity to the message, structure to the strategy and consistency to how businesses show up. Because when those three things are aligned, everything changes.
            </p>
            <p>
              Sparkline was created after years of working inside a growing business and seeing firsthand how easily strong work gets overlooked when marketing lacks clarity. The problem was never the service or the effort. It was the message. Businesses were doing everything right but showing up online without direction, consistency or confidence.
            </p>
            <p>
              From that experience we learned that real growth does not come from chasing trends or jumping into ads too early. It comes from having a clear message, a strategy that fits the stage of your business and a presence that people can trust.
            </p>
            <p>
              Today Sparkline exists to help businesses grow in a way that feels aligned, intentional and sustainable. We are based in Atlanta, Georgia and proud to work with businesses across the United States and beyond, including clients as far as Bermuda. Wherever you are building, we are here to help you show up with clarity, consistency and confidence.
            </p>
          </div>
        </div>
      </section>

      <section
        data-testid="about-founders-section"
        className="px-5 pb-0 sm:px-6 sm:pb-0 md:px-8 md:pb-2"
      >
        <div className="mx-auto max-w-[1208px]">
          <div className="mb-10 flex flex-col items-center gap-3 text-center sm:mb-12 md:mb-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#B08CFF]">
              Meet the founders
            </p>
            <h2 className="max-w-[760px] text-balance text-[32px] leading-[1.05] tracking-[-0.03em] text-white sm:text-[44px] md:text-[56px]">
              Two partners building with intention.
            </h2>
          </div>

          {founders.map((founder, index) => (
            <FounderProfile
              key={`${founder.name}-${index}`}
              founder={founder}
              index={index}
            />
          ))}
        </div>
      </section>

      <section
        data-testid="about-founders-moment"
        className="px-5 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-12 md:px-8 md:pt-12 md:pb-14"
      >
        <div className="mx-auto max-w-[1208px]">
          <div
            data-testid="about-founders-moment-scroller"
            className="overflow-hidden"
          >
            <div
              data-testid="about-founders-moment-track"
              className="about-moment-track gap-5 md:gap-6"
            >
              {[0, 1].map((copyIndex) =>
                aboutGalleryMoments.map((moment) => (
                  <figure
                    key={`${moment.src}-${copyIndex}`}
                    aria-hidden={copyIndex === 1 ? true : undefined}
                    className="w-[78vw] max-w-[440px] flex-none space-y-4 sm:w-[360px] md:w-[420px] lg:w-[460px]"
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-[18px] bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.34)] outline outline-1 -outline-offset-1 outline-white/10">
                      <Image
                        src={moment.src}
                        alt={copyIndex === 0 ? moment.alt : ""}
                        width={moment.width}
                        height={moment.height}
                        sizes="(min-width: 1024px) 460px, (min-width: 768px) 420px, (min-width: 640px) 360px, 78vw"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <figcaption className="text-center text-[15px] font-medium leading-[1.5] text-white/76 sm:text-[16px]">
                      {moment.caption}
                    </figcaption>
                  </figure>
                )),
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer spacing="compactTop" />
    </main>
  );
}
