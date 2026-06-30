import type { Metadata } from "next";
import { Fragment } from "react";
import { Footer } from "@/components/landing/footer";
import { NavbarServer as Navbar } from "@/components/landing/navbar-server";
import { getPrivacyPage, getSiteSettings, type SanityLegalBlock } from "@/sanity/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [cms, settings] = await Promise.all([getPrivacyPage(), getSiteSettings()]);
  const seo = cms?.seo;
  return buildMetadata({
    title: seo?.title ?? "Privacy Policy",
    description: seo?.description ?? "How Sparkline Marketing Firm collects, uses, discloses, and protects your information.",
    ogImageUrl: seo?.ogImageUrl,
    noIndex: seo?.noIndex,
    canonicalUrl: seo?.canonicalUrl,
    siteSettings: settings,
    path: "/privacy",
  });
}

type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: readonly string[] }
  | { type: "subheading"; text: string }
  | { type: "table"; rows: readonly { category: string; provider: string }[] };

type Section = {
  id: string;
  number: string;
  title: string;
  blocks: readonly Block[];
};

function blockFromSanity(block: SanityLegalBlock): Block {
  if (block._type === "legalSubheading") return { type: "subheading", text: block.text ?? "" };
  if (block._type === "legalList") return { type: "list", items: block.items ?? [] };
  if (block._type === "legalTable")
    return {
      type: "table",
      rows: (block.rows ?? []).map((r) => ({
        category: r.category ?? "",
        provider: r.provider ?? "",
      })),
    };
  return { type: "p", text: block.text ?? "" };
}

