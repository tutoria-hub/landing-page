# UI Validator Skill

**Self-learning 3-tier UI validation that gets faster with every use.**

## Quick Start

### First Use

1. Edit a design file (`app/page.tsx`)
2. Run `/ui`
3. First validation likely goes to Tier 3 (learning phase)
4. Design-agency critique updates design-brief
5. Next similar change: Tier 1 instant pass (<1s)

### Command Usage

```bash
/ui              # Auto-detect best validation strategy
/ui quick        # Tier 1 only (instant checks)
/ui full         # Force Tier 3 (comprehensive critique)
```

### Auto-Invocation

Say: "check ui", "validate design", "does this look right?"

Or skill auto-runs when you edit design files.

---

## Architecture Overview

### The 3-Tier System

```
┌─────────────────────────────────────────┐
│ TIER 1: Instant Validation (<1s)       │
│ Check against design-brief specs       │
│ 95% success rate after Week 4           │
└─────────────────────────────────────────┘
              ↓ (if uncertain)
┌─────────────────────────────────────────┐
│ TIER 2: Screenshot Validation (2-3s)   │
│ Chrome DevTools MCP visual check        │
│ Pattern matching against approved       │
└─────────────────────────────────────────┘
              ↓ (if novel)
┌─────────────────────────────────────────┐
│ TIER 3: Expert Critique (10-15s)       │
│ /design-agency comprehensive analysis   │
│ Updates design-brief with learning      │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ LEARN: Next time = Tier 1 instant      │
└─────────────────────────────────────────┘
```

### Why It Works

**Self-Reinforcing Loop:**
1. Novel pattern → Tier 3 (design-agency critique)
2. Pattern approved → Added to `validated-patterns.md`
3. Next use → Tier 1 instant validation (<1s)
4. System gets smarter with each critique

**Performance Evolution:**
- Week 1: 50% Tier 1, 30% Tier 2, 20% Tier 3 (avg 6s)
- Week 4: 95% Tier 1, 4% Tier 2, 1% Tier 3 (avg 1.2s)
- Week 12: 99% Tier 1, <1% Tier 2/3 (avg <1s)

---

## File Structure

```
ui-validator/
├── README.md (this file)
├── SKILL.md (main workflow - read by Claude)
├── MAINTENANCE.md (how to update rules)
├── references/
│   ├── tier1-checklist.md    # Instant validation rules
│   ├── tier2-patterns.md     # Screenshot matching
│   └── tier3-triggers.md     # Design-agency triggers
├── knowledge/
│   ├── validated-patterns.md # Approved patterns (grows)
│   └── common-fixes.md       # Auto-fix database (grows)
└── examples/
    └── real-world-validations.md
```

---

## What Gets Validated

### Tier 1 (Instant Checks)

**Spacing:**
- Desktop gaps: 96px vertical ✓
- Mobile gaps: 64px vertical ✓
- Card padding: 32px desktop, 24px mobile ✓

**Typography:**
- EB Garamond for headers ✓
- Lexend for body text ✓
- Line-height: 1.05 hero, 1.2 headers, 1.6 body ✓
- Font sizes in approved scale ✓

**Colors:**
- Green (#30A46C) for CTAs only ✓
- Approved palette adherence ✓
- Contrast: 4.5:1 minimum ✓

**Patterns:**
- Matches validated patterns ✓
- Novel patterns → Tier 2/3 ✓

### Tier 2 (Visual Validation)

- Screenshot changed section only (not full page)
- Visual hierarchy check
- Layout alignment verification
- Responsive behavior assessment

### Tier 3 (Expert Analysis)

- All breakpoints (mobile, tablet, desktop)
- /design-agency comprehensive critique
- Design-brief updated with learnings

---

## Integration Points

**Design Brief** (`design-brief/DESIGN_BRIEF.md`):
- Source of truth for validation rules
- Auto-updated with metrics and patterns
- Grows smarter over time

**Chrome DevTools MCP**:
- Smart screenshots (Tier 2 only)
- Headless + isolated mode
- Section-specific capture

**/design-agency Command**:
- Expert critique (Tier 3)
- LoveFrom + DesignJoy standards
- Validates novel patterns

**HMR (200ms hot reload)**:
- Fast feedback loop
- 200ms + <1s validation = 1.2s total

---

## Performance Metrics

Track progress in `design-brief/DESIGN_BRIEF.md` (UI Validation Metrics section):

- Total validations performed
- Tier distribution (1/2/3)
- Average validation time
- Patterns learned
- Auto-fixes applied
- Time saved vs manual workflow

**Time Savings:**
- Manual: 45s per check
- Automated (Week 4): 1.2s per check
- **Savings: 43.8s per validation (~97% faster)**

---

## Troubleshooting

### Tier 1 Not Passing

**Problem:** Too many Tier 2/3 invocations

**Solution:**
1. Check `knowledge/validated-patterns.md` - Is pattern documented?
2. Check `design-brief/DESIGN_BRIEF.md` - Are specs clear?
3. Run `/ui full` once to teach system the pattern

### Auto-Fixes Not Working

**Problem:** Issues flagged but not auto-fixed

**Solution:**
1. Check `references/tier1-checklist.md` - Is auto-fix rule defined?
2. Check tolerance threshold (4px for auto-fix, 8px for flag)
3. Update `common-fixes.md` with new auto-fix rule

### Chrome DevTools MCP Issues

**Problem:** Screenshots failing

**Solution:**
1. Verify dev server running: `npm run dev`
2. Check MCP enabled: `claude mcp list`
3. Verify permissions: `.claude/settings.json`

### Slow Validation

**Problem:** Taking >5s on average

**Solution:**
1. Check metrics: How many Tier 3 invocations?
2. Should decrease over time (learning curve)
3. If persistent: Missing validated patterns

---

## Maintenance

See `MAINTENANCE.md` for:
- Adding new validation rules
- Updating tier thresholds
- Documenting patterns
- Cleaning up stale data

---

## Examples

See `examples/real-world-validations.md` for:
- Common validation scenarios
- Auto-fix examples
- Tier 3 learning examples
- Edge cases handled

---

## Philosophy

**Tutoria Principles:**
- Ship Fast: Works immediately, improves over time
- Clean Codebase: DRY validation logic, no duplication
- High Agency: Agent decides tier, auto-fixes issues
- No BS: Concise feedback, actionable only

**Design-Agency Alignment:**
- Obsessive Detail: 1px precision checks
- Purposeful Restraint: Only screenshots when needed
- Bias Toward Action: Auto-fixes obvious issues
- Ship Opinions: Validated patterns, not options

---

## Getting Help

**Documentation:**
- `SKILL.md` - Complete workflow logic
- `CLAUDE.md` - Usage guide
- `design-brief/DESIGN_BRIEF.md` - Validation specs

**Files to Check:**
- `knowledge/validated-patterns.md` - What's approved
- `knowledge/common-fixes.md` - What auto-fixes
- `references/tier1-checklist.md` - Instant rules

**Questions:**
- "How does Tier 1 work?" → Read `references/tier1-checklist.md`
- "Why Tier 3?" → Read `references/tier3-triggers.md`
- "What patterns exist?" → Read `knowledge/validated-patterns.md`

---

**System is ready. Starts learning on first use. Gets faster every day. Never slows down.**
