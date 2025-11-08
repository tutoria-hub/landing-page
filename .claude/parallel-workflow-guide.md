# Parallel Agent Workflow Guide

Pieter Levels + IndyDevDan workflow adapted for Next.js landing page development.

## Philosophy

**Ship Fast (Pieter Levels)**: Iterate in production, no enterprise bureaucracy
**Parallel Exploration (IndyDevDan)**: Explore 3 approaches simultaneously when uncertain

**Result**: Single agent by default, 2-3 parallel agents only when exploring design space.

## The Core Principle

Your landing page is small. Next.js HMR reloads in 200ms. **Don't overcomplicate.**

Default: Work on `main` with single agent, leverage dev server speed.

Parallel: Only when you need to **compare 3+ approaches visually or measure performance**.

## When to Use Parallel Agents

### ✅ PARALLEL THESE

**1. Visual exploration** - 3+ design directions for same component
- Example: "Redesign hero headline styling" (gradient vs animated vs hover effect)
- Why: Need to see approaches side-by-side in browser
- Time saved: 30 min

**2. Performance optimization** - Multiple strategies need measurement
- Example: "Optimize LCP" (lazy loading vs Web Worker vs CSS optimization)
- Why: Each approach requires Lighthouse comparison
- Time saved: 45 min

**3. Layout options** - Uncertain which approach works best
- Example: "Add testimonials section" (masonry vs grid vs carousel)
- Why: Layout choice affects entire section design
- Time saved: 40 min

**4. Independent features** - Multiple sections with no dependencies
- Example: "Add pricing, FAQ, CTA sections simultaneously"
- Why: Completely independent work
- Time saved: 1.5 hours

**5. Copy testing** - A/B test messaging
- Example: "Test 3 different hero headlines"
- Why: Fastest to iterate, fastest to compare
- Time saved: 15 min

### ❌ SINGLE AGENT THESE

**1. Bug fixes** - One obvious solution
- Example: "Fix layout shift in typing animation"
- Why: No need to explore alternatives
- Time: 10 min

**2. Performance audits** - Need consistent baseline
- Example: "Run Lighthouse audit to measure current LCP"
- Why: Parallel audits give conflicting data
- Time: 10 min

**3. Responsive testing** - Systematic evaluation
- Example: "Test all breakpoints (375px, 768px, 1440px)"
- Why: Need one person checking consistently
- Time: 20 min

**4. Code review** - One quality gate before deploy
- Example: "Review before `npm run deploy`"
- Why: Deploy is single event, needs one validation
- Time: 15 min

**5. Dependency upgrades** - Interdependent changes
- Example: "Upgrade shadcn 3.5.0 → 3.6.0"
- Why: Parallel upgrades cause package.json conflicts
- Time: 20 min

## How to Run Parallel Work

### Setup (No Git Worktrees Needed)

```bash
# Terminal 1: Start dev server ONCE
cd /Users/frederikhandberg/Tutoria-Stack/landing-page
npm run dev
# Keep running - never kill it
# Output: ready - started server on 0.0.0.0:3000

# Browser: Open http://localhost:3000
# Watch for auto-refresh as agents work
```

### Execute Parallel Agents

```bash
# Terminal 2: Agent A
claude
# Prompt: "Change hero headline to gradient text effect"
# Edit app/page.tsx → Save → Browser auto-refreshes

# Terminal 3: Agent B
claude
# Prompt: "Change hero headline to animated underline"
# Edit app/page.tsx → Save → Browser auto-refreshes

# Terminal 4: Agent C
claude
# Prompt: "Change hero headline to hover glow effect"
# Edit app/page.tsx → Save → Browser auto-refreshes
```

### Compare & Pick Winner

```bash
# Screenshot each version in browser
# Evaluate: "Which feels most credible?"
# Pick winner

# Commit winning approach
git add .
git commit -m "feat(hero): add animated underline effect"
```

**Total time**: ~45 minutes for 3 approaches + comparison + commit

## Daily Workflow Example

### Morning: Single Agent Discovery (10 min)
```bash
npm run dev
# Open http://localhost:3000
# DevTools → Lighthouse → Baseline audit
git log --oneline -10  # Review recent changes
```

