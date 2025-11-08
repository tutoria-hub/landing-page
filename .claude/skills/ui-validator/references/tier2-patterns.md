# Tier 2: Screenshot Validation Patterns

**Goal:** Visually validate uncertain patterns in 2-3 seconds using Chrome DevTools MCP.

## When Tier 2 Triggers

Tier 1 proceeds to Tier 2 when:
- Novel spacing pattern (not in approved scale)
- New layout variation (grid/flex not seen before)
- Uncertain visual hierarchy
- Complex responsive changes
- User explicitly requests screenshot: "does this look right?"

## Smart Screenshot Strategy

### Section-Specific Capture

**Don't screenshot entire page** - only capture what changed:

```tsx
// Hero section changed
Section height: ~85vh
Capture: 0 to 1200px vertical
Viewport: 1440x900 (desktop)

// Features section changed
Section location: ~1200px from top
Capture: 1200px to 2400px vertical
Viewport: 1440x900 (desktop)

// Full page changed
Multiple sections modified
Capture: Full page scroll
Viewport: 1440x900 (desktop first)
```

### Single Breakpoint First

**Desktop 1440x900 is default:**
- Most common viewport
- Easier to see spacing details
- Typography more readable
- Fastest capture (less scrolling)

Only capture mobile/tablet if:
- Responsive-specific change detected
- Tier 3 triggered (full analysis)
- User explicitly requests: "check mobile"

### Chrome DevTools MCP Usage

**Navigation:**
```
Tool: mcp__chrome-devtools__navigate_page
Parameters:
  url: "http://localhost:3000"
  waitUntil: "networkidle" (ensure HMR complete)
```

**Screenshot Capture:**
```
Tool: mcp__chrome-devtools__take_screenshot
Parameters:
  fullPage: false (section only)
  clip: {
    x: 0,
    y: [section_start],
    width: 1440,
    height: [section_height]
  }
```

## Visual Pattern Analysis

### Spacing Visual Check

**What to look for in screenshot:**

1. **Vertical Rhythm:**
   - Count pixels between elements (use mental ruler)
   - Check: 96px gaps feel spacious but not excessive?
   - Check: 64px mobile gaps maintain breathing room?
   - Flag if: Sections feel cramped or too loose

2. **Padding Balance:**
   - Internal vs external spacing ratio
   - Check: Card padding proportional to card size?
   - Check: Button padding makes text readable?
   - Flag if: Elements touch edges or float awkwardly

3. **Grid Alignment:**
   - Visual grid overlay (mental)
   - Check: Elements align to consistent columns?
   - Check: Gaps between columns equal?
   - Flag if: Misalignment visible

**Pattern matching:**
```
Compare screenshot against:
  - validated-patterns.md examples
  - Previous approved sections
  - Design-brief spacing system

Visual similarity score:
  90-100%: Pass (matches approved)
  70-89%: Minor tweaks suggested
  <70%: Proceed to Tier 3
```

### Typography Visual Check

**What to look for:**

1. **Size Hierarchy:**
   - Headlines visually dominant?
   - Body text comfortable to read?
   - Size ratios feel harmonious (1.25-1.5 scale)?

2. **Line Height Rhythm:**
   - Text blocks have proper vertical rhythm?
   - Headlines tight (1.05-1.2)?
   - Body spacious (1.6)?
   - No cramped or loose text?

3. **Font Pairing:**
   - EB Garamond + Lexend contrast clear?
   - Serif headers vs sans body readable?
   - Weight variation creates hierarchy?

**Red flags:**
- Headlines blend with body text (poor hierarchy)
- Line-height too tight (cramped reading)
- Font sizes too similar (no scale)
- Mixed fonts incorrectly (Lexend in headlines)

### Layout Visual Check

**Grid System:**
- Two-column layouts balanced? (1.2fr 0.8fr ratio)
- Single-column mobile stacks naturally?
- Asymmetric grids feel intentional (not broken)?

**Alignment:**
- Text left-aligned consistently?
- Centers aligned to grid center?
- Images/cards align with text?

**Responsive Behavior:**
- Elements reflow gracefully?
- No awkward gaps at breakpoints?
- Touch targets adequate (44x44px visual)?

### Color Visual Check

**Green Usage:**
- Count green elements in screenshot
- Check: Only CTAs use green?
- Flag if: Green used for decoration, icons, borders (not CTAs)

**Background Alternation:**
- White → Cream → White pattern consistent?
- Cream subtle (not overwhelming)?
- Transitions clean (no visual jank)?

**Contrast:**
- Text readable against backgrounds?
- Subtle grays visible (#595959)?
- Links/buttons stand out?

## Visual Comparison Patterns

### Approved Visual Patterns

Store reference screenshots in `knowledge/validated-patterns.md`:

**Hero Section:**
- Two-column editorial (1.2fr 0.8fr)
- Left: Headline + CTA
- Right: Harvard stat card
- Spacing: 96px vertical, 48px column gap

**Features Section:**
- Two-column (1.2fr 0.8fr)
- Left: Bullet list with green dots
- Right: Flashcard demo
- Spacing: 32px between bullets

**Testimonials:**
- Asymmetric grid (1.5fr 1fr)
- Featured left (green border)
- Supporting right (gray border)
- Spacing: 48px gaps

### Pattern Matching Algorithm

```
1. Capture current screenshot
2. Load reference screenshot from validated-patterns.md
3. Visual diff (manual comparison):
   - Spacing similar? (within 10% variance)
   - Layout structure same? (grid ratios match)
   - Typography hierarchy similar? (size ratios)
   - Color usage consistent? (green CTAs only)

4. Similarity score:
   All 4 checks pass? → 100% match (Tier 2 pass)
   3/4 checks pass? → 75% match (suggest fixes)
   2/4 checks pass? → 50% match (Tier 3 needed)
   <2 checks pass? → Novel pattern (Tier 3 required)
```

## Quick Visual Validation

**30-second checklist:**

1. Does spacing look balanced? (not cramped/loose)
2. Does typography create clear hierarchy? (headlines stand out)
3. Does layout follow grid system? (aligned, proportional)
4. Does color usage match design brief? (green CTAs only)
5. Does it match an approved pattern? (check validated-patterns.md)

If all YES → Tier 2 pass
If 1-2 NO → Report specific issues
If 3+ NO → Tier 3 required

## Performance Optimization

**Target: 2-3 seconds for Tier 2**

Breakdown:
- Navigate to localhost: 500ms (HMR already loaded)
- Wait for network idle: 300ms
- Capture screenshot: 800ms
- Visual analysis: 1000ms
- Report generation: 400ms

**Total: ~3000ms = 3 seconds** ✓

Optimizations:
- Keep Chrome instance warm (don't restart)
- Use isolated mode (faster than full browser)
- Headless mode (no rendering overhead)
- Clip to section (smaller image = faster)

## When to Proceed to Tier 3

Tier 2 proceeds to Tier 3 when:
- Visual pattern <70% match
- Novel layout detected
- Complex responsive behavior
- User requests full critique
- Multiple issues detected (3+)

**Proceed with all breakpoints:**
- Mobile 375x667
- Tablet 768x1024
- Desktop 1440x900

Pass screenshots to /design-agency for expert analysis.
