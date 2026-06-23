import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "8g3u06mk",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2026-05-30",
  token: process.env.SANITY_API_TOKEN,
});

const faqItems = [
  {
    id: "timeline",
    question: "How long does it take to complete a project with Sparkline Marketing Firm?",
    answer:
      "Every project is unique, and timelines depend on the scope and complexity of the work. Whether it's brand identity, website design, or development, we maintain complete transparency from the start and work closely with you to deliver high-quality, SEO-friendly results without unnecessary delays.",
  },
  {
    id: "growth",
    question: "How does Sparkline Marketing Firm measure the success of its work?",
    answer:
      "Success looks different for every business and every project. Before we start any work we take the time to understand what success means specifically for you, whether that is increased organic traffic, stronger brand recognition, higher engagement or a more powerful digital presence. Everything we build is aligned to those goals so we are always working toward outcomes that actually matter to your business.",
  },
  {
    id: "customised",
    question: "Do I need to invest in all of your services or can I choose just one?",
    answer:
      "You are absolutely free to choose the services that make the most sense for your business right now. Some clients come to us for a full brand transformation while others need a focused content marketing strategy or a new website. Whatever stage your business is at we will work with you to identify exactly what you need and build around that.",
  },
  {
    id: "brand-and-web",
    question: "What does the onboarding process look like when starting with Sparkline Marketing Firm?",
    answer:
      "Getting started with Sparkline is a straightforward and collaborative process. It begins with an initial discovery call where we talk through your goals, your vision and the next steps for your project. From there we send over a simple onboarding form to gather everything we need to hit the ground running. Our onboarding process typically takes anywhere from one week to a month depending on the scope of your project. We use this time to make sure everything is set up correctly, cleaned up and fully aligned with your brand before we start building. Think of it as laying the right foundation so that everything we deliver from that point forward is done properly and to the highest standard.",
  },
  {
    id: "why-us",
    question: "Does Sparkline Marketing Firm offer ongoing support after a project is completed?",
    answer:
      "Yes absolutely. Great marketing is not a one-time event, it is an ongoing process that evolves as your business grows. Many of our clients choose to continue working with Sparkline long after their initial project is complete through ongoing content marketing, social media management, website maintenance and brand strategy support. We love building long term relationships with our clients because that is where we do our best work, when we truly know your brand inside and out.",
  },
];

async function main() {
  await client
    .patch("servicesPage")
    .set({
      faqSection: {
        _type: "object",
        eyebrow: "Frequently Asked Questions",
        line: "Common questions from businesses looking to grow their brand and digital presence.",
        items: faqItems.map((item) => ({
          _key: item.id,
          _type: "faqItem",
          id: item.id,
          question: item.question,
          answer: item.answer,
        })),
      },
    })
    .commit();

  console.log(`✓ Seeded ${faqItems.length} FAQ items into servicesPage.faqSection`);
  faqItems.forEach((item) => console.log(`  • [${item.id}] ${item.question.slice(0, 60)}…`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
