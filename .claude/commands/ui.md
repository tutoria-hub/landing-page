---
description: "Quick UI validation - self-learning pixel-perfect checks"
argument-hint: "[quick|full]"
model: claude-sonnet-4-5
---

# UI Validation

**Invokes ui-validator skill for intelligent, self-learning UI validation.**

## How It Works

3-tier validation that gets faster over time:

```
Tier 1: Instant checks (<1s)
  → Spacing, typography, colors vs design-brief
  → 95% pass here after learning phase

Tier 2: Screenshot validation (2-3s)
  → Chrome DevTools MCP visual check
  → Only when Tier 1 uncertain

Tier 3: Expert critique (10-15s)
  → /design-agency comprehensive analysis
  → Only for novel patterns
  → System learns from each critique
```

## Usage

**Default (auto-detect):**
```
/ui
```
Automatically determines validation strategy based on what changed.

**Quick mode (Tier 1 only):**
```
/ui quick
```
Instant validation against design-brief specs only. No screenshots.

**Full mode (all tiers):**
```
/ui full
```
Force comprehensive analysis with all breakpoints + design-agency critique.

## What Gets Validated

**Spacing:**
- Desktop: 96px vertical gaps ✓
- Mobile: 64px vertical gaps ✓
- Card padding: 32px desktop, 24px mobile ✓

**Typography:**
- EB Garamond for headers ✓
- Lexend for body text ✓
- Line-height: 1.05 hero, 1.2 headers, 1.6 body ✓

**Colors:**
- Green (#30A46C) for CTAs only ✓
- Contrast: 4.5:1 minimum ✓
- Approved palette adherence ✓

**Patterns:**
- Matches validated patterns in design-brief ✓
- Novel patterns → design-agency review ✓

## Self-Learning System

**Week 1:**
- 50% instant validation
- 30% screenshot checks
- 20% expert critique
- Avg time: ~6 seconds

**Week 4:**
- 95% instant validation (most checks pass immediately)
- 4% screenshot checks
- 1% expert critique
- Avg time: ~1.2 seconds

**Week 12:**
- 99% instant validation (feels automatic)
- Avg time: <1 second

**Why it works:** Each design-agency critique adds validated patterns to design-brief, making future checks instant.

## Output Examples

**Tier 1 pass (instant):**
```
✅ UI Validation Passed (<1s)
Spacing ✓ | Typography ✓ | Colors ✓ | Pattern Match ✓
```

**Tier 2 minor issue:**
```
⚠️ Auto-Fixed (2.3s)
Line 143: Changed padding 92px → 96px (design-brief spec)
Screenshot confirmed visual consistency ✓
```

**Tier 3 learning:**
```
📋 Expert Critique Complete (12.4s)

Design-Agency approved new pattern:
✅ "features-grid-three-column" validated and saved

Issues fixed:
- Line 143: Spacing 88px → 96px
- Line 187: Line-height 1.5 → 1.6

Next use of this pattern: instant validation (<1s)
```

## Integration with Existing Workflow

**Works WITH:**
- HMR: 200ms hot reload + <1s validation = 1.2s feedback
- Design-brief: Source of truth for all rules
- Chrome DevTools MCP: Smart screenshot capture (Tier 2)
- /design-agency: Expert critique (Tier 3)

**Auto-invokes when:**
- You edit `app/page.tsx` or design files
- You say: "check ui", "validate design", "does this look right?"
- You run: `/ui` command

## Files

**Skill:** `.claude/skills/ui-validator/SKILL.md`
**References:** `.claude/skills/ui-validator/references/`
**Knowledge:** `.claude/skills/ui-validator/knowledge/`

## Quick Tips

- First few validations run Tier 3 (learning phase)
- Each critique makes future checks faster
- Design-brief grows smarter over time
- Most checks become instant after Week 4

**Feels fast. Gets faster. Never slows down.**
