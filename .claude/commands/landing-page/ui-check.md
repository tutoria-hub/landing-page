---
description: "Automated screenshot capture + design critique workflow"
argument-hint: "[section-name (optional)]"
model: claude-sonnet-4-5
---

# Landing Page UI Check

Automated visual validation workflow using Chrome DevTools MCP + `/design-agency` integration.

## Automated Screenshot Workflow

**Step 1: Navigate to local dev server**
- Target: http://localhost:3000 (ensure `npm run dev` is running)
- Use `navigate_page` tool from chrome-devtools MCP

**Step 2: Capture responsive breakpoints**

Take screenshots at these viewports using `take_screenshot` tool:

1. **Mobile** (375x667) - iPhone SE
   - Navigate, set viewport, screenshot
2. **Tablet** (768x1024) - iPad
   - Navigate, set viewport, screenshot
3. **Desktop** (1440x900) - Standard monitor
   - Navigate, set viewport, screenshot

**Step 3: Design critique**

After capturing screenshots, automatically invoke `/design-agency` with:
```
/design-agency @screenshots what needs pixel-perfect refinement based on the design brief?
```

## Validation Checklist

Reference `/design-brief/DESIGN_BRIEF.md` for specs:

**Typography**:
- [ ] EB Garamond headers (80px desktop, 48px mobile)
- [ ] Lexend body text (18px standard)
- [ ] Line-height rhythm (1.05 hero, 1.6 body)

**Spacing**:
- [ ] 96px vertical gaps (desktop)
- [ ] 64px vertical gaps (mobile)
- [ ] Consistent padding

**Color**:
- [ ] Green #30A46C for CTAs only
- [ ] 4.5:1 contrast minimum
- [ ] Proper background alternation (white/cream)

**Interactions**:
- [ ] Button 3D shadow (0 8px 0 #2A9461)
- [ ] Hover scale 1.05
- [ ] Touch targets 44x44px minimum

## Arguments

**Section-specific check**:
```
/landing-page:ui-check hero
/landing-page:ui-check video-demo
```

Focuses screenshots on specific section only.

**Full page check** (default):
```
/landing-page:ui-check
```

Captures entire page across all breakpoints.

## Integration Points

**Design Brief**: `/design-brief/DESIGN_BRIEF.md` - Source of truth for specs

**Design Agency**: `/design-agency` command - Expert critique after capture

**Chrome DevTools MCP**: Automated browser control + screenshots

## When to Use

- ✅ After implementing new section
- ✅ Before deployment (`/landing-page:verify-deploy`)
- ✅ After responsive layout changes
- ✅ During visual QA rounds
- ❌ Not needed for copy-only edits

## Example Usage

```bash
# Full page check at all breakpoints
/landing-page:ui-check

# Hero section focused check
/landing-page:ui-check hero
```

Agent will:
1. Launch Chrome (headless, isolated)
2. Navigate to localhost:3000
3. Capture 3 breakpoint screenshots
4. Invoke /design-agency with screenshots
5. Return actionable critique
