---
description: Run Lighthouse audit and save baseline for performance comparison
allowed-tools: Bash(*), Write
---

# Compare Performance

Run Lighthouse audit on current implementation, save baseline for comparing parallel approaches.

## When to Use

Use before starting parallel performance optimization work:
1. Establish baseline metrics (current state)
2. Then run 3 parallel optimization approaches
3. Compare each against baseline
4. Pick best performer

## Workflow

```bash
# Step 1: Start dev server
npm run dev

# Step 2: Open http://localhost:3000 in Chrome

# Step 3: Run Lighthouse
# DevTools → Lighthouse → Analyze page load
# Mode: Navigation (Default)
# Device: Mobile or Desktop (choose one)

# Step 4: Record metrics
```

## Metrics to Track

**Priority 1 - Core Web Vitals**:
- **LCP (Largest Contentful Paint)**: Hero section load time
  - Target: < 2.5s
  - Current: [record from Lighthouse]

- **FID (First Input Delay)**: Button responsiveness
  - Target: < 100ms
  - Current: [record from Lighthouse]

- **CLS (Cumulative Layout Shift)**: Animation stability
  - Target: < 0.1
  - Current: [record from Lighthouse]

**Priority 2 - Bundle**:
- **Total Bundle Size**: Check .next/static/ after build
  - Current: [record from build output]

- **First Contentful Paint (FCP)**:
  - Target: < 1.8s
  - Current: [record from Lighthouse]

## Save Baseline

Create a baseline file for comparison:

```bash
# In .claude/ directory
echo "Baseline - $(date)" > .claude/perf-baseline.txt
echo "LCP: [value]" >> .claude/perf-baseline.txt
echo "FID: [value]" >> .claude/perf-baseline.txt
echo "CLS: [value]" >> .claude/perf-baseline.txt
echo "Bundle: [value]" >> .claude/perf-baseline.txt
```

## After Parallel Optimization

Run Lighthouse again on each approach:
- Approach A: Record metrics
- Approach B: Record metrics
- Approach C: Record metrics

Compare against baseline. Winner = best improvement on LCP (hero section priority).

## Quick Check

If you just want a quick performance check without saving baseline:
```bash
npm run build
# Check bundle size in terminal output
```
