/* eslint-disable @next/next/no-img-element */

import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "@/app/page";
import { workGallery } from "@/lib/content";
import { getPortfolioProjects } from "@/sanity/lib/content";

vi.mock("next/image", () => ({
  default: ({
    priority: _priority,
    fill: _fill,
    ...props
  }: React.ComponentProps<"img"> & { fill?: boolean; priority?: boolean }) => {
    void _priority;
    void _fill;

    return <img {...props} alt={props.alt ?? ""} />;
  },
}));

vi.mock("@/sanity/lib/content", () => ({
  getPortfolioProjects: vi.fn(),
}));

const intersectionObserverMock = vi.fn();
const playMock = vi.fn().mockResolvedValue(undefined);
const pauseMock = vi.fn();
const getPortfolioProjectsMock = vi.mocked(getPortfolioProjects);

type PortfolioProject = Awaited<ReturnType<typeof getPortfolioProjects>>[number];

function cmsProject(overrides: Partial<PortfolioProject> = {}): PortfolioProject {
  return {
    id: "portfolioProject.cms-home-project",
    slug: "cms-home-project",
    name: "CMS Home Project",
    date: "June 1, 2026",
    meta: "CMS",
    description: "Updated from backend.",
    ctaLabel: "View Project",
    image: "/images/work-firecrawl.png",
    imageClassName: "object-cover object-center",
    intro: "CMS intro",
    tagline: "CMS tagline",
    summary: "CMS summary",
    services: ["CMS"],
    sections: [],
    ...overrides,
  };
}

async function renderHome() {
  const page = await Home();
  return render(page);
}

beforeEach(() => {
  getPortfolioProjectsMock.mockResolvedValue(
    [...workGallery.projects] as unknown as Awaited<ReturnType<typeof getPortfolioProjects>>,
  );
});

beforeAll(() => {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds = [0];

    constructor(private readonly callback: IntersectionObserverCallback) {
      intersectionObserverMock();
      this.callback([{ isIntersecting: true } as IntersectionObserverEntry, this] as const, this);
    }

    disconnect() {}

    observe() {}

    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }

    unobserve() {}
  }

  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(playMock);
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(pauseMock);
});

afterEach(() => {
  intersectionObserverMock.mockClear();
  playMock.mockClear();
  pauseMock.mockClear();
  getPortfolioProjectsMock.mockReset();
});

