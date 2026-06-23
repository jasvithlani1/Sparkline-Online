/* eslint-disable @next/next/no-img-element */

import { render, screen, within } from "@testing-library/react";
import AboutPage from "@/app/about/page";
import { getAboutPage } from "@/sanity/lib/content";

vi.mock("@/sanity/lib/content", () => ({
  getAboutPage: vi.fn(),
}));

const getAboutPageMock = vi.mocked(getAboutPage);

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

describe("About", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getAboutPageMock.mockResolvedValue(null);
  });

  it("renders a text-first company story followed by two co-founder profile sections", async () => {
    const page = await AboutPage();
    render(page);

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

    const ashlanImage = within(founderSections[0]).getByRole("img", {
      name: /ashlan leazer/i,
    });
    const rubyImage = within(founderSections[1]).getByRole("img", {
      name: /ruby leazer/i,
    });

    expect(ashlanImage).toHaveAttribute("src", "/images/about-ashlan-leazer.jpeg");
    expect(ashlanImage).toHaveAttribute("width", "1600");
    expect(ashlanImage).toHaveAttribute("height", "1600");
    expect(ashlanImage).toHaveClass("h-full");
    expect(ashlanImage).toHaveClass("w-full");
    expect(ashlanImage).toHaveClass("scale-[1.08]");
    expect(ashlanImage.parentElement).toHaveClass("aspect-[4/5]");
    expect(ashlanImage.parentElement).toHaveClass("w-full");
    expect(
      within(founderSections[0]).getByRole("heading", { name: /ashlan leazer/i }),
    ).toBeInTheDocument();
    expect(within(founderSections[0]).queryByText(/^co-founder$/i)).not.toBeInTheDocument();
    expect(within(founderSections[0]).getByText(/01\s*\/\s*co-founder/i)).toBeInTheDocument();
    expect(founderSections[0]).toHaveTextContent(/aunt sassy/i);
    expect(founderSections[0]).toHaveTextContent(/self-taught marketer, designer, and creative strategist/i);
    expect(founderSections[0]).toHaveTextContent(/family has always been my foundation, teaching me the value/i);
    expect(founderSections[0]).toHaveTextContent(/lasting results come from consistency, thoughtful strategy/i);
    expect(founderSections[0]).toHaveTextContent(/moved from relying on paid advertising/i);
    expect(founderSections[0]).toHaveTextContent(/sustainable rather than chasing short-term wins/i);
    expect(founderSections[0]).toHaveTextContent(/i later co-founded sparkline marketing firm with my sister, ruby/i);
    expect(founderSections[0]).toHaveTextContent(/focused on trust, creativity, and meaningful growth/i);
    expect(founderSections[0]).toHaveTextContent(/brands that feel authentic and reflect who they truly are/i);
    expect(founderSections[0]).toHaveTextContent(/genuine commitment to helping your business grow for the long run/i);
    expect(founderSections[0]).not.toHaveTextContent(/what i bring is creativity, strategy, and attention to detail/i);
    expect(founderSections[0]).not.toHaveTextContent(/carefully\. patiently\. for the long run\./i);

    expect(rubyImage).toHaveAttribute("src", "/images/about-second-founder.jpeg");
    expect(rubyImage).toHaveAttribute("width", "1200");
    expect(rubyImage).toHaveAttribute("height", "1600");
    expect(rubyImage).toHaveClass("h-full");
    expect(rubyImage).toHaveClass("w-full");
    expect(rubyImage.parentElement).toHaveClass("aspect-[4/5]");
    expect(rubyImage.parentElement).toHaveClass("w-full");
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
    expect(screen.getByTestId("about-founders-moment-scroller")).toHaveClass("overflow-hidden");
    expect(screen.getByTestId("about-founders-moment-track")).toHaveClass("about-moment-track");
    expect(screen.queryByTestId("about-founders-moment-grid")).not.toBeInTheDocument();
    expect(
      within(foundersMoment).getByRole("img", { name: /outdoor sparkline founder moment/i }),
    ).toHaveAttribute("src", "/images/about-founders-first.png");
    expect(
      within(foundersMoment).getByRole("img", { name: /outdoor sparkline founder moment/i }),
    ).not.toHaveClass("rotate-90");
    expect(
      within(foundersMoment).getByRole("img", { name: /ashlan and ruby leazer celebrating together/i }),
    ).toHaveAttribute("src", "/images/about-founders-birthday.jpg");
    expect(within(foundersMoment).getAllByRole("img")).toHaveLength(8);
    expect(
      within(foundersMoment).getByRole("img", { name: /sparkline family portrait outdoors/i }),
    ).toHaveAttribute("src", "/images/about-gallery-2760.jpg");
    expect(
      within(foundersMoment).getByRole("img", { name: /quiet at-home sparkline moment/i }),
    ).toHaveAttribute("src", "/images/about-gallery-3600.jpg");
    expect(
      within(foundersMoment).getByRole("img", { name: /sparkline family moment in the mountains/i }),
    ).toHaveAttribute("src", "/images/about-gallery-4749.jpg");
    expect(
      within(foundersMoment).getByRole("img", { name: /ashlan and ruby leazer at dinner/i }),
    ).toHaveAttribute("src", "/images/about-gallery-6945.jpg");
    expect(
      within(foundersMoment).getByRole("img", { name: /sparkline travel memory/i }),
    ).toHaveAttribute("src", "/images/about-gallery-7356.jpg");
    expect(
      within(foundersMoment).getByRole("img", { name: /sparkline founder memory/i }),
    ).toHaveAttribute("src", "/images/about-gallery-9541.jpg");
    expect(foundersMoment).toHaveTextContent(/real moments behind the work/i);
    expect(foundersMoment).toHaveTextContent(/built together, with heart/i);
    expect(foundersMoment).toHaveTextContent(/family first, always/i);
    expect(foundersMoment).toHaveTextContent(/grounded in everyday care/i);
    expect(foundersMoment).toHaveTextContent(/joy we carry forward/i);
    expect(foundersMoment).toHaveTextContent(/sisters beyond the screen/i);
    expect(foundersMoment).toHaveTextContent(/inspired by every place/i);
    expect(foundersMoment).toHaveTextContent(/care shows up everywhere/i);
    expect(footerContent).toHaveClass("pt-8");
    expect(footerContent).toHaveClass("sm:pt-10");
    expect(footerContent).toHaveClass("md:pt-12");
    expect(footerContent).toHaveClass("lg:pt-14");
  });
});
