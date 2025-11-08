# Landing Page - Agent Context

## Stack

- Next.js 15.5.6 (not 16 - compatibility with OpenNext)
- React 18.3.1 (not 19 - compatibility)
- shadcn/ui components in `/components/ui/`
- Tailwind CSS v4
- OpenNext Cloudflare adapter 1.11.1

## Deploy Target

Cloudflare Workers (not Edge runtime - uses Node.js runtime via `cloudflare-node` wrapper)

## Key Files

- `open-next.config.ts` - OpenNext adapter configuration (critical for Cloudflare deployment)
- `wrangler.jsonc` - Cloudflare Workers configuration
- `next.config.mjs` - Next.js configuration (uses webpack, not Turbopack)
- `app/page.tsx` - Main landing page with shadcn components
- `.mcp.json` - MCP server configuration for Claude Code

## MCP Integration

**shadcn MCP Server** - Installed and configured for Claude Code integration.

Enables natural language interaction with shadcn/ui component registries:
- Browse and search components across registries
- Install components with conversational prompts
- Access official shadcn/ui registry and third-party registries
- Namespace support for internal components

**Usage examples:**
- "Show me all available shadcn components"
- "Add the button, dialog and card components"
- "Install a data table component"

**Chrome DevTools MCP** - Automated browser control for UI validation.

Enables automated screenshot capture and visual testing:
- Navigate to localhost:3000 (dev server)
- Capture screenshots at responsive breakpoints
- Headless + isolated browser mode (low overhead)
- Limited permissions: screenshot + navigate only (context-efficient)

**Usage workflow:**
```bash
# Automated screenshot + critique workflow
/landing-page:ui-check

# Captures:
# 1. Mobile (375x667) - iPhone SE
# 2. Tablet (768x1024) - iPad
# 3. Desktop (1440x900) - Standard
# Then automatically invokes /design-agency for critique
```

**Integration with /design-agency:**
- Automated screenshots → immediate design critique
- Reference design-brief specs automatically
- Pixel-perfect validation at all breakpoints

**Configuration:** `.mcp.json` contains server setup. Permissions in `.claude/settings.json` limit to screenshot/navigate tools only. Requires Claude Code restart to activate.

## UI Validation Workflow

**Self-learning 3-tier validation system** - gets faster with every use.

### The System

```
Tier 1: Instant Validation (<1s)
  → Checks spacing, typography, colors vs design-brief
  → Auto-fixes common issues (spacing off by 4px, etc.)
  → 95% of checks pass here (after Week 4)
  ↓ (if uncertain)
Tier 2: Screenshot Validation (2-3s)
  → Chrome DevTools MCP captures changed section only
  → Visual pattern matching against approved designs
  ↓ (if novel pattern)
Tier 3: Expert Critique (10-15s)
  → /design-agency comprehensive analysis (all breakpoints)
  → Updates design-brief with validated patterns
  → System learns for next time
```

### How to Use

**Default (auto-detect):**
```bash
/ui
```
Automatically determines best validation strategy based on changes.

**Quick mode (Tier 1 only):**
```bash
/ui quick
```
Instant validation against design-brief specs. No screenshots.

**Full mode (force expert review):**
```bash
/ui full
```
Comprehensive analysis with all breakpoints + design-agency critique.

### Auto-Invocation

Skill auto-runs when:
- You edit `app/page.tsx` or design files
- You say: "check ui", "validate design", "does this look right?"
- You run: `/ui` command

### Performance Evolution

**Week 1 (Learning):**
- 50% Tier 1 (instant)
- 30% Tier 2 (screenshot)
- 20% Tier 3 (critique)
- Avg: ~6 seconds per check

**Week 4 (Mature):**
- 95% Tier 1 (instant)
- 4% Tier 2 (screenshot)
- 1% Tier 3 (critique)
- Avg: ~1.2 seconds per check

**Week 12 (Expert):**
- 99% Tier 1 (instant)
- <1% Tier 2/3
- Avg: <1 second (feels automatic)

### Why It Works

**Self-Reinforcing Loop:**
1. Novel pattern detected → Tier 3 (design-agency critique)
2. Pattern approved → Added to validated-patterns.md
3. Next use of pattern → Tier 1 instant pass (<1s)
4. System gets smarter with each critique

**Context-Efficient:**
- Only screenshots when uncertain (not every check)
- Only single section (not full page)
- Only desktop first (mobile/tablet if needed)
- Minimal MCP tool usage

**Fast Feedback:**
- HMR: 200ms hot reload
- Validation: <1s (Tier 1)
- **Total: 1.2s from save to feedback**

### Integration Points

**Design Brief** (`design-brief/DESIGN_BRIEF.md`):
- Source of truth for all validation rules
- Auto-updated with metrics and validated patterns
- Grows smarter over time

**Chrome DevTools MCP**:
- Smart screenshot capture (Tier 2 only)
- Headless + isolated mode (low overhead)
- Section-specific capture (not full page)

**/design-agency Command**:
- Expert critique for novel patterns (Tier 3)
- LoveFrom + DesignJoy standards
- Updates design-brief with learnings

**HMR (200ms)**:
- Fast hot reload
- Combined with <1s validation
- 1.2s total feedback loop

