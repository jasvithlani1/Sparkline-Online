/**
 * Populates all 6 service documents in Sanity with the hardcoded
 * frontend content from lib/content.ts.
 *
 * Run once:
 *   cd sparkline
 *   SANITY_API_TOKEN=$(grep SANITY_API_TOKEN .env.local | cut -d= -f2) node scripts/sync-services.cjs
 */

const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "8g3u06mk",
  dataset: "production",
  apiVersion: "2026-05-30",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// ─── Card data (services overview cards) ────────────────────────────────────
const CARD_DATA = {
  "digital-marketing": {
    cardTitle: "Digital\nMarketing",
    cardItems: [
      "SEO & Search Marketing",
      "Customer Acquisition",
      "Conversion Optimization",
      "Marketing Analytics",
      "Audience Targeting",
      "Campaign Strategy",
      "Funnel Planning",
      "Performance Reporting",
    ],
  },
  "website-design-development": {
    cardTitle: "Website Design\n& Development",
    cardItems: [
      "UX & UI Design",
      "Responsive Design",
      "Custom Development",
      "Landing Pages",
      "eCommerce Development",
      "CMS Integration",
      "Website Maintenance",
      "Performance Optimization",
      "Website Redesign",
    ],
  },
  "content-marketing": {
    cardTitle: "Content\nMarketing",
    cardItems: [
      "Website Copy",
      "Blog Writing",
      "Email Campaigns",
      "Brand Messaging",
      "Video Scripts",
      "Email Marketing & Campaigns",
      "Seo Content",
      "Creative Copy",
      "Content Strategy",
    ],
  },
  "social-media-management": {
    cardTitle: "Social Media\nManagement",
    cardItems: [
      "Strategic Content Planning",
      "Post Scheduling",
      "Audience Engagement",
      "Social Campaigns",
      "Community Management",
      "Social Content",
      "Profile Optimization",
      "Performance Tracking",
      "Trend Monitoring",
      "Monthly Reporting",
    ],
  },
  "branding-design": {
    cardTitle: "Branding\n& Design",
    cardItems: [
      "Logo Design",
      "Brand Identity System",
      "Creative Direction",
      "Typography Systems",
      "Color Pallettes",
      "Brand Collateral",
      "Design Systems",
      "Marketing Assets",
    ],
  },
  "brand-strategy": {
    cardTitle: "Brand\nStrategy",
    cardItems: [
      "Brand Positioning",
      "Market Research",
      "Audience Analysis",
      "Competitive Analysis",
      "Messaging Framework",
      "Voice Development",
      "Go-To-Marketing",
      "Campaign Direction",
      "Strategic Planning",
    ],
  },
};

