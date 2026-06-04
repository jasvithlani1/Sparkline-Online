/* eslint-disable @next/next/no-img-element */

import { render, screen } from "@testing-library/react";
import PortfolioPage from "@/app/portfolio/page";
import { ProjectList } from "@/components/portfolio/project-list";

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
  it("renders injected CMS project cards", () => {
    render(
      <ProjectList
        projects={[
          {
            id: "portfolioProject.cms-project",
            slug: "cms-project",
            name: "CMS Project",
            date: "May 30, 2026",
            meta: "Website",
            description: "A project managed by Sanity.",
            ctaLabel: "View Project",
            image: "/images/work-firecrawl.png",
            imageClassName: "object-cover object-center",
            intro: "Intro",
            tagline: "CMS TAGLINE",
            summary: "Summary",
            services: ["CMS"],
            sections: [],
          },
        ]}
      />,
    );

    expect(screen.getByRole("heading", { name: /cms project/i })).toBeInTheDocument();
    expect(screen.getByText("A project managed by Sanity.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cms project/i })).toHaveAttribute("href", "/portfolio/cms-project");
  });

  it("keeps the project list close to the footer", async () => {
    const page = await PortfolioPage();
    const { container } = render(page);

    const heroVideo = container.querySelector("video");
    const projectsSection = screen.getByTestId("portfolio-projects-section");
    const footerContent = screen.getByTestId("footer-content");

    expect(heroVideo).toHaveClass("top-0");
    expect(heroVideo).toHaveClass("h-full");
    expect(heroVideo).toHaveClass("translate-y-0");
    expect(heroVideo).toHaveClass("md:inset-0");
    expect(heroVideo).toHaveClass("md:h-[110%]");
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
