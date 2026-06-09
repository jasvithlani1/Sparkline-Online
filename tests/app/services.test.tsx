/* eslint-disable @next/next/no-img-element */

import { render, screen } from "@testing-library/react";
import ServicesPage from "@/app/services/page";
import ServiceDetailPage from "@/app/services/[slug]/page";
import { OurServices } from "@/components/landing/our-services";

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

describe("Services pages", () => {
  it("renders injected CMS service cards", () => {
    render(
      <OurServices
        content={{
          eyebrow: "OUR SERVICES",
          intro: ["CMS intro"],
          ctaLabel: "Learn More",
          cards: [
            {
              id: "cms-service",
              title: "CMS\nService",
              items: ["CMS strategy", "CMS analytics"],
            },
          ],
        }}
      />,
    );

    expect(screen.getByRole("heading", { name: /cms\s+service/i })).toBeInTheDocument();
    expect(screen.getByText("CMS strategy")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /learn more/i })).toHaveAttribute("href", "/services/cms-service");
  });

  it("keeps the mobile services heading centered while intro paragraphs stay left aligned", () => {
    render(
      <OurServices
        content={{
          eyebrow: "OUR SERVICES",
          intro: ["CMS intro paragraph"],
          ctaLabel: "Learn More",
          cards: [
            {
              id: "cms-service",
              title: "CMS\nService",
              items: ["CMS strategy"],
            },
          ],
        }}
      />,
    );

    const header = screen.getByTestId("our-services-header");
    const heading = screen.getByRole("heading", { name: /our core services/i });
    const intro = screen.getByText("CMS intro paragraph");

    expect(header).toHaveClass("text-center");
    expect(heading.parentElement).toHaveClass("items-center");
    expect(intro).toHaveClass("text-left");
  });

  it("lets services intro paragraphs span the full section width", () => {
    render(
      <OurServices
        content={{
          eyebrow: "OUR SERVICES",
          intro: ["CMS intro paragraph"],
          ctaLabel: "Learn More",
          cards: [
            {
              id: "cms-service",
              title: "CMS\nService",
              items: ["CMS strategy"],
            },
          ],
        }}
      />,
    );

    const introGroup = screen.getByText("CMS intro paragraph").parentElement;

    expect(introGroup).toHaveClass("w-full");
    expect(introGroup).not.toHaveClass("max-w-[1024px]");
  });

  it("uses 2px larger text for service card content", () => {
    render(
      <OurServices
        content={{
          eyebrow: "OUR SERVICES",
          intro: ["CMS intro"],
          ctaLabel: "Learn More",
          cards: [
            {
              id: "cms-service",
              title: "CMS\nService",
              items: ["CMS strategy", "CMS analytics"],
            },
          ],
        }}
      />,
    );

    const cardContent = screen.getByText("CMS strategy").closest("ul");

    expect(cardContent).toHaveClass("text-[17px]");
    expect(cardContent).toHaveClass("md:text-[18px]");
  });

  it("uses 2px larger text for shared service detail content", async () => {
    const page = await ServiceDetailPage({
      params: Promise.resolve({ slug: "digital-marketing" }),
    });

    render(page);

    const lead = screen.getByText(/Digital marketing helps your business reach the right audience/i);
    const intro = screen.getByText(/Our digital marketing services combine strategy/i);
    const whyUs = screen.getByText(/Choose a digital marketing team that blends strategy/i);
    const problems = screen.getByText("Low website traffic and weak visibility").closest("ul");
    const cornerstones = screen.getByText("Audience First Strategy").closest("ol");
    const specialty = screen.getByText("Search Engine Optimisation");
    const process = screen.getByText(/We begin by understanding your business/i);
    const ctaHeading = screen.getByRole("heading", { name: /ready to scale smarter/i });
    const cta = screen.getByText(/Ready to scale smarter with digital marketing/i);
    const ctaButton = screen.getByRole("link", { name: /contact now/i });
    const ctaCard = ctaHeading.parentElement!;
    const ctaButtonRow = ctaButton.parentElement!;

    expect(lead).toHaveClass("text-[19px]");
    expect(lead).toHaveClass("sm:text-[20px]");
    expect(lead).toHaveClass("md:text-[22px]");
    expect(intro).toHaveClass("text-[18px]");
    expect(intro).toHaveClass("sm:text-[19px]");
    expect(intro).toHaveClass("md:text-[20px]");
    expect(whyUs).toHaveClass("text-[18px]");
    expect(whyUs).toHaveClass("sm:text-[19px]");
    expect(whyUs).toHaveClass("md:text-[20px]");
    expect(problems).toHaveClass("text-[18px]");
    expect(problems).toHaveClass("md:text-[19px]");
    expect(cornerstones).toHaveClass("text-[18px]");
    expect(cornerstones).toHaveClass("md:text-[19px]");
    expect(specialty).toHaveClass("text-[16px]");
    expect(specialty).toHaveClass("md:text-[17px]");
    expect(process).toHaveClass("text-[18px]");
    expect(process).toHaveClass("sm:text-[19px]");
    expect(process).toHaveClass("md:text-[20px]");
    expect(ctaCard).toHaveClass("text-center");
    expect(ctaHeading).toHaveClass("mx-auto");
    expect(ctaHeading).toHaveClass("text-center");
    expect(ctaHeading).not.toHaveClass("sm:text-left");
    expect(cta).toHaveClass("text-[18px]");
    expect(cta).toHaveClass("sm:text-[19px]");
    expect(cta).toHaveClass("md:text-[20px]");
    expect(cta).toHaveClass("mx-auto");
    expect(cta).toHaveClass("text-center");
    expect(cta).not.toHaveClass("text-left");
    expect(ctaButtonRow).toHaveClass("justify-center");
    expect(ctaButtonRow).not.toHaveClass("sm:justify-start");
  });

  it("moves the services FAQ section upward", async () => {
    const page = await ServicesPage();
    const { container } = render(page);

    const heroVideo = container.querySelector("video");
    const faqSection = screen.getByTestId("faq-section");

    expect(heroVideo).toHaveClass("top-0");
    expect(heroVideo).toHaveClass("h-full");
    expect(heroVideo).toHaveClass("translate-y-0");
    expect(heroVideo).toHaveClass("md:inset-0");
    expect(heroVideo).toHaveClass("md:h-[110%]");
    expect(faqSection).toHaveClass("pt-0");
    expect(faqSection).toHaveClass("sm:pt-0");
    expect(faqSection).toHaveClass("md:pt-0");
    expect(faqSection).toHaveClass("lg:pt-0");
    expect(faqSection).toHaveClass("pb-10");
    expect(faqSection).toHaveClass("sm:pb-12");
    expect(faqSection).toHaveClass("md:pb-14");
    expect(faqSection).toHaveClass("lg:pb-16");
  });

  it("moves service detail FAQ sections upward", async () => {
    const page = await ServiceDetailPage({
      params: Promise.resolve({ slug: "digital-marketing" }),
    });

    render(page);

    const faqSection = screen.getByTestId("faq-section");

    expect(faqSection).toHaveClass("pt-0");
    expect(faqSection).toHaveClass("sm:pt-0");
    expect(faqSection).toHaveClass("md:pt-0");
    expect(faqSection).toHaveClass("lg:pt-0");
    expect(faqSection).toHaveClass("pb-10");
    expect(faqSection).toHaveClass("sm:pb-12");
    expect(faqSection).toHaveClass("md:pb-14");
    expect(faqSection).toHaveClass("lg:pb-16");
  });
});
