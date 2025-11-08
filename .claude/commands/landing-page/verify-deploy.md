---
description: Build + preview locally before deploying to Cloudflare
allowed-tools: Bash(*)
---

# Verify Deploy

Run full build + preview in Cloudflare Workers runtime before deploying to production.

## What This Does

1. Build production bundle (`npm run build`)
2. Check for TypeScript errors
3. Start local Cloudflare Workers preview (`npm run preview`)
4. Prompt manual verification
5. Deploy if approved

## Workflow

```bash
# Step 1: Build
npm run build

# Check output for errors:
# ✅ "Compiled successfully" → continue
# ❌ TypeScript errors → fix before deploying

# Step 2: Preview in Cloudflare runtime
npm run preview

# Opens http://localhost:8787
# Test in browser:
# - Hero section renders
# - Typing animation works
# - No layout shifts
# - Mobile responsive
# - All assets load

# Step 3: If all passes
npm run deploy
```

## What to Check

**Visual**:
- Hero typing animation runs
- No layout shifts during animation
- Images load (Harvard logo)
- Tailwind styles apply correctly

**Technical**:
- Console has no errors
- Network tab shows optimized bundles
- Lighthouse score acceptable

**Mobile**:
- Test on real device or DevTools
- Touch targets adequate
- Text readable
- Grid gaps correct

## Deploy Command

Only run after preview passes:
```bash
npm run deploy
```

Live URL: https://landing-page.fupsonline.workers.dev/
