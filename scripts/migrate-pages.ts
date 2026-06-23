import { createClient } from "@sanity/client";
import { featuredIntro, trustedBy, serviceOptions, faqSection, workGallery } from "../lib/content";

// Assuming we run this script with `npx tsx scripts/migrate-pages.ts`
// And SANITY_API_TOKEN is available in process.env

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "8g3u06mk";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_TOKEN environment variable.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: "2024-03-01",
  token,
});

const homePageDoc = {
  _type: "homePage",
  _id: "homePage",
  seo: {
    _type: "seo",
    title: "Home — Sparkline Marketing Firm",
    description: "SPARKLINE MARKETING FIRM helps ambitious businesses build stronger brands.",
  },
  hero: {
    _type: "object",
    title: "Marketing Supercharged",
  },
  featuredIntro: {
    _type: "object",
    body: featuredIntro.body,
  },
  trustedBy: {
    _type: "object",
    eyebrow: trustedBy.eyebrow,
    lines: trustedBy.lines,
    logos: trustedBy.logos.map((logo, i) => ({
      _type: "object",
      _key: `logo-${i}`,
      src: logo.src,
      alt: logo.alt,
    })),
  },
  serviceBanner: {
    _type: "object",
    title: "HOW CAN WE SERVE YOU?",
    options: serviceOptions.map((opt) => ({
      _type: "object",
      _key: opt.id,
      id: opt.id,
      title: opt.title,
      description: opt.description,
      href: opt.href,
    })),
  },
  workGallerySection: {
    _type: "object",
    eyebrow: workGallery.eyebrow,
    lines: workGallery.lines,
    cta: {
      _type: "object",
      label: workGallery.cta.label,
      href: workGallery.cta.href,
    },
  },
  faq: faqSection.items.map((item) => ({
    _type: "faqItem",
    _key: item.id,
    id: item.id,
    question: item.question,
    answer: item.answer,
  })),
};

