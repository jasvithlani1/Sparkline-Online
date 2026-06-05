/* eslint-disable @next/next/no-img-element */

import { render, screen, within } from "@testing-library/react";
import AboutPage from "@/app/about/page";

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

describe("About page", () => {
  it("renders a text-first company story followed by two co-founder profile sections", () => {
    render(<AboutPage />);

    const companyIntro = screen.getByTestId("about-company-intro");
    const foundersSection = screen.getByTestId("about-founders-section");
    const foundersMoment = screen.getByTestId("about-founders-moment");
    const founderSections = screen.getAllByTestId("about-founder-profile");
    const footerContent = screen.getByTestId("footer-content");

    expect(companyIntro).toHaveTextContent(/where strategy meets care/i);
    expect(companyIntro).toHaveTextContent(/service based businesses build a clear, confident online presence/i);
    expect(companyIntro).toHaveTextContent(/bring clarity to the message, structure to the strategy/i);
    expect(companyIntro).toHaveTextContent(/sparkline was created after years of working inside a growing business/i);
    expect(companyIntro).toHaveTextContent(/clear message, a strategy that fits the stage of your business/i);
    expect(companyIntro).toHaveTextContent(/clients as far as bermuda/i);
    expect(within(companyIntro).queryByRole("img")).not.toBeInTheDocument();

    expect(founderSections).toHaveLength(2);

    expect(
      within(founderSections[0]).getByRole("img", { name: /ashlan leazer/i }),
    ).toHaveAttribute("src", "/images/about-ashlan-leazer.jpeg");
    expect(
      within(founderSections[0]).getByRole("img", { name: /ashlan leazer/i }),
    ).toHaveClass("scale-[1.08]");
    expect(
      within(founderSections[0]).getByRole("heading", { name: /ashlan leazer/i }),
    ).toBeInTheDocument();
    expect(within(founderSections[0]).queryByText(/^co-founder$/i)).not.toBeInTheDocument();
    expect(within(founderSections[0]).getByText(/01\s*\/\s*co-founder/i)).toBeInTheDocument();
    expect(founderSections[0]).toHaveTextContent(/aunt sassy/i);
    expect(founderSections[0]).toHaveTextContent(/self taught marketer, designer, and creative strategist/i);
    expect(founderSections[0]).toHaveTextContent(/cofounded sparkline marketing firm with my sister, ruby/i);
    expect(founderSections[0]).toHaveTextContent(/carefully\. patiently\. for the long run\./i);

    expect(
      within(founderSections[1]).getByRole("img", { name: /ruby leazer/i }),
    ).toHaveAttribute("src", "/images/about-second-founder.jpeg");
    expect(
      within(founderSections[1]).getByRole("heading", { name: /ruby leazer/i }),
    ).toBeInTheDocument();
    expect(within(founderSections[1]).queryByText(/^co-founder$/i)).not.toBeInTheDocument();
    expect(within(founderSections[1]).getByText(/02\s*\/\s*co-founder/i)).toBeInTheDocument();
    expect(founderSections[1]).toHaveTextContent(/i love what i do/i);
    expect(founderSections[1]).toHaveTextContent(/i come from a big family/i);
    expect(founderSections[1]).toHaveTextContent(/travel has always been my thing/i);
    expect(founderSections[1]).toHaveTextContent(/university of alabama/i);
    expect(founderSections[1]).toHaveTextContent(/marketing specialist/i);
    expect(founderSections[1]).toHaveTextContent(/pastor and his church in bermuda/i);
    expect(founderSections[1]).toHaveTextContent(/captured the warmth, the color and the vibrant culture/i);
    expect(founderSections[1]).toHaveTextContent(/cofound sparkline with my sister ashlan/i);
    expect(founderSections[1]).toHaveTextContent(/who is all in from day one/i);

    expect(foundersSection).toHaveClass("pb-0");
    expect(foundersSection).toHaveClass("sm:pb-0");
    expect(foundersSection).toHaveClass("md:pb-2");
    expect(
      within(foundersMoment).getByRole("img", { name: /outdoor sparkline founder moment/i }),
    ).toHaveAttribute("src", "/images/about-founders-first.png");
    expect(
      within(foundersMoment).getByRole("img", { name: /outdoor sparkline founder moment/i }),
    ).not.toHaveClass("rotate-90");
    expect(
      within(foundersMoment).getByRole("img", { name: /ashlan and ruby leazer celebrating together/i }),
    ).toHaveAttribute("src", "/images/about-founders-birthday.jpg");
    expect(screen.getByTestId("about-founders-moment-grid")).toHaveClass("md:grid-cols-2");
    expect(foundersMoment).toHaveTextContent(/chief morale officers/i);
    expect(foundersMoment).toHaveTextContent(/built together, with heart/i);
    expect(footerContent).toHaveClass("pt-8");
    expect(footerContent).toHaveClass("sm:pt-10");
    expect(footerContent).toHaveClass("md:pt-12");
    expect(footerContent).toHaveClass("lg:pt-14");
  });
});
