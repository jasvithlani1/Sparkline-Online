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
    const founderSections = screen.getAllByTestId("about-founder-profile");

    expect(companyIntro).toHaveTextContent(/where strategy meets care/i);
    expect(companyIntro).toHaveTextContent(/we built sparkline marketing firm/i);
    expect(within(companyIntro).queryByRole("img")).not.toBeInTheDocument();

    expect(founderSections).toHaveLength(2);

    expect(
      within(founderSections[0]).getByRole("img", { name: /ashlan leazer/i }),
    ).toHaveAttribute("src", "/images/about-ashlan-leazer.jpeg");
    expect(
      within(founderSections[0]).getByRole("heading", { name: /ashlan leazer/i }),
    ).toBeInTheDocument();
    expect(within(founderSections[0]).getAllByText(/co-founder/i).length).toBeGreaterThan(0);
    expect(founderSections[0]).toHaveTextContent(/aunt sassy/i);
    expect(founderSections[0]).toHaveTextContent(/self taught marketer, designer, and creative strategist/i);
    expect(founderSections[0]).toHaveTextContent(/cofounded sparkline marketing firm with my sister, ruby/i);
    expect(founderSections[0]).toHaveTextContent(/carefully\. patiently\. for the long run\./i);

    expect(
      within(founderSections[1]).getByRole("img", { name: /ruby/i }),
    ).toHaveAttribute("src", "/images/about-second-founder.jpeg");
    expect(
      within(founderSections[1]).getByRole("heading", { name: /ruby/i }),
    ).toBeInTheDocument();
    expect(within(founderSections[1]).getAllByText(/co-founder/i).length).toBeGreaterThan(0);
    expect(founderSections[1]).toHaveTextContent(/university of alabama/i);
    expect(founderSections[1]).toHaveTextContent(/marketing specialist/i);
    expect(founderSections[1]).toHaveTextContent(/co-founded this company with my sister, ashlan/i);
    expect(founderSections[1]).toHaveTextContent(/clarity and confidence/i);
  });
});
