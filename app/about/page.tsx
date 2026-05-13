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
  "Hi, I am Ruby. I graduated from the University of Alabama with a degree in Marketing, and I started my career as a Marketing Specialist working on things like events, email marketing, and traditional marketing while also helping the company rebrand. That role gave me a real appreciation for how much thought goes into the way a business shows up and how people actually connect with it.",
  "I then co-founded this company with my sister, Ashlan, because we wanted to build something that felt creative but still intentional, and genuinely helpful for the businesses we work with. We are big on making sure brands do not just look good, but actually feel like the people behind them.",
  "What I love about marketing is that it never gets repetitive. Every business has its own personality, its own challenges, and its own way of doing things. Figuring that out is my favorite part. I enjoy helping shape a brand's voice, cleaning up how things show up online, and pulling all the moving pieces together so it feels more clear and cohesive.",
  "Outside of work, I am usually traveling, exploring new places, or just finding inspiration in everyday life. I have always been drawn to creative environments, and that naturally spills into how I think about branding and marketing too.",
  "At the end of the day, we care a lot about doing things the right way. We like working with people who are proud of what they are building and want their brand to actually reflect that. If we can help bring more clarity and confidence to that process, that is exactly what we are here for.",
] as const;

const founders = [
  {
    name: "Ashlan Leazer",
    role: "Co-Founder",
    portrait: "/images/about-ashlan-leazer.jpeg",
    bio: ashlanBio,
    closing: "Carefully. Patiently. For the long run.",
    imageSide: "left",
  },
  {
    name: "Ruby",
    role: "Co-Founder",
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
              className="aspect-[4/5] h-auto w-full object-cover object-center"
              priority={index === 0}
            />
          </div>
        </div>

        <div className={imageFirst ? "" : "md:order-1"}>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#B08CFF]">
            {String(index + 1).padStart(2, "0")} / Co-Founder
          </p>
          <h2 className="mt-4 text-balance text-[36px] leading-[0.98] tracking-[-0.03em] text-white sm:text-[48px] md:text-[56px]">
            {founder.name}
          </h2>
          <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.18em] text-white/50">
            {founder.role}
          </p>
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
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#B08CFF]">
            Where it all begins
          </p>
          <h1 className="mt-5 max-w-[980px] text-balance text-[44px] leading-[0.95] tracking-[-0.04em] text-white sm:text-[64px] md:text-[82px]">
            Where strategy meets care.
          </h1>
          <div className="mt-8 grid gap-6 text-pretty text-[17px] leading-[1.75] text-white/76 sm:text-[18px] md:grid-cols-2 md:gap-10 md:text-[19px] md:leading-[1.8]">
            <p>
              <strong className="font-semibold text-white">{BRAND}</strong> was built for business owners who want marketing that feels intentional, human, and built to last. We combine strategy, creative direction, design, content, and digital execution so every touchpoint works together.
            </p>
            <p>
              We built Sparkline Marketing Firm with a long term mindset. We are not chasing quick wins or treating businesses like numbers in a pipeline. We work closely with real people running real companies, helping them become clearer, more visible, and more proud of what they are building.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-12 sm:px-6 sm:pb-14 md:px-8 md:pb-16">
        <div className="mx-auto max-w-[1208px]">
          <div className="mb-10 flex flex-col gap-3 sm:mb-12 md:mb-14">
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

      <Footer />
    </main>
  );
}
