# Common Auto-Fixes

**Tracks recurring issues and auto-fix patterns.**

Updates after each Tier 1 auto-fix or Tier 3 design-agency fix.

---

## Spacing Fixes

### Vertical Gap: 92px → 96px

**Issue:** Desktop section spacing slightly off specification
**Frequency:** 0 occurrences (baseline)
**Tier Detected:** 1 (instant check)
**Auto-fix:** YES

**Fix Applied:**
```diff
- className="py-23" // 92px
+ className="py-24" // 96px (24*4 = 96px)
```

**Rationale:** Design-brief specifies 96px vertical gaps between sections on desktop. Common mistake: using 92px (close but not exact).

**Tier 1 Rule:**
```
If desktop padding: 88-95px
  → Auto-fix to 96px (py-24)
  → Report: "Auto-fixed: 92px → 96px (desktop spacing spec)"
```

---

### Mobile Gap: 60px → 64px

**Issue:** Mobile section spacing below specification
**Frequency:** 0 occurrences (baseline)
**Tier Detected:** 1 (instant check)
**Auto-fix:** YES

**Fix Applied:**
```diff
- className="py-15" // 60px
+ className="py-16" // 64px (16*4 = 64px)
```

**Rationale:** Design-brief specifies 64px vertical gaps on mobile. Common mistake: using 60px or 56px.

**Tier 1 Rule:**
```
If mobile padding: 56-63px
  → Auto-fix to 64px (py-16)
  → Report: "Auto-fixed: 60px → 64px (mobile spacing spec)"
```

---

### Card Padding: 28px → 32px

**Issue:** Card internal padding slightly below spec
**Frequency:** 0 occurrences (baseline)
**Tier Detected:** 1 (instant check)
**Auto-fix:** YES

**Fix Applied:**
```diff
- className="p-7" // 28px
+ className="p-8" // 32px (8*4 = 32px)
```

**Rationale:** Cards should have 32px padding on desktop. Using 28px (p-7) is common mistake.

**Tier 1 Rule:**
```
If card padding: 24-31px on desktop
  → Auto-fix to 32px (p-8)
```

---

## Typography Fixes

### Line-Height: 1.5 → 1.6

**Issue:** Body text line-height below readability spec
**Frequency:** 0 occurrences (baseline)
**Tier Detected:** 1 (instant check)
**Auto-fix:** YES

**Fix Applied:**
```diff
- className="leading-[1.5]"
+ className="leading-[1.6]"
```

**Rationale:** Design-brief specifies line-height 1.6 for body text (Lexend). Common mistake: using 1.5 (too tight for comfortable reading).

**Tier 1 Rule:**
```
If body text line-height: 1.4-1.55
  → Auto-fix to 1.6
  → Report: "Auto-fixed: line-height 1.5 → 1.6 (body text spec)"
```

---

### Font-Weight: 400 → 600 (Buttons)

**Issue:** Button text too light
**Frequency:** 0 occurrences (baseline)
**Tier Detected:** 1 (instant check)
**Auto-fix:** YES

**Fix Applied:**
```diff
- className="font-normal" // 400
+ className="font-semibold" // 600
```

**Rationale:** Buttons should use semibold (600) for emphasis. Using regular (400) makes CTAs less prominent.

**Tier 1 Rule:**
```
If button text font-weight: 400 or 500
  → Auto-fix to 600 (font-semibold)
```

---

### Wrong Font Family

**Issue:** Lexend used for headers (should be EB Garamond)
**Frequency:** 0 occurrences (baseline)
**Tier Detected:** 1 (instant check)
**Auto-fix:** YES (critical)

**Fix Applied:**
```diff
- <h1 className="font-sans"> // Lexend
+ <h1 className="font-serif"> // EB Garamond
```

**Rationale:** Headers MUST use EB Garamond (serif). Lexend reserved for body text only.

**Tier 1 Rule:**
```
If <h1>, <h2>, <h3> uses font-sans
  → Auto-fix to font-serif
  → Report: "CRITICAL: Changed header to EB Garamond"
```

---

## Color Fixes

### Hex Code Uppercase: #30a46c → #30A46C

**Issue:** Hex codes lowercase (inconsistent)
**Frequency:** 0 occurrences (baseline)
**Tier Detected:** 1 (instant check)
**Auto-fix:** YES

