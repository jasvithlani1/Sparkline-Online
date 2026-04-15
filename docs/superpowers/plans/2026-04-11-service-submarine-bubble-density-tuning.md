# Service Submarine Bubble Density Tuning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the submarine bubble plume feel roughly twice as dense without literally doubling the DOM count, while preserving the current right-shifted antenna origin and subtle ambient motion.

**Architecture:** Keep the current bubble overlay structure and animation CSS unchanged. Tune only the bubble descriptor array in `components/landing/service-banner.tsx` and the bubble-count assertion in `tests/app/home.test.tsx` so the change stays isolated to the decorative overlay contract.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

## File Structure

- Modify: `tests/app/home.test.tsx` - update the submarine regression to expect the fuller plume count while preserving the rest of the overlay assertions.
- Modify: `components/landing/service-banner.tsx` - expand the bubble descriptor array modestly and tighten the per-bubble delays and durations for higher perceived density.

### Task 1: Lock the fuller plume count in the regression

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test**

Change the bubble count assertion in `tests/app/home.test.tsx` from 8 to 10:

```tsx
    expect(bubbles).toHaveLength(10);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/app/home.test.tsx -t "service banner submarine oversized with a decorative bubble overlay"`

Expected: FAIL because the component still renders 8 bubbles.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/app/home.test.tsx
git commit -m "test: require fuller service submarine bubble plume"
```

### Task 2: Tune bubble descriptors for higher visual density

**Files:**
- Modify: `components/landing/service-banner.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Replace the current `submarineBubbles` array**

Replace the existing array with this 10-bubble, tighter-timing version:

```tsx
const submarineBubbles: Array<{
  id: string;
  size: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
  driftX: string;
}> = [
  { id: "bubble-1", size: 8, left: "39%", top: "12%", delay: "0s", duration: "4.4s", driftX: "-4px" },
  { id: "bubble-2", size: 10, left: "40.2%", top: "10.2%", delay: "0.35s", duration: "4.1s", driftX: "4px" },
  { id: "bubble-3", size: 7, left: "41.6%", top: "8.2%", delay: "0.75s", duration: "4.6s", driftX: "-3px" },
  { id: "bubble-4", size: 9, left: "40.8%", top: "13.3%", delay: "1.05s", duration: "4s", driftX: "5px" },
  { id: "bubble-5", size: 6, left: "42.7%", top: "11%", delay: "1.4s", duration: "4.5s", driftX: "-2px" },
  { id: "bubble-6", size: 11, left: "44%", top: "9%", delay: "1.8s", duration: "4.2s", driftX: "4px" },
  { id: "bubble-7", size: 7, left: "39.8%", top: "15%", delay: "2.1s", duration: "4.7s", driftX: "-5px" },
  { id: "bubble-8", size: 8, left: "42.2%", top: "11.8%", delay: "2.45s", duration: "4.1s", driftX: "3px" },
  { id: "bubble-9", size: 6, left: "43.1%", top: "7.8%", delay: "2.8s", duration: "4.4s", driftX: "-1px" },
  { id: "bubble-10", size: 9, left: "41.2%", top: "9.8%", delay: "3.15s", duration: "4.3s", driftX: "2px" },
];
```

- [ ] **Step 2: Leave the overlay markup unchanged**

The overlay should continue mapping `submarineBubbles` into spans without structural changes:

```tsx
          <div
            data-testid="service-submarine-bubbles"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 overflow-visible motion-reduce:hidden"
          >
            {submarineBubbles.map((bubble) => (
              <span
                key={bubble.id}
                data-testid="service-submarine-bubble"
                className="service-submarine-bubble absolute rounded-full border border-white/45 bg-white/25 shadow-[0_0_12px_rgba(255,255,255,0.18)]"
                style={
                  {
                    left: bubble.left,
                    top: bubble.top,
                    width: `${bubble.size}px`,
                    height: `${bubble.size}px`,
                    "--bubble-delay": bubble.delay,
                    "--bubble-duration": bubble.duration,
                    "--bubble-drift-x": bubble.driftX,
                  } as CSSProperties
                }
              />
            ))}
          </div>
```

- [ ] **Step 3: Run the targeted test to verify it passes**

Run: `npm test -- --run tests/app/home.test.tsx -t "service banner submarine oversized with a decorative bubble overlay"`

Expected: PASS with the new 10-bubble count.

- [ ] **Step 4: Commit the implementation**

```bash
git add components/landing/service-banner.tsx tests/app/home.test.tsx
git commit -m "feat: tune service submarine bubble density"
```

### Task 3: Full verification

**Files:**
- Modify: none
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`

Expected: PASS with all Vitest suites green.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: PASS with the Next.js production build completing successfully.

- [ ] **Step 3: Commit the verified change set**

```bash
git add components/landing/service-banner.tsx tests/app/home.test.tsx
git commit -m "chore: verify service submarine bubble density tuning"
```
