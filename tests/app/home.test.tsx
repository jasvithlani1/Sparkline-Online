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
    render(<Home />);
    const brandLink = screen.getByRole("link", { name: /sparkline marketing firm/i });
    const brandLogo = screen.getByAltText(/sparkline marketing firm/i);

    expect(
      screen.getByRole("heading", { name: /creative marketing/i, level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("hero-second-line")).toHaveTextContent(/supercharged/i);
    expect(screen.getByText(/haven demo:/i)).toBeInTheDocument();
    expect(screen.getByText(/how can we serve you\?/i)).toBeInTheDocument();
    expect(screen.getByText(/trusted by the bold/i)).toBeInTheDocument();
    expect(screen.getByText(/^shape the future\.$/i)).toBeInTheDocument();
    expect(screen.queryByText(/^future\.$/i)).not.toBeInTheDocument();
    expect(screen.getByText(/our work/i)).toBeInTheDocument();
    expect(brandLink).toBeInTheDocument();
    expect(brandLogo).toHaveAttribute("src", "/logos/sparkline-marketing-firm.svg");
    expect(brandLogo).toHaveClass("w-[58px]");
    expect(brandLogo).toHaveClass("sm:w-[70px]");
    expect(brandLogo).toHaveClass("md:w-[84px]");
    expect(brandLogo).toHaveClass("lg:w-[91px]");
    const ctaButton = screen.getByRole("link", { name: /book a call/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveClass("inline-flex");
    expect(ctaButton).toHaveClass("items-center");
    expect(ctaButton).toHaveClass("justify-center");
    expect(ctaButton).toHaveClass("whitespace-nowrap");
    expect(ctaButton).toHaveClass("text-white");
    expect(ctaButton).toHaveStyle({
      paddingInline: "12px",
      paddingBlock: "12px",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#FFFFFF29",
      fontSize: "16px",
      lineHeight: "20px",
      fontWeight: "600",
    });
    expect(ctaButton.getAttribute("style")).toContain(
      "linear-gradient(in oklab 180deg, oklab(0.431 -0.018 -0.204) 1.39%, oklab(0.513 -0.023 -0.216) 101.39%)",
    );
    expect(ctaButton.getAttribute("style")).toContain(
      "#FFFFFF14 0px 0.5px 0.5px inset, #2157E033 0px 1px 1px, #2157E033 0px 1px 1px, #2157E066 0px 2px 5px -2px, #0F64F2 0px 0px 0px 1px",
    );
  });

  it("keeps the service banner submarine oversized but responsive", () => {
    render(<Home />);

    const submarineFrame = screen.getByTestId("service-submarine-frame");
    const submarineImage = screen.getByAltText("");

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
    expect(submarineImage).toHaveClass("object-right");
  });

  it("renders trusted-by logos as two masked marquee rows with opposite directions", () => {
    render(<Home />);

    const marquee = screen.getByTestId("trusted-by-marquee");
    const rowOne = screen.getByTestId("trusted-by-row-0");
    const rowTwo = screen.getByTestId("trusted-by-row-1");

    expect(marquee).toHaveClass("overflow-hidden");
    expect(rowOne).toHaveClass("logo-marquee-track");
    expect(rowTwo).toHaveClass("logo-marquee-track--reverse");
    expect(screen.getByTestId("trusted-by-marquee-left-mask")).toBeInTheDocument();
    expect(screen.getByTestId("trusted-by-marquee-right-mask")).toBeInTheDocument();
  });

  it("renders a service banner background video with poster and dual sources", () => {
    render(<Home />);

    const serviceVideo = screen.getByTestId("service-banner-video");
    const serviceVideoOverlay = screen.getByTestId("service-banner-video-overlay");
    const webmSource = serviceVideo.querySelector('source[type="video/webm"]');
    const mp4Source = serviceVideo.querySelector('source[type="video/mp4"]');

    expect(serviceVideo).toHaveAttribute("poster", "/images/service-banner-ocean-poster.webp");
    expect(serviceVideo).toHaveAttribute("loop");
    expect(serviceVideo).toHaveAttribute("playsinline");
    expect(serviceVideo).toHaveAttribute("preload", "metadata");
    expect(serviceVideo).toHaveProperty("muted", true);
    expect(serviceVideoOverlay).toHaveClass("bg-black/[0.44]");
    expect(webmSource).toHaveAttribute("src", "/videos/service-banner-ocean.webm");
    expect(mp4Source).toHaveAttribute("src", "/videos/service-banner-ocean.mp4");
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

    expect(serviceFrame).toHaveClass("min-h-[280px]");
    expect(serviceFrame).toHaveClass("sm:min-h-[340px]");
    expect(serviceFrame).toHaveClass("md:min-h-[520px]");
    expect(serviceFrame).toHaveClass("lg:min-h-[596px]");
    expect(toggle).toHaveClass("max-w-[360px]");
    expect(toggle).toHaveClass("mt-24");
    expect(toggle).toHaveClass("sm:mt-28");
    expect(toggle).toHaveClass("md:mt-36");
    expect(toggle).toHaveClass("lg:mt-44");
    expect(toggle).toHaveClass("p-2");
    expect(toggle).toHaveClass("sm:p-[10px]");
    expect(toggle).toHaveClass("md:p-3");
    expect(strategyButton).toHaveClass("gap-1.5");
    expect(strategyButton).toHaveClass("sm:gap-2");
    expect(iconWrapper).toHaveClass("h-6");
    expect(iconWrapper).toHaveClass("w-6");
    expect(iconWrapper).toHaveClass("sm:h-7");
    expect(iconWrapper).toHaveClass("sm:w-7");
    expect(title).toHaveClass("text-[15px]");
    expect(title).toHaveClass("sm:text-[20px]");
    expect(title).toHaveClass("md:text-[24px]");
    expect(description).toHaveClass("text-[12px]");
    expect(description).toHaveClass("sm:text-[14px]");
    expect(description).toHaveClass("max-w-[280px]");
  });

  it("gives the second hero line its own text box to avoid clipping", () => {
    render(<Home />);

    const heroSecondLine = screen.getByTestId("hero-second-line");

    expect(heroSecondLine).toHaveClass("inline-block");
    expect(heroSecondLine).toHaveClass("pb-[0.08em]");
  });

  it("keeps the navbar compact and the hero readable on smaller screens", () => {
    render(<Home />);

    const brandLogo = screen.getByAltText(/sparkline marketing firm/i);
    const ctaButton = screen.getByRole("link", { name: /book a call/i });
    const menuButton = screen.getByRole("button", { name: /open navigation menu/i });
    const heroContent = screen.getByTestId("hero-content");
    const heroHeading = screen.getByRole("heading", { level: 1 });

    expect(brandLogo).toHaveClass("w-[58px]");
    expect(brandLogo).toHaveClass("sm:w-[70px]");
    expect(brandLogo).toHaveClass("md:w-[84px]");
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

  it("replaces the legacy footer with the selected Paper footer structure", () => {
    render(<Home />);

    const footer = screen.getByRole("contentinfo");
    const footerGrid = screen.getByTestId("footer-top-grid");
    const footerTopImage = screen.getByTestId("footer-top-image");
    const legalRow = screen.getByTestId("footer-legal-row");
    const legalBar = legalRow.parentElement as HTMLElement;

    expect(within(footer).getByText(/^company$/i)).toBeInTheDocument();
    expect(within(footer).getByText(/^get in touch$/i)).toBeInTheDocument();
    expect(within(footer).getByText(/^background$/i)).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^home$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^about us$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^faq$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^mail us$/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /^contact us$/i })).toBeInTheDocument();
    expect(
      within(footer).getByText(/Sparkling Marketing Firm is a Specialized marketing firm/i),
    ).toBeInTheDocument();
    expect(within(footer).getByText(/Connect with us on our socials/i)).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /instagram/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /pinterest/i })).toBeInTheDocument();
    expect(
      within(footer).getByText(/©2026 SPARKLINE MARKETING FIRM All Rights Reserved\./i),
    ).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /privacy policy/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /terms of service/i })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /accessibility/i })).toBeInTheDocument();
    expect(footerGrid).toHaveClass("md:grid-cols-2");
    expect(footerTopImage).toHaveClass("bg-top");
    expect(footerTopImage).toHaveStyle({
      backgroundImage:
        "url(https://app.paper.design/file-assets/01KNBNYP6N270CJVTY2FR1GV5J/01KNM3TZFN7NEMTXCM43KXZS5B.png)",
    });
    expect(legalBar).toHaveClass("bg-[#01031A]");
    expect(legalRow).toHaveClass("text-white");
    expect(legalRow).toHaveClass("lg:flex-row");
    expect(screen.queryByText(/Currently we're Online/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^agency$/i)).not.toBeInTheDocument();
  });

  it("keeps the hero locked to a single viewport with a looping background video and no submarine image", () => {
    render(<Home />);

    const heroSection = screen.getByTestId("hero-section");
    const heroVideo = screen.getByTestId("hero-background-video");
    const heroContent = screen.getByTestId("hero-content");

    expect(heroSection).toHaveClass("h-[100svh]");
    expect(heroSection).toHaveClass("min-h-[100svh]");
    expect(heroContent).toHaveClass("-translate-y-8");
    expect(heroContent).toHaveClass("sm:-translate-y-12");
    expect(heroContent).toHaveClass("md:-translate-y-16");
    expect(heroContent).toHaveClass("lg:-translate-y-20");
    expect(heroVideo).toHaveAttribute("autoplay");
    expect(heroVideo).toHaveAttribute("loop");
    expect(heroVideo).toHaveAttribute("playsinline");
    expect(heroVideo).toHaveAttribute("src", "/videos/hero-background.webm");
    expect(heroVideo).toHaveProperty("muted", true);
    expect(screen.queryByTestId("hero-submarine-frame")).not.toBeInTheDocument();
    expect(screen.queryByTestId("hero-submarine-image")).not.toBeInTheDocument();
  });
});