**Fix Applied:**
```diff
- className="bg-[#30a46c]"
+ className="bg-[#30A46C]"
```

**Rationale:** Design-brief uses uppercase hex codes for consistency.

**Tier 1 Rule:**
```
If hex code lowercase
  → Auto-fix to uppercase
  → Silent fix (no report needed)
```

---

### Green Outside CTA

**Issue:** Green (#30A46C) used for non-action elements
**Frequency:** 0 occurrences (baseline)
**Tier Detected:** 1 (instant check)
**Auto-fix:** NO (requires decision)

**Flag:**
```
⚠️ Green (#30A46C) used outside CTA context
Line 143: <span className="text-[#30A46C]">

Design principle: Green reserved for action elements only
Suggest: Use #1A1A1A (primary) or #595959 (secondary)

Change to #1A1A1A? (y/n)
```

**Rationale:** Core design principle - green exclusively for CTAs to maintain clear action hierarchy.

**Tier 1 Rule:**
```
If #30A46C found on non-button element
  → Flag for user decision
  → Suggest approved alternative
  → Don't auto-fix (might be intentional accent)
```

---

## Layout Fixes

### Missing Max-Width

**Issue:** Content container no max-width (stretches too wide)
**Frequency:** 0 occurrences (baseline)
**Tier Detected:** 2 (visual check)
**Auto-fix:** NO (requires design decision)

**Flag:**
```
⚠️ Section content exceeds 1440px on large screens
Missing: max-w-[1440px] mx-auto

Add max-width constraint? (y/n)
```

**Rationale:** Design-brief specifies 1440px max container width for readability.

**Tier 2 Rule:**
```
If visual check shows content >1600px wide
  → Flag for max-width addition
  → Suggest: max-w-[1440px] mx-auto
```

---

## Accessibility Fixes

### Low Contrast: #808080 → #595959

**Issue:** Gray text fails WCAG AA (4.5:1 contrast)
**Frequency:** 0 occurrences (baseline)
**Tier Detected:** 1 (instant contrast check)
**Auto-fix:** YES (critical for accessibility)

**Fix Applied:**
```diff
- className="text-[#808080]" // Contrast: 3.8:1 (FAIL)
+ className="text-[#595959]" // Contrast: 8.1:1 (PASS)
```

**Rationale:** WCAG AA requires 4.5:1 minimum. #595959 is approved secondary text color.

**Tier 1 Rule:**
```
If contrast ratio < 4.5:1
  → Auto-fix to nearest approved color with sufficient contrast
  → Report: "ACCESSIBILITY FIX: Changed to #595959 (8.1:1 contrast)"
```

---

### Touch Target Too Small

**Issue:** Button height <44px (fails mobile touch target)
**Frequency:** 0 occurrences (baseline)
**Tier Detected:** 2 (visual check)
**Auto-fix:** NO (requires sizing decision)

**Flag:**
```
⚠️ Button touch target 40px height (< 44px minimum)
Line 143: py-2 (8px * 2 = 16px padding)

Increase to py-3 (12px * 2 = 24px)? (y/n)
```

**Rationale:** Mobile touch targets must be minimum 44x44px for accessibility.

**Tier 2 Rule:**
```
If button visual height < 44px
  → Flag for padding increase
  → Suggest minimum padding to reach 44px
```

---

## Auto-Fix Statistics

**Total Auto-Fixes Applied:** 0 (baseline)

**By Category:**
- Spacing: 0
- Typography: 0
- Color: 0
- Accessibility: 0

**Most Common Fixes:** (will populate over time)
1. [None yet]
2. [None yet]
3. [None yet]

**Auto-Fix Success Rate:** N/A (no data)

---

## Learning Patterns

**Frequency Thresholds:**

- **1-5 occurrences:** Watch pattern (might be one-off mistake)
- **6-15 occurrences:** Common mistake (document in design-brief)
- **16+ occurrences:** Critical pattern (add to Tier 1 auto-fix)

**When to Update Rules:**

If same issue occurs 3+ times:
  → Add to Tier 1 auto-fix rules
  → Document rationale in design-brief
  → Update common-fixes frequency

**Metrics to Track:**

- Total fixes applied
- Fixes by category
- Time saved (estimate 30s per auto-fix)
- Issues prevented (Tier 1 catches before Tier 3 needed)

---

This file grows smarter over time. Each fix teaches the system, making future validations faster.
