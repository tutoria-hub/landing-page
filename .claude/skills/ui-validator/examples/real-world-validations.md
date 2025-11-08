# Real-World Validation Examples

**Common scenarios and how ui-validator handles them.**

---

## Example 1: Spacing Off by 4px (Auto-Fix)

### Scenario

Developer adds new section with slightly wrong padding:

```tsx
<section className="py-23 lg:py-23">
  {/* Mobile: 92px, Desktop: 92px */}
```

### Expected

Design-brief spec: 64px mobile, 96px desktop

### Validation Flow

**Tier 1 runs:**
1. Detects spacing: 92px both mobile and desktop
2. Compares vs spec: 64px mobile ❌, 96px desktop ❌
3. Difference: 28px mobile (>8px), 4px desktop (<4px)
4. **Auto-fix desktop** (within tolerance): 92px → 96px
5. **Flag mobile** (>8px difference): Needs user decision

**Output:**
```
⚠️ Auto-Fixed + Issue Flagged (<1s)

Auto-fixed:
- Line 143: Desktop padding 92px → 96px (py-23 → py-24)

Manual fix needed:
- Line 143: Mobile padding 92px should be 64px (py-16)
  Change py-23 → py-16 lg:py-24? (y/n)
```

**User:** Types `y`

**Result:**
```diff
- <section className="py-23 lg:py-23">
+ <section className="py-16 lg:py-24">
```

✅ **Validation complete in <1s**

---

## Example 2: Wrong Font Family (Critical Fix)

### Scenario

Header uses wrong font:

```tsx
<h2 className="font-sans text-[48px]">
  {/* Lexend instead of EB Garamond */}
```

### Expected

Headers must use EB Garamond (design-brief rule)

### Validation Flow

**Tier 1 runs:**
1. Detects `<h2>` with `font-sans`
2. Rule: Headers MUST use `font-serif` (EB Garamond)
3. **Critical violation** - auto-fix immediately

**Output:**
```
⚠️ CRITICAL FIX APPLIED (<1s)

Line 187: Header font changed Lexend → EB Garamond
- Changed: font-sans → font-serif

Rationale: Headers must use EB Garamond per design-brief
```

**Result:**
```diff
- <h2 className="font-sans text-[48px]">
+ <h2 className="font-serif text-[48px]">
```

✅ **Auto-fixed, no user input needed**

---

## Example 3: Novel Pattern (Full Learning Cycle)

### Scenario

Developer creates new three-column grid:

```tsx
<div className="grid lg:grid-cols-3 gap-8">
  <div>Feature 1</div>
  <div>Feature 2</div>
  <div>Feature 3</div>
</div>
```

### Expected

Not in validated patterns - needs validation

### Validation Flow

**Tier 1 runs:**
1. Parses grid: 3 columns, 32px gap
2. Searches `validated-patterns.md`: No "three-column-grid" pattern
3. **Pattern not found** → Proceed to Tier 2

**Tier 2 runs:**
1. Chrome DevTools MCP navigates to localhost:3000
2. Screenshots section (desktop 1440px)
3. Visual analysis:
   - Spacing looks balanced ✓
   - Grid proportions equal ✓
   - But pattern similarity <70% vs approved patterns
4. **Novel layout detected** → Proceed to Tier 3

**Tier 3 runs:**
1. Captures all breakpoints (mobile, tablet, desktop)
2. Invokes `/design-agency` with context:

```
Context: New three-column features grid
Changes: grid-cols-3 with 32px gaps
Uncertain about: Is three-column appropriate? Should it stack to single column on mobile?

Validate against design-brief.
```

3. Design-agency responds:

```
# Design Critique

## Approval: YES (with revision)

**Three-column grid approved** for features section.

**Required changes:**
1. Line 143: Gap should be 48px (not 32px) for desktop breathing room
2. Add responsive: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
3. Mobile stack important for readability

**Rationale:**
- Three columns maintain scanability
- 48px gap creates proper rhythm (matches design system)
- Progressive disclosure (1 → 2 → 3 cols) respects mobile constraints
```

4. User applies fixes:

```diff
- <div className="grid lg:grid-cols-3 gap-8">
+ <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
```

5. System adds to `validated-patterns.md`:

```markdown
## Features: Three-Column Grid

**Approved:** 2025-11-08
**Context:** Feature list display
**Design-Agency Review:** Approved with responsive progression

### Specifications
**Layout:**
- Grid: 1 col mobile → 2 col tablet → 3 col desktop
- Gap: 24px mobile, 32px tablet, 48px desktop
```

6. Metrics updated:

```markdown
**Patterns Learned:** 5 → 6
**Tier 3 Invocations:** 0 → 1
**Last Pattern Added:** Three-Column Grid (2025-11-08)
```

**Output:**
```
📋 Expert Critique Complete (14.2s)

Design-Agency approved new pattern:
✅ "features-three-column-grid" validated and saved

Changes applied:
- Line 143: Gap 32px → 48px (design system rhythm)
- Line 143: Added responsive: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

Next use of three-column grid: instant validation (<1s)
```

✅ **Pattern learned - future three-column grids validate instantly**

---

## Example 4: Pattern Match (Instant Pass)

### Scenario

Developer uses previously validated pattern:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
  {/* Three-column grid from Example 3 */}
```

### Expected

Instant Tier 1 pass (pattern already validated)

### Validation Flow

**Tier 1 runs:**
1. Parses grid: 1 → 2 → 3 cols, 24px → 48px gaps
2. Searches `validated-patterns.md`: "three-column-grid" found ✓
3. Compares specs:
   - Columns: 1 → 2 → 3 ✓
   - Gap: 24px → 48px ✓
4. **100% match** → Instant pass

**Output:**
```
✅ UI Validation Passed (<1s)