// ─── Detail data (individual service pages) ──────────────────────────────────
const DETAIL_DATA = {
  "digital-marketing": {
    eyebrow: "DIGITAL MARKETING",
    detailTitle: "Drive Growth With Smarter Digital Marketing",
    bannerTop: { fallbackUrl: "/images/digital-marketing-1.avif", alt: "Digital marketing strategy" },
    bannerBottom: { fallbackUrl: "/images/digital-marketing-2.png", alt: "Digital marketing results" },
    lead: "Digital marketing helps your business reach the right audience, build brand visibility, and turn online interest into real enquiries, leads, and sales. With the right strategy, every campaign works harder to support long-term growth and stronger market presence.",
    intro: "Our digital marketing services combine strategy, creativity, and performance-focused execution across search, content, paid campaigns, and social platforms. We create tailored solutions that help businesses connect, compete, and grow with confidence online.",
    whyUs: {
      heading: "Why SPARKLINE MARKETING FIRM",
      body: "Choose a digital marketing team that blends strategy, creativity, and performance. Tailored campaigns increase visibility, attract quality leads, strengthen brand presence, and support long-term business growth with measurable results.",
    },
    problems: {
      heading: "What We Improve",
      items: [
        "Low website traffic and weak visibility",
        "Poor quality leads from online campaigns",
        "Inconsistent brand presence across digital channels",
        "Low conversion rates from website visitors",
        "Ineffective ad spend with limited returns",
        "Weak social media engagement and reach",
        "Lack of clear digital growth strategy",
        "Difficulty standing out in competitive markets",
      ],
    },
    cornerstones: {
      heading: "Key Focus Areas",
      items: [
        "Audience First Strategy",
        "Data Driven Decisions",
        "Reach More Channels",
        "Conversion Focused Campaigns",
        "Keep Branding Consistent",
        "Performance Based Optimisation",
        "Scalable Growth Planning",
      ],
    },
    specialties: [
      "Search Engine Optimisation",
      "Pay Per Click",
      "Social Media Marketing",
      "Content Marketing",
      "Email Marketing",
      "Conversion Optimisation",
      "Brand Strategy",
      "Lead Generation",
      "Performance Analytics",
    ],
    process: {
      heading: "How We Build Results",
      body: "We begin by understanding your business, audience, and growth goals, then build a tailored digital marketing strategy around them. From planning and execution to optimisation and reporting, every step is focused on increasing visibility, generating quality leads, and delivering measurable results.",
    },
    faq: [
      { id: "services", question: "What digital marketing services does SPARKLINE MARKETING FIRM offer?", answer: "SPARKLINE MARKETING FIRM offers tailored digital marketing services including SEO, paid advertising, social media marketing, content strategy, lead generation, and performance tracking to help businesses grow online with clarity and measurable results." },
      { id: "growth", question: "How can digital marketing help my business grow?", answer: "Digital marketing helps your business increase online visibility, attract the right audience, generate quality leads, and improve conversions through targeted strategies designed to support long-term growth and stronger brand presence." },
      { id: "small-biz", question: "Is digital marketing suitable for small businesses?", answer: "Yes, digital marketing is highly effective for small businesses because it allows you to reach specific audiences, manage budgets efficiently, and compete more strategically in your market with measurable performance." },
      { id: "results-timeline", question: "How long does it take to see results from digital marketing?", answer: "The timeline depends on your goals, competition, and chosen channels. Some campaigns can generate early traction quickly, while long-term strategies like SEO and brand growth typically build stronger results over time." },
      { id: "customised", question: "Do you create customised digital marketing strategies?", answer: "Yes, SPARKLINE MARKETING FIRM develops customised digital marketing strategies based on your business goals, target audience, market position, and growth opportunities to ensure every campaign is aligned with your objectives." },
      { id: "channels", question: "Which digital marketing channels are best for my business?", answer: "The best channels depend on your industry, audience, and goals. These may include search engines, social media, paid ads, email marketing, or content marketing, chosen strategically to maximise visibility and engagement." },
      { id: "lead-quality", question: "Can digital marketing help generate better quality leads?", answer: "Yes, a well-planned digital marketing strategy helps attract more relevant audiences, improving the chances of generating higher quality leads that are more likely to convert into customers." },
      { id: "reporting", question: "Do you provide reporting and performance insights?", answer: "Yes, SPARKLINE MARKETING FIRM provides reporting and performance insights so you can understand campaign progress, audience behaviour, and opportunities for further optimisation and growth." },
      { id: "why-us", question: "Why choose SPARKLINE MARKETING FIRM for digital marketing?", answer: "SPARKLINE MARKETING FIRM combines strategy, creativity, and performance-focused execution to deliver digital marketing solutions that improve visibility, strengthen engagement, and support meaningful business growth." },
      { id: "get-started", question: "How do I get started with your digital marketing services?", answer: "Getting started is simple. Reach out to SPARKLINE MARKETING FIRM to discuss your goals, and we will guide you through the next steps with a tailored approach built around your business needs." },
    ],
    cta: {
      heading: "Ready To Scale Smarter",
      body: "Ready to scale smarter with digital marketing that drives visibility, quality leads, and growth.",
      label: "Contact Now",
    },
  },

  "website-design-development": {
    eyebrow: "WEBSITE DESIGN & DEVELOPMENT",
    detailTitle: "Websites designed to impress, perform, and convert.",
    bannerTop: { fallbackUrl: "/images/website-design-1.avif", alt: "Website design showcase" },
    bannerBottom: { fallbackUrl: "/images/website-design-2.avif", alt: "Website development process" },
    lead: "At SPARKLINE MARKETING FIRM, we create websites that do more than look good. Our website design and development services focus on building modern, user-friendly, and responsive websites that reflect your brand professionally.",
    intro: "We combine clean design, smooth functionality, and strategic structure to help your business attract attention, improve user experience, and drive meaningful conversions online.",
    whyUs: {
      heading: "Why SPARKLINE MARKETING FIRM",
      body: "Creative design, strategic thinking, and seamless development come together to build websites that look professional, perform smoothly, and support real business growth. We focus on user experience, brand consistency, and conversion-driven results.",
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
      body: "We begin by understanding your goals, audience, and website needs, then move into strategic design and development. From the start, you see a clear, functional website taking shape with purpose.",
    },
    faq: [
      { id: "services", question: "What website design and development services does SPARKLINE MARKETING FIRM offer?", answer: "SPARKLINE MARKETING FIRM offers custom website design, responsive development, landing page creation, eCommerce website development, user experience improvements, and website performance optimization tailored to your business goals." },
      { id: "responsive", question: "Will my website be mobile-friendly?", answer: "Yes, every website is designed to be fully responsive, ensuring it looks professional and functions smoothly across desktops, tablets, and mobile devices." },
      { id: "redesign", question: "Can you redesign my existing website?", answer: "Yes, we can redesign outdated websites to improve visual appeal, functionality, user experience, and overall performance while aligning the design with your current brand identity." },
      { id: "timeline", question: "How long does it take to build a website?", answer: "The timeline depends on the size, features, and complexity of the project. A standard business website usually takes a few weeks, while larger or custom websites may require more time." },
      { id: "custom-vs-template", question: "Do you create custom websites or use templates?", answer: "We focus on creating strategic, professionally designed websites that reflect your brand and business needs. Depending on the project, we may use a custom approach or a tailored framework." },
      { id: "ecommerce", question: "Can you build eCommerce websites?", answer: "Yes, we develop eCommerce websites that are visually appealing, easy to manage, and designed to provide a smooth shopping experience for your customers." },
      { id: "performance", question: "Will my website be optimized for speed and performance?", answer: "Yes, we build websites with clean structure, optimized elements, and performance-focused practices to help improve loading speed and overall user experience." },
      { id: "self-update", question: "Can I update the website myself after launch?", answer: "Yes, we can build your website on a user-friendly platform that allows you to manage content, update text, add images, and make basic changes easily." },
      { id: "seo", question: "Do you also help with SEO during website development?", answer: "Yes, we follow SEO-friendly website structure practices, including clean coding, organized page layouts, mobile responsiveness, and other foundations that support better search visibility." },
      { id: "why-us", question: "Why should I choose SPARKLINE MARKETING FIRM for website design and development?", answer: "SPARKLINE MARKETING FIRM combines creative design, strategic thinking, and functional development to build websites that not only look professional but also support business growth and conversions." },
    ],
    cta: {
      heading: "Ready for a website that performs with purpose?",
      body: "Bring your vision to life with strategic design, expert development, seamless CMS integration, and performance-driven analytics.",
      label: "Contact Now",
    },
  },

  "content-marketing": {
    eyebrow: "CONTENT MARKETING",
    detailTitle: "Strategic Content That Drives Results",
    bannerTop: { fallbackUrl: "/images/content-marketing-1.avif", alt: "Content marketing strategy" },
    bannerBottom: { fallbackUrl: "/images/content-marketing-2.avif", alt: "Content creation process" },
    lead: "Content marketing helps your brand stay visible, relevant, and trusted through meaningful messaging that speaks directly to your audience and supports every stage of the buyer journey.",
    intro: "From website copy and blogs to campaign content and lead-focused assets, we create strategic content that builds authority, improves engagement, and supports long-term business growth.",
    whyUs: {
      heading: "Why SPARKLINE MARKETING FIRM",
      body: "We deliver content marketing with purpose, combining strategy, creativity, and audience insight to create meaningful content that builds trust, strengthens brand presence, and supports consistent business growth.",
    },
    problems: {
      heading: "Solutions We Deliver",
      items: [
        "Low website traffic from weak content",
        "Inconsistent brand messaging across all platforms",
        "Poor engagement from unclear content strategy",
        "Content that fails to generate leads",
        "Lack of trust-building content for audiences",
        "Irregular publishing that slows brand growth",
      ],
    },
    cornerstones: {
      heading: "Content Success Elements",
      items: [
        "Audience Focused Messaging",
        "Strategic Content Planning",
        "Consistent Brand Voice",
        "Value Driven Content",
        "Search Friendly Writing",
        "Lead Focused Content",
        "Long Term Growth",
      ],
    },
    specialtiesHeading: "Professional Strengths",
    specialties: [
      "Blog Writing",
      "Website Copy",
      "SEO Content",
      "Email Content",
      "Social Captions",
      "Brand Messaging",
      "Landing Pages",
      "Article Writing",
      "Content Strategy",
    ],
    process: {
      heading: "Our Workflow",
      body: "We start with your goals, audience, and brand voice, then create strategic content that informs, engages, and supports consistent visibility, stronger trust, and measurable growth.",
    },
    faq: [
      { id: "what-includes", question: "What do content marketing services include?", answer: "Content marketing services include strategy, blog writing, website copy, landing page content, email content, social media copy, and other assets designed to attract, engage, and convert your target audience." },
      { id: "importance", question: "Why is content marketing important for a business?", answer: "Content marketing helps businesses build trust, improve online visibility, educate potential customers, and support long-term growth through consistent and valuable communication." },
      { id: "how-helps", question: "How can SPARKLINE MARKETING FIRM help my business with content marketing?", answer: "SPARKLINE MARKETING FIRM creates strategic content tailored to your brand, audience, and goals, helping you strengthen your message, improve engagement, and drive meaningful business results." },
      { id: "seo", question: "Do you create SEO-friendly content?", answer: "Yes, we create content that is written for both users and search engines, helping your business improve visibility while keeping the messaging clear, relevant, and engaging." },
      { id: "industries", question: "What types of businesses can benefit from content marketing?", answer: "Almost every business can benefit from content marketing, especially those looking to increase brand awareness, improve search visibility, generate leads, and build customer trust." },
      { id: "frequency", question: "How often should content be published?", answer: "The ideal publishing frequency depends on your goals, industry, and audience, but consistency is key for building momentum and maintaining visibility over time." },
      { id: "leads", question: "Can content marketing help generate leads?", answer: "Yes, well-planned content marketing can attract the right audience, answer their questions, build confidence, and encourage them to take action." },
      { id: "brand-voice", question: "Do you write content in our brand voice?", answer: "Yes, we create content that aligns with your brand tone, messaging style, and business identity to ensure consistency across all channels." },
      { id: "results-timeline", question: "How long does it take to see results from content marketing?", answer: "Content marketing is a long-term strategy, but with the right approach, businesses often begin seeing improvements in engagement, visibility, and lead quality over time." },
      { id: "why-us", question: "Why choose SPARKLINE MARKETING FIRM for content marketing services?", answer: "SPARKLINE MARKETING FIRM combines strategy, creativity, and audience understanding to deliver content that supports growth, strengthens your brand, and creates lasting impact." },
    ],
    cta: {
      heading: "Powerful Content Starts Here",
      body: "Build stronger visibility, trust, and growth through strategic content.",
      label: "Contact Now",
    },
  },

  "social-media-management": {
    eyebrow: "SOCIAL MEDIA MARKETING",
    detailTitle: "Grow Faster Through Social Media",
    bannerTop: { fallbackUrl: "/images/social-media-1.avif", alt: "Social media marketing strategy" },
    bannerBottom: { fallbackUrl: "/images/social-media-2.avif", alt: "Social media engagement" },
    lead: "Social media marketing helps your brand connect with the right audience through meaningful content, consistent engagement, and platform-specific strategy. It builds visibility, trust, and stronger customer relationships across every stage of the buyer journey.",
    intro: "From brand awareness to lead generation, social media creates opportunities to grow your reach, increase interaction, and turn attention into measurable business results.",
    whyUs: {
      heading: "Why SPARKLINE MARKETING FIRM",
      body: "Choose us for social media marketing that blends strategy, creativity, and consistency to build visibility, engage the right audience, and turn everyday interactions into measurable brand growth.",
    },
    problems: {
      heading: "What We Improve",
      items: [
        "Low engagement across your social media platforms",
        "Inconsistent posting that weakens brand visibility online",
        "Poor content strategy limiting audience growth potential",
        "Lack of quality leads from social campaigns",
        "Weak brand presence in competitive social spaces",
        "Unclear messaging affecting trust and customer action",
      ],
    },
    cornerstones: {
      heading: "Social Media Priorities",
      items: [
        "Audience First Approach",
        "Consistent Brand Voice",
        "Creative Content Planning",
        "Platform Specific Strategy",
        "Engagement Driven Execution",
        "Performance Based Optimisation",
        "Growth Focused Reporting",
      ],
    },
    specialtiesHeading: "Our Specialisations",
    specialties: [
      "Content Strategy",
      "Social Media Management",
      "Paid Campaigns",
      "Community Engagement",
      "Brand Messaging",
      "Audience Targeting",
      "Creative Direction",
      "Performance Tracking",
      "Platform Optimisation",
    ],
    process: {
      heading: "How We Deliver",
      body: "We begin with your goals, audience, and brand voice, then build a tailored social media strategy, create engaging content, manage execution consistently, and track performance to improve reach, engagement, and results.",
    },
    faq: [
      { id: "what-includes", question: "What does social media marketing include?", answer: "Social media marketing includes strategy, content creation, posting, audience engagement, campaign management, and performance tracking across relevant social platforms." },
      { id: "platforms", question: "Which social media platforms do you manage?", answer: "SPARKLINE MARKETING FIRM manages platforms such as Facebook, Instagram, LinkedIn, X, and other channels based on your business goals and audience." },
      { id: "business-impact", question: "How can social media marketing help my business?", answer: "It helps increase brand awareness, build trust, engage your audience, drive website traffic, and generate more leads or sales over time." },
      { id: "content", question: "Do you create content for social media pages?", answer: "Yes, we create branded content tailored to your business, including captions, creatives, campaign ideas, and platform-specific posting strategies." },
      { id: "frequency", question: "How often will you post on our social media accounts?", answer: "Posting frequency depends on your package, goals, and platform strategy. We recommend a consistent schedule for stronger visibility and engagement." },
      { id: "leads", question: "Can social media marketing generate leads?", answer: "Yes, a well-planned social media strategy can attract the right audience, improve engagement, and turn interest into qualified leads." },
      { id: "paid-ads", question: "Do you offer paid social media advertising too?", answer: "Yes, SPARKLINE MARKETING FIRM can support paid social campaigns to expand reach, target ideal customers, and improve campaign performance." },
      { id: "measure", question: "How do you measure social media success?", answer: "We track key metrics such as reach, engagement, follower growth, clicks, conversions, and overall campaign performance." },
      { id: "small-biz", question: "Is social media marketing suitable for small businesses?", answer: "Yes, social media marketing is highly effective for small businesses looking to build awareness, connect with local audiences, and grow affordably." },
      { id: "why-us", question: "Why choose SPARKLINE MARKETING FIRM for social media marketing?", answer: "SPARKLINE MARKETING FIRM combines strategy, creativity, and consistent execution to help businesses grow their presence and achieve meaningful results through social media." },
    ],
    cta: {
      heading: "Social Growth Starts Here",
      body: "Build stronger connections, increase visibility, and turn social media into measurable business growth.",
      label: "Contact Now",
    },
  },

  "branding-design": {
    eyebrow: "BRAND DESIGN SERVICES",
    detailTitle: "Designing Brands With Lasting Impact",
    bannerTop: { fallbackUrl: "/images/branding-design-1.avif", alt: "Branding and design work" },
    bannerBottom: { fallbackUrl: "/images/branding-design-2.avif", alt: "Brand identity creation" },
    lead: "Brand & Design services help shape how your business looks, feels, and connects with people. From logo creation to visual identity systems, we craft designs that reflect your values and make your brand more memorable.",
    intro: "Our approach combines strategy, creativity, and consistency to build a strong visual presence across every touchpoint. We create brand assets that not only look professional but also support recognition, trust, and long-term business growth.",
    whyUs: {
      heading: "Why SPARKLINE MARKETING FIRM",
      body: "Choose us for strategic creativity, clear brand positioning, modern design expertise, and results-focused execution that helps your business stand out, connect with the right audience, and grow confidently.",
    },
    problems: {
      heading: "Challenges We Address",
      items: [
        "Inconsistent brand visuals across digital platforms",
        "Weak brand identity causing low market recall",
        "Outdated design reducing trust and engagement",
        "Unclear messaging affecting audience connection badly",
        "Poor visual presentation hurting brand credibility",
        "Lack of distinction in competitive market space",
      ],
    },
    cornerstones: {
      heading: "Core Brand Elements",
      items: [
        "Clear Brand Positioning",
        "Distinct Visual Identity",
        "Consistent Brand Messaging",
        "Memorable Logo Systems",
        "Purpose Driven Design",
        "Audience Focused Creativity",
        "Strong Brand Recognition",
      ],
    },
    specialties: [
      "Brand Identity Design",
      "Logo Design Systems",
      "Visual Brand Strategy",
      "Packaging Design Concepts",
      "Marketing Collateral Design",
      "Social Media Creatives",
      "Typography and Colour Styling",
      "Brand Guidelines Development",
      "Creative Asset Design",
    ],
    process: {
      heading: "How We Deliver",
      body: "We begin by understanding your brand vision, audience, and goals, then turn those insights into strategic design concepts. From identity creation to final assets, we build visuals that are clear, consistent, and impactful.",
    },
    faq: [
      { id: "includes", question: "What is included in your branding and design service?", answer: "Our branding and design service includes brand strategy, logo design, visual identity creation, colour palette selection, typography direction, brand guidelines, and creative assets designed to build a strong and consistent brand presence." },
      { id: "importance", question: "Why is branding important for a business?", answer: "Branding helps your business create a clear identity, build trust, improve recognition, and stand out in a competitive market. It gives people a reason to remember your business and connect with it." },
      { id: "scope", question: "Do you only create logos or complete brand identities?", answer: "We create much more than logos. Our service focuses on complete brand identity development, including visual systems, brand styling, and supporting design elements that bring consistency across all platforms." },
      { id: "redesign", question: "Can you redesign an existing brand?", answer: "Yes, we can refresh or fully redesign your existing brand. Whether your current branding feels outdated, inconsistent, or no longer aligns with your business direction, we can create a stronger and more modern identity." },
      { id: "process-start", question: "How do you start the branding process?", answer: "We begin by understanding your business, target audience, brand values, goals, and market position. This helps us develop creative concepts that reflect your vision and support long-term growth." },
      { id: "uniqueness", question: "Will my branding be unique to my business?", answer: "Yes, every branding project is created specifically for your business. We focus on building a distinct identity that reflects your personality, values, and positioning rather than using generic design styles." },
      { id: "guidelines", question: "Do you provide brand guidelines after the project?", answer: "Yes, we can provide brand guidelines that outline how to use your logo, colours, fonts, imagery, and other visual elements to maintain consistency across all marketing and communication materials." },
      { id: "digital-print", question: "Can you create branding for digital and print use?", answer: "Yes, we design brand assets for both digital and print applications, including website visuals, social media graphics, business cards, brochures, packaging concepts, and other branded materials." },
      { id: "timeline", question: "How long does a branding and design project take?", answer: "Project timelines depend on the scope of work, but most branding and design projects are completed in stages. After understanding your requirements, we provide a clear timeline for delivery." },
      { id: "why-us", question: "Why choose SPARKLINE MARKETING FIRM for branding and design?", answer: "SPARKLINE MARKETING FIRM combines strategy, creativity, and modern design thinking to create brands that are professional, memorable, and aligned with business growth. We focus on clarity, consistency, and real brand impact." },
    ],
    cta: {
      heading: "Ready to build a brand?",
      body: "Create a distinctive brand identity with strategic design, clear messaging, and visuals that leave a lasting impression.",
      label: "Contact Now",
    },
  },

  "brand-strategy": {
    eyebrow: "BRAND STRATEGY",
    detailTitle: "Clarity Behind Every Brand",
    bannerTop: { fallbackUrl: "/images/brand-strategy-1.avif", alt: "Brand strategy planning" },
    bannerBottom: { fallbackUrl: "/images/brand-strategy-2.avif", alt: "Strategic brand direction" },
    lead: "Brand strategy gives your business a clear direction, stronger positioning, and a consistent voice across every touchpoint. It helps you connect with the right audience while building trust, recognition, and long term value.",
    intro: "We create thoughtful brand strategies that define who you are, what you stand for, and how your business should be seen in a competitive market.",
    whyUs: {
      heading: "Why SPARKLINE MARKETING FIRM",
      body: "Brand strategy that brings clarity, consistency, and direction, helping your business stand out, connect with the right audience, and grow with confidence.",
    },
    problems: {
      heading: "Brand Issues We Resolve",
      items: [
        "Unclear brand positioning in competitive markets",
        "Inconsistent messaging across channels and campaigns",
        "Low audience trust and brand recognition",
        "Difficulty connecting with ideal customers",
        "Weak brand identity limiting business growth",
        "Confused direction in marketing decisions",
      ],
    },
    cornerstones: {
      heading: "Strategic Brand Pillars",
      items: [
        "Clear Brand Positioning",
        "Audience Focused Direction",
        "Consistent Brand Messaging",
        "Strong Market Differentiation",
        "Purpose Led Identity",
        "Long Term Brand Growth",
        "Strategic Communication Framework",
      ],
    },
    specialtiesHeading: "Our Specialisations",
    specialties: [
      "Brand Positioning",
      "Market Research",
      "Audience Insights",
      "Messaging Strategy",
      "Brand Voice",
      "Competitive Analysis",
      "Visual Direction",
      "Growth Planning",
      "Identity Development",
    ],
    process: {
      heading: "Our Strategic Approach",
      body: "We begin with discovery, research, and audience insight, then shape a clear brand strategy that aligns your positioning, messaging, and direction for long-term growth.",
    },
    faq: [
      { id: "what-is", question: "What is brand strategy?", answer: "Brand strategy is a long term plan that defines how your business is positioned, communicated, and perceived by your target audience." },
      { id: "importance", question: "Why is brand strategy important for my business?", answer: "A clear brand strategy helps your business stand out, build trust, connect with the right audience, and create consistent growth across all channels." },
      { id: "includes", question: "What does SPARKLINE MARKETING FIRM include in brand strategy services?", answer: "SPARKLINE MARKETING FIRM provides brand positioning, audience research, messaging development, market analysis, brand direction, and strategic planning." },
      { id: "needs", question: "How do I know if my business needs brand strategy?", answer: "If your brand feels unclear, inconsistent, outdated, or struggles to connect with customers, a brand strategy can help create stronger direction." },
      { id: "marketing-results", question: "Can brand strategy help improve marketing results?", answer: "Yes, a strong brand strategy gives your marketing more clarity and consistency, helping campaigns perform better and attract the right customers." },
      { id: "new-vs-established", question: "Is brand strategy only for new businesses?", answer: "No, brand strategy is valuable for both new and established businesses looking to refine their identity, reposition in the market, or support growth." },
      { id: "timeline", question: "How long does the brand strategy process take?", answer: "The timeline depends on your business goals, industry, and project scope, but most brand strategy projects are completed in a structured phase-based process." },
      { id: "voice-messaging", question: "Will brand strategy help define my brand voice and messaging?", answer: "Yes, brand strategy helps shape your tone, messaging, and communication style so your business speaks clearly and consistently to your audience." },
      { id: "why-us", question: "What makes SPARKLINE MARKETING FIRM different for brand strategy?", answer: "SPARKLINE MARKETING FIRM focuses on creating practical, research driven brand strategies that support visibility, consistency, and long term business growth." },
      { id: "future-growth", question: "Can brand strategy support future business growth?", answer: "Yes, a well built brand strategy creates a strong foundation for expansion, stronger customer relationships, and more confident business decisions." },
    ],
    cta: {
      heading: "Strategy That Moves Brands Forward",
      body: "Drive growth and build trust with a clear brand strategy that moves forward.",
      label: "Contact Now",
    },
  },
};

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error("SANITY_API_TOKEN is not set.");
  }

  console.log("\nFetching all service documents from Sanity...");
  const services = await client.fetch(
    `*[_type == "service" && defined(slug.current)] | order(order asc) { _id, slug }`
  );
  console.log(`Found ${services.length} service documents.\n`);

  for (const svc of services) {
    const slug = svc.slug.current;
    const card = CARD_DATA[slug];
    const detail = DETAIL_DATA[slug];

    if (!card || !detail) {
      console.log(`⚠  No content data for slug "${slug}" — skipping.`);
      continue;
    }

    console.log(`Patching: ${slug}`);

    const faqItems = detail.faq.map((item, i) => ({
      _type: "faqItem",
      _key: item.id || `faq-${i}`,
      id: item.id,
      question: item.question,
      answer: item.answer,
    }));

    const patch = {
      cardTitle: card.cardTitle,
      cardItems: card.cardItems,
      eyebrow: detail.eyebrow,
      detailTitle: detail.detailTitle,
      lead: detail.lead,
      intro: detail.intro,
      bannerTop: {
        _type: "cmsImage",
        fallbackUrl: detail.bannerTop.fallbackUrl,
        alt: detail.bannerTop.alt,
      },
      bannerBottom: {
        _type: "cmsImage",
        fallbackUrl: detail.bannerBottom.fallbackUrl,
        alt: detail.bannerBottom.alt,
      },
      whyUs: detail.whyUs,
      problems: detail.problems,
      cornerstones: detail.cornerstones,
      specialties: detail.specialties,
      process: detail.process,
      faq: faqItems,
      cta: detail.cta,
    };

    if (detail.specialtiesHeading) {
      patch.specialtiesHeading = detail.specialtiesHeading;
    }

    await client.patch(svc._id).set(patch).commit({ autoGenerateArrayKeys: false });
    console.log(`  ✅ Done\n`);
  }

  console.log("All service documents synced successfully!");
}

main().catch((err) => {
  console.error("\n❌ Error:", err.message);
  process.exit(1);
});
