/* eslint-disable @next/next/no-img-element */

import { render, screen } from "@testing-library/react";
import PortfolioPage from "@/app/portfolio/page";

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

describe("Portfolio page", () => {
  it("keeps the project list close to the footer", () => {
    render(<PortfolioPage />);

    const projectsSection = screen.getByTestId("portfolio-projects-section");
    const footerContent = screen.getByTestId("footer-content");

    expect(projectsSection).toHaveClass("pt-10");
    expect(projectsSection).toHaveClass("pb-0");
    expect(projectsSection).toHaveClass("sm:pt-12");
    expect(projectsSection).toHaveClass("sm:pb-0");
    expect(projectsSection).toHaveClass("md:pt-14");
    expect(projectsSection).toHaveClass("md:pb-2");
    expect(footerContent).toHaveClass("pt-8");
    expect(footerContent).toHaveClass("sm:pt-10");
    expect(footerContent).toHaveClass("md:pt-12");
    expect(footerContent).toHaveClass("lg:pt-14");
  });
});
