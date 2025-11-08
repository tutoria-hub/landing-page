# Tier 1: Instant Validation Checklist

**Goal:** Validate 95% of changes in <1 second using design-brief specs.

## Spacing Validation Rules

### Approved Spacing Scale

**Vertical Gaps (Section Spacing):**
- Desktop: 96px between sections
- Mobile: 64px between sections
- Tolerance: ±4px auto-fix, ±8px flag for review

**Card/Component Padding:**
- Desktop: 32-48px internal padding
- Mobile: 24-32px internal padding
- Tolerance: ±4px auto-fix

**Grid Gaps:**
- Desktop: 48-64px between columns
- Mobile: 24-32px between columns
- Tablet: 32-48px between columns

**Button Padding:**
- Desktop: 20px vertical, 48px horizontal
- Mobile: 16px vertical, 32px horizontal

### Auto-Fix Logic

```
Difference ≤ 4px?
  → Auto-fix to nearest approved value
  → Report: "Auto-fixed: 92px → 96px"

Difference 5-8px?
  → Flag for user decision
  → Ask: "Change 88px → 96px? (y/n)"

Difference > 8px?
  → Proceed to Tier 2 (screenshot validation)
  → Reason: Might be intentional new pattern
```

## Typography Validation Rules

### Approved Typography Scale

**EB Garamond (Headers):**
- Hero: 80px desktop / 48px mobile, line-height 1.05, weight 700
- Section: 48px desktop / 32px mobile, line-height 1.2, weight 700
- Tracking: -0.01em (tighter for display serif)

**Lexend (Body):**
- Large: 20px, line-height 1.6, weight 400
- Standard: 18px, line-height 1.6, weight 400
- Small: 16px, line-height 1.6, weight 400
- Button: 18px desktop / 16px mobile, weight 600

**Citation/Italic:**
- Size: 16px
- Style: italic
- Color: #595959
- Line-height: 1.6

### Validation Checks

**Font Family Check:**
```
Headers using EB Garamond?
  → Critical: Must use 'EB Garamond', serif
  → Auto-fix: font-family: 'EB Garamond', serif

Body using Lexend?
  → Critical: Must use 'Lexend', sans-serif
  → Auto-fix: font-family: 'Lexend', sans-serif
```

**Font Size Check:**
```
Size in approved scale? (48, 80, 18, 20, 16, etc.)
  → Pass: Size matches scale
  → Auto-fix: Round to nearest approved size if within 2px
  → Flag: New size not in scale (might need Tier 3)
```

**Line Height Check:**
```
Line-height matches spec?
  → Headers: 1.05 (hero) or 1.2 (section)
  → Body: 1.6
  → Tolerance: ±0.1 auto-fix
  → Example: 1.5 → 1.6 (body text)
```

**Font Weight Check:**
```
Weight matches spec?
  → Headers: 700 (bold)
  → Body: 400 (regular)
  → Buttons: 600 (semibold)
  → Auto-fix if wrong
```

## Color Validation Rules

### Approved Color Palette

**Primary Action:**
- Color: #30A46C (green)
- Hover: #2A9461 (darker green)
- Usage: CTAs, action buttons, accent highlights ONLY

**Text:**
- Primary: #1A1A1A (near-black)
- Secondary: #595959 (gray)

**Backgrounds:**
- White: #FFFFFF
- Cream: #F7F5ED

### Critical Color Checks

**Green Usage Validation:**
```
Is #30A46C used?
  → Check context: Is this a CTA button/link/action?
  → If YES: Pass ✓
  → If NO: Flag ⚠️ "Green reserved for CTAs only (design principle)"
  → Suggest: Use #1A1A1A or #595959 for text
```

**New Color Detection:**
```
Color not in palette?
  → Flag: "New color #XXXXX not in design-brief"
  → Check contrast ratio (next check)
  → If contrast OK + justified: Proceed to Tier 3 for design-agency approval
  → If contrast fails: Block immediately
```

**Accessibility Contrast Check:**
```
Text on background contrast ≥ 4.5:1?
  → Calculate: (lighter + 0.05) / (darker + 0.05)
  → If PASS: Continue
  → If FAIL: Block with error
    "Contrast ratio 3.2:1 fails WCAG AA (4.5:1 required)"
    "Suggest: Use #1A1A1A (contrast 18:1) or #595959 (contrast 8:1)"
```

**Color Hex Format:**
```
Uppercase hex codes? (#30A46C not #30a46c)
  → Auto-fix to uppercase for consistency
```

## Pattern Matching Rules

### How Pattern Matching Works

1. **Extract current pattern:**
   - Component type: section, card, button, text block
   - Properties: spacing, typography, colors, layout
   - Structure: grid, flex, positioning

2. **Search validated-patterns.md:**
   - Look for exact matches
   - Look for similar patterns (80%+ match)
   - Check if pattern is explicitly approved

3. **Match scoring:**
   ```
   100% match? → Instant approval, Tier 1 pass
   80-99% match? → Auto-fix differences to approved pattern
   50-79% match? → Suggest approved pattern, ask user
   <50% match? → Novel pattern, proceed to Tier 2/3
   ```

### Example Pattern Matching

**Scenario: User edits hero section spacing**

```tsx
// Current code
<section className="py-24 lg:py-32">

// Validated pattern: "hero-section"
Padding: 96px desktop, 64px mobile
Tailwind: py-16 lg:py-24 (16*4=64px, 24*4=96px)

// Check: py-24 = 96px (24*4), lg:py-32 = 128px (32*4)
// Desktop: 128px vs 96px spec = 32px difference (>8px)
// Flag: "Desktop padding 128px exceeds spec 96px by 32px"
// Suggest: "Change lg:py-32 → lg:py-24 to match approved pattern?"
```

## Quick Validation Algorithm

```
For each changed line:
  1. Parse CSS/Tailwind classes
  2. Extract spacing/typography/color values
  3. Compare against design-brief specs
  4. Apply auto-fix if within tolerance
  5. Flag if outside tolerance
  6. Match against validated patterns
  7. If novel → proceed to Tier 2
  8. If approved → pass Tier 1
```

## Performance Targets

**Target: <1 second for Tier 1 validation**

Optimizations:
- Cache design-brief specs in memory
- Precompile regex patterns for parsing
- Use fast string matching (not full AST parsing)
- Only parse changed lines (not entire file)

Expected breakdown:
- Parse changes: 200ms
- Check spacing: 150ms
- Check typography: 150ms
- Check colors: 150ms
- Pattern matching: 200ms
- Report generation: 150ms

**Total: ~1000ms = 1 second** ✓

## Common Auto-Fixes

Track these in `knowledge/common-fixes.md`:

**Top Auto-Fixes:**
1. Line-height 1.5 → 1.6 (body text standard)
2. Padding 92px → 96px (section spacing)
3. Font-weight 400 → 600 (button text)
4. Color #30a46c → #30A46C (uppercase hex)
5. Gap 60px → 64px (grid spacing)

Each auto-fix increments counter to track most common issues.