const FALLBACK_SECTIONS: readonly Section[] = [
  {
    id: "introduction",
    number: "1",
    title: "Introduction",
    blocks: [
      {
        type: "p",
        text: 'Sparkline Marketing Firm, LLC ("Sparkline," "we," "us," or "our") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and protect information when you:',
      },
      {
        type: "list",
        items: [
          'Visit our website at sparklinemarketingfirm.com (the "Site")',
          "Submit inquiries, forms, or applications",
          "Engage with our marketing communications",
          "Become or interact with a client of Sparkline",
        ],
      },
      {
        type: "p",
        text: "By using the Site or our services, you agree to the practices described in this Privacy Policy.",
      },
    ],
  },
  {
    id: "information-we-collect",
    number: "2",
    title: "Information We Collect",
    blocks: [
      { type: "subheading", text: "2.1 Information You Provide Directly" },
      {
        type: "p",
        text: "We collect information you voluntarily submit, including:",
      },
      {
        type: "list",
        items: [
          "Contact details: name, email address, phone number, business name, website URL",
          "Business information: industry, location, service needs, marketing goals",
          "Communications: messages sent through contact forms, live chat, email, or phone",
          "Account credentials: Google Business Profile, Meta Business Suite, website admin, CRM, and other platform access provided during client engagements",
          "Payment information: billing name, address, and payment details (processed through our payment processor — Sparkline does not store full card numbers)",
          "Employment or partnership applications: resume, work history, references",
        ],
      },
      { type: "subheading", text: "2.2 Information Collected Automatically" },
      {
        type: "p",
        text: "When you visit the Site, we and our third-party service providers automatically collect:",
      },
      {
        type: "list",
        items: [
          "Device and browser data: IP address, browser type, operating system, device identifiers, referring URLs",
          "Usage data: pages visited, time on site, click paths, scroll depth, actions taken",
          "Location data: approximate geographic location derived from IP address",
          "Cookies and similar technologies (see Section 4)",
        ],
      },
      { type: "subheading", text: "2.3 Information from Third Parties" },
      { type: "p", text: "We may receive information from:" },
      {
        type: "list",
        items: [
          "Analytics providers (Google Analytics)",
          "Advertising platforms (Meta/Facebook, Google Ads)",
          "Public business databases (for prospecting and lead research)",
          "Social media platforms when you interact with our profiles",
          "Referral partners who provide your contact information with consent",
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    number: "3",
    title: "How We Use Your Information",
    blocks: [
      { type: "p", text: "We use collected information to:" },
      {
        type: "list",
        items: [
          "Provide, operate, and improve our services",
          "Respond to inquiries and provide customer support",
          "Deliver marketing services to clients",
          "Process payments and manage billing",
          "Send marketing communications, newsletters, and service updates (with opt-out available)",
          "Conduct prospecting and outreach to potential clients",
          "Personalize your experience on our Site",
          "Analyze Site performance and user behavior",
          "Retarget visitors through advertising platforms (Meta, Google)",
          "Detect, prevent, and address fraud, security issues, and technical problems",
          "Comply with legal obligations and enforce our agreements",
        ],
      },
    ],
  },
  {
    id: "cookies",
    number: "4",
    title: "Cookies and Tracking Technologies",
    blocks: [
      { type: "subheading", text: "4.1 What We Use" },
      {
        type: "p",
        text: "Our Site uses cookies, pixels, tags, and similar technologies, including:",
      },
      {
        type: "list",
        items: [
          "Essential cookies — required for core Site functionality (forms, navigation)",
          "Analytics cookies — Google Analytics to measure traffic and user behavior",
          "Advertising cookies and pixels — Meta Pixel, Google Ads tags, and similar tools that enable retargeting and conversion tracking",
          "Live chat and engagement tools — chat widgets, email capture popups, and similar tools that collect interaction data",
          "Functional cookies — remember preferences and improve user experience",
        ],
      },
      { type: "subheading", text: "4.2 Your Cookie Choices" },
      { type: "p", text: "You can control cookies through:" },
      {
        type: "list",
        items: [
          "Your browser settings — most browsers allow you to block or delete cookies",
          "Google Analytics opt-out: tools.google.com/dlpage/gaoptout",
          "Meta/Facebook ads opt-out: facebook.com/settings/?tab=ads",
          "Digital Advertising Alliance: optout.aboutads.info",
          "Network Advertising Initiative: optout.networkadvertising.org",
        ],
      },
      {
        type: "p",
        text: "Blocking cookies may affect Site functionality.",
      },
    ],
  },
  {
    id: "subprocessors",
    number: "5",
    title: "Third-Party Services and Subprocessors",
    blocks: [
      {
        type: "p",
        text: "We use trusted third-party providers to operate our business. These providers may process your data on our behalf, subject to their own privacy policies. Current subprocessors include:",
      },
      {
        type: "table",
        rows: [
          { category: "Analytics", provider: "Google Analytics" },
          { category: "Advertising", provider: "Meta/Facebook, Google Ads" },
          { category: "CRM and automation", provider: "GoHighLevel" },
          { category: "Email delivery", provider: "Google Workspace, SendGrid" },
          { category: "Payment processing", provider: "Stripe (or equivalent)" },
          {
            category: "Local SEO tools",
            provider: "BrightLocal, Local Viking, Whitespark",
          },
          { category: "Cloud storage", provider: "Google Workspace" },
        ],
      },
      {
        type: "p",
        text: "Additional subprocessors may be used as our services evolve. A current list is available upon request by emailing info@sparklinemarketingfirm.com.",
      },
    ],
  },
  {
    id: "how-we-share",
    number: "6",
    title: "How We Share Information",
    blocks: [
      {
        type: "p",
        text: "We do not sell your personal information. We may share information in the following circumstances:",
      },
      {
        type: "list",
        items: [
          "With service providers — subprocessors listed above who help us operate our business",
          "With clients — when information is directly relevant to services we deliver for a client",
          "For legal reasons — to comply with laws, court orders, subpoenas, or legal process",
          "To protect rights — to prevent fraud, protect safety, or enforce our agreements",
          "In business transfers — in connection with a merger, acquisition, or sale of assets",
          "With your consent — when you direct us to share information",
        ],
      },
    ],
  },
  {
    id: "marketing",
    number: "7",
    title: "Marketing Communications",
    blocks: [
      { type: "subheading", text: "7.1 Email Marketing" },
      {
        type: "p",
        text: "We may send marketing emails, newsletters, and promotional content to individuals who have provided their email address or to business contacts identified through lawful prospecting activities.",
      },
      { type: "subheading", text: "7.2 Cold Outreach" },
      {
        type: "p",
        text: "As a marketing agency, we conduct business-to-business outreach to potential clients using publicly available business information. All outreach complies with applicable laws, including the CAN-SPAM Act.",
      },
      { type: "subheading", text: "7.3 Opt-Out" },
      {
        type: "p",
        text: 'Every marketing email includes an unsubscribe link. You may also opt out at any time by emailing info@sparklinemarketingfirm.com with "Unsubscribe" in the subject line. Transactional emails (billing, service updates, account notices) are not subject to opt-out.',
      },
    ],
  },
  {
    id: "rights",
    number: "8",
    title: "Your Privacy Rights",
    blocks: [
      { type: "subheading", text: "8.1 General Rights" },
      {
        type: "p",
        text: "Depending on your jurisdiction, you may have the right to:",
      },
      {
        type: "list",
        items: [
          "Access the personal information we hold about you",
          "Request correction of inaccurate information",
          "Request deletion of your personal information",
          "Object to or restrict certain processing",
          "Receive a copy of your data in a portable format",
          "Withdraw consent where processing is based on consent",
        ],
      },
      {
        type: "p",
        text: "To exercise any of these rights, email info@sparklinemarketingfirm.com. We will respond within the timeframes required by applicable law.",
      },
      { type: "subheading", text: "8.2 California Residents (CCPA/CPRA)" },
      {
        type: "p",
        text: "If you are a California resident, you have additional rights under the California Consumer Privacy Act, as amended by the California Privacy Rights Act:",
      },
      {
        type: "list",
        items: [
          "Right to know what personal information we collect, use, and share",
          "Right to delete personal information we have collected",
          "Right to correct inaccurate personal information",
          "Right to opt out of the sale or sharing of personal information",
          "Right to limit use of sensitive personal information",
          "Right to non-discrimination for exercising your rights",
        ],
      },
      {
        type: "p",
        text: 'Sparkline does not sell personal information. We may "share" information with advertising partners (such as Meta and Google) for cross-context behavioral advertising purposes under CCPA definitions. You may opt out of such sharing by emailing info@sparklinemarketingfirm.com or by using the cookie opt-out tools in Section 4.2.',
      },
      {
        type: "p",
        text: "To submit a CCPA request, email info@sparklinemarketingfirm.com. We will verify your identity before fulfilling your request. Authorized agents may submit requests on your behalf with valid written authorization.",
      },
      { type: "subheading", text: "8.3 Other U.S. State Residents" },
      {
        type: "p",
        text: "Residents of Virginia, Colorado, Connecticut, Utah, and other states with comprehensive privacy laws have rights similar to those described above. Contact us at info@sparklinemarketingfirm.com to exercise these rights.",
      },
    ],
  },
  {
    id: "retention",
    number: "9",
    title: "Data Retention",
    blocks: [
      {
        type: "p",
        text: "We retain personal information only as long as necessary to:",
      },
      {
        type: "list",
        items: [
          "Provide services and fulfill contractual obligations",
          "Comply with legal, tax, and accounting requirements",
          "Resolve disputes and enforce agreements",
        ],
      },
      { type: "p", text: "General retention timelines:" },
      {
        type: "list",
        items: [
          "Client records and engagement data: 7 years after engagement ends (for tax and legal purposes)",
          "Prospecting and marketing data: 24 months after last interaction",
          "Website analytics data: as governed by Google Analytics retention settings (typically 14–26 months)",
          "Form submissions: 24 months if no engagement results",
          "Payment records: 7 years (tax compliance)",
        ],
      },
      {
        type: "p",
        text: "After retention periods expire, data is deleted or anonymized.",
      },
    ],
  },
  {
    id: "security",
    number: "10",
    title: "Data Security",
    blocks: [
      {
        type: "p",
        text: "We implement reasonable administrative, technical, and physical safeguards to protect personal information, including:",
      },
      {
        type: "list",
        items: [
          "Encryption of data in transit (HTTPS/TLS)",
          "Access controls and authentication",
          "Secure password storage practices",
          "Regular review of security practices",
          "Vendor due diligence for subprocessors",
        ],
      },
      {
        type: "p",
        text: "No method of transmission or storage is 100% secure. If a data breach occurs affecting your information, we will notify you in accordance with applicable laws.",
      },
    ],
  },
  {
    id: "children",
    number: "11",
    title: "Children's Privacy",
    blocks: [
      {
        type: "p",
        text: "The Site and our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If we learn we have collected such information, we will delete it promptly. Parents or guardians who believe a child has provided us with personal information should contact info@sparklinemarketingfirm.com.",
      },
    ],
  },
  {
    id: "international",
    number: "12",
    title: "International Users",
    blocks: [
      {
        type: "p",
        text: "Sparkline operates from the United States. If you access the Site from outside the U.S., your information will be transferred to, stored, and processed in the United States, which may have different data protection laws than your country.",
      },
      {
        type: "p",
        text: "By using the Site, you consent to the transfer of your information to the United States.",
      },
    ],
  },
  {
    id: "dnt",
    number: "13",
    title: "Do Not Track",
    blocks: [
      {
        type: "p",
        text: 'Some browsers offer a "Do Not Track" signal. Because no common industry standard exists for responding to DNT signals, our Site does not currently respond to them. You can control tracking using the cookie opt-out tools in Section 4.2.',
      },
    ],
  },
  {
    id: "third-party-links",
    number: "14",
    title: "Third-Party Links",
    blocks: [
      {
        type: "p",
        text: "The Site may contain links to third-party websites, plugins, and services. We are not responsible for the privacy practices of third parties. Review their privacy policies before providing any personal information.",
      },
    ],
  },
  {
    id: "changes",
    number: "15",
    title: "Changes to This Privacy Policy",
    blocks: [
      {
        type: "p",
        text: "We may update this Privacy Policy from time to time. When we make material changes, we will:",
      },
      {
        type: "list",
        items: [
          'Update the "Last Updated" date at the top of this page',
          "Post the revised policy on the Site",
          "Notify clients and email subscribers where legally required",
        ],
      },
      {
        type: "p",
        text: "Continued use of the Site or services after changes constitutes acceptance of the updated Privacy Policy.",
      },
    ],
  },
  {
    id: "contact",
    number: "16",
    title: "Contact Us",
    blocks: [
      {
        type: "p",
        text: "For questions, requests, or concerns about this Privacy Policy or your personal information:",
      },
      {
        type: "p",
        text: "Sparkline Marketing Firm, LLC · Email: info@sparklinemarketingfirm.com · State of Formation: Georgia, USA.",
      },
    ],
  },
];

export default async function PrivacyPage() {
  const cms = await getPrivacyPage();
  const sections: readonly Section[] =
    cms?.sections?.length
      ? cms.sections.map((s) => ({
          id: s.id ?? s._key ?? "",
          number: s.number ?? "",
          title: s.title ?? "",
          blocks: (s.blocks ?? []).map(blockFromSanity),
        }))
      : FALLBACK_SECTIONS;

  const companyName = cms?.companyName ?? "SPARKLINE MARKETING FIRM, LLC";
  const effectiveDate = cms?.effectiveDate ?? "April 29, 2026";
  const lastUpdated = cms?.lastUpdated ?? "April 29, 2026";

  return (
    <main className="min-h-screen bg-[#050C1E]">
      <Navbar />

      <section className="px-5 pt-32 pb-10 sm:px-6 sm:pt-36 sm:pb-12 md:px-8 md:pt-44 md:pb-14">
        <div className="mx-auto max-w-[920px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60 sm:text-[12px]">
            LEGAL
          </p>
          <h1
            className="hero-copy mt-4 text-balance text-[36px] leading-[1.05] tracking-[-0.04em] text-white sm:text-[52px] md:text-[68px] lg:text-[80px]"
            style={{ wordSpacing: "0.18em" }}
          >
            Privacy Policy
          </h1>
          <p className="mt-6 text-pretty text-[15px] leading-[1.7] text-white/70 sm:text-[16px] md:text-[17px]">
            <strong className="font-semibold text-white">{companyName}</strong>
            {` · Effective Date: ${effectiveDate} · Last Updated: ${lastUpdated}.`}
          </p>
        </div>
      </section>

      <section className="px-5 pb-12 sm:px-6 sm:pb-14 md:px-8 md:pb-16">
        <div className="mx-auto flex max-w-[920px] flex-col gap-12 md:gap-16">
          {sections.map((section) => (
            <article key={section.id} id={section.id} className="flex flex-col gap-5 scroll-mt-24">
              <div className="flex flex-col gap-3 border-t border-white/10 pt-8 md:pt-10">
                <h2 className="text-balance text-[24px] leading-[1.15] tracking-[-0.02em] text-white sm:text-[28px] md:text-[32px]">
                  {section.title}
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                {section.blocks.map((block, i) => {
                  if (block.type === "subheading") {
                    return (
                      <h3
                        key={`${section.id}-h-${i}`}
                        className="mt-2 text-[16px] font-semibold leading-[1.4] tracking-[-0.005em] text-white sm:text-[17px]"
                      >
                        {block.text}
                      </h3>
                    );
                  }
                  if (block.type === "p") {
                    return (
                      <p
                        key={`${section.id}-p-${i}`}
                        className="text-pretty text-[15px] leading-[1.75] text-white/72 sm:text-[16px] md:text-[17px]"
                      >
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === "table") {
                    return (
                      <div
                        key={`${section.id}-t-${i}`}
                        className="mt-2 overflow-hidden rounded-xl border border-white/10"
                      >
                        <div className="grid grid-cols-[1fr_1.5fr] gap-px bg-white/5 text-[14px] sm:text-[15px]">
                          <div className="bg-[#0A1740] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/55 sm:text-[12px]">
                            Category
                          </div>
                          <div className="bg-[#0A1740] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/55 sm:text-[12px]">
                            Provider
                          </div>
                          {block.rows.map((row) => (
                            <Fragment key={row.category}>
                              <div className="bg-[#050C1E] px-4 py-3 text-white">
                                {row.category}
                              </div>
                              <div className="bg-[#050C1E] px-4 py-3 text-white/75">
                                {row.provider}
                              </div>
                            </Fragment>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <ul
                      key={`${section.id}-l-${i}`}
                      className="flex flex-col gap-2 text-[15px] leading-[1.7] text-white/72 sm:text-[16px] md:text-[17px]"
                    >
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-[10px] h-[5px] w-[5px] flex-none rounded-full bg-[linear-gradient(180deg,#8F57FF_0%,#4C2FFF_100%)]"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                })}
              </div>
            </article>
          ))}

          <p className="border-t border-white/10 pt-8 text-center font-mono text-[12px] uppercase tracking-[0.22em] text-white/40">
            © 2026 SPARKLINE MARKETING FIRM, LLC. All rights reserved.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
