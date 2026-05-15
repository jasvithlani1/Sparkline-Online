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
    render(<ServicesPage />);

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
