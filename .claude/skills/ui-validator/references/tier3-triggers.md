# Tier 3: Expert Critique Triggers

**Goal:** Invoke /design-agency for comprehensive analysis when novel patterns or complex changes require expert validation.

## When Tier 3 Triggers

### Automatic Triggers (from Tier 2)

1. **Novel Pattern Detected**
   - Pattern similarity <70% vs validated patterns
   - New layout structure not seen before
   - Experimental design variation

2. **Multiple Issues**
   - 3+ spacing violations detected
   - Typography hierarchy concerns
   - Color usage violations (green outside CTAs)
   - Accessibility failures (contrast <4.5:1)

3. **Complex Changes**
   - 15+ lines changed in single section
   - New section created from scratch
   - Major refactor (layout restructure)

4. **Responsive Uncertainty**
   - Mobile/tablet behavior unclear
   - Breakpoint transitions awkward
   - Touch target concerns

### Manual Triggers (User Request)

- User says: "get full critique"
- User runs: `/ui full`
- User asks: "what does design-agency think?"
- User uncertain: "I'm not sure about this layout"

## Tier 3 Execution

### Step 1: Capture All Breakpoints

Use Chrome DevTools MCP to capture comprehensive screenshots:

**Mobile (375x667):**
```
Tool: mcp__chrome-devtools__take_screenshot
Parameters:
  viewport: { width: 375, height: 667 }
  fullPage: true (full mobile scroll)
  deviceScaleFactor: 2 (retina)
```

**Tablet (768x1024):**
```
Tool: mcp__chrome-devtools__take_screenshot
Parameters:
  viewport: { width: 768, height: 1024 }
  fullPage: true
  deviceScaleFactor: 2
```

**Desktop (1440x900):**
```
Tool: mcp__chrome-devtools__take_screenshot
Parameters:
  viewport: { width: 1440, height: 900 }
  fullPage: true
  deviceScaleFactor: 1
```

**Save screenshots temporarily** for /design-agency analysis.

### Step 2: Prepare Context for Design-Agency

Build comprehensive context:

**What changed:**
```
File: app/page.tsx
Section: [hero/features/etc]
Lines changed: [143-187]
Type: [spacing/layout/typography/color/new-component]

Code diff:
[Show before/after code snippets]
```

**Current concerns:**
```
Tier 1 flagged:
- Spacing: 88px gap (not in approved scale)
- Typography: New font-size 28px (not in scale)

Tier 2 flagged:
- Visual hierarchy unclear
- Pattern match: 65% similarity to approved pattern

Specific questions:
- Is this spacing variation justified?
- Does the new layout serve the design principle?
```

**Design-brief context:**
```
Reference sections:
- Typography Scale (DESIGN_BRIEF.md:64-106)
- Spacing System (DESIGN_BRIEF.md:24-40)
- Key Design Decisions (DESIGN_BRIEF.md:243-270)

Core Principle: "Trust through clarity, warmth through restraint"
```

### Step 3: Invoke /design-agency

**Command structure:**
```bash
/design-agency @screenshots @design-brief/DESIGN_BRIEF.md

Context:
[Section] section modified with [type] changes.

Changes made:
- [Specific change 1]
- [Specific change 2]
- [Specific change 3]

Validation concerns:
- [Tier 1 flags]
- [Tier 2 flags]

Questions for expert review:
1. Does this layout align with "trust through clarity" principle?
2. Is the spacing variation justified or should we use 96px spec?
3. Does typography hierarchy create proper visual weight?
4. Should this become an approved pattern?

Provide actionable feedback with specific line numbers.
```

**Design-agency will analyze:**
- Visual hierarchy across all breakpoints
- Purposeful restraint (what can be removed?)
- Material truth (honest to web medium?)
- Typography & spacing rhythm
- Accessibility compliance
- Execution speed (can dev implement?)

### Step 4: Process Design-Agency Response

**If approved (new validated pattern):**