### Files

**Skill:** `.claude/skills/ui-validator/SKILL.md`
**References:**
- `tier1-checklist.md` - Instant validation rules
- `tier2-patterns.md` - Screenshot matching patterns
- `tier3-triggers.md` - When to invoke design-agency

**Knowledge Base:**
- `validated-patterns.md` - Approved patterns (grows over time)
- `common-fixes.md` - Auto-fix database
- `validation-history.json` - Performance tracking

**Metrics:** `design-brief/DESIGN_BRIEF.md` (UI Validation Metrics section)

### Example Output

**Tier 1 Success (instant):**
```
✅ UI Validation Passed (<1s)
Spacing ✓ | Typography ✓ | Colors ✓ | Pattern Match ✓
```

**Tier 2 Auto-Fix:**
```
⚠️ Auto-Fixed (2.3s)
Line 143: Changed padding 92px → 96px (design-brief spec)
Screenshot confirmed visual consistency ✓
```

**Tier 3 Learning:**
```
📋 Expert Critique Complete (12.4s)

Design-Agency approved new pattern:
✅ "features-grid-three-column" validated and saved

Issues fixed:
- Line 143: Spacing 88px → 96px
- Line 187: Line-height 1.5 → 1.6

Next use of this pattern: instant validation (<1s)
```

### Time Savings

**Manual workflow:** 45s per check
- Take 3 screenshots: 15s
- Paste and organize: 10s
- /design-agency analysis: 15s
- Read and fix: 5s

**With ui-validator (Week 4):**
- Average: 1.2s per check
- **Savings: 43.8s per validation**
- **~97% faster**

**Gets faster over time** as validated patterns accumulate.

## Known Issues

- Next.js 16 not compatible with OpenNext 1.11.1 (use 15.5.6)
- Turbopack has compatibility issues with Tailwind CSS v4 (use webpack for dev)
- Must use `nodejs_compat` flag in wrangler.jsonc
- Ensure NODE_ENV=development for local dev (now handled automatically in package.json)

## Development Workflow

### Local Development (Recommended for rapid iteration)

```bash
npm run dev    # Starts Next.js dev server on http://localhost:3000
```

The dev server now works properly with Tailwind CSS v4:
- Uses webpack bundler (not Turbopack) for proper PostCSS processing
- NODE_ENV automatically set to development
- Supports Hot Module Replacement for fast iteration

### Production Testing

For testing Cloudflare-specific features (bindings, Workers runtime):

```bash
npm run preview    # Build + run in local Workers runtime
npm run deploy     # Deploy to Cloudflare Workers
```

Live at: https://landing-page.fupsonline.workers.dev/

### Cloudflare Bindings (Optional)

If you need to test Cloudflare bindings (R2, D1, KV) locally:
1. Uncomment `initOpenNextCloudflareForDev()` in `next.config.mjs`
2. Uncomment `NEXTJS_ENV=development` in `.dev.vars`
3. Run `npm run dev` - bindings will be available via miniflare

**IMPORTANT**: DO NOT RUN NEXT DEV or DEPLOY as an agent unless asked to.

## Parallel Agent Workflow

This project uses a **Pieter Levels + IndyDevDan hybrid workflow**: single agent by default, 2-3 parallel agents only when exploring design space.

### Philosophy

**Default mode**: Work on `main` with single agent, leverage Next.js HMR (200ms hot reload).

**Parallel mode**: Only when comparing 3+ approaches visually or measuring performance strategies.

### When to Use Parallel Agents

Use 2-3 parallel agents when:
- **Visual exploration**: 3+ design directions for same component (e.g., hero headline styling)
- **Performance optimization**: Multiple strategies need Lighthouse comparison
- **Layout options**: Uncertain which approach works best (masonry vs grid vs carousel)
- **Independent features**: Multiple sections with no dependencies
- **Copy testing**: A/B test messaging

DO NOT parallelize:
- Bug fixes (one obvious solution)
- Performance audits (need consistent baseline)
- Responsive testing (systematic evaluation)
- Code reviews (one quality gate)
- Dependency upgrades (interdependent changes)

### Slash Commands

**`/ui [quick|full]`** - Self-learning UI validation (instant checks, gets faster over time)
**`/landing-page:ui-check [section]`** - Automated screenshot capture + design critique (Chrome DevTools MCP + /design-agency)
**`/landing-page:parallel [task]`** - Set up 3 parallel agents for exploration
**`/landing-page:verify-deploy`** - Build + preview before deploying to Cloudflare
**`/landing-page:compare-perf`** - Run Lighthouse audit, save baseline for comparison

### Quick Start

```bash
# Terminal 1: Keep dev server running
npm run dev

# Terminal 2-4: Launch 3 Claude instances
claude  # Each works on different approach

# Browser auto-refreshes on each save (HMR)
# Screenshot + compare + commit winner
```

**Guide**: See `.claude/parallel-workflow-guide.md` for complete workflow documentation.

### Git Workflow

```
main (always deployable)
  ↓
Work directly on main
  ↓
Commit frequently, deploy daily
```

No branch protection. No worktrees. Ship fast, iterate in production.