Pattern Match: Three-Column Grid ✓
- Columns: 1 → 2 → 3 ✓
- Gap: 24px → 48px ✓
- Approved: 2025-11-08

No issues detected.
```

✅ **Validation complete in <1 second (learned from Example 3)**

---

## Example 5: Green Outside CTA (Flag, Don't Auto-Fix)

### Scenario

Developer uses green for decorative icon:

```tsx
<span className="text-[#30A46C]">★</span>
```

### Expected

Green reserved for CTAs only (design principle)

### Validation Flow

**Tier 1 runs:**
1. Detects `#30A46C` (green) usage
2. Checks context: `<span>` (not `<button>`, not CTA)
3. **Violates design principle** - but might be intentional
4. **Flag for decision** (don't auto-fix)

**Output:**
```
⚠️ Design Principle Violation (<1s)

Line 187: Green (#30A46C) used outside CTA context

Design-brief principle: "Green reserved for action elements only"

Current usage: <span className="text-[#30A46C]">
Context: Decorative icon (not CTA)

Suggested alternatives:
- #1A1A1A (primary text)
- #595959 (secondary text)

Change to #1A1A1A? (y/n/keep)
```

**User:** Types `y`

**Result:**
```diff
- <span className="text-[#30A46C]">★</span>
+ <span className="text-[#1A1A1A]">★</span>
```

✅ **Principle enforced, user maintains control**

---

## Example 6: Low Contrast (Accessibility Block)

### Scenario

Developer uses light gray text:

```tsx
<p className="text-[#808080]">
  Secondary text
</p>
```

### Expected

Contrast must be ≥4.5:1 (WCAG AA)

### Validation Flow

**Tier 1 runs:**
1. Detects color `#808080` on white background
2. Calculates contrast: 3.8:1
3. **FAILS accessibility** (< 4.5:1)
4. **Critical fix required** (auto-fix)

**Output:**
```
⚠️ ACCESSIBILITY FIX APPLIED (<1s)

Line 203: Contrast ratio 3.8:1 FAILS WCAG AA (4.5:1 required)

Auto-fixed: #808080 → #595959
New contrast: 8.1:1 (PASS ✓)

Rationale: #595959 is approved secondary text color with sufficient contrast
```

**Result:**
```diff
- <p className="text-[#808080]">
+ <p className="text-[#595959]">
```

✅ **Accessibility violation prevented automatically**

---

## Example 7: Complex Multi-Issue Section (Tier 2 → Tier 3)

### Scenario

Developer creates new testimonial card with multiple issues:

```tsx
<div className="p-6 rounded-lg border-[1px] border-[#30A46C]">
  <p className="font-sans text-[17px] leading-[1.5]">
    "Great product!"
  </p>
</div>
```

### Issues

1. Padding 24px (should be 32px desktop)
2. Border 1px (should be 2px)
3. Font size 17px (not in scale)
4. Line-height 1.5 (should be 1.6 for body)

### Validation Flow

**Tier 1 runs:**
1. Detects padding: 24px vs 32px spec (-8px, within flag threshold)
2. Detects border: 1px vs 2px spec (-1px, minor)
3. Detects font: 17px (not in approved scale: 16, 18, 20)
4. Detects line-height: 1.5 vs 1.6 spec (-0.1, within auto-fix)
5. **Multiple issues detected** → Some auto-fixable, some need review

**Tier 1 actions:**
- Auto-fix line-height: 1.5 → 1.6 ✓
- Auto-fix border: 1px → 2px ✓
- Flag padding: 24px → 32px? (ask user)
- Flag font: 17px not in scale (uncertain)

**Tier 2 triggered** (2+ flags):
1. Screenshot section
2. Visual check: Card looks slightly cramped
3. Font size 17px vs 18px almost imperceptible
4. **Uncertain pattern** → Proceed to Tier 3

**Tier 3 runs:**
1. Captures all breakpoints
2. Invokes design-agency

**Output:**
```
📋 Validation Complete (13.8s)

Auto-fixes applied:
✅ Line 203: Line-height 1.5 → 1.6 (body text spec)
✅ Line 143: Border 1px → 2px (design system)

Design-Agency review:
⚠️ Padding should be 32px (24px too cramped for desktop)
⚠️ Font size 17px → 18px (use approved scale)

Apply remaining fixes? (y/n)
```

**User:** Types `y`

**Result:**
```diff
- <div className="p-6 rounded-lg border-[1px] border-[#30A46C]">
-   <p className="font-sans text-[17px] leading-[1.5]">
+ <div className="p-8 rounded-lg border-[2px] border-[#30A46C]">
+   <p className="font-sans text-[18px] leading-[1.6]">
```

✅ **Complex validation handled across all tiers**

---

## Summary of Examples

| Example | Issue | Tier Reached | Time | Outcome |
|---------|-------|--------------|------|---------|
| 1 | Spacing off 4px | 1 | <1s | Auto-fixed |
| 2 | Wrong font | 1 | <1s | Auto-fixed (critical) |
| 3 | Novel pattern | 3 | 14s | Learned pattern |
| 4 | Known pattern | 1 | <1s | Instant pass |
| 5 | Green misuse | 1 | <1s | User decision |
| 6 | Low contrast | 1 | <1s | Auto-fixed (accessibility) |
| 7 | Multiple issues | 3 | 14s | Comprehensive fix |

**Key Takeaways:**
- Simple issues: Tier 1 (<1s)
- Auto-fixes: No user input needed (unless critical decision)
- Novel patterns: Tier 3 learning (once), then Tier 1 forever
- Gets faster: Example 3 → Example 4 (14s → 1s for same pattern)