1. **Add to validated-patterns.md:**
   ```markdown
   ## [Pattern Name]

   **Approved:** 2025-11-08
   **Context:** [Where used, why needed]
   **Design-Agency Review:** Approved with notes

   ### Specifications

   **Spacing:**
   - Desktop: [values]
   - Mobile: [values]

   **Typography:**
   - Font: [values]
   - Size: [values]
   - Line-height: [values]

   **Colors:**
   - [color usage]

   **Layout:**
   - [grid/flex structure]

   ### Code Example

   ```tsx
   [Approved code snippet with exact implementation]
   ```

   ### Design Rationale

   [Why this pattern was approved]
   [What design principle it serves]

   ### Usage Guidelines

   Use when: [specific context]
   Don't use when: [anti-patterns]
   ```

2. **Update design-brief metrics:**
   ```markdown
   **Patterns Learned:** [increment]
   **Tier 3 Invocations:** [increment]
   **Last Pattern Added:** [pattern name] (2025-11-08)
   ```

3. **Add tier 1 rule for auto-validation:**
   ```
   Pattern: [pattern-name]
   Auto-validate: YES
   Next occurrence: Tier 1 pass (<1s)
   ```

**If rejected (anti-pattern):**

1. **Document in design-brief:**
   ```markdown
   ## Anti-Patterns

   ### [Pattern Name]

   **Rejected:** 2025-11-08
   **Reason:** [Design-agency critique]

   **Why rejected:**
   - Violates [design principle]
   - Creates [usability issue]
   - Compromises [accessibility/hierarchy/etc]

   **Approved alternative:**
   [Suggest existing approved pattern]

   **Tier 1 rule:**
   Block this pattern automatically
   Suggest: [approved alternative]
   ```

2. **Add blocking rule:**
   ```
   Pattern: [anti-pattern-name]
   Action: BLOCK
   Message: "Pattern rejected by design-agency [date]"
   Suggest: [approved alternative]
   ```

**If needs revision:**

1. **List specific fixes:**
   ```
   Design-agency requested changes:
   1. Line 143: Change spacing 88px → 96px (spec compliance)
   2. Line 187: Change font-size 28px → 32px (scale alignment)
   3. Line 203: Add contrast check (accessibility)

   Apply all fixes? (y/n)
   ```

2. **Apply fixes if approved:**
   - Edit file with fixes
   - Re-run Tier 1 validation
   - If pass → add to validated patterns
   - If fail → report remaining issues

### Step 5: Update Common Fixes Database

Track fixes in `knowledge/common-fixes.md`:

```markdown
## [Issue Type]

**Issue:** [Description]
**Frequency:** [count] occurrences
**Tier Detected:** 3 (design-agency)

**Fix Applied:**
```diff
- old code
+ new code
```

**Auto-fix Potential:** YES/NO
**Rationale:** [Why this fix is common]

**Tier 1 Rule Created:**
[Rule to auto-fix this in future]
```

Increment frequency counter if issue seen before.

## Performance Tracking

**Target: 10-15 seconds for Tier 3**

Breakdown:
- Capture 3 screenshots: 6000ms (2s each)
- Build context: 1000ms
- Invoke /design-agency: 8000ms (model time)
- Process response: 2000ms
- Update files: 3000ms

**Total: ~20000ms = 20 seconds** (acceptable for comprehensive analysis)

**Optimization:** Only run Tier 3 for ~1% of validations (after learning phase).

## Learning Metrics

Track Tier 3 effectiveness:

```json
{
  "tier3_invocations": 23,
  "patterns_approved": 18,
  "patterns_rejected": 3,
  "patterns_revised": 2,
  "avg_response_time_ms": 18500,
  "most_common_triggers": [
    "novel_layout (12)",
    "spacing_uncertainty (6)",
    "typography_hierarchy (5)"
  ]
}
```

**Success metric:** Tier 3 invocations decrease over time as validated patterns accumulate.

**Week 1:** 20% of validations → Tier 3
**Week 4:** 1% of validations → Tier 3
**Week 12:** 0.5% of validations → Tier 3 (only truly novel patterns)

## Design-Agency Integration

**Why Tier 3 works:**
- Design-agency brings LoveFrom + DesignJoy standards
- Expert critique validates novel patterns
- Actionable feedback with line numbers
- Design-brief grows from each critique

**Result:** Self-reinforcing system where expert knowledge accumulates in design-brief, making future validations instant.
