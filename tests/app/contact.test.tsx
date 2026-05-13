/* eslint-disable @next/next/no-img-element */

import { fireEvent, render, screen } from "@testing-library/react";
import ContactPage, { buildContactMailtoUrl } from "@/app/contact/page";

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
  it("builds a formatted mailto URL for contact form submissions", () => {
    const mailtoUrl = buildContactMailtoUrl({
      name: "Taylor Client",
      email: "taylor@example.com",
      subject: "Growth campaign",
      message: "We need help with SEO and content.",
    });

    const parsed = new URL(mailtoUrl);

    expect(parsed.protocol).toBe("mailto:");
    expect(parsed.pathname).toBe("info@sparklinemarketingfirm.com");
    expect(parsed.searchParams.get("subject")).toBe(
      "Website enquiry: Growth campaign",
    );
    expect(parsed.searchParams.get("body")).toBe(
      [
        "Name: Taylor Client",
        "Email: taylor@example.com",
        "Subject: Growth campaign",
        "",
        "Message:",
        "We need help with SEO and content.",
      ].join("\n"),
    );
  });

  it("opens a formatted mailto message when the contact form is submitted", () => {
    const openMock = vi.spyOn(window, "open").mockImplementation(() => null);

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

    expect(openMock).toHaveBeenCalledWith(
      buildContactMailtoUrl({
        name: "Taylor Client",
        email: "taylor@example.com",
        subject: "Growth campaign",
        message: "We need help with SEO and content.",
      }),
      "_self",
    );
    expect(screen.getByText(/thank you/i)).toBeInTheDocument();

    openMock.mockRestore();
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
      screen.getAllByText(/2080 One White Oak Lane, Cumming, GA 30041/i),
    ).toHaveLength(2);
  });

  it("links About Us navigation items to the About page", () => {
    render(<ContactPage />);

    screen.getAllByRole("link", { name: /^about us$/i }).forEach((link) => {
      expect(link).toHaveAttribute("href", "/about");
    });
  });
});
