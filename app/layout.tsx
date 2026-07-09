import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BookingModalProvider } from "@/components/booking-modal-provider";
import { BookingModal } from "@/components/booking-modal";
import { GtmHead, GtmBody, Ga4Head } from "@/components/gtm";
import JsonLd from "@/components/json-ld";
import { getSiteSettings } from "@/sanity/lib/content";
import {
  buildOrganizationLD,
  buildPersonLD,
  buildWebSiteLD,
  sanitiseScript,
} from "@/lib/seo";

const calSans = localFont({
  variable: "--font-cal-sans",
  src: "../public/fonts/CalSans-Regular.ttf",
  weight: "400",
});

const DEFAULT_SITE_URL = "https://sparklinemarketingfirm.com";
const DEFAULT_SITE_NAME = "Sparkline Marketing Firm";
const GA_ID = "G-C5KNB4HH7Z";
const GSC_CODE = "ZKSqyuAGi_8sTtGgB_8Z-GSUueSw4PAWJlQ3p2zrXR8";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings?.siteTitle ?? DEFAULT_SITE_NAME;
  const siteUrl = settings?.siteUrl ?? DEFAULT_SITE_URL;
  const ogImage = settings?.defaultOgImageUrl;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: siteName, template: `%s | ${siteName}` },
    ...(settings?.defaultDescription ? { description: settings.defaultDescription } : {}),
    openGraph: {
      siteName,
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const analytics = settings?.analyticsGroup;
  const org = settings?.organizationSchema;
  const person = settings?.personSchema;
  const siteUrl = settings?.siteUrl ?? DEFAULT_SITE_URL;
  const siteName = settings?.siteTitle ?? DEFAULT_SITE_NAME;

  const jsonLdBlocks: Record<string, unknown>[] = [];
  if (org?.name) jsonLdBlocks.push(buildOrganizationLD(org, siteUrl));
  if (person?.name) jsonLdBlocks.push(buildPersonLD(person, siteUrl));
  jsonLdBlocks.push(buildWebSiteLD(siteName, siteUrl));

  const customHeader = settings?.customHeaderScripts
    ? sanitiseScript(settings.customHeaderScripts)
    : "";
  const customFooter = settings?.customFooterScripts
    ? sanitiseScript(settings.customFooterScripts)
    : "";

  return (
    <html lang="en" className={`${calSans.variable} h-full antialiased`}>
      <head>
        {/* Redirect /index.html → clean URL. nginx serves static files before
            .htaccess fires on SiteGround, so this client-side redirect is the
            only way to strip index.html without a server-level config change. */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var p=location.pathname;if(p.endsWith('/index.html'))location.replace(p.replace(/\\/index\\.html$/,'/')||'/')})()` }} />

        {/* Google Search Console verification */}
        <meta name="google-site-verification" content={GSC_CODE} />

        {/* GTM head snippet */}
        {analytics?.gtmId && <GtmHead gtmId={analytics.gtmId} />}

        {/* GA4 */}
        <Ga4Head gaId={GA_ID} />

        {/* Global JSON-LD: Organization, Person, WebSite */}
        {jsonLdBlocks.length > 0 && <JsonLd data={jsonLdBlocks} />}

        {/* Custom header scripts (sanitised) */}
        {customHeader && (
          <script
            id="custom-header"
            dangerouslySetInnerHTML={{ __html: customHeader }}
          />
        )}
      </head>
      <body className="relative min-h-full w-full flex flex-col">
        {/* GTM noscript body tag */}
        {analytics?.gtmId && <GtmBody gtmId={analytics.gtmId} />}

        <BookingModalProvider>
          {children}
          <BookingModal />
        </BookingModalProvider>

        {/* Custom footer scripts (sanitised) */}
        {customFooter && (
          <script
            id="custom-footer"
            dangerouslySetInnerHTML={{ __html: customFooter }}
          />
        )}
      </body>
    </html>
  );
}