afterAll(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Home page", () => {
  it("renders landing work gallery projects from backend content", async () => {
    getPortfolioProjectsMock.mockResolvedValue([
      cmsProject(),
      cmsProject({
        id: "portfolioProject.cms-second-project",
        slug: "cms-second-project",
        name: "CMS Second Project",
        description: "Another backend project.",
      }),
    ]);

    await renderHome();

    const cards = screen.getAllByTestId("work-gallery-card");

    expect(getPortfolioProjectsMock).toHaveBeenCalledTimes(1);
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveAttribute("href", "/portfolio/cms-home-project");
    expect(cards[1]).toHaveAttribute("href", "/portfolio/cms-second-project");
    expect(within(cards[0]).getByRole("heading", { name: /cms home project/i, level: 3 })).toBeInTheDocument();
    expect(within(cards[0]).getByText("Updated from backend.")).toHaveClass("line-clamp-3");
    expect(within(cards[0]).getByText(/see project/i)).toHaveClass("mt-auto");
    expect(within(cards[1]).getByRole("heading", { name: /cms second project/i, level: 3 })).toBeInTheDocument();
    expect(within(cards[1]).getByText("Another backend project.")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /firecrawl/i, level: 3 })).not.toBeInTheDocument();
  });

  it("renders the approved landing page sections and copy", async () => {
    const { container } = await renderHome();
    const main = container.querySelector("main");
    const brandLink = screen.getByRole("link", { name: /sparkline marketing firm/i });
    const navbar = screen.getByTestId("site-navbar");
    const brandLogo = within(navbar).getByAltText(/sparkline marketing firm/i);
    const featureIntro = screen.getByTestId("feature-intro");
    const featureIntroContent = screen.getByTestId("feature-intro-content");
    const midpageGradientBand = screen.getByTestId("midpage-gradient-band");
    const servicesSection = screen
      .getByRole("heading", { name: /how can we serve you\?/i, level: 2 })
      .closest("section");
    const trustedBySection = screen.getByTestId("trusted-by-section");
    const workGallerySection = screen.getByTestId("work-gallery-section");

    expect(
      screen.getByRole("heading", { name: /marketing supercharged/i, level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("hero-second-line")).toHaveTextContent(/^Marketing Supercharged$/i);
    expect(screen.getByText(/how can we serve you\?/i)).toBeInTheDocument();
    expect(screen.getByText(/trusted by visionary brands/i)).toBeInTheDocument();
    expect(screen.getByText(/growth and shaping the future\./i)).toBeInTheDocument();
    expect(screen.queryByText(/^future\.$/i)).not.toBeInTheDocument();
    expect(screen.getByText(/work highlights/i)).toBeInTheDocument();
    expect(screen.queryByText(/haven demo:/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/turn digital presence into measurable growth/i),
    ).toBeInTheDocument();
    expect(featureIntro).toHaveClass("bg-[#050C1E]");
    expect(featureIntro).toHaveClass("pb-8");
    expect(featureIntro).toHaveClass("sm:pb-10");
    expect(featureIntro).toHaveClass("md:pb-12");
    expect(featureIntro).toHaveClass("lg:pb-14");
    expect(featureIntroContent).toHaveClass("max-w-[1308px]");
    expect(featureIntroContent).not.toHaveClass("max-w-[415px]");
    expect(featureIntroContent).toHaveClass("text-white");
    expect(within(featureIntro).queryByRole("link", { name: /learn more/i })).not.toBeInTheDocument();
    expect(midpageGradientBand).toHaveClass("bg-[linear-gradient(180deg,#0B349F_0%,#050C1E_100%)]");
    expect(servicesSection).toHaveClass("pt-0");
    expect(servicesSection).toHaveClass("sm:pt-0");
    expect(servicesSection).toHaveClass("md:pt-0");
    expect(servicesSection).not.toHaveClass("bg-white");
    expect(trustedBySection).not.toHaveClass("bg-white");
    expect(workGallerySection).not.toHaveClass("bg-white");
    expect(main).toHaveClass("bg-white");
    expect(brandLink).toBeInTheDocument();
    expect(brandLogo).toHaveAttribute("src", "/logos/sparkline-new-logo.svg");
    expect(brandLogo).toHaveClass("w-[108px]");
    expect(brandLogo).toHaveClass("sm:w-[126px]");
    expect(brandLogo).toHaveClass("md:w-[146px]");
    expect(brandLogo).toHaveClass("lg:w-[162px]");
    const ctaButton = screen.getByRole("link", { name: /book a call/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveClass("inline-flex");
    expect(ctaButton).toHaveClass("items-center");
    expect(ctaButton).toHaveClass("justify-center");
    expect(ctaButton).toHaveClass("whitespace-nowrap");
    expect(ctaButton).toHaveClass("px-3");
    expect(ctaButton).toHaveClass("py-2");
    expect(ctaButton).toHaveClass("text-[13px]");
    expect(ctaButton).toHaveClass("sm:text-[15px]");
    expect(ctaButton).toHaveClass("text-white");
    expect(ctaButton.getAttribute("style")).toContain("border-radius: 8px");
    expect(ctaButton.getAttribute("style")).toContain("border-width: 1px");
    expect(ctaButton.getAttribute("style")).toContain("border-style: solid");
    expect(ctaButton.getAttribute("style")).toContain("border-color: rgba(255, 255, 255, 0.16)");
    expect(ctaButton.getAttribute("style")).toContain("line-height: 18px");
    expect(ctaButton.getAttribute("style")).toContain("font-weight: 600");
    expect(ctaButton.getAttribute("style")).toContain(
      "linear-gradient(180deg, rgb(143, 87, 255) 0%, rgb(76, 47, 255) 100%)",
    );
    expect(ctaButton.getAttribute("style")).toContain(
      "#FFFFFF14 0px 0.5px 0.5px inset, #5F38D933 0px 1px 1px, #5F38D933 0px 1px 1px, #4C2FFF66 0px 2px 5px -2px, #4C2FFF 0px 0px 0px 1px",
    );
  });

  it("does not render the temporary bottom-right service video overlay", async () => {
    await renderHome();

    expect(screen.queryByTestId("service-submarine-frame")).not.toBeInTheDocument();
    expect(screen.queryByTestId("service-submarine-video")).not.toBeInTheDocument();
  });

  it("renders trusted-by logos as two full-width marquee rows with opposite directions", async () => {
    await renderHome();

    const marquee = screen.getByTestId("trusted-by-marquee");
    const rowOne = screen.getByTestId("trusted-by-row-0");
    const rowTwo = screen.getByTestId("trusted-by-row-1");

    expect(marquee).toHaveClass("overflow-hidden");
    expect(marquee).toHaveClass("w-screen");
    expect(marquee).toHaveClass("left-1/2");
    expect(rowOne).toHaveClass("logo-marquee-track");
    expect(rowOne).not.toHaveClass("logo-marquee-track--reverse");
    expect(rowOne).toHaveAttribute("data-testid", "trusted-by-row-0");
    expect(rowTwo).toHaveClass("logo-marquee-track--reverse");
  });

  it("tightens the space from trusted-by into work highlights", async () => {
    await renderHome();

    const trustedBySection = screen.getByTestId("trusted-by-section");
    const workGallerySection = screen.getByTestId("work-gallery-section");

    expect(trustedBySection).toHaveClass("pt-0");
    expect(trustedBySection).toHaveClass("sm:pt-2");
    expect(trustedBySection).toHaveClass("md:pt-3");
    expect(trustedBySection).toHaveClass("lg:pt-4");
    expect(trustedBySection).toHaveClass("pb-4");
    expect(trustedBySection).toHaveClass("sm:pb-5");
    expect(trustedBySection).toHaveClass("md:pb-6");
    expect(trustedBySection).toHaveClass("lg:pb-8");
    expect(workGallerySection).toHaveClass("pt-6");
    expect(workGallerySection).toHaveClass("pb-10");
    expect(workGallerySection).toHaveClass("sm:pt-7");
    expect(workGallerySection).toHaveClass("sm:pb-12");
    expect(workGallerySection).toHaveClass("md:pt-8");
    expect(workGallerySection).toHaveClass("md:pb-14");
    expect(workGallerySection).toHaveClass("lg:pt-8");
    expect(workGallerySection).toHaveClass("lg:pb-16");
  });

  it("renders the work gallery as an animated backend project carousel with a CTA", async () => {
    await renderHome();

    const cards = screen.getAllByTestId("work-gallery-card");
    const carousel = screen.getByTestId("work-gallery-carousel");
    const track = screen.getByTestId("work-gallery-track");
    const firstSlide = track.firstElementChild;
    const dots = screen.getAllByTestId("work-gallery-dot");
    const cta = screen.getByRole("link", { name: /view all projects/i });

    expect(cards).toHaveLength(4);
    expect(carousel).toHaveClass("overflow-x-auto");
    expect(carousel).toHaveClass("cursor-grab");
    expect(track).toHaveClass("flex");
    expect(track).toHaveClass("w-max");
    expect(firstSlide).toHaveClass("w-[calc(100vw-2.5rem)]");
    expect(firstSlide).not.toHaveClass("max-w-[360px]");
    expect(screen.getByTestId("work-gallery-dot-nav")).toBeInTheDocument();
    expect(dots).toHaveLength(4);
    expect(cards[0]).toHaveAttribute("href", "/portfolio/firecrawl-launch");
    expect(cards[0]).toHaveClass("rounded-xl");
    expect(cards[0]).toHaveClass("bg-[#0A1F57]");
    expect(cards[0]).not.toHaveClass("bg-[#03123A]");
    expect(cards[0]).not.toHaveClass("bg-white");
    expect(cards[0].getAttribute("style") ?? "").not.toContain("clip-path");
    expect(within(cards[0]).getByText(/see project/i)).toBeInTheDocument();
    expect(within(cards[0]).queryByText(/^view project$/i)).not.toBeInTheDocument();
    expect(within(cards[0]).getByText(/see project/i)).toHaveClass("text-white/70");
    expect(within(cards[0]).getByRole("heading", { name: /firecrawl/i, level: 3 })).toHaveClass(
      "text-white",
    );
    expect(
      within(cards[0]).getByText(/built to make the product story easier to trust/i),
    ).toHaveClass("text-white/70");
    expect(within(cards[0]).queryByText(/website · branding/i)).not.toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/portfolio");
    expect(cta).toHaveClass("inline-flex");
    expect(cta).toHaveClass("items-center");
    expect(cta).toHaveClass("justify-center");
    expect(cta).toHaveClass("whitespace-nowrap");
    expect(cta).toHaveClass("text-white");
    expect(cta).toHaveStyle({
      paddingInline: "12px",
      paddingBlock: "10px",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#FFFFFF29",
      color: "#FFFFFF",
      fontSize: "15px",
      lineHeight: "18px",
      fontWeight: "600",
      fontFamily: '"Geist-SemiBold", "Geist", system-ui, sans-serif',
    });
    expect(cta.getAttribute("style")).toContain(
      "linear-gradient(180deg, rgb(143, 87, 255) 0%, rgb(76, 47, 255) 100%)",
    );
    expect(cta.getAttribute("style")).toContain(
      "#FFFFFF14 0px 0.5px 0.5px inset, #5F38D933 0px 1px 1px, #5F38D933 0px 1px 1px, #4C2FFF66 0px 2px 5px -2px, #4C2FFF 0px 0px 0px 1px",
    );
  });

  it("renders the service banner background video with the new poster and mp4 source", async () => {
    await renderHome();

    const serviceBannerShell = screen.getByTestId("service-banner-shell");
    const serviceVideo = screen.getByTestId("service-banner-video");
    const serviceVideoOverlay = screen.getByTestId("service-banner-video-overlay");
    const mp4Source = serviceVideo.querySelector('source[type="video/mp4"]');
    const webmSource = serviceVideo.querySelector('source[type="video/webm"]');

    expect(serviceBannerShell).toHaveClass("relative");
    expect(serviceBannerShell).toHaveClass("left-1/2");
    expect(serviceBannerShell).toHaveClass("w-screen");
    expect(serviceBannerShell).toHaveClass("-translate-x-1/2");
    expect(serviceVideo).toHaveAttribute("poster", "/images/service-banner-background-poster.webp");
    expect(serviceVideo).toHaveAttribute("loop");
    expect(serviceVideo).toHaveAttribute("playsinline");
    expect(serviceVideo).toHaveAttribute("preload", "metadata");
    expect(serviceVideo).toHaveProperty("muted", true);
    expect(serviceVideoOverlay).toHaveClass("bg-[#4D84CB]/60");
    expect(serviceVideoOverlay).toHaveClass("mix-blend-color");
    expect(mp4Source).toHaveAttribute("src", "/videos/service-banner-background.mp4");
    expect(webmSource).toBeNull();
  });

  it("renders the service options list as links to service detail pages", async () => {
    await renderHome();

    const toggle = screen.getByTestId("service-options-toggle");
    const digitalMarketingLink = within(toggle).getByRole("link", { name: /^digital marketing$/i });
    const websiteLink = within(toggle).getByRole("link", {
      name: /^website design & development$/i,
    });

    expect(digitalMarketingLink).toHaveAttribute("href", "/services/digital-marketing");
    expect(
      within(digitalMarketingLink).getByText(
        /Increase visibility, attract traffic, and drive measurable business growth\./i,
      ),
    ).toBeInTheDocument();

    expect(websiteLink).toHaveAttribute("href", "/services/website-design-development");
    expect(
      within(websiteLink).getByText(/Build custom websites that turn visitors into loyal customers\./i),
    ).toBeInTheDocument();
  });

  it("shrinks the service toggle card footprint by about half", async () => {
    await renderHome();

    const serviceHeading = screen.getByRole("heading", { name: /how can we serve you\?/i, level: 2 });
    const serviceFrame = serviceHeading.parentElement;
    const toggle = screen.getByTestId("service-options-toggle");
    const digitalMarketingLink = within(toggle).getByRole("link", { name: /^digital marketing$/i });
    const iconWrapper = digitalMarketingLink.firstElementChild as HTMLElement;
    const title = digitalMarketingLink.querySelector("span");
    const description = digitalMarketingLink.querySelector("p");
    const divider = toggle.firstElementChild as HTMLElement;

    expect(serviceFrame).toHaveClass("min-h-[280px]");
    expect(serviceFrame).toHaveClass("sm:min-h-[340px]");
    expect(serviceFrame).toHaveClass("md:min-h-[520px]");
    expect(serviceFrame).toHaveClass("lg:min-h-[596px]");
    expect(toggle).toHaveClass("max-w-[307px]");
    expect(toggle).toHaveClass("mt-24");
    expect(toggle).toHaveClass("sm:mt-28");
    expect(toggle).toHaveClass("md:mt-36");
    expect(toggle).toHaveClass("lg:mt-44");
    expect(divider).not.toHaveClass("divide-black/10");
    expect(digitalMarketingLink).toHaveClass("px-3");
    expect(digitalMarketingLink).toHaveClass("py-3");
    expect(iconWrapper).toHaveClass("gap-3");
    expect(title).toHaveClass("text-[13px]");
    expect(title).toHaveClass("sm:text-[15px]");
    expect(title).toHaveClass("md:text-[17px]");
    expect(title).toHaveClass("text-[#9A8CFF]");
    expect(description).toHaveClass("text-[11px]");
    expect(description).toHaveClass("sm:text-[13px]");
    expect(description).toHaveClass("max-w-[26ch]");
    expect(description).toHaveClass("text-white");
    expect(description).toHaveTextContent(
      /Increase visibility, attract traffic, and drive measurable business growth\./i,
    );

    const websiteLink = within(toggle).getByRole("link", { name: /^website design & development$/i });
    expect(websiteLink).toHaveAttribute("href", "/services/website-design-development");
    expect(within(websiteLink).getByText(
      /Build custom websites that turn visitors into loyal customers\./i,
    )).toBeInTheDocument();

    const contentMarketingLink = within(toggle).getByRole("link", { name: /^content marketing$/i });
    expect(contentMarketingLink).toHaveAttribute("href", "/services/content-marketing");
    expect(within(contentMarketingLink).getByText(
      /Create compelling content that builds awareness and drives organic growth\./i,
    )).toBeInTheDocument();

    const socialMediaLink = within(toggle).getByRole("link", { name: /^social media management$/i });
    expect(socialMediaLink).toHaveAttribute("href", "/services/social-media-management");
    expect(within(socialMediaLink).getByText(
      /Elevate your brand, boost engagement, and grow across social platforms\./i,
    )).toBeInTheDocument();

    const brandingDesignLink = within(toggle).getByRole("link", { name: /^branding & design$/i });
    expect(brandingDesignLink).toHaveAttribute("href", "/services/branding-design");
    expect(within(brandingDesignLink).getByText(
      /Create bold branding that builds trust and makes your business stand out\./i,
    )).toBeInTheDocument();

    const brandStrategyLink = within(toggle).getByRole("link", { name: /^brand strategy$/i });
    expect(brandStrategyLink).toHaveAttribute("href", "/services/brand-strategy");
    expect(within(brandStrategyLink).getByText(
      /Refresh your brand with standout visuals, logos, and design elements\./i,
    )).toBeInTheDocument();
  });

  it("gives the second hero line its own text box to avoid clipping", async () => {
    await renderHome();

    const heroSecondLine = screen.getByTestId("hero-second-line");

    expect(heroSecondLine).toHaveClass("inline-block");
    expect(heroSecondLine).toHaveClass("pb-[0.08em]");
  });

  it("keeps the navbar compact and the hero readable on smaller screens", async () => {
    await renderHome();

    const navbar = screen.getByTestId("site-navbar");
    const brandLogo = within(navbar).getByAltText(/sparkline marketing firm/i);
    const ctaButton = screen.getByRole("link", { name: /book a call/i });
    const menuButton = screen.getByRole("button", { name: /open navigation menu/i });
    const heroContent = screen.getByTestId("hero-content");
    const heroHeading = screen.getByRole("heading", { level: 1 });

    expect(brandLogo).toHaveClass("w-[108px]");
    expect(brandLogo).toHaveClass("sm:w-[126px]");
    expect(brandLogo).toHaveClass("md:w-[146px]");
    expect(ctaButton).toHaveClass("text-[13px]");
    expect(ctaButton).toHaveClass("sm:text-[15px]");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(heroContent).toHaveClass("-translate-y-8");
    expect(heroContent).toHaveClass("sm:-translate-y-12");
    expect(heroContent).toHaveClass("md:-translate-y-16");
    expect(heroHeading).toHaveClass("text-[48px]");
    expect(heroHeading).toHaveClass("sm:text-[72px]");
    expect(heroHeading).toHaveClass("md:text-[88px]");
    expect(heroHeading).toHaveClass("lg:text-[96px]");
    expect(heroHeading).toHaveClass("opacity-60");
    expect(heroHeading).toHaveStyle({
      fontFamily: '"Logotype", var(--font-cal-sans), Arial, Helvetica, sans-serif',
      WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)",
      textShadow: "0 0 1px rgba(255, 255, 255, 0.5)",
    });

    fireEvent.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    const mobileNavPanel = screen.getByTestId("mobile-nav-panel");

    expect(mobileNavPanel).toBeInTheDocument();
    expect(within(mobileNavPanel).getByRole("link", { name: /^services$/i })).toBeInTheDocument();
  });

  it("keeps the navbar fixed and darkens it after scroll", async () => {
    await renderHome();

    const navbar = screen.getByTestId("site-navbar");
    const navbarShell = screen.getByTestId("site-navbar-shell");

    expect(navbar).toHaveClass("fixed");
    expect(navbarShell).toHaveClass("bg-white/8");
    expect(navbarShell).not.toHaveClass("bg-[#0d1730]/88");

    Object.defineProperty(window, "scrollY", {
      value: 80,
      writable: true,
      configurable: true,
    });
    fireEvent.scroll(window);

    expect(navbarShell).toHaveClass("bg-[#0d1730]/88");
    expect(navbarShell).toHaveClass("shadow-[0_14px_40px_rgba(4,10,24,0.28)]");
  });

  it("renders the footer from the currently selected design frame", async () => {
    await renderHome();

    const footer = screen.getByRole("contentinfo");
    const footerLogo = within(footer).getByAltText(/sparkline marketing firm/i);
    const footerGraphic = within(footer).getByTestId("footer-bottom-graphic");

    expect(within(footer).getByRole("heading", { name: /^our services$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("heading", { name: /^quick links$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("heading", { name: /^contact$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("heading", { name: /^follow us$/i })).toBeInTheDocument();
    expect(within(footer).getByText(/delivers strategic marketing/i)).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^digital marketing$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^brand strategy$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^website design & development$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^branding & design$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^social media$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^content marketing$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^about us$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^our services$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^terms & conditions$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^privacy policy$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^\(470\) 841-2335$/i })).toHaveAttribute(
      "href",
      "tel:+14708412335",
    );
    expect(within(footer).getByRole("link", { name: /^info@sparklinemarketingfirm\.com$/i })).toHaveAttribute(
      "href",
      "mailto:info@sparklinemarketingfirm.com",
    );
    expect(
      within(footer).getByRole("link", {
        name: /^524 sawnee village boulevard, cumming, georgia 30040$/i,
      }),
    ).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^instagram$/i })).toHaveAttribute(
      "href",
      "https://www.instagram.com/sparklinemarketingfirm",
    );
    expect(within(footer).getByRole("link", { name: /^facebook$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^linkedin$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^x$/i })).toBeInTheDocument();
    expect(footer).toHaveClass("bg-[oklch(15.6%_0.042_266.4)]");
    expect(footerLogo).toHaveAttribute(
      "src",
      "/logos/sparkline-new-logo.svg",
    );
    expect(footerGraphic).toHaveAttribute(
      "src",
      "https://app.paper.design/file-assets/01KNBNYP6N270CJVTY2FR1GV5J/01KNXFZD87Z01RFEZ99922PQC3.png",
    );
  });

  it("keeps the hero locked to a single viewport with a looping background video and no submarine image", async () => {
    await renderHome();

    const heroSection = screen.getByTestId("hero-section");
    const heroVideo = screen.getByTestId("hero-background-video");
    const heroBottomArtwork = screen.getByTestId("hero-bottom-artwork");
    const heroBottomArtworkImage = within(heroBottomArtwork).getByAltText(
      /decorative underwater artwork/i,
    );
    const heroContent = screen.getByTestId("hero-content");

    expect(heroSection).toHaveClass("h-[100svh]");
    expect(heroSection).toHaveClass("min-h-[100svh]");
    expect(heroBottomArtwork).toHaveClass("pointer-events-none");
    expect(heroBottomArtwork).toHaveClass("absolute");
    expect(heroBottomArtwork).toHaveClass("inset-x-0");
    expect(heroBottomArtwork).toHaveClass("-bottom-4");
    expect(heroBottomArtworkImage).toHaveAttribute("src", "/images/hero-bottom-artwork.png");
    expect(heroBottomArtworkImage).toHaveClass("hero-bottom-float");
    expect(heroBottomArtworkImage).toHaveClass("motion-reduce:animate-none");
    expect(heroBottomArtworkImage).toHaveClass("max-w-[840px]");
    expect(heroContent).toHaveClass("-translate-y-8");
    expect(heroContent).toHaveClass("sm:-translate-y-12");
    expect(heroContent).toHaveClass("md:-translate-y-16");
    expect(heroContent).toHaveClass("lg:-translate-y-20");
    expect(heroVideo).toHaveClass("top-0");
    expect(heroVideo).toHaveClass("h-[76%]");
    expect(heroVideo).toHaveClass("translate-y-0");
    expect(heroVideo).toHaveClass("md:inset-0");
    expect(heroVideo).toHaveClass("md:h-full");
    expect(heroVideo).toHaveAttribute("autoplay");
    expect(heroVideo).toHaveAttribute("loop");
    expect(heroVideo).toHaveAttribute("playsinline");
    expect(heroVideo).toHaveAttribute("src", "/videos/hero-background.mp4");
    expect(heroVideo).toHaveProperty("muted", true);
    expect(screen.queryByTestId("hero-submarine-frame")).not.toBeInTheDocument();
    expect(screen.queryByTestId("hero-submarine-image")).not.toBeInTheDocument();
  });
});
