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
  });
});
