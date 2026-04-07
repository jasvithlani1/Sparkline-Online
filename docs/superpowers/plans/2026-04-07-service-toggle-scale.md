# Service Toggle Scale Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce the entire `HOW CAN WE SERVE YOU?` toggle card to roughly half of its current visual footprint without changing the surrounding banner composition or toggle behavior.

**Architecture:** Keep the existing client-side toggle structure and interaction logic intact. Verify the reduced scale with a focused class-based home-page test first, then make the smallest class updates in the toggle component to satisfy the new sizing contract.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

### Task 1: Lock the smaller toggle footprint with a failing test

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
  it("shrinks the service toggle card footprint by about half", () => {
    render(<Home />);

    const toggle = screen.getByTestId("service-options-toggle");
    const strategyButton = screen.getByRole("button", { name: /^strategy$/i });
    const iconWrapper = strategyButton.firstElementChild as HTMLElement;
    const title = strategyButton.querySelector("span");
    const description = strategyButton.querySelector("p");

    expect(toggle).toHaveClass("max-w-[360px]");
    expect(toggle).toHaveClass("mt-14");
    expect(toggle).toHaveClass("sm:mt-[4.5rem]");
    expect(toggle).toHaveClass("md:mt-[5.5rem]");
    expect(toggle).toHaveClass("lg:mt-[6.5rem]");
    expect(toggle).toHaveClass("p-2");
    expect(toggle).toHaveClass("sm:p-[10px]");
    expect(toggle).toHaveClass("md:p-3");
    expect(strategyButton).toHaveClass("gap-1.5");
    expect(strategyButton).toHaveClass("sm:gap-2");
    expect(iconWrapper).toHaveClass("h-6");
    expect(iconWrapper).toHaveClass("w-6");
    expect(iconWrapper).toHaveClass("sm:h-7");
    expect(iconWrapper).toHaveClass("sm:w-7");
    expect(title).toHaveClass("text-[15px]");
    expect(title).toHaveClass("sm:text-[20px]");
    expect(title).toHaveClass("md:text-[24px]");
    expect(description).toHaveClass("text-[12px]");
    expect(description).toHaveClass("sm:text-[14px]");
    expect(description).toHaveClass("max-w-[280px]");
  });
```

- [ ] **Step 2: Run the targeted test and verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL in the new toggle sizing test because the current classes still reflect the larger card.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/app/home.test.tsx
git commit -m "test: lock reduced service toggle footprint"
```

### Task 2: Reduce the toggle card classes to satisfy the new footprint

**Files:**
- Modify: `components/landing/service-options-toggle.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Apply the minimal class reductions in the toggle component**

```tsx
        <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6">
```

```tsx
      className="relative z-20 mt-14 w-full max-w-[360px] rounded-[20px] border border-white/12 bg-[#0b1225]/62 p-2 shadow-[0_18px_36px_rgba(3,8,22,0.24)] backdrop-blur-md sm:mt-[4.5rem] sm:p-[10px] md:mt-[5.5rem] md:p-3 lg:mt-[6.5rem]"
```

```tsx
            <div key={option.id} className="py-1.5 first:pt-0 last:pb-0 sm:py-2">
```

```tsx
                className="flex w-full items-start gap-1.5 text-left sm:gap-2"
```

```tsx
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-xl transition-colors sm:h-7 sm:w-7 ${
```

```tsx
                      className={`text-[15px] leading-none tracking-[-0.03em] sm:text-[20px] md:text-[24px] ${
```

```tsx
                      className={`mt-0.5 h-[2px] w-6 shrink-0 rounded-full transition-colors sm:w-8 ${
```

```tsx
                    className={`mt-1.5 max-w-[280px] text-[12px] leading-[1.35] transition-colors sm:text-[14px] ${
```

- [ ] **Step 2: Run the targeted test and verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS with the new sizing test and the existing service toggle behavior test still green.

- [ ] **Step 3: Commit the implementation**

```bash
git add components/landing/service-options-toggle.tsx tests/app/home.test.tsx
git commit -m "feat: reduce service toggle footprint"
```

### Task 3: Full verification

**Files:**
- Modify: `components/landing/service-options-toggle.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS with 0 failures.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS with 0 errors.

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: PASS and Next.js completes the production build successfully.

- [ ] **Step 4: Commit verification-only follow-up if needed**

```bash
git add components/landing/service-options-toggle.tsx tests/app/home.test.tsx
git commit -m "chore: verify reduced service toggle scale"
```
