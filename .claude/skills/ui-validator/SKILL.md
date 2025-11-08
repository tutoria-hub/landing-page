---
name: ui-validator
description: Self-learning UI validation - instant checks that get smarter over time
version: 1.0.0
---

# UI Validator

**3-tier self-learning workflow for pixel-perfect UI validation.**

Auto-invokes when:
- User edits `app/page.tsx` or design files
- User says: "check ui", "validate design", "does this look right?"
- User runs: `/ui` command

## How It Works

```
Tier 1: Instant Validation (<1s)
  → Check spacing, typography, colors against design-brief
  → 95% of checks pass here (after learning phase)
  ↓
Tier 2: Screenshot Validation (2-3s)
  → Chrome DevTools MCP captures changed section only
  → Visual pattern matching against approved designs
  ↓
Tier 3: Expert Critique (10-15s)
  → /design-agency full analysis with all breakpoints
  → Update design-brief with validated patterns
  → System learns for next time
```

## Phase 1: Detect What Changed

**Step 1: Identify the change**

Read the most recent edit or git diff:
- Which file was changed? (app/page.tsx, globals.css, components/*)
- Which section? (hero, video-demo, features, testimonials, etc.)
- What changed? (spacing, color, typography, layout, new component)

**Step 2: Extract values**

Parse the changed code for:
- **Spacing**: padding, margin, gap values (look for px, rem values)
- **Typography**: font-size, font-family, line-height, font-weight
- **Colors**: hex codes, rgb values, CSS custom properties
- **Layout**: grid, flex, positioning changes

**Step 3: Determine validation strategy**

```
Small change (1-3 lines)?
  → Tier 1 only (instant validation)

Medium change (4-10 lines)?
  → Tier 1 → Tier 2 if uncertain

Large change (10+ lines) or new section?
  → All tiers (comprehensive validation)
```

## Phase 2: Tier 1 - Instant Validation (<1 second)

**Reference:** `references/tier1-checklist.md`

Run these checks against design-brief specs:

### Spacing Validation

1. Read spacing values from changed code
2. Compare against design-brief approved spacing scale:
   - Desktop vertical gaps: 96px
   - Mobile vertical gaps: 64px
   - Card padding: 32px desktop, 24px mobile
   - Section padding: 48px desktop, 24px mobile

**Auto-fix logic:**
- Off by 4px? → Auto-fix to nearest approved value
- Off by 8px? → Flag for review (might be intentional)
- Off by 16px+? → Tier 2 validation (major difference)

### Typography Validation

1. Read font values from changed code
2. Compare against design-brief typography scale:
   - Hero: EB Garamond 80px desktop, 48px mobile, line-height 1.05
   - Section headers: EB Garamond 48px desktop, 32px mobile, line-height 1.2
   - Body: Lexend 18px, line-height 1.6
   - Small: Lexend 16px, line-height 1.6

**Validation rules:**
- Wrong font-family? → Flag immediately (critical error)
- Size not in scale? → Suggest nearest approved size
- Line-height off? → Auto-fix if within 0.1 of approved

### Color Validation

1. Extract hex codes from changed code
2. Compare against design-brief color system:
   - Primary action: #30A46C (green)
   - Text primary: #1A1A1A
   - Text secondary: #595959
   - Background white: #FFFFFF
   - Background cream: #F7F5ED

**Critical checks:**
- Green (#30A46C) used outside CTA? → Flag (violates design principle)
- New color not in palette? → Flag for design-agency review
- Contrast ratio < 4.5:1? → Flag (accessibility violation)

### Pattern Matching

1. Search `knowledge/validated-patterns.md` for similar patterns
2. Check if current change matches approved pattern
3. If exact match → instant approval
4. If close match → auto-fix to approved pattern
5. If no match → proceed to Tier 2

**Result Options:**

✅ **Pass** → Report success, stop validation
```
✅ UI Validation Passed
- Spacing: 96px vertical gap (desktop) ✓
- Typography: EB Garamond 48px, line-height 1.2 ✓
- Color: #1A1A1A (text-primary) ✓
- Pattern: Matches "section-header" approved pattern ✓
```

⚠️ **Auto-fix** → Apply fix, report what changed, stop validation
```
⚠️ Auto-Fixed 2 Issues
- Line 143: Changed padding from 92px → 96px (design-brief spec)
- Line 156: Changed line-height from 1.5 → 1.6 (typography scale)

Changes applied automatically. Review if intentional deviation needed.
```

❓ **Uncertain** → Proceed to Tier 2
```
❓ Uncertain - Proceeding to Screenshot Validation
- New spacing pattern detected (88px gap)
- Not in approved spacing scale
- Taking screenshot to validate visually...
```

## Phase 3: Tier 2 - Screenshot Validation (2-3 seconds)

**Reference:** `references/tier2-patterns.md`

**Only runs if Tier 1 uncertain or flagged for visual check**

### Smart Screenshot Strategy

1. **Determine what to capture:**
   - Hero changed? → Screenshot hero section only (0-100vh)
   - Features changed? → Screenshot features section only
   - Multiple sections? → Screenshot entire page

2. **Single breakpoint first:**
   - Start with desktop 1440x900 (most common)
   - Only capture mobile/tablet if Tier 3 triggered

3. **Use Chrome DevTools MCP:**
   ```
   Tool: mcp__chrome-devtools__navigate_page
   URL: http://localhost:3000

   Tool: mcp__chrome-devtools__take_screenshot
   Viewport: 1440x900
   FullPage: false (section only if possible)
   ```

### Visual Pattern Analysis

Compare screenshot against `knowledge/validated-patterns.md`:

**Spacing Check:**
- Does vertical rhythm look consistent?
- Are margins/padding visually balanced?
- Does whitespace create proper breathing room?

**Typography Check:**
- Does font size hierarchy look correct?
- Is line-height creating proper rhythm?
- Do headlines have appropriate visual weight?

**Layout Check:**
- Does grid alignment look correct?
- Are elements properly centered/aligned?
- Does responsive behavior look natural?

**Color Check:**
- Is green reserved for CTAs only?
- Does background alternation (white/cream) work?
- Do colors create proper visual hierarchy?

**Result Options:**

✅ **Visual Pass** → Report success, stop validation
```
✅ Screenshot Validation Passed
- Desktop 1440px: Spacing rhythm consistent ✓
- Visual hierarchy matches approved patterns ✓
- No issues detected

Proceeding without expert review.
```

⚠️ **Minor Issues** → Report specific problems with line numbers
```
⚠️ Minor Issues Detected
- Line 143: Vertical gap appears smaller than 96px spec
- Line 187: Text color appears lighter than #595959

Fix these issues? (y/n)
```

❓ **Novel Pattern** → Proceed to Tier 3
```
❓ Novel Pattern Detected - Expert Review Required
- New hero layout variation not in validated patterns
- Visual hierarchy unclear (needs design-agency critique)
- Proceeding to full expert analysis...
```

## Phase 4: Tier 3 - Expert Critique (10-15 seconds)

**Reference:** `references/tier3-triggers.md`

**Only runs for novel patterns or complex changes**

### Full Design-Agency Analysis

1. **Capture all breakpoints:**
   ```
   Tool: mcp__chrome-devtools__take_screenshot
   Viewports:
   - Mobile: 375x667
   - Tablet: 768x1024
   - Desktop: 1440x900
   ```

2. **Invoke /design-agency with context:**
   ```
   /design-agency @screenshots @design-brief/DESIGN_BRIEF.md

   Context: [Section changed] section modified
   Changes: [List specific changes]
   Uncertain about: [Specific concerns]

   Validate against design brief and provide actionable feedback.
   ```

3. **Get expert critique:**
   - Full analysis from design-agency
   - Actionable feedback with specific line numbers
   - Validation against design principles

### Critical: Update Design Brief (Learning Phase)

**If design-agency approves new pattern:**

1. Add to `knowledge/validated-patterns.md`:
   ```markdown
   ### [Pattern Name]
   **Approved:** [Date]
   **Context:** [Where used]
   **Specs:**
   - Spacing: [values]
   - Typography: [values]
   - Colors: [values]

   **Code Example:**
   ```tsx
   [Approved code snippet]
   ```
   ```

2. Update `design-brief/DESIGN_BRIEF.md` metrics:
   - Increment "Checks Performed"
   - Increment "Patterns Learned"
   - Add to "Validated Patterns" list

3. Add to `knowledge/common-fixes.md` if fix applied:
   ```markdown
   ### [Issue Description]
   **Frequency:** 1 occurrence
   **Fix:** [What was changed]
   **Auto-fix:** Yes/No
   ```

**If design-agency rejects pattern:**

1. Add to design-brief "Anti-Patterns" section
2. Document why it was rejected
3. Suggest approved alternative

**Result:**
```
📋 Expert Critique Complete

Design-Agency Analysis:
[Full critique from design-agency]

Actions Taken:
✅ Added "hero-two-column-editorial" to validated patterns
✅ Updated design-brief metrics (Checks: 12 → 13, Patterns: 5 → 6)
✅ Pattern will auto-validate on future edits (Tier 1)

Next similar change will pass in <1 second.
```

## Phase 5: Report & Learn

### Concise User Feedback

**Tier 1 Success (instant):**
```
✅ UI Validation Passed (<1s)
Spacing ✓ | Typography ✓ | Colors ✓ | Pattern Match ✓
```

**Tier 2 Screenshot (quick):**
```
⚠️ Screenshot Validation (2.3s)
Issue detected at line 143: Spacing off by 8px
Fix: Change padding from 88px → 96px? (y/n)
```

**Tier 3 Critique (comprehensive):**
```
📋 Expert Analysis Complete (12.4s)

Issues Found: 3
1. Line 143: Vertical gap 88px (should be 96px)
2. Line 187: Color #595959 used incorrectly
3. Line 203: Line-height 1.5 (should be 1.6)

✅ Pattern "features-bullet-list" validated and learned
Next edit of this pattern: instant validation (<1s)

Apply all fixes? (y/n)
```

### Silent Learning (Updates Metrics)

After each validation, update `design-brief/DESIGN_BRIEF.md`:

```markdown
## Validation Metrics

**Total Checks:** [increment]
**Tier 1 Success Rate:** [calculate %]
**Tier 2 Invocations:** [increment if tier 2]
**Tier 3 Invocations:** [increment if tier 3]
**Average Validation Time:** [calculate average]
**Patterns Learned:** [increment if new pattern]
**Auto-Fixes Applied:** [increment if auto-fix]
```

Store validation history in `knowledge/validation-history.json`:
```json
{
  "timestamp": "2025-11-08T10:30:00Z",
  "file": "app/page.tsx",
  "section": "hero",
  "tier_reached": 1,
  "validation_time_ms": 850,
  "result": "pass",
  "auto_fixes": 0
}
```

## Auto-Invocation Triggers

**File Save Detection:**
- Watch: `app/page.tsx`, `app/globals.css`, `components/**/*.tsx`
- On save → auto-run validation
- Report results inline

**Natural Language:**
- "check ui" → Run full validation
- "validate design" → Run full validation
- "does this look right?" → Run with screenshot (Tier 2 minimum)
- "is my spacing correct?" → Tier 1 spacing check only

**Explicit Command:**
- `/ui` → Run full validation
- `/ui quick` → Tier 1 only (instant)
- `/ui full` → Force Tier 3 (all breakpoints + critique)

## Performance Targets

**Week 1 (Learning Phase):**
- Tier 1: 50% success rate
- Tier 2: 30% of validations
- Tier 3: 20% of validations
- Average time: ~6 seconds

**Week 4 (Mature Phase):**
- Tier 1: 95% success rate
- Tier 2: 4% of validations
- Tier 3: 1% of validations
- Average time: ~1.2 seconds

**Week 12 (Expert Phase):**
- Tier 1: 99% success rate
- Tier 2: 0.5% of validations
- Tier 3: 0.5% of validations
- Average time: <1 second (feels instant)

## Integration Points

**Design Brief:** Source of truth for all validation rules
**Chrome DevTools MCP:** Screenshot capture (Tier 2)
**/design-agency:** Expert critique (Tier 3)
**HMR:** 200ms hot reload + <1s validation = 1.2s total feedback

## Files Structure

```
.claude/skills/ui-validator/
├── SKILL.md (this file)
├── references/
│   ├── tier1-checklist.md    # Instant validation rules
│   ├── tier2-patterns.md     # Screenshot matching patterns
│   └── tier3-triggers.md     # When to invoke design-agency
└── knowledge/
    ├── validated-patterns.md  # Approved patterns (grows over time)
    ├── common-fixes.md        # Auto-fix database
    └── validation-history.json # Performance tracking
```

## Why This Works

**Self-Reinforcing:**
- Each Tier 3 critique makes Tier 1 smarter
- Validated patterns accumulate over time
- Common fixes become auto-fixes
- Gets faster with every use

**Context-Efficient:**
- Only screenshots when uncertain (not every check)
- Only single section (not full page)
- Only single breakpoint unless Tier 3
- Minimal MCP tool usage

**Feels Fast:**
- 95% of checks complete in <1 second
- No manual screenshot workflow
- Feedback appears instantly after save
- Developer stays in flow state

**High Quality:**
- Design-agency ensures correctness
- Design-brief maintains consistency
- Auto-fixes prevent common mistakes
- Pattern library prevents rework
