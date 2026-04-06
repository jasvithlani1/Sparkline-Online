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

describe("Home page", () => {
  it("renders the approved landing page sections and copy", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /creative marketing/i, level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText(/supercharged/i)).toBeInTheDocument();
    expect(screen.getByText(/haven demo:/i)).toBeInTheDocument();
    expect(screen.getByText(/how can we serve you\?/i)).toBeInTheDocument();
    expect(screen.getByText(/trusted by the bold/i)).toBeInTheDocument();
    expect(screen.getByText(/our work/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /sparkline marketing firm/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/^SPARKLINE$/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /book a call/i })).toBeInTheDocument();
  });

  it("keeps the service banner submarine smaller and slightly higher", () => {
    render(<Home />);

    const submarineFrame = screen.getByTestId("service-submarine-frame");

    expect(submarineFrame).toHaveClass("max-w-[260px]");
    expect(submarineFrame).toHaveClass("md:max-w-[464px]");
    expect(submarineFrame).toHaveClass("md:h-[262px]");
    expect(submarineFrame).toHaveClass("md:-mt-[9rem]");
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

  it("keeps the hero locked to a single viewport so the next section starts on scroll", () => {
    render(<Home />);

    const heroSection = screen.getByTestId("hero-section");
    const heroSubmarineFrame = screen.getByTestId("hero-submarine-frame");
    const heroSubmarineImage = screen.getByTestId("hero-submarine-image");

    expect(heroSection).toHaveClass("h-[100svh]");
    expect(heroSection).toHaveClass("min-h-[100svh]");
    expect(heroSubmarineFrame).toHaveClass("h-[38vh]");
    expect(heroSubmarineFrame).toHaveClass("sm:h-[46vh]");
    expect(heroSubmarineFrame).toHaveClass("md:h-[58vh]");
    expect(heroSubmarineFrame).toHaveClass("max-w-[864px]");
    expect(heroSubmarineFrame).toHaveClass("md:max-w-[1296px]");
    expect(heroSubmarineImage).toHaveClass("scale-[1.3]");
    expect(heroSubmarineImage).toHaveClass("origin-bottom");
    expect(heroSubmarineImage).toHaveClass("md:origin-bottom-right");
  });
});
