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

**Configuration:** `.mcp.json` contains server setup. Requires Claude Code restart to activate.

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

**`/landing-page/parallel [task]`** - Set up 3 parallel agents for exploration
**`/landing-page/verify-deploy`** - Build + preview before deploying to Cloudflare
**`/landing-page/compare-perf`** - Run Lighthouse audit, save baseline for comparison

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