export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About Us", href: "#about-us" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const featuredIntro = {
  title: [
    "Haven Demo:",
    "In-space testbed for",
    "Haven-1 space station",
    "technologies",
  ],
  body: [
    "SPARKLINE MARKETING FIRM helps ambitious businesses build stronger brands, reach the right audience, and turn digital presence into measurable growth. We deliver strategic, creative, and performance-focused solutions that help companies stand out, build credibility, and connect with customers in meaningful and lasting ways.",
    "Our expertise spans Digital Marketing, Brand Strategy, Website Design & Development, Branding & Design, Social Media, and Content Creation. Every solution is tailored to your goals, combining insight, innovation, and execution to create a consistent brand experience. With SPARKLINE MARKETING FIRM, you gain a trusted creative and strategic partner dedicated to helping your business grow with confidence in a competitive digital landscape.",
  ],
  cta: "Learn more",
};

export const trustedBy = {
  eyebrow: "TRUSTED BY VISIONARY BRANDS",
  lines: [
    "From emerging businesses to established industry leaders,",
    "we partner with ambitious companies focused on driving",
    "growth and shaping the future.",
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

export const ourServices = {
  eyebrow: "OUR SERVICES",
  intro: [
    "SPARKLINE MARKETING FIRM delivers strategic and creative solutions designed to help businesses grow with confidence in a competitive digital landscape. Our services are built to create a strong, consistent brand presence while supporting long-term business goals through purposeful execution and measurable impact.",
    "From Digital Marketing and Brand Strategy to Website Design & Development, we help brands build visibility, define their market position, and create meaningful customer experiences. Our team focuses on developing tailored strategies and high-performing digital platforms that strengthen credibility and drive engagement.",
    "We also specialise in Branding & Design, Social Media, and Content Creation to ensure your business communicates with clarity and consistency across every touchpoint. Whether you need a stronger visual identity, a more engaging online presence, or content that connects with the right audience, SPARKLINE MARKETING FIRM provides integrated solutions that bring strategy, creativity, and performance together to help your brand stand out and grow with lasting impact.",
  ],
  cards: [
    {
      id: "strategy-media",
      title: "Digital\nMarketing",
      items: [
        "Search Marketing",
        "Paid Advertising",
        "Email Campaigns",
        "Lead Generation",
        "Conversion Optimisation",
        "Marketing Analytics",
        "Audience Targeting",
        "Campaign Strategy",
        "Funnel Planning",
        "Performance Reporting",
      ],
    },
    {
      id: "website-development",
      title: "Website Design\n& Development",
      items: [
        "UX Design",
        "UI Design",
        "Responsive Design",
        "Custom Development",
        "Landing Pages",
        "eCommerce Development",
        "CMS Integration",
        "Website Maintenance",
        "Performance Optimisation",
        "Website Redesign",
      ],
    },
    {
      id: "branding-design",
      title: "Content\nCreation",
      items: [
        "Website Copy",
        "Blog Writing",
        "Social Content",
        "Ad Copy",
        "Brand Messaging",
        "Video Scripts",
        "Email Content",
        "SEO Content",
        "Creative Copy",
        "Content Strategy",
      ],
    },
    {
      id: "video-production",
      title: "Social Media\nManagement",
      items: [
        "Content Planning",
        "Post Scheduling",
        "Audience Engagement",
        "Community Management",
        "Social Campaigns",
        "Profile Optimisation",
        "Hashtag Strategy",
        "Performance Tracking",
        "Trend Monitoring",
        "Monthly Reporting",
      ],
    },
    {
      id: "digital-email",
      title: "Branding\n& Design",
      items: [
        "Logo Design",
        "Visual Identity",
        "Brand Guidelines",
        "Creative Direction",
        "Typography Systems",
        "Colour Palette",
        "Brand Collateral",
        "Design Systems",
        "Marketing Assets",
        "Visual Consistency",
      ],
    },
    {
      id: "programmatic-solutions",
      title: "Brand\nStrategy",
      items: [
        "Brand Positioning",
        "Market Research",
        "Audience Analysis",
        "Competitive Analysis",
        "Messaging Framework",
        "Voice Development",
        "Growth Planning",
        "Go-To-Market",
        "Campaign Direction",
        "Strategic Planning",
      ],
    },
  ],
  ctaLabel: "Learn More",
} as const;

export const serviceDetails = {
  "strategy-media": {
    slug: "strategy-media",
    eyebrow: "STRATEGY & MEDIA",
    title: "Every great campaign begins with strategy.",
    lead:
      "A sharp value proposition is the engine behind every brand that cuts through. Before we design a pixel or place a dollar, we pressure-test who you are, who you're for, and why anyone should care.",
    intro:
      "Brand, voice, campaigns, and channel planning should all reinforce one central idea. We run discovery, audience research, and competitive analysis to isolate that idea — then build a plan that turns it into measurable growth.",
    whyUs: {
      heading: "Why SPARKLINE MARKETING FIRM",
      body:
        "We've partnered with founder-led startups and category leaders alike, shaping launches, repositionings, and full go-to-market rollouts. Every engagement is led by senior strategists — no handoffs, no junior-only rooms.",
    },
    problems: {
      heading: "What We Improve",
      items: [
        "Nobody knows who you are in a crowded category.",
        "You're launching a product and need a narrative people actually remember.",
        "Market share is slipping to a louder competitor.",
        "Your paid spend isn't tied to a clear funnel.",
        "You can't hire the talent you want because the story isn't sharp.",
        "Internal teams disagree on what the brand even stands for.",
        "ROI is a guess, not a dashboard.",
        "You're in every channel and winning in none of them.",
      ],
    },
    cornerstones: {
      heading: "What We Build On",
      items: [
        "Business goals and KPIs",
        "Audience segments and jobs-to-be-done",
        "Brand origin and point of view",
        "Competitive positioning",
        "Channel and media architecture",
        "Messaging pillars",
        "Success metrics",
      ],
    },
    process: {
      heading: "How We Build",
      body:
        "Discovery workshops, stakeholder interviews, analytics audits, and competitive teardowns feed a single strategy doc your team can actually use. We stand it up, then stay close — quarterly reviews, live dashboards, and tight feedback loops with creative and media.",
    },
    cta: {
      heading: "Ready to sharpen the story?",
      body:
        "Most teams have the product. They just need the plan. Let's build yours.",
    },
  },
  "website-development": {
    slug: "website-development",
    eyebrow: "WEBSITE DESIGN & DEVELOPMENT",
    title: "Websites designed to impress, perform, and convert.",
    lead:
      "At SPARKLINE MARKETING FIRM, we create websites that do more than look good. Our website design and development services focus on building modern, user-friendly, and responsive websites that reflect your brand professionally.",
    intro:
      "We combine clean design, smooth functionality, and strategic structure to help your business attract attention, improve user experience, and drive meaningful conversions online.",
    whyUs: {
      heading: "Why SPARKLINE MARKETING FIRM",
      body:
        "Creative design, strategic thinking, and seamless development come together to build websites that look professional, perform smoothly, and support real business growth. We focus on user experience, brand consistency, and conversion-driven results.",
    },
    problems: {
      heading: "What We Improve",
      items: [
        "Outdated website design affecting brand credibility badly",
        "Poor mobile responsiveness reducing user experience quality",
        "Slow loading speeds causing visitors to leave",
        "Confusing navigation making information hard to find",
        "Low conversions despite steady website traffic",
        "Weak branding creating an inconsistent online presence",
        "Poor user engagement across important website pages",
        "Difficult content updates without technical support",
      ],
    },
    cornerstones: {
      heading: "What We Build On",
      items: [
        "UX research and site planning",
        "Responsive and accessible website design",
        "Clean layouts and intuitive navigation",
        "Custom development and CMS integration",
        "Fast loading speed and performance",
        "SEO-friendly structure and on-page setup",
        "Testing, launch support, and monitoring",
      ],
    },
    specialties: [
      "User Experience (UX) Design",
      "User Interface (UI) Design",
      "Responsive Website Design",
      "Website Animation Design",
      "Custom Web Development",
      "Creative Web Design",
      "High-Converting Landing Pages",
      "eCommerce Website Development",
    ],
    process: {
      heading: "How We Build",
      body:
        "We begin by understanding your goals, audience, and website needs, then move into strategic design and development. From the start, you see a clear, functional website taking shape with purpose.",
    },
    faq: [
      {
        id: "services",
        question: "What website design and development services does SPARKLINE MARKETING FIRM offer?",
        answer:
          "SPARKLINE MARKETING FIRM offers custom website design, responsive development, landing page creation, eCommerce website development, user experience improvements, and website performance optimization tailored to your business goals.",
      },
      {
        id: "responsive",
        question: "Will my website be mobile-friendly?",
        answer:
          "Yes, every website is designed to be fully responsive, ensuring it looks professional and functions smoothly across desktops, tablets, and mobile devices.",
      },
      {
        id: "redesign",
        question: "Can you redesign my existing website?",
        answer:
          "Yes, we can redesign outdated websites to improve visual appeal, functionality, user experience, and overall performance while aligning the design with your current brand identity.",
      },
      {
        id: "timeline",
        question: "How long does it take to build a website?",
        answer:
          "The timeline depends on the size, features, and complexity of the project. A standard business website usually takes a few weeks, while larger or custom websites may require more time.",
      },
      {
        id: "custom-vs-template",
        question: "Do you create custom websites or use templates?",
        answer:
          "We focus on creating strategic, professionally designed websites that reflect your brand and business needs. Depending on the project, we may use a custom approach or a tailored framework.",
      },
      {
        id: "ecommerce",
        question: "Can you build eCommerce websites?",
        answer:
          "Yes, we develop eCommerce websites that are visually appealing, easy to manage, and designed to provide a smooth shopping experience for your customers.",
      },
      {
        id: "performance",
        question: "Will my website be optimized for speed and performance?",
        answer:
          "Yes, we build websites with clean structure, optimized elements, and performance-focused practices to help improve loading speed and overall user experience.",
      },
      {
        id: "self-update",
        question: "Can I update the website myself after launch?",
        answer:
          "Yes, we can build your website on a user-friendly platform that allows you to manage content, update text, add images, and make basic changes easily.",
      },
      {
        id: "seo",
        question: "Do you also help with SEO during website development?",
        answer:
          "Yes, we follow SEO-friendly website structure practices, including clean coding, organized page layouts, mobile responsiveness, and other foundations that support better search visibility.",
      },
      {
        id: "why-us",
        question: "Why should I choose SPARKLINE MARKETING FIRM for website design and development?",
        answer:
          "SPARKLINE MARKETING FIRM combines creative design, strategic thinking, and functional development to build websites that not only look professional but also support business growth and conversions.",
      },
    ],
    cta: {
      heading: "Ready for a website that performs with purpose?",
      body:
        "Bring your vision to life with strategic design, expert development, seamless CMS integration, and performance-driven analytics.",
      label: "Contact Now",
    },
  },
  "branding-design": {
    slug: "branding-design",
    eyebrow: "BRANDING & DESIGN",
    title: "Brands people actually remember.",
    lead:
      "A brand is more than a logo — it's the compounding asset every other investment rides on. We build identities with a point of view, a voice, and the discipline to hold up across every surface.",
    intro:
      "Most brands blend in because they were never defined past a moodboard. We go deep on story, visual system, and verbal identity — then hand you the toolkit and training to keep it coherent as you grow.",
    whyUs: {
      heading: "Why SPARKLINE MARKETING FIRM",
      body:
        "A studio-sized team with agency range. Our senior creative directors have shaped brands from seed to Series C and rebranded public companies without losing what made them work.",
    },
    problems: {
      heading: "What We Improve",
      items: [
        "Your brand looks different on every surface.",
        "The identity hasn't kept up with the product.",
        "You're pre-launch and need a full visual and verbal system.",
        "Team can't describe the brand in one sentence without arguing.",
        "Competitors are starting to look identical — and you're one of them.",
        "Sales collateral, pitch decks, and the site feel like three different companies.",
      ],
    },
    cornerstones: {
      heading: "What We Build On",
      items: [
        "Brand strategy and positioning",
        "Verbal identity and messaging",
        "Logo and wordmark system",
        "Typography and color systems",
        "Iconography and illustration",
        "Motion principles",
        "Guidelines and team training",
      ],
    },
    process: {
      heading: "How We Build",
      body:
        "Immersion workshops, competitive audits, and audience research feed a positioning brief. From there it's identity exploration, system design, and rollout — with your team in the room at every milestone so nothing lands cold.",
    },
    cta: {
      heading: "Ready to build something people remember?",
      body:
        "Whether it's a new mark or a full overhaul, we'll make sure it's worth switching to.",
    },
  },
  "video-production": {
    slug: "video-production",
    eyebrow: "VIDEO PRODUCTION",
    title: "Video that earns the watch.",
    lead:
      "Attention is the scarcest resource in marketing. We make video that holds it — from brand films and product launches to social-first edits built for the feed.",
    intro:
      "Concept, script, shoot, edit, motion, sound — handled in-house by a crew that's done this at every budget level. We plan around the story, not the other way around.",
    whyUs: {
      heading: "Why SPARKLINE MARKETING FIRM",
      body:
        "Directors, writers, and animators who've shipped campaigns for consumer brands, B2B SaaS, and entertainment. We match the format and tone to the channel — not just the brief.",
    },
    problems: {
      heading: "What We Improve",
      items: [
        "You have a product launch and nothing to show it with.",
        "Your paid ads rely on the same tired stock footage.",
        "Sales needs case study and testimonial video — fast.",
        "Events and trade shows need loop reels and sizzle.",
        "YouTube and social channels have no consistent rhythm.",
        "Internal comms video looks ten years older than it needs to.",
      ],
    },
    cornerstones: {
      heading: "What We Build On",
      items: [
        "Concept and script development",
        "Storyboarding and pre-production",
        "Cinematography and directing",
        "2D and 3D animation",
        "Motion graphics and VFX",
        "Sound design and scoring",
        "Post, color, and platform delivery",
      ],
    },
    process: {
      heading: "How We Build",
      body:
        "We scope against the story, not the shot list. Once the concept is approved we run a tight production calendar — pre-pro, shoot days, edits — with clear checkpoints and revision rounds baked in.",
    },
    cta: {
      heading: "Roll tape?",
      body:
        "Tell us what you're launching. We'll tell you what we'd shoot.",
    },
  },
  "digital-email": {
    slug: "digital-email",
    eyebrow: "DIGITAL & EMAIL",
    title: "Performance channels, run by people who read the data.",
    lead:
      "Paid, SEO, email, and lifecycle — connected, measured, and optimized as one system. We treat media as a product team, not a monthly report.",
    intro:
      "Campaigns, creative, targeting, and tracking are one loop. We build it end-to-end — audience research through to attribution — so the investment compounds instead of leaking.",
    whyUs: {
      heading: "Why SPARKLINE MARKETING FIRM",
      body:
        "A media team that writes the ads, builds the landing pages, and reads the dashboards. Nothing is outsourced to a black box and the numbers are the numbers.",
    },
    problems: {
      heading: "What We Improve",
      items: [
        "CAC keeps climbing and you can't pinpoint why.",
        "SEO stagnated after the last core update.",
        "Email feels like a newsletter instead of a revenue channel.",
        "Creative testing is ad-hoc with no structure.",
        "Attribution is a guess across Meta, Google, and GA4.",
        "Agency reporting never matches your CRM.",
      ],
    },
    cornerstones: {
      heading: "What We Build On",
      items: [
        "SEO and content strategy",
        "Paid search and shopping",
        "Paid social and creative testing",
        "YouTube and display",
        "Email and lifecycle",
        "Landing page and CRO",
        "Measurement and attribution",
      ],
    },
    process: {
      heading: "How We Build",
      body:
        "Week-one audit across every channel, funnel, and tracking layer. We rebuild what's broken, plan the 90-day sprint, and run weekly optimization standups with your team.",
    },
    cta: {
      heading: "Ready to stop guessing?",
      body:
        "Send us the dashboards. We'll send back a plan.",
    },
  },
  "programmatic-solutions": {
    slug: "programmatic-solutions",
    eyebrow: "PROGRAMMATIC SOLUTIONS",
    title: "Omnichannel media, bought intelligently.",
    lead:
      "CTV, OTT, audio, display, and mobile — bought programmatically with real audiences and real attribution. We plan media like a portfolio, not a media plan.",
    intro:
      "Programmatic is only powerful if the targeting, creative, and measurement are all running in the same loop. We stand up the stack, run the campaigns, and give you a reporting view your CFO will actually believe.",
    whyUs: {
      heading: "Why SPARKLINE MARKETING FIRM",
      body:
        "Independent media buyers with deep DSP experience across The Trade Desk, DV360, and Amazon. Transparent fees, transparent data, no resold inventory.",
    },
    problems: {
      heading: "What We Improve",
      items: [
        "Linear TV is shrinking and you need a real CTV strategy.",
        "Awareness campaigns don't connect to conversion data.",
        "Targeting is too broad and burning budget.",
        "You've got retail, B2B, and brand layers with no shared plan.",
        "Frequency is out of control on one channel and zero on another.",
        "Measurement is disconnected from the buying platform.",
      ],
    },
    cornerstones: {
      heading: "What We Build On",
      items: [
        "CTV and OTT planning",
        "Programmatic display and native",
        "Digital audio and podcast",
        "Retargeting and audience curation",
        "Addressable and geo-targeted",
        "Brand lift and incrementality",
        "Transparent reporting and reconciliation",
      ],
    },
    process: {
      heading: "How We Build",
      body:
        "We model the media mix, set up the DSP and pixels, launch with clean creative, and optimize weekly against business outcomes — not just vanity metrics.",
    },
    cta: {
      heading: "Ready for media that moves the P&L?",
      body:
        "Share the goal and the budget. We'll show you what the plan looks like.",
    },
  },
} as const;

export type ServiceDetailSlug = keyof typeof serviceDetails;

export const faqSection = {
  eyebrow: "FAQ",
  lines: [
    "Answers to the questions we hear most from founders, marketers, and teams considering working with us.",
  ],
  items: [
    {
      id: "services",
      question: "What services does SPARKLINE MARKETING FIRM offer?",
      answer:
        "SPARKLINE MARKETING FIRM offers Digital Marketing, Brand Strategy, Website Design & Development, Branding & Design, Social Media, and Content Creation to help businesses grow their visibility, strengthen their brand, and achieve measurable results.",
    },
    {
      id: "growth",
      question: "How can SPARKLINE MARKETING FIRM help my business grow?",
      answer:
        "We help businesses grow by creating strategic marketing solutions that improve brand positioning, attract the right audience, increase engagement, and support long-term business success across digital platforms.",
    },
    {
      id: "customised",
      question: "Do you provide customised marketing solutions for different industries?",
      answer:
        "Yes, SPARKLINE MARKETING FIRM develops tailored strategies based on your business goals, target audience, and industry requirements to ensure every solution is relevant, effective, and results-driven.",
    },
    {
      id: "brand-and-web",
      question: "Can you handle both branding and website development together?",
      answer:
        "Absolutely. We provide integrated branding and website design solutions so your business can maintain a consistent identity, professional appearance, and strong digital presence across every touchpoint.",
    },
    {
      id: "why-us",
      question: "Why should I choose SPARKLINE MARKETING FIRM?",
      answer:
        "SPARKLINE MARKETING FIRM combines strategy, creativity, and execution to deliver professional marketing solutions that help businesses stand out, connect with customers, and grow with confidence.",
    },
  ],
} as const;

export const serviceOptions = [
  {
    id: "strategy",
    title: "Digital Marketing",
    description: "Drive targeted traffic, boost visibility, and generate leads strategically.",
  },
  {
    id: "story-voice",
    title: "Website Design & Development",
    description: "Build modern, user-focused websites that convert visitors into customers.",
  },
  {
    id: "design",
    title: "Content Creation",
    description: "Create compelling content that connects and drives action.",
  },
  {
    id: "development",
    title: "Social Media Management",
    description: "Strengthen your presence through strategic social media.",
  },
  {
    id: "media-video",
    title: "Branding & Design",
    description: "Build a powerful brand identity with creative consistency.",
  },
  {
    id: "brand-strategy",
    title: "Brand Design",
    description: "Create clear brand direction for lasting growth.",
  },
] as const;

export const workGallery = {
  eyebrow: "WORK HIGHLIGHTS",
  lines: [
    "Explore a selection of standout projects delivered by our team,",
    "showcasing strategic thinking, creative excellence,",
    "and results-driven execution.",
  ],
  projects: [
    {
      id: "firecrawl-1",
      slug: "firecrawl-launch",
      name: "Firecrawl",
      date: "September 4, 2025",
      meta: "Website · Branding",
      description:
        "A sharper launch-ready web presence built to make the product story easier to trust, share, and remember across every touchpoint.",
      ctaLabel: "View Project",
      image: "/images/work-firecrawl.png",
      imageClassName: "object-contain object-center scale-[1.12]",
      intro:
        "Firecrawl needed a launch site that did more than describe the product — it had to make a noisy category feel simple and make the product feel inevitable. We rebuilt the narrative, system, and surface in parallel so every page reinforced the same promise.",
      tagline: "CLARITY AT LAUNCH",
      summary:
        "Our team took Firecrawl's dense technical story and translated it into a tightly scoped website that leads with the outcome, proves it with real examples, and gets out of the way. The result is a site that holds up at the top of the funnel and still rewards the reader who goes deep.",
      services: [
        "Brand Strategy",
        "Visual Identity",
        "Website Design",
        "Web Development",
        "Copywriting",
        "Motion",
      ],
      sections: [
        {
          heading: "Homepage",
          type: "image" as const,
          images: [
            {
              src: "/images/work-firecrawl.png",
              alt: "Firecrawl homepage screen",
              className: "object-contain object-center",
            },
          ],
        },
        {
          heading: "Product Pages",
          type: "image" as const,
          images: [
            {
              src: "/images/work-firecrawl.png",
              alt: "Firecrawl product page screen",
              className: "object-contain object-center",
            },
          ],
        },
        {
          heading: "Visual System",
          type: "grid" as const,
          images: [
            {
              src: "/images/work-firecrawl.png",
              alt: "Visual identity sample 1",
              className: "object-contain object-center",
            },
            {
              src: "/images/work-firecrawl.png",
              alt: "Visual identity sample 2",
              className: "object-contain object-center",
            },
            {
              src: "/images/work-firecrawl.png",
              alt: "Visual identity sample 3",
              className: "object-contain object-center",
            },
          ],
        },
      ],
    },
    {
      id: "blackalgo-1",
      slug: "blackalgo-showcase",
      name: "Blackalgo",
      date: "August 19, 2025",
      meta: "Website · Branding · Product",
      description:
        "An editorial product showcase designed to present the brand with more conviction, clarity, and momentum from first impression to final CTA.",
      ctaLabel: "View Project",
      image: "/images/work-blackalgo.png",
      imageClassName: "object-cover object-center",
      intro:
        "Blackalgo came to us mid-scale, with a serious product and a brand that didn't yet match its ambition. We reshaped how the company looks, sounds, and moves online — turning the homepage into a statement of intent and the product pages into closers.",
      tagline: "EDITORIAL CONVICTION",
      summary:
        "We gave Blackalgo a voice with a point of view and a visual system that reads as confident without shouting. Every section was designed to move a specific kind of reader one step closer to a conversation with the team.",
      services: [
        "Brand Positioning",
        "Visual Identity",
        "Website Design",
        "Web Development",
        "Product UI",
        "Copywriting",
      ],
      sections: [
        {
          heading: "Homepage",
          type: "image" as const,
          images: [
            {
              src: "/images/work-blackalgo.png",
              alt: "Blackalgo homepage",
              className: "object-cover object-center",
            },
          ],
        },
        {
          heading: "Product Surface",
          type: "image" as const,
          images: [
            {
              src: "/images/work-blackalgo.png",
              alt: "Blackalgo product UI",
              className: "object-cover object-center",
            },
          ],
        },
        {
          heading: "Brand System",
          type: "grid" as const,
          images: [
            {
              src: "/images/work-blackalgo.png",
              alt: "Brand system 1",
              className: "object-cover object-center",
            },
            {
              src: "/images/work-blackalgo.png",
              alt: "Brand system 2",
              className: "object-cover object-center",
            },
            {
              src: "/images/work-blackalgo.png",
              alt: "Brand system 3",
              className: "object-cover object-center",
            },
          ],
        },
      ],
    },
    {
      id: "firecrawl-2",
      slug: "firecrawl-campaign",
      name: "Firecrawl",
      date: "July 8, 2025",
      meta: "Website · Branding",
      description:
        "A campaign-ready adaptation of the same visual system, tuned for a more immersive project narrative and stronger motion-led presentation.",
      ctaLabel: "View Project",
      image: "/images/work-firecrawl.png",
      imageClassName: "object-contain object-center scale-[1.12]",
      intro:
        "A campaign extension of the core Firecrawl site, built to carry a specific launch story across paid, organic, and owned surfaces with the same visual language turned up a notch.",
      tagline: "THE CAMPAIGN CUT",
      summary:
        "We stretched the Firecrawl system into motion-led hero moments, paired landing pages, and social-native assets so a single narrative could run everywhere the audience was already looking — without diluting the core brand.",
      services: [
        "Campaign Strategy",
        "Landing Pages",
        "Motion Design",
        "Social Assets",
        "Copywriting",
      ],
      sections: [
        {
          heading: "Campaign Hero",
          type: "image" as const,
          images: [
            {
              src: "/images/work-firecrawl.png",
              alt: "Campaign hero",
              className: "object-contain object-center",
            },
          ],
        },
        {
          heading: "Landing Pages",
          type: "grid" as const,
          images: [
            {
              src: "/images/work-firecrawl.png",
              alt: "Landing page variant 1",
              className: "object-contain object-center",
            },
            {
              src: "/images/work-firecrawl.png",
              alt: "Landing page variant 2",
              className: "object-contain object-center",
            },
            {
              src: "/images/work-firecrawl.png",
              alt: "Landing page variant 3",
              className: "object-contain object-center",
            },
          ],
        },
      ],
    },
    {
      id: "blackalgo-2",
      slug: "blackalgo-editorial",
      name: "Blackalgo",
      date: "June 13, 2025",
      meta: "Website · Branding · Product",
      description:
        "A wider editorial treatment that gives the product more room to breathe while keeping the brand language crisp, premium, and highly legible.",
      ctaLabel: "View Project",
      image: "/images/work-blackalgo.png",
      imageClassName: "object-cover object-center",
      intro:
        "An editorial expansion of the Blackalgo brand, built to let the product lead while the surrounding typography, spacing, and rhythm quietly elevate it into something that reads as premium on first glance.",
      tagline: "ROOM TO BREATHE",
      summary:
        "We slowed the site down on purpose — larger type, deeper whitespace, tighter pairings — so the product screens could occupy the page with confidence. The result still converts, but it also reads like a piece of considered editorial work.",
      services: [
        "Editorial Direction",
        "Typographic System",
        "Website Design",
        "Web Development",
        "Photography Art Direction",
      ],
      sections: [
        {
          heading: "Homepage",
          type: "image" as const,
          images: [
            {
              src: "/images/work-blackalgo.png",
              alt: "Homepage editorial layout",
              className: "object-cover object-center",
            },
          ],
        },
        {
          heading: "Feature Pages",
          type: "image" as const,
          images: [
            {
              src: "/images/work-blackalgo.png",
              alt: "Feature detail page",
              className: "object-cover object-center",
            },
          ],
        },
        {
          heading: "Editorial Grid",
          type: "grid" as const,
          images: [
            {
              src: "/images/work-blackalgo.png",
              alt: "Editorial image 1",
              className: "object-cover object-center",
            },
            {
              src: "/images/work-blackalgo.png",
              alt: "Editorial image 2",
              className: "object-cover object-center",
            },
            {
              src: "/images/work-blackalgo.png",
              alt: "Editorial image 3",
              className: "object-cover object-center",
            },
          ],
        },
      ],
    },
  ],
  cta: {
    label: "View All Projects",
    href: "/portfolio",
  },
} as const;

export const blogPosts = [
  {
    id: "blog-1",
    slug: "how-to-build-a-high-converting-landing-page",
    title: "How to Build a High-Converting Landing Page",
    date: "March 28, 2026",
    category: "Marketing",
    description:
      "A practical breakdown of the elements that make landing pages convert — from layout hierarchy to micro-copy, backed by patterns we've seen across dozens of launches.",
    image: "/images/work-firecrawl.png",
    imageClassName: "object-contain object-center scale-[1.12]",
    body: "A landing page is the single most leveraged surface in a marketing funnel — it's the moment where a stranger decides whether your product is worth another click. High-converting pages share a disciplined structure: a promise above the fold that names the customer, their problem, and your specific mechanism for solving it, followed by proof, objection handling, and a low-friction path to act. Hierarchy matters more than cleverness — one dominant headline, one dominant call to action, and one dominant visual. Micro-copy on buttons, form fields, and sub-headlines quietly does half the convincing; generic copy like 'Submit' or 'Get Started' leaves conversion on the table. Pair that with fast loading, tight vertical rhythm, and social proof placed near decision points, and you'll consistently outperform pages that try to say everything at once.",
    videoId: "r2CbbBLVaPk",
  },
  {
    id: "blog-2",
    slug: "the-role-of-brand-voice-in-product-led-growth",
    title: "The Role of Brand Voice in Product-Led Growth",
    date: "March 14, 2026",
    category: "Branding",
    description:
      "Why a distinctive brand voice accelerates organic acquisition and how to develop one that resonates with your ideal customer profile without sounding generic.",
    image: "/images/work-blackalgo.png",
    imageClassName: "object-cover object-center",
    body: "Product-led growth is often framed as a distribution mechanic, but the companies that compound fastest are the ones whose voice is unmistakable the moment you land on their homepage or open their docs. Voice is what makes a feature announcement feel like news from a friend instead of a press release, and what turns a support article into something worth sharing. A strong voice comes from specificity — real opinions, concrete nouns, a willingness to sound like one person wrote it rather than a committee. The fastest way to develop one is to write how your best customer talks, record a few real conversations, and ruthlessly cut the generic SaaS filler. Consistency across product, docs, emails, and social compounds trust, and trust is what turns free users into champions who bring the next hundred accounts with them.",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: "blog-3",
    slug: "design-systems-that-scale-with-your-startup",
    title: "Design Systems That Scale With Your Startup",
    date: "February 20, 2026",
    category: "Design",
    description:
      "Lessons learned building design systems for fast-moving teams — what to standardize early, what to leave flexible, and how to keep velocity high.",
    image: "/images/work-firecrawl.png",
    imageClassName: "object-contain object-center scale-[1.12]",
    body: "The common failure mode of early-stage design systems is ambition — teams try to lock down everything and end up with a rigid library that fights every new feature. The systems that actually scale start small and earn their complexity: tokens for color, type, and spacing first, then a handful of primitives (button, input, surface, stack), and only then real components. Leave room for escape hatches — a documented way to override a token or build a one-off — so the system accelerates velocity instead of throttling it. Treat the design system like product infrastructure, not a style guide: version it, document breaking changes, and let the people building real features own the primitives they touch daily. The payoff isn't visual consistency for its own sake; it's the shipping speed your team inherits when every new screen starts from a known floor.",
    videoId: "wBUEp_vCHXM",
  },
  {
    id: "blog-4",
    slug: "video-content-strategy-for-b2b-saas-in-2026",
    title: "Video Content Strategy for B2B SaaS in 2026",
    date: "February 5, 2026",
    category: "Media & Video",
    description:
      "Short-form, long-form, product demos — which video formats actually drive pipeline for B2B companies and how to produce them without a massive budget.",
    image: "/images/work-blackalgo.png",
    imageClassName: "object-cover object-center",
    body: "B2B video in 2026 is no longer about polish — it's about signal density. The highest-performing formats aren't 60-second hero films; they're tight product walkthroughs, founder POVs shot on a phone, and 30-second demo clips that show exactly what the tool does and why it matters. Short-form lives on LinkedIn and YouTube Shorts, seeding awareness at the top of the funnel, while 8–15 minute long-form deep dives on YouTube convert researchers into qualified pipeline because they answer real questions buyers are already searching. The production bar that matters is clear audio, good framing, and ruthless editing — expensive cameras are optional, but respect for the viewer's time is not. Repurpose aggressively: every long-form video should spin out four to six short-form clips, a blog post, and a handful of social posts. That's how small teams produce the appearance of a much larger content engine.",
    videoId: "2lAe1cqCOXo",
  },
] as const;

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
    { label: "Contact Us", href: "/contact" },
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
