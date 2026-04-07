/* eslint-disable @next/next/no-img-element */

import { render, screen } from "@testing-library/react";
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
    expect(screen.getByText(/supercharged/i)).toBeInTheDocument();
    expect(screen.getByText(/haven demo:/i)).toBeInTheDocument();
    expect(screen.getByText(/how can we serve you\?/i)).toBeInTheDocument();
    expect(screen.getByText(/trusted by the bold/i)).toBeInTheDocument();
    expect(screen.getByText(/our work/i)).toBeInTheDocument();
    expect(brandLink).toBeInTheDocument();
    expect(brandLogo).toHaveAttribute("src", "/logos/sparkline-marketing-firm.svg");
    expect(brandLogo).toHaveClass("w-[67px]");
    expect(brandLogo).toHaveClass("sm:w-[79px]");
    expect(brandLogo).toHaveClass("md:w-[91px]");
    expect(screen.getByText(/^SPARKLINE$/i)).toBeInTheDocument();
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

  it("keeps the service banner submarine smaller and slightly higher", () => {
    render(<Home />);

    const submarineFrame = screen.getByTestId("service-submarine-frame");

    expect(submarineFrame).toHaveClass("max-w-[260px]");
    expect(submarineFrame).toHaveClass("md:max-w-[464px]");
    expect(submarineFrame).toHaveClass("md:h-[262px]");
    expect(submarineFrame).toHaveClass("md:-mt-[9rem]");
  });

  it("renders a service banner background video with poster and dual sources", () => {
    render(<Home />);

    const serviceVideo = screen.getByTestId("service-banner-video");
    const webmSource = serviceVideo.querySelector('source[type="video/webm"]');
    const mp4Source = serviceVideo.querySelector('source[type="video/mp4"]');

    expect(serviceVideo).toHaveAttribute("poster", "/images/service-banner-ocean-poster.webp");
    expect(serviceVideo).toHaveAttribute("loop");
    expect(serviceVideo).toHaveAttribute("playsinline");
    expect(serviceVideo).toHaveAttribute("preload", "metadata");
    expect(serviceVideo).toHaveProperty("muted", true);
    expect(webmSource).toHaveAttribute("src", "/videos/service-banner-ocean.webm");
    expect(mp4Source).toHaveAttribute("src", "/videos/service-banner-ocean.mp4");
  });

  it("gives the second hero line its own text box to avoid clipping", () => {
    render(<Home />);

    const heroSecondLine = screen.getByTestId("hero-second-line");

    expect(heroSecondLine).toHaveClass("inline-block");
    expect(heroSecondLine).toHaveClass("pb-[0.08em]");
  });

  it("scales the hero headline up by about twenty percent", () => {
    render(<Home />);

    const heroHeading = screen.getByRole("heading", { level: 1 });

    expect(heroHeading).toHaveClass("text-[65px]");
    expect(heroHeading).toHaveClass("sm:text-[82px]");
    expect(heroHeading).toHaveClass("md:text-[96px]");
  });

  it("keeps the hero locked to a single viewport with a looping background video and no submarine image", () => {
    render(<Home />);

    const heroSection = screen.getByTestId("hero-section");
    const heroVideo = screen.getByTestId("hero-background-video");
    const heroContent = screen.getByTestId("hero-content");

    expect(heroSection).toHaveClass("h-[100svh]");
    expect(heroSection).toHaveClass("min-h-[100svh]");
    expect(heroContent).toHaveClass("-translate-y-20");
    expect(heroContent).toHaveClass("md:-translate-y-20");
    expect(heroVideo).toHaveAttribute("autoplay");
    expect(heroVideo).toHaveAttribute("loop");
    expect(heroVideo).toHaveAttribute("playsinline");
    expect(heroVideo).toHaveAttribute("src", "/videos/hero-background.webm");
    expect(heroVideo).toHaveProperty("muted", true);
    expect(screen.queryByTestId("hero-submarine-frame")).not.toBeInTheDocument();
    expect(screen.queryByTestId("hero-submarine-image")).not.toBeInTheDocument();
  });
});
