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
