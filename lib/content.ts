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

export const ourServices = {
  eyebrow: "OUR SERVICES",
  intro:
    "Whether you are looking to launch a new website, update your image, or do a brand overhaul, we are the team for the job. Every mission begins by listening to your needs and thoroughly understanding what needs to be done. We work in partnership with you to formulate a custom flight plan focused on maximum results. Then, we roll up our sleeves and bring your ideas to life. An account manager serves as your single point of contact, keeping the lines of communication flowing and updating you on our progress every step of the way. Enhance your online presence with our tailored digital marketing services. We leverage strategic solutions to amplify your brand's reach and impact. In the end, we want to achieve your goals, celebrate your success, and prepare for our next mission together.",
  cards: [
    {
      id: "strategy-media",
      title: "Strategy\n& Media",
      items: [
        "Brand Strategy",
        "Content Strategy",
        "Digital Strategy",
        "Social Strategy",
        "Marketing Strategy",
        "Go-to-Market Strategy",
        "Media Strategy, Planning, Buying",
        "Media Reconciliation",
        "Analytics & Reporting",
      ],
    },
    {
      id: "website-development",
      title: "Website Development",
      items: [
        "User Experience (UX)",
        "User Interface (UI)",
        "Responsive Design",
        "Website Animation",
        "Web Development",
        "Web Design",
        "Landing Pages",
        "eCommerce",
      ],
    },
    {
      id: "branding-design",
      title: "Branding\n& Design",
      items: [
        "Brand Workshops",
        "Brand Messaging",
        "Story Development",
        "Logo Design",
        "Collateral",
        "Illustrations",
        "Graphic Design",
        "Environmental Design",
        "Trade Shows",
      ],
    },
    {
      id: "video-production",
      title: "Video\nProduction",
      items: [
        "Concept Development",
        "Storyboarding",
        "Scripting",
        "Animated Video",
        "Cinematography",
        "Corporate Video",
        "Case Study Video",
        "Testimonial Video",
        "Podcasting",
      ],
    },
    {
      id: "digital-email",
      title: "Digital\n& Email",
      items: [
        "SEM/SEO",
        "Paid Social",
        "Audience Targeting",
        "Monitoring & Reporting",
        "Social Analytics",
        "Email Marketing",
        "YouTube Advertising",
        "Display Ads",
        "Remarketing",
      ],
    },
    {
      id: "programmatic-solutions",
      title: "Programmatic Solutions",
      items: [
        "OTT",
        "CTV",
        "Programmatic Media",
        "Omnichannel",
        "Campaigns",
        "Precision Targeting",
        "Addressable",
        "Mobile",
        "Video",
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
      heading: "Why Sparkline",
      body:
        "We've partnered with founder-led startups and category leaders alike, shaping launches, repositionings, and full go-to-market rollouts. Every engagement is led by senior strategists — no handoffs, no junior-only rooms.",
    },
    problems: {
      heading: "Problems we solve",
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
      heading: "Strategic cornerstones",
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
      heading: "How we work",
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
    eyebrow: "WEBSITE DEVELOPMENT",
    title: "Sites that ship fast and convert harder.",
    lead:
      "Your website is the single asset every channel points to. We build ones that load instantly, read beautifully, and move real numbers — not just portfolio shots.",
    intro:
      "We design and engineer websites as product, not decoration. That means interaction design, accessibility, performance budgets, and a CMS your marketing team will actually enjoy using.",
    whyUs: {
      heading: "Why Sparkline",
      body:
        "Designers and engineers in the same room from day one. No throw-it-over-the-wall. We've launched marketing sites, docs, eCommerce storefronts, and interactive landing experiences that sit in the top percentile for Core Web Vitals.",
    },
    problems: {
      heading: "Problems we solve",
      items: [
        "Your current site looks tired and converts worse.",
        "Marketing can't update pages without waiting on engineering.",
        "Page speed is hurting SEO and paid landing performance.",
        "You're rebuilding and the roadmap keeps slipping.",
        "Design looks great in Figma and falls apart in the browser.",
        "Mobile experience is an afterthought.",
        "Analytics and experimentation were never wired in properly.",
      ],
    },
    cornerstones: {
      heading: "Build cornerstones",
      items: [
        "UX research and information architecture",
        "Accessible, responsive UI systems",
        "Motion and interaction design",
        "Headless CMS and editor experience",
        "Performance budgets and Core Web Vitals",
        "Analytics, tagging, and experimentation",
        "Launch QA and monitoring",
      ],
    },
    process: {
      heading: "How we work",
      body:
        "We start with a product-minded discovery — goals, audiences, content model — then move into parallel design and engineering sprints. You see a real, clickable site from week one, not a deck.",
    },
    cta: {
      heading: "Ready for a site that pulls its weight?",
      body:
        "Bring the idea. We'll ship the build — design, dev, CMS, and the analytics stack behind it.",
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
      heading: "Why Sparkline",
      body:
        "A studio-sized team with agency range. Our senior creative directors have shaped brands from seed to Series C and rebranded public companies without losing what made them work.",
    },
    problems: {
      heading: "Problems we solve",
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
      heading: "Identity cornerstones",
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
      heading: "How we work",
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
      heading: "Why Sparkline",
      body:
        "Directors, writers, and animators who've shipped campaigns for consumer brands, B2B SaaS, and entertainment. We match the format and tone to the channel — not just the brief.",
    },
    problems: {
      heading: "Problems we solve",
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
      heading: "Production cornerstones",
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
      heading: "How we work",
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
      heading: "Why Sparkline",
      body:
        "A media team that writes the ads, builds the landing pages, and reads the dashboards. Nothing is outsourced to a black box and the numbers are the numbers.",
    },
    problems: {
      heading: "Problems we solve",
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
      heading: "Channel cornerstones",
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
      heading: "How we work",
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
      heading: "Why Sparkline",
      body:
        "Independent media buyers with deep DSP experience across The Trade Desk, DV360, and Amazon. Transparent fees, transparent data, no resold inventory.",
    },
    problems: {
      heading: "Problems we solve",
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
      heading: "Programmatic cornerstones",
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
      heading: "How we work",
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
