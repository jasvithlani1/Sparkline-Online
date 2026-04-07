# Paper Footer Replacement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current landing-page footer with the selected Paper footer structure and make it responsive across mobile, tablet, and desktop.

**Architecture:** Keep the footer as a single server component fed by structured content from `lib/content.ts`. First add a focused regression test that asserts the new footer sections and confirms removed legacy footer copy is gone, then replace the footer markup with a two-band responsive layout that matches the Paper composition.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

### Task 1: Lock the Paper footer content with a failing test

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing footer test**

```tsx
  it("replaces the legacy footer with the selected Paper footer structure", () => {
    render(<Home />);

    expect(screen.getByText(/^company$/i)).toBeInTheDocument();
    expect(screen.getByText(/^get in touch$/i)).toBeInTheDocument();
    expect(screen.getByText(/^background$/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^home$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^about us$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^faq$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^mail us$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^contact us$/i })).toBeInTheDocument();
    expect(screen.getByText(/Sparkling Marketing Firm is a Specialized marketing firm/i)).toBeInTheDocument();
    expect(screen.getByText(/Connect with us on our socials/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /instagram/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /pinterest/i })).toBeInTheDocument();
    expect(screen.getByText(/©2026 SPARKLINE MARKETING FIRM All Rights Reserved\./i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /terms of service/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /accessibility/i })).toBeInTheDocument();
    expect(screen.queryByText(/Currently we're Online/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^agency$/i)).not.toBeInTheDocument();
  });
```

- [ ] **Step 2: Run the targeted test and verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the current footer still renders the legacy layout and content.

### Task 2: Replace the footer content and component

**Files:**
- Modify: `lib/content.ts`
- Modify: `components/landing/footer.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Update the structured footer content**

```ts
export const footerContent = {
  company: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "#about-us" },
    { label: "FAQ", href: "#faq" },
  ],
  getInTouch: [
    { label: "Mail Us", href: "mailto:hello@sparklinemarketingfirm.com" },
    { label: "Contact Us", href: "#contact-us" },
  ],
  background: {
    body: "Sparkling Marketing Firm is a Specialized marketing firm where creativity and marketing is supercharged.",
    socialsLabel: "Connect with us on our socials.",
  },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com" },
    { label: "Pinterest", href: "https://www.pinterest.com" },
  ],
  legal: {
    copyright: "©2026 SPARKLINE MARKETING FIRM All Rights Reserved.",
    links: [
      { label: "Privacy Policy", href: "#privacy-policy" },
      { label: "Terms of Service", href: "#terms-of-service" },
      { label: "Accessibility", href: "#accessibility" },
    ],
  },
} as const;
```

- [ ] **Step 2: Replace the footer markup with the Paper-based layout**

```tsx
<footer id="contact-us" className="bg-[#05081d] text-white">
  <div className="relative overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(...),linear-gradient(...)] opacity-70" />
    <div className="relative mx-auto grid max-w-[1470px] gap-12 px-5 py-14 sm:px-6 md:px-8 lg:grid-cols-[320px_minmax(240px,1fr)_425px] lg:px-12 lg:py-20">
      ...
    </div>
  </div>
  <div className="border-t border-black/5 bg-[#f7f2eb]">
    <div className="mx-auto flex max-w-[1470px] flex-col gap-4 px-5 py-6 text-[#111111] sm:px-6 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
      ...
    </div>
  </div>
</footer>
```

- [ ] **Step 3: Run the targeted test and verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS with the new Paper footer test and the rest of the page tests still green.

### Task 3: Verify the whole app

**Files:**
- Modify: `lib/content.ts`
- Modify: `components/landing/footer.tsx`
- Modify: `tests/app/home.test.tsx`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS with 0 failures.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS with 0 errors.

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: PASS and Next.js completes the production build successfully.
