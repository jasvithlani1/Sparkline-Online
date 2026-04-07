# Service Options Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fully coded interactive services/options toggle inside the `HOW CAN WE SERVE YOU?` section based on the selected Paper reference.

**Architecture:** Keep the current service banner media composition intact and add a small client component that renders the selectable service rows from structured content data. Use a test-first pass to verify the default active item and the toggle interaction, then wire the component into the existing banner layout responsively.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Vitest, Testing Library

---

### Task 1: Add the failing interaction regression

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it("renders the service options list and toggles the active service", () => {
  render(<Home />);

  const strategyButton = screen.getByRole("button", { name: /strategy/i });
  const developmentButton = screen.getByRole("button", { name: /development/i });

  expect(strategyButton).toHaveAttribute("aria-pressed", "true");
  expect(
    screen.getByText(/Helping you with top notch strategy for GTM/i),
  ).toBeInTheDocument();

  fireEvent.click(developmentButton);

  expect(developmentButton).toHaveAttribute("aria-pressed", "true");
  expect(
    screen.getByText(/Develop products, websites and manage them for you/i),
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the targeted test to verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the service-options UI does not exist yet.

### Task 2: Add structured content and the toggle component

**Files:**
- Modify: `lib/content.ts`
- Create: `components/landing/service-options-toggle.tsx`
- Modify: `components/landing/service-banner.tsx`

- [ ] **Step 1: Add the service-options content**

```ts
export const serviceOptions = [
  {
    id: "strategy",
    title: "Strategy",
    description: "Helping you with top notch strategy for GTM",
  },
  // story-voice, design, development, media-video
] as const;
```

- [ ] **Step 2: Add the client-side toggle component**

```tsx
"use client";

import { useState } from "react";
import { serviceOptions } from "@/lib/content";

export function ServiceOptionsToggle() {
  const [activeId, setActiveId] = useState(serviceOptions[0].id);

  return (
    <div>
      {serviceOptions.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={option.id === activeId}
          onClick={() => setActiveId(option.id)}
        >
          {option.title}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Wire the toggle into the service banner**

```tsx
import { ServiceOptionsToggle } from "@/components/landing/service-options-toggle";

<div className="relative ...">
  <ServiceOptionsToggle />
</div>
```

- [ ] **Step 4: Run the targeted test to verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS

### Task 3: Verify the full app after the new service toggle

**Files:**
- Modify: `tests/app/home.test.tsx`
- Modify: `lib/content.ts`
- Create: `components/landing/service-options-toggle.tsx`
- Modify: `components/landing/service-banner.tsx`

- [ ] **Step 1: Run the full verification suite**

Run: `npm test`
Expected: PASS

Run: `npm run lint`
Expected: PASS

Run: `npm run build`
Expected: PASS
