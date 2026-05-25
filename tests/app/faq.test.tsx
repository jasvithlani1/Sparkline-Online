import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Faq } from "@/components/landing/faq";

describe("Faq", () => {
  it("uses the full Frequently Asked Questions label", () => {
    render(<Faq />);

    expect(
      screen.getByRole("heading", {
        name: /Frequently Asked Questions/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        name: /^FAQ$/i,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/Common questions from businesses looking to grow their brand and digital presence\./i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /How long does it take to complete a project with Sparkline Marketing Firm\?/i,
      }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(
        /Every project is unique, and timelines depend on the scope and complexity of the work\./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/SEO-friendly results without unnecessary delays\./i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /How does Sparkline Marketing Firm measure the success of its work\?/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Success looks different for every business and every project\./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/outcomes that actually matter to your business\./i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Do I need to invest in all of your services or can I choose just one\?/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /You are absolutely free to choose the services that make the most sense for your business right now\./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/identify exactly what you need and build around that\./i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /What does the onboarding process look like when starting with Sparkline Marketing Firm\?/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Getting started with Sparkline is a straightforward and collaborative process\./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Our onboarding process typically takes anywhere from one week to a month/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/done properly and to the highest standard\./i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Does Sparkline Marketing Firm offer ongoing support after a project is completed\?/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Yes absolutely\. Great marketing is not a one-time event/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ongoing content marketing, social media management, website maintenance and brand strategy support/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/when we truly know your brand inside and out\./i),
    ).toBeInTheDocument();
  });
});
