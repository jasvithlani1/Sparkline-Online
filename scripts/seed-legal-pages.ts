/**
 * Seed Terms & Conditions and Privacy Policy into Sanity.
 * Run with: npx tsx scripts/seed-legal-pages.ts
 * Requires SANITY_API_TOKEN in your environment.
 */

import { createClient } from "@sanity/client";
import { v4 as uuidv4 } from "uuid";

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
  apiVersion: "2026-05-30",
  token,
});

// ---------------------------------------------------------------------------
// Block helpers
// ---------------------------------------------------------------------------

function p(text: string) {
  return { _type: "legalParagraph", _key: uuidv4(), text };
}

function sub(text: string) {
  return { _type: "legalSubheading", _key: uuidv4(), text };
}

function list(items: string[]) {
  return { _type: "legalList", _key: uuidv4(), items };
}

function table(rows: { category: string; provider: string }[]) {
  return {
    _type: "legalTable",
    _key: uuidv4(),
    rows: rows.map((r) => ({ _type: "legalTableRow", _key: uuidv4(), ...r })),
  };
}

function section(id: string, number: string, title: string, blocks: object[]) {
  return { _type: "legalSection", _key: uuidv4(), id, number, title, blocks };
}

// ---------------------------------------------------------------------------
// Terms & Conditions content
// ---------------------------------------------------------------------------

