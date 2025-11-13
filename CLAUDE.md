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

## Design System Enforcement

### Anti-Convergence Protection

**Source:** `design-brief/DESIGN_BRIEF.md` → "Anti-Patterns to Reject" section

Agent reads anti-patterns before UI changes to prevent drift toward generic SaaS aesthetics:

**4 Dimensions Protected:**
1. **Typography**: Block Inter/Helvetica/rounded sans → Maintain EB Garamond + Lexend
2. **Color**: Block blue CTAs/gradients/purple → Maintain green #30A46C only
3. **Animation**: Block light rays/word rotate/excessive blur → Maintain geometric waves
4. **Layout**: Block bento grid overuse/flat lists/centered hero → Maintain editorial asymmetry

**How it works:**
- Agent reads design-brief before implementing changes
- Blocks generic LLM defaults (Inter fonts, purple gradients)
- Enforces intentional positioning (scholarly authority, warmth through restraint)
- No separate validation files - just design-brief anti-patterns section

**Design Critique:**
- Use `/design-agency` command for expert LoveFrom + DesignJoy standards
- Use `/landing-page:ui-check [section]` for automated screenshots + critique
- Chrome DevTools MCP captures responsive breakpoints automatically

## Known Issues & Solutions

- Next.js 16 not compatible with OpenNext 1.11.1 → Use Next.js 15.5.6
- Turbopack has compatibility issues with Tailwind CSS v4 → Use webpack for dev (default)
- Must use `nodejs_compat` flag in wrangler.jsonc → Already configured
- API routes must use Node.js runtime (not edge) → Remove `export const runtime = "edge"`
- Build timeouts with miniflare → Conditional `initOpenNextCloudflareForDev()` (see next.config.mjs:9)

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

Live at:
- **https://tutoria.ac** (custom domain)
- https://landing-page.fupsonline.workers.dev (workers.dev URL)

### Cloudflare Bindings

Cloudflare bindings (D1, R2, KV) are now automatically available in local dev:
- `initOpenNextCloudflareForDev()` runs only when NODE_ENV=development (see next.config.mjs:9)
- Bindings available via miniflare in `npm run dev`
- No manual configuration needed

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