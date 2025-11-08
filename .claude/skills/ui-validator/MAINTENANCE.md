# UI Validator Maintenance Guide

**How to update rules, add patterns, and keep the system healthy.**

---

## Adding New Validation Rules

### Tier 1 Rules (Instant Checks)

**When to add:**
- Same issue occurs 3+ times
- Design-agency identifies recurring mistake
- Design-brief adds new specification

**How to add:**

1. **Edit `references/tier1-checklist.md`:**

```markdown
### [New Rule Name]

**Validation Check:**
```
[Description of what to check]
  → Pass condition
  → Auto-fix condition
  → Flag condition
```

**Auto-Fix Logic:**
```
If [condition]
  → Auto-fix to [value]
  → Report: "[message]"
```
```

2. **Update `knowledge/common-fixes.md`:**

```markdown
### [Issue Name]

**Issue:** [Description]
**Frequency:** 0 occurrences (baseline)
**Tier Detected:** 1
**Auto-fix:** YES/NO

**Fix Applied:**
```diff
- old code
+ new code
```

**Tier 1 Rule:**
```
[Rule logic]
```
```

3. **Test the rule:**
- Create code that violates rule
- Run `/ui`
- Verify auto-fix or flag works
- Check metrics updated

**Example:**

```markdown
### Button Min-Width

**Validation Check:**
```
If button width < 280px (mobile) or < 320px (desktop)
  → Flag: "Button too narrow (accessibility)"
  → Suggest: min-w-[280px] (mobile) or min-w-[320px] (desktop)
```
```

---

## Adding Validated Patterns

### When to Add

- Design-agency approves new pattern (Tier 3)
- New section implemented and validated
- Variation of existing pattern created

### How to Add

**Edit `knowledge/validated-patterns.md`:**

```markdown
## [Pattern Name]

**Approved:** [Date]
**Context:** [Where used, why needed]
**Design-Agency Review:** [Approval notes]

### Specifications

**[Category 1]:**
- [Spec 1]
- [Spec 2]

**[Category 2]:**
- [Spec 1]
- [Spec 2]

### Code Example

```tsx
[Exact code implementation]
```

### Design Rationale

- [Why approved]
- [What principle it serves]

### Usage Guidelines

**Use when:**
- [Context 1]
- [Context 2]

**Don't use when:**
- [Anti-pattern 1]
- [Anti-pattern 2]
```

**Update Metrics:**

Edit `design-brief/DESIGN_BRIEF.md`:
```markdown
**Patterns Learned:** [increment by 1]
**Last Pattern Added:** [pattern name] ([date])
```

---

## Updating Tier Thresholds

### Auto-Fix Tolerance

**Current thresholds (Tier 1):**
- ≤4px: Auto-fix to nearest approved value
- 5-8px: Flag for user decision
- >8px: Proceed to Tier 2

**To update:**

Edit `references/tier1-checklist.md`:

```markdown
### Auto-Fix Logic

```
Difference ≤ [NEW]px?
  → Auto-fix to nearest approved value

Difference [NEW]-[NEW]px?
  → Flag for user decision

Difference > [NEW]px?
  → Proceed to Tier 2
```
```

**Test after changes:**
- Create edge cases
- Verify new thresholds work
- Update documentation

---

## Cleaning Up Stale Data

### When to Clean

- Patterns no longer used (deprecated sections)
- Auto-fixes no longer needed (rule changed)
- Metrics from old learning phase

### What to Keep

**Always keep:**
- Current validated patterns
- Active auto-fix rules
- Last 3 months of metrics

**Can archive:**
- Deprecated patterns (move to archive section)
- Old auto-fix rules (if design-brief changed)
- Metrics older than 3 months

### How to Clean

1. **Archive old patterns:**

In `knowledge/validated-patterns.md`:

```markdown
---

## Archived Patterns

**No longer in use but kept for reference**

### [Old Pattern]
**Deprecated:** [Date]
**Reason:** [Why removed]
**Original specs:** [Keep for reference]
```

2. **Reset metrics (if needed):**

In `design-brief/DESIGN_BRIEF.md`:

```markdown
**Metrics Reset:** [Date]
**Reason:** [New design system, major refactor, etc.]

**Previous Stats (Archived):**
- Total Validations: [old count]
- Patterns Learned: [old count]
```

3. **Update common-fixes frequencies:**

In `knowledge/common-fixes.md`:

If issue no longer occurs:
```markdown
**Frequency:** 0 occurrences (resolved via design-brief update)
**Status:** No longer applicable (design spec changed)
```

---

## Adding New Auto-Fixes

### Process

1. **Identify recurring issue:**
   - Check metrics: Issue occurred 3+ times?
   - Check Tier 3 reports: Design-agency flagged pattern?

2. **Define auto-fix rule:**

```markdown
### [Issue Type]

**Issue:** [Description]
**Frequency:** [count] occurrences
**Auto-fix Potential:** YES

**Fix:**
```diff
- problematic code
+ corrected code
```

**Tier 1 Rule:**
```
If [condition detected]
  → Auto-fix to [value]
  → Report: "[message]"