### Midday: Parallel Design Exploration (45 min)
```bash
# Task: Redesign hero headline
# Use /landing-page/parallel command

# Terminal 1: npm run dev (already running)
# Terminal 2-4: 3 Claude instances
# Each explores different approach
# Screenshot + compare + commit winner
```

### Afternoon: Single Agent Validation (20 min)
```bash
# Use /landing-page/verify-deploy command

npm run build      # Check TypeScript errors
npm run preview    # Test in Cloudflare runtime
# Manual check: hero, mobile, performance
npm run deploy     # Ship if passes
```

## Git Workflow (No Worktrees)

```
main (always deployable)
  ↓
Work directly on main for small changes
  ↓
Commit frequently, deploy daily
```

**Why no branches?**
- Landing page is small (2 files)
- Next.js HMR is faster than git context switching
- No blocking dependencies between features
- Ship fast, iterate in production

**When to branch** (rare):
- Long-running experiment (multi-day feature)
- Testing breaking change before merge
- Working with team member on same file

## Comparison Strategies

### Visual Comparison
```bash
# Screenshot each approach
# Compare side-by-side
# Ask: "Which achieves goal best?"
# Criteria: credibility, clarity, conversion
```

### Performance Comparison
```bash
# Use /landing-page/compare-perf command

# Before: Establish baseline
# After each approach: Run Lighthouse
# Compare: LCP, FID, CLS
# Winner: Best improvement on priority metric
```

### Code Quality Comparison
```bash
# After each approach
npm run lint
npm run build

# Check:
# - No TypeScript errors
# - Bundle size reduction
# - No unused code
```

## Slash Commands Reference

**`/landing-page/parallel [task]`**
- Sets up 3 parallel agents for any exploration task
- Provides specific prompts for agents A, B, C
- Includes comparison checklist

**`/landing-page/verify-deploy`**
- Build + preview before deploying
- Systematic check: visual, technical, mobile
- Deploy only if passes

**`/landing-page/compare-perf`**
- Run Lighthouse, save baseline
- Compare parallel optimization approaches
- Track LCP, FID, CLS, bundle size

## Quick Start: Your First Parallel Session

**Goal**: Redesign hero headline styling (3 approaches)
**Time**: 45 minutes

```bash
# 1. Start dev server (Terminal 1)
npm run dev

# 2. Open browser
# http://localhost:3000 (keep open)

# 3. Run parallel command
/landing-page/parallel Redesign hero headline styling

# 4. Follow prompts for agents A, B, C
# (Each gets specific prompt to edit app/page.tsx)

# 5. Screenshot each version (browser auto-refreshes)

# 6. Compare & vote
# "Which feels most credible?"

# 7. Commit winner
git add app/page.tsx
git commit -m "feat(hero): update headline styling"
```

**Result**: 3 approaches evaluated in 45 min, winner shipped.

## Key Insights

**When NOT to parallelize**:
- Only one obvious solution (bug fix)
- Need consistent measurement (performance audit)
- Sequential dependency (testimonials wait for hero)
- Infrastructure work (dependency upgrades)

**When TO parallelize**:
- 3+ legitimate design options
- Each option is independent
- Need visual/performance comparison
- Uncertain which direction is best

**Bottom line**: Ship fast (Pieter Levels) without creating chaos (IndyDevDan discipline).

## File Targets

**Primary edit target**: `/Users/frederikhandberg/Tutoria-Stack/landing-page/app/page.tsx`
- Hero section: lines 112-206
- Other sections: as needed

**Config files**:
- `/Users/frederikhandberg/Tutoria-Stack/landing-page/next.config.mjs`
- `/Users/frederikhandberg/Tutoria-Stack/landing-page/wrangler.jsonc`

## Next Steps

1. Try `/landing-page/parallel` on hero redesign task
2. Use for one week
3. Delete if unused (Ship Fast principle)
4. Iterate based on real usage (Clean Codebase principle)

Pieter wouldn't plan for 3 weeks—ship and refine.