const aboutPageDoc = {
  _type: "aboutPage",
  _id: "aboutPage",
  seo: {
    _type: "seo",
    title: "About — Sparkline Marketing Firm",
    description: "Learn about SPARKLINE MARKETING FIRM.",
  },
  introSection: {
    _type: "object",
    eyebrow: "Where it all begins",
    title: "Where strategy meets care.",
    paragraphs: [
      "SPARKLINE MARKETING FIRM was built for business owners who want marketing that feels intentional, human and built to last. We help service based businesses build a clear, confident online presence that actually drives growth, not just noise.",
      "We work with brands that offer real value but struggle to communicate it online. Our role is to bring clarity to the message, structure to the strategy and consistency to how businesses show up. Because when those three things are aligned, everything changes.",
      "Sparkline was created after years of working inside a growing business and seeing firsthand how easily strong work gets overlooked when marketing lacks clarity. The problem was never the service or the effort. It was the message. Businesses were doing everything right but showing up online without direction, consistency or confidence.",
      "From that experience we learned that real growth does not come from chasing trends or jumping into ads too early. It comes from having a clear message, a strategy that fits the stage of your business and a presence that people can trust.",
      "Today Sparkline exists to help businesses grow in a way that feels aligned, intentional and sustainable. We are based in Atlanta, Georgia and proud to work with businesses across the United States and beyond, including clients as far as Bermuda. Wherever you are building, we are here to help you show up with clarity, consistency and confidence."
    ],
  },
  foundersSection: {
    _type: "object",
    eyebrow: "Meet the founders",
    title: "Two partners building with intention.",
    founders: [
      {
        _type: "object",
        _key: "founder-ashlan",
        name: "Ashlan Leazer",
        portrait: "/images/about-ashlan-leazer.jpeg",
        portraitWidth: 1600,
        portraitHeight: 1600,
        bio: [
          "The title that means the most to me has nothing to do with marketing. It is Aunt Sassy. My nieces gave me that name, and being their aunt has shaped the way I approach both life and work. Family has always been my foundation, teaching me the value of showing up, paying attention, and caring deeply about the people around me.",
          "I am a self-taught marketer, designer, and creative strategist. My path was built through curiosity, experience, and a commitment to learning by doing. Over the years, I discovered that lasting results come from consistency, thoughtful strategy, and genuine effort.",
          "Early in my career, I helped build the marketing foundation for a company that moved from relying on paid advertising to generating steady organic growth. That experience showed me the power of building something sustainable rather than chasing short-term wins.",
          "I later co-founded Sparkline Marketing Firm with my sister, Ruby. Together, we built a business focused on trust, creativity, and meaningful growth. We care about helping business owners create brands that feel authentic and reflect who they truly are.",
          "If we work together, you can expect someone who brings creativity, attention to detail, and a genuine commitment to helping your business grow for the long run.",
        ],
        imageSide: "left",
        imageClassName: "scale-[1.08]",
      },
      {
        _type: "object",
        _key: "founder-ruby",
        name: "Ruby Leazer",
        portrait: "/images/about-second-founder.jpeg",
        portraitWidth: 1200,
        portraitHeight: 1600,
        bio: [
          "I love what I do and I love the people I get to do it with even more. I come from a big family and I was taught early on that the way you show up for people matters. That has never left me.",
          "Travel has always been my thing. Every place I visit I find myself completely absorbed in how people live, what they value and how they tell their story. I carry that same curiosity into every business I work with.",
          "One of the projects closest to my heart was working alongside a pastor and his church in Bermuda. We built their website from the ground up and captured the warmth, the color and the vibrant culture of the island and made someone feel it the second they landed on the page. When we got it right it did not just look good. It felt like them.",
          "I studied Marketing at the University of Alabama and spent my early career as a Marketing Specialist learning how businesses actually grow from the inside out. Not from textbooks but from being in the room where the real decisions were made. That foundation is what eventually led me to cofound Sparkline with my sister Ashlan, which is honestly the thing I am most proud of in my life. Not just because of what we have built but because of who I get to build it with every single day.",
          "If you work with me you are getting someone who is genuine, who actually cares about your business and who is all in from day one. That is just how I am wired.",
        ],
        imageSide: "right",
      },
    ]
  },
  gallerySection: [
    {
      _type: "object",
      _key: "gallery-1",
      src: "/images/about-founders-first.png",
      alt: "Outdoor Sparkline founder moment",
      width: 4032,
      height: 3024,
      caption: "Real moments behind the work.",
    },
    {
      _type: "object",
      _key: "gallery-2",
      src: "/images/about-founders-birthday.jpg",
      alt: "Ashlan and Ruby Leazer celebrating together",
      width: 2048,
      height: 1365,
      caption: "Built together, with heart.",
    },
    {
      _type: "object",
      _key: "gallery-3",
      src: "/images/about-gallery-2760.jpg",
      alt: "Sparkline family portrait outdoors",
      width: 1800,
      height: 1257,
      caption: "Family first, always.",
    },
    {
      _type: "object",
      _key: "gallery-4",
      src: "/images/about-gallery-3600.jpg",
      alt: "Quiet at-home Sparkline moment",
      width: 1350,
      height: 1800,
      caption: "Grounded in everyday care.",
    },
    {
      _type: "object",
      _key: "gallery-5",
      src: "/images/about-gallery-4749.jpg",
      alt: "Sparkline family moment in the mountains",
      width: 1800,
      height: 1200,
      caption: "Joy we carry forward.",
    },
    {
      _type: "object",
      _key: "gallery-6",
      src: "/images/about-gallery-6945.jpg",
      alt: "Ashlan and Ruby Leazer at dinner",
      width: 1800,
      height: 1350,
      caption: "Sisters beyond the screen.",
    },
    {
      _type: "object",
      _key: "gallery-7",
      src: "/images/about-gallery-7356.jpg",
      alt: "Sparkline travel memory",
      width: 1350,
      height: 1800,
      caption: "Inspired by every place.",
    },
    {
      _type: "object",
      _key: "gallery-8",
      src: "/images/about-gallery-9541.jpg",
      alt: "Sparkline founder memory",
      width: 1350,
      height: 1800,
      caption: "Care shows up everywhere.",
    },
  ],
};

const contactPageDoc = {
  _type: "contactPage",
  _id: "contactPage",
  seo: {
    _type: "seo",
    title: "Contact — Sparkline Marketing Firm",
    description: "Get in touch with us.",
  },
  contactDetails: {
    _type: "object",
    phone: "(470) 841-2335",
    email: "info@sparklinemarketingfirm.com",
    location: "524 Sawnee Village Boulevard, Cumming, Georgia 30040",
  },
};

async function migrate() {
  console.log("Migrating Home Page...");
  await client.createOrReplace(homePageDoc);
  await client.createOrReplace({ ...homePageDoc, _id: "drafts.homePage" });
  
  console.log("Migrating About Page...");
  await client.createOrReplace(aboutPageDoc);
  await client.createOrReplace({ ...aboutPageDoc, _id: "drafts.aboutPage" });

  console.log("Migrating Contact Page...");
  await client.createOrReplace(contactPageDoc);
  await client.createOrReplace({ ...contactPageDoc, _id: "drafts.contactPage" });

  console.log("Migration Complete!");
}

migrate().catch(console.error);