const termsSections = [
  section("agreement", "1", "Agreement to Terms", [
    p('By accessing or using the website located at sparklinemarketingfirm.com (the "Site") or engaging Sparkline Marketing Firm ("Sparkline," "we," "us," or "our") for any services, you ("Client," "you," or "your") agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, do not use the Site or our services.'),
    p("These Terms apply to all visitors, users, and clients of Sparkline Marketing Firm."),
  ]),
  section("about", "2", "About Sparkline Marketing Firm", [
    p("Sparkline Marketing Firm is a Limited Liability Company (LLC) organized under the laws of the State of Georgia, United States. We provide organic marketing services including but not limited to:"),
    list([
      "Google Business Profile optimization",
      "Local search engine optimization (SEO)",
      "Citation building and management",
      "Social media management and content creation",
      "Website performance and on-page SEO",
      "Reputation management",
      "Related digital marketing services",
    ]),
  ]),
  section("services", "3", "Services", [
    sub("3.1 Scope of Services"),
    p('Specific services, deliverables, timelines, and fees are defined in a separate written Service Agreement, Statement of Work ("SOW"), or signed proposal between Client and Sparkline. In the event of any conflict between these Terms and a signed Service Agreement, the Service Agreement shall control with respect to the specific engagement.'),
    sub("3.2 Service Plans"),
    p("Sparkline offers tiered service plans, including but not limited to Visibility Foundation, Growth Authority, Market Dominance, Content Essentials, and Brand Authority. Plan features, pricing, and inclusions are subject to change and are confirmed at the time of signed engagement."),
    sub("3.3 Organic-Only Positioning"),
    p("Sparkline does not manage paid advertising campaigns as part of its core service offering. All strategies are organic in nature unless explicitly agreed in writing."),
  ]),
  section("client-obligations", "4", "Client Obligations", [
    p("To ensure successful delivery of services, Client agrees to:"),
    list([
      "Provide timely access to necessary accounts, credentials, and platforms (including but not limited to Google Business Profile, Meta Business Suite, website admin access, CRM systems, and hosting providers)",
      "Respond to requests for information, approvals, and content review within reasonable timeframes",
      "Provide accurate, lawful, and non-infringing content, images, and information",
      "Comply with all applicable laws, platform policies (Google, Meta, Yelp, etc.), and industry regulations",
      "Maintain ownership or appropriate licenses for all materials provided to Sparkline",
      "Not interfere with or alter work performed by Sparkline without prior notification",
    ]),
    p("Delays or failures caused by Client's non-performance may result in timeline adjustments without penalty to Sparkline."),
  ]),
  section("fees", "5", "Fees and Payment Terms", [
    sub("5.1 Fees"),
    p("All fees are as specified in the signed Service Agreement. Fees are quoted in U.S. Dollars and are exclusive of applicable taxes."),
    sub("5.2 Billing"),
    p("Unless otherwise agreed in writing:"),
    list([
      "Setup fees and first-month fees are due in full prior to commencement of services",
      "Monthly retainers are billed in advance on a recurring basis",
      "Invoices are due upon receipt unless otherwise specified",
    ]),
    sub("5.3 Auto-Renewal"),
    p("Recurring service agreements automatically renew on a month-to-month basis unless terminated in accordance with Section 8. Client authorizes Sparkline (or its payment processor) to charge the payment method on file on each renewal date."),
    sub("5.4 Late Payments"),
    p("Payments not received within seven (7) days of the due date may result in:"),
    list([
      "Suspension of services",
      "A late fee of 1.5% per month (or the maximum allowed by law)",
      "Referral to collections after 30 days delinquent",
    ]),
    sub("5.5 Chargebacks"),
    p("Any chargeback or payment reversal without prior written notice to Sparkline shall be considered a material breach of these Terms and may result in immediate termination of services, forfeiture of prepaid fees, and collection of outstanding balances."),
    sub("5.6 Refunds"),
    p("Except as required by law or expressly stated in a signed Service Agreement, all fees paid to Sparkline are non-refundable once services have commenced. Setup fees, onboarding fees, and completed deliverables are never refundable."),
  ]),
  section("ip", "6", "Intellectual Property", [
    sub("6.1 Client Content"),
    p("Client retains ownership of all content, trademarks, logos, and materials Client provides to Sparkline. Client grants Sparkline a non-exclusive license to use, modify, and display such materials solely for the purpose of delivering the agreed-upon services."),
    sub("6.2 Deliverables"),
    p("Upon full payment, Client receives ownership of final client-facing deliverables produced specifically for Client (such as written website copy, custom graphics created for Client, and published content)."),
    sub("6.3 Sparkline Tools, Processes, and Pre-Existing IP"),
    p("Client acknowledges that Sparkline retains all rights to its:"),
    list([
      "Proprietary systems, processes, frameworks, templates, and methodologies",
      "Internal tools, software, scripts, and automations",
      "Audit templates, reporting formats, SOPs, and training materials",
      "Know-how, trade secrets, and pre-existing intellectual property",
    ]),
    p("No license to these materials is granted to Client beyond what is necessary to receive the services."),
    sub("6.4 Portfolio and Case Study Rights"),
    p("Unless Client opts out in writing, Sparkline may reference the engagement, display non-confidential work samples, and use Client's business name and logo for portfolio, marketing, and case study purposes."),
  ]),
  section("confidentiality", "7", "Confidentiality", [
    p("Both parties agree to protect confidential information shared during the engagement, including business data, strategies, access credentials, pricing, and proprietary information. This obligation survives termination of the engagement."),
    p("Sparkline may disclose confidential information only:"),
    list([
      "To employees, contractors, or subprocessors bound by confidentiality obligations",
      "As required by law, court order, or regulatory authority",
      "With prior written consent of the disclosing party",
    ]),
  ]),
  section("term-termination", "8", "Term, Cancellation, and Termination", [
    sub("8.1 Term"),
    p("The term of engagement is defined in the signed Service Agreement. Month-to-month services continue until properly terminated."),
    sub("8.2 Cancellation by Client"),
    p("Client may cancel month-to-month services by providing thirty (30) days' written notice via email to info@sparklinemarketingfirm.com. Services and billing will continue through the notice period. Fixed-term contracts are subject to the cancellation terms specified in the Service Agreement and may include early termination fees."),
    sub("8.3 Termination by Sparkline"),
    p("Sparkline may suspend or terminate services immediately if Client:"),
    list([
      "Fails to pay fees when due",
      "Breaches these Terms or the Service Agreement",
      "Engages in unlawful, fraudulent, or abusive conduct",
      "Requests work that violates platform policies or applicable law",
      "Becomes insolvent or files for bankruptcy",
    ]),
    sub("8.4 Effect of Termination"),
    p("Upon termination:"),
    list([
      "Client remains liable for all fees accrued through the termination date",
      "Sparkline will deliver completed work product for which Client has paid",
      "Access credentials provided to Sparkline will be relinquished",
      "Sections that by their nature should survive (IP, confidentiality, liability, indemnification, dispute resolution) shall survive termination",
    ]),
  ]),
  section("disclaimers", "9", "Disclaimers and No Guarantees", [
    sub("9.1 No Guaranteed Results"),
    p("Sparkline does not guarantee specific rankings, traffic volumes, lead counts, revenue outcomes, conversion rates, or business results. Search engine algorithms, social platform policies, consumer behavior, and competitive dynamics are outside Sparkline's control. Any projections, estimates, or examples provided are illustrative only and do not constitute a guarantee."),
    sub("9.2 Third-Party Platforms"),
    p("Services rely on third-party platforms including Google, Meta, Yelp, Bing, and others. Sparkline is not responsible for:"),
    list([
      "Changes to algorithms, policies, or terms of service by these platforms",
      "Suspension, removal, or penalization of Client accounts, listings, or content by these platforms",
      "Downtime, outages, or data loss caused by third-party services",
    ]),
    sub('9.3 "As Is" Basis'),
    p('All services are provided on an "as is" and "as available" basis without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.'),
  ]),
  section("liability", "10", "Limitation of Liability", [
    p("To the maximum extent permitted by law:"),
    list([
      "Sparkline's total aggregate liability arising out of or related to these Terms or any services shall not exceed the total fees paid by Client to Sparkline in the three (3) months immediately preceding the claim.",
      "Sparkline shall not be liable for any indirect, incidental, consequential, special, exemplary, or punitive damages, including but not limited to lost profits, lost revenue, lost data, or business interruption.",
      "These limitations apply regardless of the legal theory (contract, tort, negligence, or otherwise) and even if Sparkline has been advised of the possibility of such damages.",
    ]),
  ]),
  section("indemnification", "11", "Indemnification", [
    p("Client agrees to defend, indemnify, and hold harmless Sparkline, its owners, officers, employees, and contractors from any claims, damages, liabilities, losses, or expenses (including reasonable attorneys' fees) arising from:"),
    list([
      "Content or materials provided by Client",
      "Client's violation of any law, regulation, or third-party rights",
      "Client's breach of these Terms",
      "Use of Client's products or services by any third party",
    ]),
  ]),
  section("non-solicitation", "12", "Non-Solicitation", [
    p("During the engagement and for twelve (12) months following termination, Client agrees not to directly solicit, hire, or engage any Sparkline employee, contractor, or subcontractor who performed services for Client without Sparkline's prior written consent. Violation of this clause entitles Sparkline to liquidated damages equal to 50% of the annual compensation of the solicited individual."),
  ]),
  section("force-majeure", "13", "Force Majeure", [
    p("Neither party shall be liable for delays or failures in performance caused by events outside reasonable control, including but not limited to acts of God, natural disasters, pandemics, government actions, war, terrorism, labor disputes, internet outages, or third-party platform failures."),
  ]),
  section("law", "14", "Governing Law and Dispute Resolution", [
    sub("14.1 Governing Law"),
    p("These Terms are governed by the laws of the State of Georgia, United States, without regard to conflict-of-law principles."),
    sub("14.2 Informal Resolution"),
    p("Before initiating formal dispute resolution, the parties agree to attempt to resolve disputes informally through good-faith negotiation for at least thirty (30) days."),
    sub("14.3 Binding Arbitration"),
    p("Any dispute not resolved informally shall be settled by binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. Arbitration shall take place in Georgia. Judgment on the award may be entered in any court of competent jurisdiction."),
    sub("14.4 Class Action Waiver"),
    p("Client waives the right to participate in any class action or class-wide arbitration against Sparkline."),
    sub("14.5 Exception for Injunctive Relief"),
    p("Either party may seek injunctive relief in a court of competent jurisdiction to protect intellectual property or confidential information."),
  ]),
  section("modifications", "15", "Modifications", [
    p('Sparkline reserves the right to modify these Terms at any time. Updated Terms will be posted on the Site with a revised "Last Updated" date. Continued use of the Site or services after changes constitutes acceptance of the modified Terms. Material changes affecting existing clients will be communicated via email.'),
  ]),
  section("privacy", "16", "Privacy Policy", [
    p("Use of the Site and services is also governed by our Privacy Policy, which is incorporated into these Terms by reference."),
  ]),
  section("website-use", "17", "Website Use", [
    sub("17.1 Permitted Use"),
    p("The Site is provided for informational and business inquiry purposes. You may not:"),
    list([
      "Use the Site for any unlawful purpose",
      "Attempt to gain unauthorized access to any portion of the Site",
      "Scrape, copy, or redistribute Site content without written permission",
      "Introduce viruses, malware, or harmful code",
      "Impersonate any person or entity",
    ]),
    sub("17.2 Third-Party Links"),
    p("The Site may contain links to third-party websites. Sparkline is not responsible for the content, policies, or practices of any third-party sites."),
  ]),
  section("electronic", "18", "Electronic Communications and Signatures", [
    p("By engaging Sparkline, Client consents to receive communications electronically. Electronic signatures, including those executed via platforms such as DocuSign, HelloSign, or similar services, are legally binding and enforceable."),
  ]),
  section("assignment", "19", "Assignment", [
    p("Client may not assign or transfer these Terms without Sparkline's prior written consent. Sparkline may assign these Terms in connection with a merger, acquisition, or sale of assets."),
  ]),
  section("severability", "20", "Severability", [
    p("If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full force and effect."),
  ]),
  section("entire-agreement", "21", "Entire Agreement", [
    p("These Terms, together with any signed Service Agreement and the Privacy Policy, constitute the entire agreement between Client and Sparkline regarding the subject matter hereof and supersede all prior agreements and communications."),
  ]),
  section("contact", "22", "Contact Information", [
    p("For questions regarding these Terms, contact us at:"),
    p("Sparkline Marketing Firm, LLC · Email: info@sparklinemarketingfirm.com · State of Formation: Georgia, USA."),
  ]),
];

