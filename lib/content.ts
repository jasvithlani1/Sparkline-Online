export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About Us", href: "#about-us" },
  { label: "Contact Us", href: "#contact-us" },
  { label: "Blogs", href: "#blogs" },
  { label: "Reviews", href: "#reviews" },
] as const;

export const featuredIntro = {
  title: [
    "Haven Demo:",
    "In-space testbed for",
    "Haven-1 space station",
    "technologies",
  ],
  body:
    "In November 2025, Haven Demo marked a major milestone with a successful deployment on the Bandwagon-4 rideshare mission. The mission reached its intended outcome in orbit, confirming that the platform performed as planned after deployment. That result turned a key launch moment into a clear operational success for the program. It also marked an important step forward for Haven Demo as the work continues.",
  cta: "Learn more",
};

export const trustedBy = {
  eyebrow: "Trusted by the bold",
  lines: [
    "From breakout startups to industry giants,",
    "we partner with ambitious companies looking to",
    "shape the future.",
  ],
  logos: [
    "Antimetal",
    "Blackalgo",
    "Clearbit",
    "clerk",
    "CryptoSea",
    "Dimension",
    "formcarry.",
    "foreplay",
    "Index",
    "Klarna.",
    "Mintlify",
    "Plasmic",
    "PodcastAI",
    "wiza",
    "wope",
    "WorkOS",
  ],
};

export const serviceOptions = [
  {
    id: "strategy",
    title: "Strategy",
    description: "Helping you with top notch strategy for GTM",
  },
  {
    id: "story-voice",
    title: "Story/ Voice",
    description: "Create the brand story and brand voice",
  },
  {
    id: "design",
    title: "Design",
    description: "Help the company in creative way",
  },
  {
    id: "development",
    title: "Development",
    description: "Develop products, websites and manage them for you",
  },
  {
    id: "media-video",
    title: "Media & video",
    description: "Content, social media, videography anything you ask for",
  },
] as const;

export const workGallery = {
  eyebrow: "OUR WORK",
  lines: [
    "A selection of the best projects",
    "crafted by the OUR team.",
  ],
  projects: [
    {
      id: "firecrawl-1",
      name: "Firecrawl",
      date: "September 4, 2025",
      meta: "Website · Branding",
      description:
        "A sharper launch-ready web presence built to make the product story easier to trust, share, and remember across every touchpoint.",
      ctaLabel: "View Project",
      image: "/images/work-firecrawl.png",
      imageClassName: "object-contain object-center scale-[1.12]",
    },
    {
      id: "blackalgo-1",
      name: "Blackalgo",
      date: "August 19, 2025",
      meta: "Website · Branding · Product",
      description:
        "An editorial product showcase designed to present the brand with more conviction, clarity, and momentum from first impression to final CTA.",
      ctaLabel: "View Project",
      image: "/images/work-blackalgo.png",
      imageClassName: "object-cover object-center",
    },
    {
      id: "firecrawl-2",
      name: "Firecrawl",
      date: "July 8, 2025",
      meta: "Website · Branding",
      description:
        "A campaign-ready adaptation of the same visual system, tuned for a more immersive project narrative and stronger motion-led presentation.",
      ctaLabel: "View Project",
      image: "/images/work-firecrawl.png",
      imageClassName: "object-contain object-center scale-[1.12]",
    },
    {
      id: "blackalgo-2",
      name: "Blackalgo",
      date: "June 13, 2025",
      meta: "Website · Branding · Product",
      description:
        "A wider editorial treatment that gives the product more room to breathe while keeping the brand language crisp, premium, and highly legible.",
      ctaLabel: "View Project",
      image: "/images/work-blackalgo.png",
      imageClassName: "object-cover object-center",
    },
  ],
  cta: {
    label: "View All Projects",
    href: "#portfolio",
  },
} as const;

export const footerContent = {
  companyHeading: "Company",
  company: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "#about-us" },
    { label: "FAQ", href: "#faq" },
  ],
  getInTouchHeading: "Get in Touch",
  getInTouch: [
    { label: "Mail Us", href: "mailto:hello@sparklinemarketingfirm.com" },
    { label: "Contact Us", href: "#contact-us" },
  ],
  backgroundHeading: "Background",
  background: {
    body: "Sparkling Marketing Firm is a Specialized marketing firm where creativity and marketing is supercharged.",
    socialsLabel: "Connect with us on our socials.",
  },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com" },
    { label: "Pinterest", href: "https://www.pinterest.com" },
  ],
  legal: {
    copyright: "©2026 SPARKLINE MARKETING FIRM All Rights Reserved.",
    links: [
      { label: "Privacy Policy", href: "#privacy-policy" },
      { label: "Terms of Service", href: "#terms-of-service" },
      { label: "Accessibility", href: "#accessibility" },
    ],
  },
} as const;
