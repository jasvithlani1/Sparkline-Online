import Image from "next/image";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";

const BRAND = "SPARKLINE MARKETING FIRM";

const ashlanBio = [
  "The most important title I hold has nothing to do with marketing. It is Aunt Sassy. My nieces gave me that name, and being their aunt has shaped me more than anything I have ever done professionally. Family is everything to me. Being an aunt has taught me how to actually care about someone past the surface, how to show up when it is not convenient, how to pay attention to the small things, and how to be someone worth looking up to.",
  "That is also how I show up in my work. I am a self taught marketer, designer, and creative strategist. Nothing about my path was handed to me. I learned by doing, by trying things, by failing, by figuring it out, and by staying consistent long after the novelty wore off.",
  "Early in my career, I helped build the marketing foundation for a company that went from relying on paid efforts to generating consistent organic inbound. That experience shaped how I see this work. I would rather build something real that lasts than chase quick wins that disappear the moment you stop spending.",
  "I cofounded Sparkline Marketing Firm with my sister, Ruby. We built it with intention, care, and a long term mindset. We are not trying to be a big agency. We do not treat business owners like numbers in a pipeline. We want to work with real people running real businesses and help them grow into something they are genuinely proud of.",
  "What I bring to that is creativity, strategy, and real attention. I care how things look. I care how they feel. I think about the actual person on the other side of the screen, not just an algorithm or a conversion rate. I think about whether what we are building sounds like you, represents you well, and will still matter a year from now.",
  "If you decide to work with me, you will get someone who treats your business the way I treat the things I love.",
] as const;

const rubyBio = [
  "I have been to over 30 countries. I have stood in the Galapagos Islands and watched wildlife that exists nowhere else on earth. I have gotten lost in the streets of Ecuador and found myself completely absorbed in how people live, what they value and how they tell their story. That curiosity, the kind that makes you want to understand a place from the inside out, is exactly how I approach every brand I work with.",
  "I studied Marketing at the University of Alabama and started my career as a Marketing Specialist working across events, email marketing and traditional marketing while helping a company navigate a full rebrand. That experience taught me how much thought goes into the way a business shows up and how people actually connect with it. I did not just learn marketing from a textbook. I learned it by being in the room where the decisions were made.",
  "One of the projects that has meant the most to me was working alongside a pastor and his church in Bermuda. We built their website from the ground up and worked hard to capture the bright, colorful culture of the island and the warm, inviting atmosphere of their community. That project reminded me why this work matters. When you get it right, a brand does not just look good. It feels like the people behind it.",
  "I cofounded Sparkline Marketing Firm with my sister Ashlan and honestly it is one of the things I am most proud of. We come from a big, close knit family and that shows up in everything we do. We push each other, challenge each other and keep each other sharp. Building something together with your person is a different kind of pride and I do not take it lightly.",
  "What I love most about marketing is that it never gets repetitive. Every business has its own personality, its own challenges and its own way of seeing the world. My job is to figure that out and help it come through clearly. To shape the voice, clean up how things show up online and pull all the moving pieces together until it feels cohesive and true.",
  "If you work with me you will get someone who is genuinely curious about your business, your story and the people you serve. Someone who has learned from traveling the world that the most powerful thing any brand can do is make people feel like they belong.",
  "That is what I am here to help you build.",
] as const;

const founders = [
  {
    name: "Ashlan Leazer",
    portrait: "/images/about-ashlan-leazer.jpeg",
    bio: ashlanBio,
    closing: "Carefully. Patiently. For the long run.",
    imageSide: "left",
    imageClassName: "scale-[1.08]",
  },
  {
    name: "Ruby Leazer",
    portrait: "/images/about-second-founder.jpeg",
    bio: rubyBio,
    imageSide: "right",
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
        <div className={imageFirst ? "" : "md:order-2"}>
          <div className="overflow-hidden rounded-[18px] bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.34)] outline outline-1 -outline-offset-1 outline-white/10">
            <Image
              src={founder.portrait}
              alt={founder.name}
              width={1600}
              height={1600}
              sizes="(min-width: 1024px) 35vw, (min-width: 768px) 42vw, 100vw"
              className={`aspect-[4/5] h-auto w-full object-cover object-center ${
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
            {"closing" in founder ? (
              <p className="text-[18px] font-semibold leading-[1.4] text-white">
                {founder.closing}
              </p>
            ) : null}
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
            data-testid="about-founders-moment-grid"
            className="grid gap-5 md:grid-cols-2 md:gap-6"
          >
            <figure className="space-y-4">
              <div className="overflow-hidden rounded-[18px] bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.34)] outline outline-1 -outline-offset-1 outline-white/10">
                <Image
                  src="/images/about-founders-first.png"
                  alt="Outdoor Sparkline founder moment"
                  width={4032}
                  height={3024}
                  sizes="(min-width: 1024px) 590px, 100vw"
                  className="aspect-[4/3] h-auto w-full object-cover object-center"
                />
              </div>
              <figcaption className="text-center text-[15px] font-medium leading-[1.5] text-white/76 sm:text-[16px]">
                Chief Morale Officers
              </figcaption>
            </figure>
            <figure className="space-y-4">
              <div className="overflow-hidden rounded-[18px] bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.34)] outline outline-1 -outline-offset-1 outline-white/10">
                <Image
                  src="/images/about-founders-birthday.jpg"
                  alt="Ashlan and Ruby Leazer celebrating together"
                  width={2048}
                  height={1365}
                  sizes="(min-width: 1024px) 590px, 100vw"
                  className="aspect-[4/3] h-auto w-full object-cover object-center"
                />
              </div>
              <figcaption className="text-center text-[15px] font-medium leading-[1.5] text-white/76 sm:text-[16px]">
                Built Together, With Heart
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <Footer spacing="compactTop" />
    </main>
  );
}