// ---------------------------------------------------------------------------
// Privacy Policy content
// ---------------------------------------------------------------------------

const privacySections = [
  section("introduction", "1", "Introduction", [
    p('Sparkline Marketing Firm, LLC ("Sparkline," "we," "us," or "our") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and protect information when you:'),
    list([
      'Visit our website at sparklinemarketingfirm.com (the "Site")',
      "Submit inquiries, forms, or applications",
      "Engage with our marketing communications",
      "Become or interact with a client of Sparkline",
    ]),
    p("By using the Site or our services, you agree to the practices described in this Privacy Policy."),
  ]),
  section("information-we-collect", "2", "Information We Collect", [
    sub("2.1 Information You Provide Directly"),
    p("We collect information you voluntarily submit, including:"),
    list([
      "Contact details: name, email address, phone number, business name, website URL",
      "Business information: industry, location, service needs, marketing goals",
      "Communications: messages sent through contact forms, live chat, email, or phone",
      "Account credentials: Google Business Profile, Meta Business Suite, website admin, CRM, and other platform access provided during client engagements",
      "Payment information: billing name, address, and payment details (processed through our payment processor — Sparkline does not store full card numbers)",
      "Employment or partnership applications: resume, work history, references",
    ]),
    sub("2.2 Information Collected Automatically"),
    p("When you visit the Site, we and our third-party service providers automatically collect:"),
    list([
      "Device and browser data: IP address, browser type, operating system, device identifiers, referring URLs",
      "Usage data: pages visited, time on site, click paths, scroll depth, actions taken",
      "Location data: approximate geographic location derived from IP address",
      "Cookies and similar technologies (see Section 4)",
    ]),
    sub("2.3 Information from Third Parties"),
    p("We may receive information from:"),
    list([
      "Analytics providers (Google Analytics)",
      "Advertising platforms (Meta/Facebook, Google Ads)",
      "Public business databases (for prospecting and lead research)",
      "Social media platforms when you interact with our profiles",
      "Referral partners who provide your contact information with consent",
    ]),
  ]),
  section("how-we-use", "3", "How We Use Your Information", [
    p("We use collected information to:"),
    list([
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
    ]),
  ]),
  section("cookies", "4", "Cookies and Tracking Technologies", [
    sub("4.1 What We Use"),
    p("Our Site uses cookies, pixels, tags, and similar technologies, including:"),
    list([
      "Essential cookies — required for core Site functionality (forms, navigation)",
      "Analytics cookies — Google Analytics to measure traffic and user behavior",
      "Advertising cookies and pixels — Meta Pixel, Google Ads tags, and similar tools that enable retargeting and conversion tracking",
      "Live chat and engagement tools — chat widgets, email capture popups, and similar tools that collect interaction data",
      "Functional cookies — remember preferences and improve user experience",
    ]),
    sub("4.2 Your Cookie Choices"),
    p("You can control cookies through:"),
    list([
      "Your browser settings — most browsers allow you to block or delete cookies",
      "Google Analytics opt-out: tools.google.com/dlpage/gaoptout",
      "Meta/Facebook ads opt-out: facebook.com/settings/?tab=ads",
      "Digital Advertising Alliance: optout.aboutads.info",
      "Network Advertising Initiative: optout.networkadvertising.org",
    ]),
    p("Blocking cookies may affect Site functionality."),
  ]),
  section("subprocessors", "5", "Third-Party Services and Subprocessors", [
    p("We use trusted third-party providers to operate our business. These providers may process your data on our behalf, subject to their own privacy policies. Current subprocessors include:"),
    table([
      { category: "Analytics", provider: "Google Analytics" },
      { category: "Advertising", provider: "Meta/Facebook, Google Ads" },
      { category: "CRM and automation", provider: "GoHighLevel" },
      { category: "Email delivery", provider: "Google Workspace, SendGrid" },
      { category: "Payment processing", provider: "Stripe (or equivalent)" },
      { category: "Local SEO tools", provider: "BrightLocal, Local Viking, Whitespark" },
      { category: "Cloud storage", provider: "Google Workspace" },
    ]),
    p("Additional subprocessors may be used as our services evolve. A current list is available upon request by emailing info@sparklinemarketingfirm.com."),
  ]),
  section("how-we-share", "6", "How We Share Information", [
    p("We do not sell your personal information. We may share information in the following circumstances:"),
    list([
      "With service providers — subprocessors listed above who help us operate our business",
      "With clients — when information is directly relevant to services we deliver for a client",
      "For legal reasons — to comply with laws, court orders, subpoenas, or legal process",
      "To protect rights — to prevent fraud, protect safety, or enforce our agreements",
      "In business transfers — in connection with a merger, acquisition, or sale of assets",
      "With your consent — when you direct us to share information",
    ]),
  ]),
  section("marketing", "7", "Marketing Communications", [
    sub("7.1 Email Marketing"),
    p("We may send marketing emails, newsletters, and promotional content to individuals who have provided their email address or to business contacts identified through lawful prospecting activities."),
    sub("7.2 Cold Outreach"),
    p("As a marketing agency, we conduct business-to-business outreach to potential clients using publicly available business information. All outreach complies with applicable laws, including the CAN-SPAM Act."),
    sub("7.3 Opt-Out"),
    p('Every marketing email includes an unsubscribe link. You may also opt out at any time by emailing info@sparklinemarketingfirm.com with "Unsubscribe" in the subject line. Transactional emails (billing, service updates, account notices) are not subject to opt-out.'),
  ]),
  section("rights", "8", "Your Privacy Rights", [
    sub("8.1 General Rights"),
    p("Depending on your jurisdiction, you may have the right to:"),
    list([
      "Access the personal information we hold about you",
      "Request correction of inaccurate information",
      "Request deletion of your personal information",
      "Object to or restrict certain processing",
      "Receive a copy of your data in a portable format",
      "Withdraw consent where processing is based on consent",
    ]),
    p("To exercise any of these rights, email info@sparklinemarketingfirm.com. We will respond within the timeframes required by applicable law."),
    sub("8.2 California Residents (CCPA/CPRA)"),
    p("If you are a California resident, you have additional rights under the California Consumer Privacy Act, as amended by the California Privacy Rights Act:"),
    list([
      "Right to know what personal information we collect, use, and share",
      "Right to delete personal information we have collected",
      "Right to correct inaccurate personal information",
      "Right to opt out of the sale or sharing of personal information",
      "Right to limit use of sensitive personal information",
      "Right to non-discrimination for exercising your rights",
    ]),
    p('Sparkline does not sell personal information. We may "share" information with advertising partners (such as Meta and Google) for cross-context behavioral advertising purposes under CCPA definitions. You may opt out of such sharing by emailing info@sparklinemarketingfirm.com or by using the cookie opt-out tools in Section 4.2.'),
    p("To submit a CCPA request, email info@sparklinemarketingfirm.com. We will verify your identity before fulfilling your request. Authorized agents may submit requests on your behalf with valid written authorization."),
    sub("8.3 Other U.S. State Residents"),
    p("Residents of Virginia, Colorado, Connecticut, Utah, and other states with comprehensive privacy laws have rights similar to those described above. Contact us at info@sparklinemarketingfirm.com to exercise these rights."),
  ]),
  section("retention", "9", "Data Retention", [
    p("We retain personal information only as long as necessary to:"),
    list([
      "Provide services and fulfill contractual obligations",
      "Comply with legal, tax, and accounting requirements",
      "Resolve disputes and enforce agreements",
    ]),
    p("General retention timelines:"),
    list([
      "Client records and engagement data: 7 years after engagement ends (for tax and legal purposes)",
      "Prospecting and marketing data: 24 months after last interaction",
      "Website analytics data: as governed by Google Analytics retention settings (typically 14–26 months)",
      "Form submissions: 24 months if no engagement results",
      "Payment records: 7 years (tax compliance)",
    ]),
    p("After retention periods expire, data is deleted or anonymized."),
  ]),
  section("security", "10", "Data Security", [
    p("We implement reasonable administrative, technical, and physical safeguards to protect personal information, including:"),
    list([
      "Encryption of data in transit (HTTPS/TLS)",
      "Access controls and authentication",
      "Secure password storage practices",
      "Regular review of security practices",
      "Vendor due diligence for subprocessors",
    ]),
    p("No method of transmission or storage is 100% secure. If a data breach occurs affecting your information, we will notify you in accordance with applicable laws."),
  ]),
  section("children", "11", "Children's Privacy", [
    p("The Site and our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If we learn we have collected such information, we will delete it promptly. Parents or guardians who believe a child has provided us with personal information should contact info@sparklinemarketingfirm.com."),
  ]),
  section("international", "12", "International Users", [
    p("Sparkline operates from the United States. If you access the Site from outside the U.S., your information will be transferred to, stored, and processed in the United States, which may have different data protection laws than your country."),
    p("By using the Site, you consent to the transfer of your information to the United States."),
  ]),
  section("dnt", "13", "Do Not Track", [
    p('Some browsers offer a "Do Not Track" signal. Because no common industry standard exists for responding to DNT signals, our Site does not currently respond to them. You can control tracking using the cookie opt-out tools in Section 4.2.'),
  ]),
  section("third-party-links", "14", "Third-Party Links", [
    p("The Site may contain links to third-party websites, plugins, and services. We are not responsible for the privacy practices of third parties. Review their privacy policies before providing any personal information."),
  ]),
  section("changes", "15", "Changes to This Privacy Policy", [
    p("We may update this Privacy Policy from time to time. When we make material changes, we will:"),
    list([
      'Update the "Last Updated" date at the top of this page',
      "Post the revised policy on the Site",
      "Notify clients and email subscribers where legally required",
    ]),
    p("Continued use of the Site or services after changes constitutes acceptance of the updated Privacy Policy."),
  ]),
  section("contact", "16", "Contact Us", [
    p("For questions, requests, or concerns about this Privacy Policy or your personal information:"),
    p("Sparkline Marketing Firm, LLC · Email: info@sparklinemarketingfirm.com · State of Formation: Georgia, USA."),
  ]),
];