```
```

3. **Add to tier1-checklist.md:**

```markdown
### [Auto-Fix Name]

**Auto-Fix Logic:**
```
If [condition]
  → Auto-fix: [change]
  → Silent fix (no report) / Report: "[message]"
```
```

4. **Test:**
- Create code with issue
- Run `/ui`
- Verify auto-fix applied
- Check report message clear

---

## Updating Design-Brief Specs

### When Design-Brief Changes

If design-brief updates (new spacing, typography, etc.):

1. **Update Tier 1 rules:**
   - Edit `references/tier1-checklist.md`
   - Change approved values
   - Update tolerance thresholds

2. **Update validated patterns:**
   - Edit `knowledge/validated-patterns.md`
   - Update specs for affected patterns
   - Mark with "Updated: [date]"

3. **Reset metrics (if major change):**
   - Archive old stats
   - Start fresh baseline
   - Document why reset

4. **Test existing patterns:**
   - Run `/ui` on each section
   - Verify new specs validate correctly
   - Update any that fail

### Example

**Design-brief changes desktop spacing 96px → 104px:**

1. Update `tier1-checklist.md`:
```diff
- Desktop: 96px vertical gaps
+ Desktop: 104px vertical gaps
```

2. Update `validated-patterns.md`:
```diff
**Spacing:**
- Desktop: 96px bottom
+ Desktop: 104px bottom (Updated: 2025-11-08)
```

3. Run validation on all sections
4. Document change in design-brief metrics

---

## Monitoring Health

### Key Metrics to Watch

**Tier Distribution:**
- Tier 1 should increase over time (50% → 95%)
- Tier 3 should decrease (20% → 1%)
- If Tier 3 stays high: Missing patterns

**Average Time:**
- Should decrease over time (6s → 1.2s)
- If increasing: System not learning

**Auto-Fixes:**
- Should decrease over time (as common fixes become patterns)
- If increasing: Rules too loose or design-brief unclear

### Weekly Check

Run every Monday:

```bash
# Check metrics
Read design-brief/DESIGN_BRIEF.md (UI Validation Metrics)

# Questions:
- Is Tier 1 success rate increasing?
- Are new patterns being added?
- Are auto-fixes decreasing?
- Is average time decreasing?
```

**Green flags:** All increasing/decreasing as expected
**Yellow flags:** One metric stalled (investigate)
**Red flags:** Multiple metrics regressing (system needs attention)

### Fixing Regression

**If Tier 1 success drops:**
- Check recent design-brief changes
- Verify validated patterns accurate
- Update tier1-checklist rules

**If average time increases:**
- Too many Tier 3 invocations?
- Add missing patterns to validated-patterns.md
- Check Tier 2 screenshot performance

**If auto-fixes increase:**
- Common mistakes not becoming patterns?
- Update validated-patterns with recurring fixes
- Tighten tier1-checklist rules

---

## Best Practices

### Do's

✅ Add patterns after design-agency approval (Tier 3)
✅ Update metrics after every validation
✅ Document rationale for all rules
✅ Test changes with real code
✅ Archive deprecated patterns (don't delete)

### Don'ts

❌ Add patterns without design-agency validation
❌ Create overly broad auto-fix rules
❌ Delete metrics history
❌ Change thresholds without testing
❌ Skip documentation updates

---

## Emergency Reset

**If system completely broken:**

1. **Backup current state:**
```bash
cp -r .claude/skills/ui-validator .claude/skills/ui-validator.backup
```

2. **Reset to baseline:**
- Keep SKILL.md (core logic)
- Keep references/*.md (tier rules)
- Reset knowledge/*.md to baseline (5 patterns only)
- Reset design-brief metrics to 0

3. **Restart learning:**
- First `/ui` will go to Tier 3
- System relearns patterns from scratch
- Should stabilize within 10-20 validations

4. **Post-mortem:**
- Document what broke
- Add safeguards to prevent recurrence
- Update MAINTENANCE.md with learnings

---

## Version Control

**What to commit:**
- `references/*.md` (tier rules)
- `knowledge/*.md` (patterns and fixes)
- `SKILL.md` (core logic)
- Design-brief metrics section

**What to .gitignore:**
- `knowledge/validation-history.json` (local performance data)
- Temporary screenshots (if any)

**Commit message format:**
```
feat(ui-validator): Add [pattern name] validated pattern

- Approved by design-agency [date]
- Tier 1 success rate: [before]% → [after]%
- Pattern category: [layout/typography/color]
```

---

## Questions?

**Adding rules:** See "Adding New Validation Rules" above
**Adding patterns:** See "Adding Validated Patterns" above
**Metrics broken:** See "Monitoring Health" above
**System not learning:** See "Fixing Regression" above
**Total failure:** See "Emergency Reset" above

**Still stuck?** Read:
- `SKILL.md` - Core logic
- `README.md` - Architecture overview
- `design-brief/DESIGN_BRIEF.md` - Specs source of truth
