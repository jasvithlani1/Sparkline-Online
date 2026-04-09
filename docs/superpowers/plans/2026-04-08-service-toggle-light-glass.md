# Service Toggle Light Glass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the service toggle card to a white glassmorphism treatment with black-based text and icon colors while preserving layout and active-state behavior.

**Architecture:** First update the existing service-toggle regression so it expects the lighter glass contract, then minimally restyle the toggle shell, divider, icon wrapper, and text classes in the component. Keep the active blue accent and current sizing untouched so the change stays purely visual.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

### File Structure

- Modify: `components/landing/service-options-toggle.tsx` - switch the glass shell from dark to light and update icon/text contrast classes.
- Modify: `tests/app/home.test.tsx` - update the toggle regression to assert the new light-glass visual contract.

### Task 1: Lock the light-glass toggle contract with a failing test

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test expectation**

```tsx
  it("shrinks the service toggle card footprint by about half", () => {
    render(<Home />);

    const serviceHeading = screen.getByRole("heading", { name: /how can we serve you\?/i, level: 2 });
    const serviceFrame = serviceHeading.parentElement;
    const toggle = screen.getByTestId("service-options-toggle");
    const strategyButton = screen.getByRole("button", { name: /^strategy$/i });
    const iconWrapper = strategyButton.firstElementChild as HTMLElement;
    const title = strategyButton.querySelector("span");
    const description = strategyButton.querySelector("p");
    const divider = toggle.firstElementChild as HTMLElement;

    expect(serviceFrame).toHaveClass("min-h-[280px]");
    expect(serviceFrame).toHaveClass("sm:min-h-[340px]");
    expect(serviceFrame).toHaveClass("md:min-h-[520px]");
    expect(serviceFrame).toHaveClass("lg:min-h-[596px]");
    expect(toggle).toHaveClass("max-w-[360px]");
    expect(toggle).toHaveClass("bg-white/52");
    expect(toggle).toHaveClass("border-white/38");
    expect(toggle).toHaveClass("backdrop-blur-md");
    expect(divider).toHaveClass("divide-black/10");
    expect(iconWrapper).toHaveClass("bg-black/6");
    expect(title).toHaveClass("text-[#2C6BFF]");
    expect(description).toHaveClass("text-black/72");
  });
```

- [ ] **Step 2: Run the targeted test and verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the current toggle still uses the dark glass shell and white-based text/icon classes.

### Task 2: Restyle the toggle to the approved light-glass treatment

**Files:**
- Modify: `components/landing/service-options-toggle.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Update the icon stroke logic and shell classes**

```tsx
function ServiceOptionIcon({ id, isActive }: { id: ServiceOptionId; isActive: boolean }) {
  const stroke = isActive ? "#2C6BFF" : "rgba(16,18,24,0.72)";
```

```tsx
    <div
      data-testid="service-options-toggle"
      className="... border border-white/38 bg-white/52 ... backdrop-blur-md ..."
    >
      <div className="divide-y divide-black/10">
```

- [ ] **Step 2: Update the icon wrapper, title, bar, and description colors**

```tsx
                <div
                  className={`... ${
                    isActive ? "bg-[#2C6BFF]/10" : "bg-black/6"
                  }`}
                >
```

```tsx
                    <span
                      className={`... ${
                        isActive ? "text-[#2C6BFF]" : "text-black/78"
                      }`}
                    >
```

```tsx
                    <span
                      className={`... ${
                        isActive ? "bg-[#2C6BFF]" : "bg-black/12"
                      }`}
                    />
```

```tsx
                  <p
                    className={`... ${
                      isActive ? "text-black/72" : "text-black/48"
                    }`}
                  >
```

- [ ] **Step 3: Run the targeted test and verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS with the updated light-glass expectations.

### Task 3: Verify the full app

**Files:**
- Modify: `components/landing/service-options-toggle.tsx`
- Modify: `tests/app/home.test.tsx`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS with 0 failures.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS with 0 errors.
