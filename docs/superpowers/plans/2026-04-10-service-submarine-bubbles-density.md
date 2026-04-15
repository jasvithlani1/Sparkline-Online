# Service Submarine Bubble Density Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Increase the submarine bubble count and shift the bubble origin rightward so the stream sits over the antenna area while preserving the current subtle looping effect.

**Architecture:** Keep the existing bubble animation CSS untouched and only adjust the bubble overlay contract in `tests/app/home.test.tsx` plus the bubble descriptor array in `components/landing/service-banner.tsx`. The implementation should remain a lightweight decorative overlay with no layout or asset changes.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

## File Structure

- Modify: `tests/app/home.test.tsx` - update the submarine regression to expect the denser bubble count while keeping the rest of the overlay assertions unchanged.
- Modify: `components/landing/service-banner.tsx` - expand the bubble descriptor array to 8 bubbles and move the origin positions farther right and slightly higher above the antenna.

### Task 1: Lock the denser bubble count in the regression

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test**

Change the bubble count assertion in `tests/app/home.test.tsx` from 4 to 8:

```tsx
    expect(bubbles).toHaveLength(8);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/app/home.test.tsx -t "service banner submarine oversized with a decorative bubble overlay"`

Expected: FAIL because the component still renders 4 bubbles.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/app/home.test.tsx
git commit -m "test: require denser service submarine bubbles"
```

### Task 2: Increase bubble count and move the origin rightward

**Files:**
- Modify: `components/landing/service-banner.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Replace the current bubble descriptor array**

Replace the existing `submarineBubbles` array with this denser, right-shifted version:

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
  { id: "bubble-1", size: 8, left: "39%", top: "12%", delay: "0s", duration: "4.5s", driftX: "-4px" },
  { id: "bubble-2", size: 10, left: "40.5%", top: "9.5%", delay: "0.6s", duration: "4.2s", driftX: "5px" },
  { id: "bubble-3", size: 7, left: "42%", top: "7.5%", delay: "1.1s", duration: "4.8s", driftX: "-3px" },
  { id: "bubble-4", size: 9, left: "41%", top: "13.5%", delay: "1.7s", duration: "4.1s", driftX: "6px" },
  { id: "bubble-5", size: 6, left: "43.5%", top: "10.5%", delay: "2.2s", duration: "4.7s", driftX: "-2px" },
  { id: "bubble-6", size: 11, left: "44.5%", top: "8.5%", delay: "2.8s", duration: "4.4s", driftX: "4px" },
  { id: "bubble-7", size: 7, left: "40%", top: "15%", delay: "3.3s", duration: "4.9s", driftX: "-5px" },
  { id: "bubble-8", size: 8, left: "42.5%", top: "11.5%", delay: "3.8s", duration: "4.3s", driftX: "3px" },
];
```

- [ ] **Step 2: Leave the overlay markup unchanged**

The overlay block should remain structurally the same, still mapping `submarineBubbles` into `service-submarine-bubble` spans:

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

Expected: PASS with the new bubble count.

- [ ] **Step 4: Commit the implementation**

```bash
git add components/landing/service-banner.tsx tests/app/home.test.tsx
git commit -m "feat: densify service submarine bubbles"
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
git commit -m "chore: verify denser submarine bubble tuning"
```
