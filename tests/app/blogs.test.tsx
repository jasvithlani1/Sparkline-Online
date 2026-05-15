/* eslint-disable @next/next/no-img-element */

import { render, screen } from "@testing-library/react";
import BlogsPage from "@/app/blogs/page";

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

describe("Blogs page", () => {
  it("keeps the blog list close to the footer", () => {
    render(<BlogsPage />);

    const postsSection = screen.getByTestId("blog-posts-section");
    const footerContent = screen.getByTestId("footer-content");

    expect(postsSection).toHaveClass("pt-10");
    expect(postsSection).toHaveClass("pb-0");
    expect(postsSection).toHaveClass("sm:pt-12");
    expect(postsSection).toHaveClass("sm:pb-0");
    expect(postsSection).toHaveClass("md:pt-14");
    expect(postsSection).toHaveClass("md:pb-2");
    expect(footerContent).toHaveClass("pt-8");
    expect(footerContent).toHaveClass("sm:pt-10");
    expect(footerContent).toHaveClass("md:pt-12");
    expect(footerContent).toHaveClass("lg:pt-14");
  });
});
