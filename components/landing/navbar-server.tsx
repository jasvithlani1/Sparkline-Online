import { getSiteHeader } from "@/sanity/lib/content";
import { Navbar } from "@/components/landing/navbar";

export async function NavbarServer() {
  const data = await getSiteHeader();
  return (
    <Navbar
      logoUrl={data?.logo?.assetUrl ?? data?.logo?.fallbackUrl}
      logoAlt={data?.logo?.alt}
      ctaLabel={data?.ctaLabel}
      ctaUrl={data?.ctaUrl}
    />
  );
}
