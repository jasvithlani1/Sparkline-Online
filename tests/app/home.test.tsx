/* eslint-disable @next/next/no-img-element */

import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "@/app/page";

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

const intersectionObserverMock = vi.fn();
const playMock = vi.fn().mockResolvedValue(undefined);
const pauseMock = vi.fn();

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
});

afterAll(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Home page", () => {
  it("renders the approved landing page sections and copy", () => {
    const { container } = render(<Home />);
    const main = container.querySelector("main");
    const brandLink = screen.getByRole("link", { name: /sparkline marketing firm/i });
    const navbar = screen.getByTestId("site-navbar");
    const brandLogo = within(navbar).getByAltText(/sparkline marketing firm/i);
    const featureIntro = screen.getByTestId("feature-intro");
    const featureIntroContent = screen.getByTestId("feature-intro-content");
    const featureIntroCta = within(featureIntro).getByRole("link", { name: /learn more/i });
    const midpageGradientBand = screen.getByTestId("midpage-gradient-band");
    const servicesSection = screen
      .getByRole("heading", { name: /how can we serve you\?/i, level: 2 })
      .closest("section");
    const trustedBySection = screen.getByTestId("trusted-by-section");
    const workGallerySection = screen.getByTestId("work-gallery-section");

    expect(
      screen.getByRole("heading", { name: /creative marketing/i, level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("hero-second-line")).toHaveTextContent(/supercharged/i);
    expect(screen.getByText(/how can we serve you\?/i)).toBeInTheDocument();
    expect(screen.getByText(/trusted by the bold/i)).toBeInTheDocument();
    expect(screen.getByText(/^shape the future\.$/i)).toBeInTheDocument();
    expect(screen.queryByText(/^future\.$/i)).not.toBeInTheDocument();
    expect(screen.getByText(/our work/i)).toBeInTheDocument();
    expect(screen.queryByText(/haven demo:/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/marked a major milestone with a successful deployment/i),
    ).toBeInTheDocument();
    expect(featureIntro).toHaveClass("bg-[#050C1E]");
    expect(featureIntro).toHaveClass("pb-12");
    expect(featureIntro).toHaveClass("sm:pb-14");
    expect(featureIntro).toHaveClass("md:pb-18");
    expect(featureIntro).toHaveClass("lg:pb-20");
    expect(featureIntroContent).toHaveClass("max-w-[1308px]");
    expect(featureIntroContent).not.toHaveClass("max-w-[415px]");
    expect(featureIntroContent).toHaveClass("text-white");
    expect(featureIntroCta).toBeInTheDocument();
    expect(featureIntroCta).toHaveClass("text-white/72");
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
    expect(ctaButton).toHaveClass("text-white");
    expect(ctaButton).toHaveStyle({
      paddingInline: "12px",
      paddingBlock: "10px",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#FFFFFF29",
      fontSize: "15px",
      lineHeight: "18px",
      fontWeight: "600",
    });
    expect(ctaButton.getAttribute("style")).toContain(
      "linear-gradient(180deg, rgb(143, 87, 255) 0%, rgb(76, 47, 255) 100%)",
    );
    expect(ctaButton.getAttribute("style")).toContain(
      "#FFFFFF14 0px 0.5px 0.5px inset, #5F38D933 0px 1px 1px, #5F38D933 0px 1px 1px, #4C2FFF66 0px 2px 5px -2px, #4C2FFF 0px 0px 0px 1px",
    );
  });

  it("keeps the service banner submarine oversized with a decorative bubble overlay", () => {
    render(<Home />);

    const submarineFrame = screen.getByTestId("service-submarine-frame");
    const submarineImage = within(submarineFrame).getByAltText("");
    const bubbleLayer = screen.getByTestId("service-submarine-bubbles");
    const bubbles = screen.getAllByTestId("service-submarine-bubble");

    expect(submarineFrame).toHaveClass("max-w-[340px]");
    expect(submarineFrame).toHaveClass("ml-auto");
    expect(submarineFrame).toHaveClass("mr-[calc((100vw-100%)/-2)]");
    expect(submarineFrame).toHaveClass("-mt-[6rem]");
    expect(submarineFrame).toHaveClass("h-[154px]");
    expect(submarineFrame).toHaveClass("sm:max-w-[440px]");
    expect(submarineFrame).toHaveClass("sm:h-[220px]");
    expect(submarineFrame).toHaveClass("sm:-mt-[8rem]");
    expect(submarineFrame).toHaveClass("md:max-w-[560px]");
    expect(submarineFrame).toHaveClass("md:h-[316px]");
    expect(submarineFrame).toHaveClass("md:-mt-[12rem]");
    expect(submarineFrame).toHaveClass("lg:max-w-[650px]");
    expect(submarineFrame).toHaveClass("lg:h-[367px]");
    expect(submarineFrame).toHaveClass("lg:-mt-[15.5rem]");
    expect(submarineFrame).toHaveClass("group/service-submarine");
    expect(submarineImage).toHaveClass("motion-reduce:transform-none");
    expect(submarineImage).toHaveClass("motion-safe:transition-transform");
    expect(submarineImage).toHaveClass("motion-safe:duration-500");
    expect(submarineImage).toHaveClass("motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]");
    expect(submarineImage).toHaveClass("group-hover/service-submarine:translate-x-3");
    expect(submarineImage).toHaveClass("group-hover/service-submarine:-translate-y-2");
    expect(submarineImage).toHaveClass("object-right");
    expect(bubbleLayer).toHaveClass("pointer-events-none");
    expect(bubbleLayer).toHaveClass("absolute");
    expect(bubbleLayer).toHaveClass("inset-0");
    expect(bubbleLayer).toHaveClass("motion-reduce:hidden");
    expect(bubbles).toHaveLength(8);
    expect(bubbles[0]).toHaveClass("service-submarine-bubble");
  });

  it("renders trusted-by logos as two full-width marquee rows with opposite directions", () => {
    render(<Home />);

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

  it("renders the work gallery as an editorial carousel with masks and a CTA", () => {
    render(<Home />);

    const cards = screen.getAllByTestId("work-gallery-card");
    const carousel = screen.getByTestId("work-gallery-carousel");
    const track = screen.getByTestId("work-gallery-track");
    const dots = screen.getAllByTestId("work-gallery-dot");
    const cta = screen.getByRole("link", { name: /view all projects/i });

    expect(cards).toHaveLength(4);
    expect(cards[0]).toHaveClass("rounded-[28px]");
    expect(cards[0]).toHaveClass("bg-[#0A1F57]");
    expect(cards[0]).not.toHaveClass("bg-[#03123A]");
    expect(cards[0]).not.toHaveClass("bg-white");
    expect(cards[0].getAttribute("style") ?? "").not.toContain("clip-path");
    expect(within(cards[0]).getByText(/view project/i)).toBeInTheDocument();
    expect(within(cards[0]).getByText(/view project/i)).toHaveClass("text-white/76");
    expect(within(cards[0]).getByRole("heading", { name: /firecrawl/i, level: 3 })).toHaveClass(
      "text-white",
    );
    expect(
      within(cards[0]).getByText(/built to make the product story easier to trust/i),
    ).toHaveClass("text-white/80");
    expect(within(cards[0]).queryByText(/website · branding/i)).not.toBeInTheDocument();
    expect(screen.getByTestId("work-gallery-dot-nav")).toBeInTheDocument();
    expect(dots).toHaveLength(4);
    expect(dots[0]).toHaveClass("bg-[#2C6BFF]");
    expect(dots[1]).toHaveClass("bg-white/38");
    expect(carousel).toHaveClass("overflow-x-auto");
    expect(carousel).toHaveClass("px-5");
    expect(track).toHaveClass("flex");
    expect(track).toHaveClass("w-max");
    expect(cards[0]).toHaveClass("w-[min(86vw,1080px)]");
    expect(cta).toHaveAttribute("href", "#portfolio");
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

  it("renders the service banner background video with the new poster and mp4 source", () => {
    render(<Home />);

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

  it("renders the service options list and toggles the active service", () => {
    render(<Home />);

    const strategyButton = screen.getByRole("button", { name: /^strategy$/i });
    const developmentButton = screen.getByRole("button", { name: /^development$/i });

    expect(strategyButton).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByText(/Helping you with top notch strategy for GTM/i),
    ).toBeInTheDocument();

    fireEvent.click(developmentButton);

    expect(developmentButton).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByText(/Develop products, websites and manage them for you/i),
    ).toBeInTheDocument();
  });

  it("shrinks the service toggle card footprint by about half", () => {
    render(<Home />);

    const serviceHeading = screen.getByRole("heading", { name: /how can we serve you\?/i, level: 2 });
    const serviceFrame = serviceHeading.parentElement;
    const toggle = screen.getByTestId("service-options-toggle");
    const strategyButton = screen.getByRole("button", { name: /^strategy$/i });
    const iconWrapper = strategyButton.firstElementChild as HTMLElement;
    const title = strategyButton.querySelector("span");
    const description = strategyButton.querySelector("p");
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
    expect(strategyButton).toHaveClass("px-3");
    expect(strategyButton).toHaveClass("py-3");
    expect(iconWrapper).toHaveClass("gap-3");
    expect(title).toHaveClass("text-[13px]");
    expect(title).toHaveClass("sm:text-[15px]");
    expect(title).toHaveClass("md:text-[17px]");
    expect(title).toHaveClass("text-[#9A8CFF]");
    expect(description).toHaveClass("text-[11px]");
    expect(description).toHaveClass("sm:text-[13px]");
    expect(description).toHaveClass("max-w-[26ch]");
    expect(description).toHaveClass("text-white");
  });

  it("gives the second hero line its own text box to avoid clipping", () => {
    render(<Home />);

    const heroSecondLine = screen.getByTestId("hero-second-line");

    expect(heroSecondLine).toHaveClass("inline-block");
    expect(heroSecondLine).toHaveClass("pb-[0.08em]");
  });

  it("keeps the navbar compact and the hero readable on smaller screens", () => {
    render(<Home />);

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

    fireEvent.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    const mobileNavPanel = screen.getByTestId("mobile-nav-panel");

    expect(mobileNavPanel).toBeInTheDocument();
    expect(within(mobileNavPanel).getByRole("link", { name: /^services$/i })).toBeInTheDocument();
  });

  it("keeps the navbar fixed and darkens it after scroll", () => {
    render(<Home />);

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

  it("renders the footer from the currently selected design frame", () => {
    render(<Home />);

    const footer = screen.getByRole("contentinfo");
    const footerLogo = within(footer).getByAltText(/sparkline marketing firm/i);
    const footerGraphic = within(footer).getByTestId("footer-bottom-graphic");

    expect(within(footer).getByText(/^features$/i)).toBeInTheDocument();
    expect(within(footer).getByText(/^glyphs$/i)).toBeInTheDocument();
    expect(within(footer).getByText(/^community$/i)).toBeInTheDocument();
    expect(within(footer).getByText(/^about$/i)).toBeInTheDocument();
    expect(within(footer).getByText(/^socials$/i)).toBeInTheDocument();
    expect(within(footer).getByText(/make things you love/i)).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^create$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^produce$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^extend$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^learn$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^tools$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^buy$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^eula$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^forum$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^events$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^news$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^resources$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^contact$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^press$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^privacy$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^vpat$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^instagram$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^facebook$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^linkedin$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^x \/ twitter$/i })).toBeInTheDocument();
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

  it("keeps the hero locked to a single viewport with a looping background video and no submarine image", () => {
    render(<Home />);

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
    expect(heroVideo).toHaveAttribute("autoplay");
    expect(heroVideo).toHaveAttribute("loop");
    expect(heroVideo).toHaveAttribute("playsinline");
    expect(heroVideo).toHaveAttribute("src", "/videos/hero-background.mp4");
    expect(heroVideo).toHaveProperty("muted", true);
    expect(screen.queryByTestId("hero-submarine-frame")).not.toBeInTheDocument();
    expect(screen.queryByTestId("hero-submarine-image")).not.toBeInTheDocument();
  });
});
