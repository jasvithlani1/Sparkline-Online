/* eslint-disable @next/next/no-img-element */

import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import ContactPage from "@/app/contact/page";

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

describe("Contact page", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts contact form submissions directly to Formspree", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ ok: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactPage />);

    fireEvent.change(screen.getByLabelText(/^name$/i), {
      target: { value: "Taylor Client" },
    });
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: "taylor@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^subject$/i), {
      target: { value: "Growth campaign" },
    });
    fireEvent.change(screen.getByLabelText(/^message$/i), {
      target: { value: "We need help with SEO and content." },
    });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      const [, request] = fetchMock.mock.calls[0];
      const body = request.body as FormData;

      expect(fetchMock).toHaveBeenCalledWith(
        "https://formspree.io/f/meewjvgj",
        expect.objectContaining({
          method: "POST",
          headers: { Accept: "application/json" },
        }),
      );
      expect(body.get("name")).toBe("Taylor Client");
      expect(body.get("email")).toBe("taylor@example.com");
      expect(body.get("subject")).toBe("Growth campaign");
      expect(body.get("message")).toBe("We need help with SEO and content.");
    });
    expect(screen.getByText(/thank you/i)).toBeInTheDocument();
  });

  it("shows the current contact details in the main contact section and footer", () => {
    render(<ContactPage />);

    const phoneLinks = screen.getAllByRole("link", { name: /^\(470\) 841-2335$/i });
    const emailLinks = screen.getAllByRole("link", {
      name: /^info@sparklinemarketingfirm\.com$/i,
    });

    expect(phoneLinks).toHaveLength(2);
    phoneLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "tel:+14708412335");
    });
    expect(emailLinks).toHaveLength(2);
    emailLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "mailto:info@sparklinemarketingfirm.com");
    });
    expect(
      screen.getAllByText(/524 Sawnee Village Boulevard, Cumming, Georgia 30040/i),
    ).toHaveLength(2);
    expect(
      within(screen.getByRole("contentinfo")).getByRole("link", {
        name: /^524 sawnee village boulevard, cumming, georgia 30040$/i,
      }),
    ).toBeInTheDocument();
  });

  it("links About Us navigation items to the About page", () => {
    render(<ContactPage />);

    screen.getAllByRole("link", { name: /^about us$/i }).forEach((link) => {
      expect(link).toHaveAttribute("href", "/about");
    });
  });

  it("keeps the contact content close to the footer", () => {
    const { container } = render(<ContactPage />);

    const backgroundVideo = container.querySelector('video');
    const contactSection = screen.getByTestId("contact-page-section");
    const footerContent = screen.getByTestId("footer-content");

    expect(backgroundVideo).toHaveClass("top-0");
    expect(backgroundVideo).toHaveClass("h-[76%]");
    expect(backgroundVideo).toHaveClass("translate-y-0");
    expect(backgroundVideo).toHaveClass("md:inset-0");
    expect(backgroundVideo).toHaveClass("md:h-full");
    expect(contactSection).toHaveClass("pt-32");
    expect(contactSection).toHaveClass("pb-0");
    expect(contactSection).toHaveClass("sm:pt-36");
    expect(contactSection).toHaveClass("sm:pb-0");
    expect(contactSection).toHaveClass("md:pt-40");
    expect(contactSection).toHaveClass("md:pb-2");
    expect(footerContent).toHaveClass("pt-8");
    expect(footerContent).toHaveClass("sm:pt-10");
    expect(footerContent).toHaveClass("md:pt-12");
    expect(footerContent).toHaveClass("lg:pt-14");
  });
});
