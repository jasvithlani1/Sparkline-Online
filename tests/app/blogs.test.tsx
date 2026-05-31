/* eslint-disable @next/next/no-img-element */

import { fireEvent, render, screen } from "@testing-library/react";
import BlogsPage from "@/app/blogs/page";
import { BlogList } from "@/components/blogs/blog-list";

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
  it("filters injected CMS posts by category", () => {
    render(
      <BlogList
        posts={[
          {
            id: "blogPost.cms-marketing",
            slug: "cms-marketing",
            title: "CMS Marketing",
            date: "May 30, 2026",
            category: "Marketing",
            description: "Marketing from Sanity.",
            image: "/images/work-firecrawl.png",
            imageClassName: "object-cover object-center",
            body: "Body",
            videoId: "abc123",
          },
          {
            id: "blogPost.cms-design",
            slug: "cms-design",
            title: "CMS Design",
            date: "May 29, 2026",
            category: "Design",
            description: "Design from Sanity.",
            image: "/images/work-blackalgo.png",
            imageClassName: "object-cover object-center",
            body: "Body",
            videoId: "def456",
          },
        ]}
      />,
    );

    fireEvent.change(screen.getByLabelText(/filter by category/i), {
      target: { value: "Design" },
    });

    expect(screen.getByRole("heading", { name: /cms design/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /cms marketing/i })).not.toBeInTheDocument();
  });

  it("keeps the blog list close to the footer", async () => {
    const page = await BlogsPage();
    render(page);

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
