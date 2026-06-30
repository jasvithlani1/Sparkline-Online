import type { Metadata } from "next";
import { Footer } from "@/components/landing/footer";
import { NavbarServer as Navbar } from "@/components/landing/navbar-server";
import { getTermsPage, getSiteSettings, type SanityLegalBlock } from "@/sanity/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [cms, settings] = await Promise.all([getTermsPage(), getSiteSettings()]);
  const seo = cms?.seo;
  return buildMetadata({
    title: seo?.title ?? "Terms & Conditions",
    description: seo?.description ?? "Terms and conditions governing use of the Sparkline Marketing Firm website and engagement of our services.",
    ogImageUrl: seo?.ogImageUrl,
    noIndex: seo?.noIndex,
    canonicalUrl: seo?.canonicalUrl,
    siteSettings: settings,
    path: "/terms",
  });
}

type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: readonly string[] }
  | { type: "subheading"; text: string };

type Section = {
  id: string;
  number: string;
  title: string;
  blocks: readonly Block[];
};

function blockFromSanity(block: SanityLegalBlock): Block {
  if (block._type === "legalSubheading") return { type: "subheading", text: block.text ?? "" };
  if (block._type === "legalList") return { type: "list", items: block.items ?? [] };
  return { type: "p", text: block.text ?? "" };
}

