/* eslint-disable @next/next/no-img-element */

import { render, screen } from "@testing-library/react";
import ServicesPage from "@/app/services/page";
import ServiceDetailPage from "@/app/services/[slug]/page";

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
  it("moves the services FAQ section upward", () => {
    const { container } = render(<ServicesPage />);

    const heroVideo = container.querySelector('video');
    const faqSection = screen.getByTestId("faq-section");

    expect(heroVideo).toHaveClass("top-0");
    expect(heroVideo).toHaveClass("h-[76%]");
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