// ---------------------------------------------------------------------------
// Upsert documents
// ---------------------------------------------------------------------------

const termsDoc = {
  _id: "termsPage",
  _type: "termsPage",
  seo: {
    _type: "seo",
    title: "Terms & Conditions — Sparkline Marketing Firm",
    description:
      "Terms and conditions governing use of the Sparkline Marketing Firm website and engagement of our services.",
  },
  effectiveDate: "April 29, 2026",
  lastUpdated: "April 29, 2026",
  companyName: "SPARKLINE MARKETING FIRM",
  sections: termsSections,
};

const privacyDoc = {
  _id: "privacyPage",
  _type: "privacyPage",
  seo: {
    _type: "seo",
    title: "Privacy Policy — Sparkline Marketing Firm",
    description:
      "How Sparkline Marketing Firm collects, uses, discloses, and protects your information.",
  },
  effectiveDate: "April 29, 2026",
  lastUpdated: "April 29, 2026",
  companyName: "SPARKLINE MARKETING FIRM, LLC",
  sections: privacySections,
};

async function main() {
  console.log("Seeding Terms & Conditions…");
  await client.createOrReplace(termsDoc);
  console.log("  ✓ termsPage created/updated");

  console.log("Seeding Privacy Policy…");
  await client.createOrReplace(privacyDoc);
  console.log("  ✓ privacyPage created/updated");

  console.log("\nDone. Both legal pages are now live in Sanity.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