const FALLBACK_SECTIONS: readonly Section[] = [
  {
    id: "agreement",
    number: "1",
    title: "Agreement to Terms",
    blocks: [
      {
        type: "p",
        text: 'By accessing or using the website located at sparklinemarketingfirm.com (the "Site") or engaging Sparkline Marketing Firm ("Sparkline," "we," "us," or "our") for any services, you ("Client," "you," or "your") agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, do not use the Site or our services.',
      },
      {
        type: "p",
        text: "These Terms apply to all visitors, users, and clients of Sparkline Marketing Firm.",
      },
    ],
  },
  {
    id: "about",
    number: "2",
    title: "About Sparkline Marketing Firm",
    blocks: [
      {
        type: "p",
        text: "Sparkline Marketing Firm is a Limited Liability Company (LLC) organized under the laws of the State of Georgia, United States. We provide organic marketing services including but not limited to:",
      },
      {
        type: "list",
        items: [
          "Google Business Profile optimization",
          "Local search engine optimization (SEO)",
          "Citation building and management",
          "Social media management and content creation",
          "Website performance and on-page SEO",
          "Reputation management",
          "Related digital marketing services",
        ],
      },
    ],
  },
  {
    id: "services",
    number: "3",
    title: "Services",
    blocks: [
      { type: "subheading", text: "3.1 Scope of Services" },
      {
        type: "p",
        text: 'Specific services, deliverables, timelines, and fees are defined in a separate written Service Agreement, Statement of Work ("SOW"), or signed proposal between Client and Sparkline. In the event of any conflict between these Terms and a signed Service Agreement, the Service Agreement shall control with respect to the specific engagement.',
      },
      { type: "subheading", text: "3.2 Service Plans" },
      {
        type: "p",
        text: "Sparkline offers tiered service plans, including but not limited to Visibility Foundation, Growth Authority, Market Dominance, Content Essentials, and Brand Authority. Plan features, pricing, and inclusions are subject to change and are confirmed at the time of signed engagement.",
      },
      { type: "subheading", text: "3.3 Organic-Only Positioning" },
      {
        type: "p",
        text: "Sparkline does not manage paid advertising campaigns as part of its core service offering. All strategies are organic in nature unless explicitly agreed in writing.",
      },
    ],
  },
  {
    id: "client-obligations",
    number: "4",
    title: "Client Obligations",
    blocks: [
      {
        type: "p",
        text: "To ensure successful delivery of services, Client agrees to:",
      },
      {
        type: "list",
        items: [
          "Provide timely access to necessary accounts, credentials, and platforms (including but not limited to Google Business Profile, Meta Business Suite, website admin access, CRM systems, and hosting providers)",
          "Respond to requests for information, approvals, and content review within reasonable timeframes",
          "Provide accurate, lawful, and non-infringing content, images, and information",
          "Comply with all applicable laws, platform policies (Google, Meta, Yelp, etc.), and industry regulations",
          "Maintain ownership or appropriate licenses for all materials provided to Sparkline",
          "Not interfere with or alter work performed by Sparkline without prior notification",
        ],
      },
      {
        type: "p",
        text: "Delays or failures caused by Client's non-performance may result in timeline adjustments without penalty to Sparkline.",
      },
    ],
  },
  {
    id: "fees",
    number: "5",
    title: "Fees and Payment Terms",
    blocks: [
      { type: "subheading", text: "5.1 Fees" },
      {
        type: "p",
        text: "All fees are as specified in the signed Service Agreement. Fees are quoted in U.S. Dollars and are exclusive of applicable taxes.",
      },
      { type: "subheading", text: "5.2 Billing" },
      { type: "p", text: "Unless otherwise agreed in writing:" },
      {
        type: "list",
        items: [
          "Setup fees and first-month fees are due in full prior to commencement of services",
          "Monthly retainers are billed in advance on a recurring basis",
          "Invoices are due upon receipt unless otherwise specified",
        ],
      },
      { type: "subheading", text: "5.3 Auto-Renewal" },
      {
        type: "p",
        text: "Recurring service agreements automatically renew on a month-to-month basis unless terminated in accordance with Section 8. Client authorizes Sparkline (or its payment processor) to charge the payment method on file on each renewal date.",
      },
      { type: "subheading", text: "5.4 Late Payments" },
      {
        type: "p",
        text: "Payments not received within seven (7) days of the due date may result in:",
      },
      {
        type: "list",
        items: [
          "Suspension of services",
          "A late fee of 1.5% per month (or the maximum allowed by law)",
          "Referral to collections after 30 days delinquent",
        ],
      },
      { type: "subheading", text: "5.5 Chargebacks" },
      {
        type: "p",
        text: "Any chargeback or payment reversal without prior written notice to Sparkline shall be considered a material breach of these Terms and may result in immediate termination of services, forfeiture of prepaid fees, and collection of outstanding balances.",
      },
      { type: "subheading", text: "5.6 Refunds" },
      {
        type: "p",
        text: "Except as required by law or expressly stated in a signed Service Agreement, all fees paid to Sparkline are non-refundable once services have commenced. Setup fees, onboarding fees, and completed deliverables are never refundable.",
      },
    ],
  },
  {
    id: "ip",
    number: "6",
    title: "Intellectual Property",
    blocks: [
      { type: "subheading", text: "6.1 Client Content" },
      {
        type: "p",
        text: "Client retains ownership of all content, trademarks, logos, and materials Client provides to Sparkline. Client grants Sparkline a non-exclusive license to use, modify, and display such materials solely for the purpose of delivering the agreed-upon services.",
      },
      { type: "subheading", text: "6.2 Deliverables" },
      {
        type: "p",
        text: "Upon full payment, Client receives ownership of final client-facing deliverables produced specifically for Client (such as written website copy, custom graphics created for Client, and published content).",
      },
      { type: "subheading", text: "6.3 Sparkline Tools, Processes, and Pre-Existing IP" },
      {
        type: "p",
        text: "Client acknowledges that Sparkline retains all rights to its:",
      },
      {
        type: "list",
        items: [
          "Proprietary systems, processes, frameworks, templates, and methodologies",
          "Internal tools, software, scripts, and automations",
          "Audit templates, reporting formats, SOPs, and training materials",
          "Know-how, trade secrets, and pre-existing intellectual property",
        ],
      },
      {
        type: "p",
        text: "No license to these materials is granted to Client beyond what is necessary to receive the services.",
      },
      { type: "subheading", text: "6.4 Portfolio and Case Study Rights" },
      {
        type: "p",
        text: "Unless Client opts out in writing, Sparkline may reference the engagement, display non-confidential work samples, and use Client's business name and logo for portfolio, marketing, and case study purposes.",
      },
    ],
  },
  {
    id: "confidentiality",
    number: "7",
    title: "Confidentiality",
    blocks: [
      {
        type: "p",
        text: "Both parties agree to protect confidential information shared during the engagement, including business data, strategies, access credentials, pricing, and proprietary information. This obligation survives termination of the engagement.",
      },
      { type: "p", text: "Sparkline may disclose confidential information only:" },
      {
        type: "list",
        items: [
          "To employees, contractors, or subprocessors bound by confidentiality obligations",
          "As required by law, court order, or regulatory authority",
          "With prior written consent of the disclosing party",
        ],
      },
    ],
  },
  {
    id: "term-termination",
    number: "8",
    title: "Term, Cancellation, and Termination",
    blocks: [
      { type: "subheading", text: "8.1 Term" },
      {
        type: "p",
        text: "The term of engagement is defined in the signed Service Agreement. Month-to-month services continue until properly terminated.",
      },
      { type: "subheading", text: "8.2 Cancellation by Client" },
      {
        type: "p",
        text: "Client may cancel month-to-month services by providing thirty (30) days' written notice via email to info@sparklinemarketingfirm.com. Services and billing will continue through the notice period. Fixed-term contracts are subject to the cancellation terms specified in the Service Agreement and may include early termination fees.",
      },
      { type: "subheading", text: "8.3 Termination by Sparkline" },
      {
        type: "p",
        text: "Sparkline may suspend or terminate services immediately if Client:",
      },
      {
        type: "list",
        items: [
          "Fails to pay fees when due",
          "Breaches these Terms or the Service Agreement",
          "Engages in unlawful, fraudulent, or abusive conduct",
          "Requests work that violates platform policies or applicable law",
          "Becomes insolvent or files for bankruptcy",
        ],
      },
      { type: "subheading", text: "8.4 Effect of Termination" },
      { type: "p", text: "Upon termination:" },
      {
        type: "list",
        items: [
          "Client remains liable for all fees accrued through the termination date",
          "Sparkline will deliver completed work product for which Client has paid",
          "Access credentials provided to Sparkline will be relinquished",
          "Sections that by their nature should survive (IP, confidentiality, liability, indemnification, dispute resolution) shall survive termination",
        ],
      },
    ],
  },
  {
    id: "disclaimers",
    number: "9",
    title: "Disclaimers and No Guarantees",
    blocks: [
      { type: "subheading", text: "9.1 No Guaranteed Results" },
      {
        type: "p",
        text: "Sparkline does not guarantee specific rankings, traffic volumes, lead counts, revenue outcomes, conversion rates, or business results. Search engine algorithms, social platform policies, consumer behavior, and competitive dynamics are outside Sparkline's control. Any projections, estimates, or examples provided are illustrative only and do not constitute a guarantee.",
      },
      { type: "subheading", text: "9.2 Third-Party Platforms" },
      {
        type: "p",
        text: "Services rely on third-party platforms including Google, Meta, Yelp, Bing, and others. Sparkline is not responsible for:",
      },
      {
        type: "list",
        items: [
          "Changes to algorithms, policies, or terms of service by these platforms",
          "Suspension, removal, or penalization of Client accounts, listings, or content by these platforms",
          "Downtime, outages, or data loss caused by third-party services",
        ],
      },
      { type: "subheading", text: '9.3 "As Is" Basis' },
      {
        type: "p",
        text: 'All services are provided on an "as is" and "as available" basis without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.',
      },
    ],
  },
  {
    id: "liability",
    number: "10",
    title: "Limitation of Liability",
    blocks: [
      { type: "p", text: "To the maximum extent permitted by law:" },
      {
        type: "list",
        items: [
          "Sparkline's total aggregate liability arising out of or related to these Terms or any services shall not exceed the total fees paid by Client to Sparkline in the three (3) months immediately preceding the claim.",
          "Sparkline shall not be liable for any indirect, incidental, consequential, special, exemplary, or punitive damages, including but not limited to lost profits, lost revenue, lost data, or business interruption.",
          "These limitations apply regardless of the legal theory (contract, tort, negligence, or otherwise) and even if Sparkline has been advised of the possibility of such damages.",
        ],
      },
    ],
  },
  {
    id: "indemnification",
    number: "11",
    title: "Indemnification",
    blocks: [
      {
        type: "p",
        text: "Client agrees to defend, indemnify, and hold harmless Sparkline, its owners, officers, employees, and contractors from any claims, damages, liabilities, losses, or expenses (including reasonable attorneys' fees) arising from:",
      },
      {
        type: "list",
        items: [
          "Content or materials provided by Client",
          "Client's violation of any law, regulation, or third-party rights",
          "Client's breach of these Terms",
          "Use of Client's products or services by any third party",
        ],
      },
    ],
  },
  {
    id: "non-solicitation",
    number: "12",
    title: "Non-Solicitation",
    blocks: [
      {
        type: "p",
        text: "During the engagement and for twelve (12) months following termination, Client agrees not to directly solicit, hire, or engage any Sparkline employee, contractor, or subcontractor who performed services for Client without Sparkline's prior written consent. Violation of this clause entitles Sparkline to liquidated damages equal to 50% of the annual compensation of the solicited individual.",
      },
    ],
  },
  {
    id: "force-majeure",
    number: "13",
    title: "Force Majeure",
    blocks: [
      {
        type: "p",
        text: "Neither party shall be liable for delays or failures in performance caused by events outside reasonable control, including but not limited to acts of God, natural disasters, pandemics, government actions, war, terrorism, labor disputes, internet outages, or third-party platform failures.",
      },
    ],
  },
  {
    id: "law",
    number: "14",
    title: "Governing Law and Dispute Resolution",
    blocks: [
      { type: "subheading", text: "14.1 Governing Law" },
      {
        type: "p",
        text: "These Terms are governed by the laws of the State of Georgia, United States, without regard to conflict-of-law principles.",
      },
      { type: "subheading", text: "14.2 Informal Resolution" },
      {
        type: "p",
        text: "Before initiating formal dispute resolution, the parties agree to attempt to resolve disputes informally through good-faith negotiation for at least thirty (30) days.",
      },
      { type: "subheading", text: "14.3 Binding Arbitration" },
      {
        type: "p",
        text: "Any dispute not resolved informally shall be settled by binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. Arbitration shall take place in Georgia. Judgment on the award may be entered in any court of competent jurisdiction.",
      },
      { type: "subheading", text: "14.4 Class Action Waiver" },
      {
        type: "p",
        text: "Client waives the right to participate in any class action or class-wide arbitration against Sparkline.",
      },
      { type: "subheading", text: "14.5 Exception for Injunctive Relief" },
      {
        type: "p",
        text: "Either party may seek injunctive relief in a court of competent jurisdiction to protect intellectual property or confidential information.",
      },
    ],
  },
  {
    id: "modifications",
    number: "15",
    title: "Modifications",
    blocks: [
      {
        type: "p",
        text: 'Sparkline reserves the right to modify these Terms at any time. Updated Terms will be posted on the Site with a revised "Last Updated" date. Continued use of the Site or services after changes constitutes acceptance of the modified Terms. Material changes affecting existing clients will be communicated via email.',
      },
    ],
  },
  {
    id: "privacy",
    number: "16",
    title: "Privacy Policy",
    blocks: [
      {
        type: "p",
        text: "Use of the Site and services is also governed by our Privacy Policy, which is incorporated into these Terms by reference.",
      },
    ],
  },
  {
    id: "website-use",
    number: "17",
    title: "Website Use",
    blocks: [
      { type: "subheading", text: "17.1 Permitted Use" },
      {
        type: "p",
        text: "The Site is provided for informational and business inquiry purposes. You may not:",
      },
      {
        type: "list",
        items: [
          "Use the Site for any unlawful purpose",
          "Attempt to gain unauthorized access to any portion of the Site",
          "Scrape, copy, or redistribute Site content without written permission",
          "Introduce viruses, malware, or harmful code",
          "Impersonate any person or entity",
        ],
      },
      { type: "subheading", text: "17.2 Third-Party Links" },
      {
        type: "p",
        text: "The Site may contain links to third-party websites. Sparkline is not responsible for the content, policies, or practices of any third-party sites.",
      },
    ],
  },
  {
    id: "electronic",
    number: "18",
    title: "Electronic Communications and Signatures",
    blocks: [
      {
        type: "p",
        text: "By engaging Sparkline, Client consents to receive communications electronically. Electronic signatures, including those executed via platforms such as DocuSign, HelloSign, or similar services, are legally binding and enforceable.",
      },
    ],
  },
  {
    id: "assignment",
    number: "19",
    title: "Assignment",
    blocks: [
      {
        type: "p",
        text: "Client may not assign or transfer these Terms without Sparkline's prior written consent. Sparkline may assign these Terms in connection with a merger, acquisition, or sale of assets.",
      },
    ],
  },
  {
    id: "severability",
    number: "20",
    title: "Severability",
    blocks: [
      {
        type: "p",
        text: "If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.",
      },
    ],
  },
  {
    id: "entire-agreement",
    number: "21",
    title: "Entire Agreement",
    blocks: [
      {
        type: "p",
        text: "These Terms, together with any signed Service Agreement and the Privacy Policy, constitute the entire agreement between Client and Sparkline regarding the subject matter hereof and supersede all prior agreements and communications.",
      },
    ],
  },
  {
    id: "contact",
    number: "22",
    title: "Contact Information",
    blocks: [
      { type: "p", text: "For questions regarding these Terms, contact us at:" },
      {
        type: "p",
        text: "Sparkline Marketing Firm, LLC · Email: info@sparklinemarketingfirm.com · State of Formation: Georgia, USA.",
      },
    ],
  },
];

export default async function TermsPage() {
  const cms = await getTermsPage();
  const sections: readonly Section[] =
    cms?.sections?.length
      ? cms.sections.map((s) => ({
          id: s.id ?? s._key ?? "",
          number: s.number ?? "",
          title: s.title ?? "",
          blocks: (s.blocks ?? []).map(blockFromSanity),
        }))
      : FALLBACK_SECTIONS;

  const companyName = cms?.companyName ?? "SPARKLINE MARKETING FIRM";
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
            Terms &amp; Conditions
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
            © 2026 SPARKLINE MARKETING FIRM. All rights reserved.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
