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
- `next.config.ts` - Contains Turbopack workspace root fix
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
- Turbopack requires explicit root when multiple lockfiles in workspace
- Must use `nodejs_compat` flag in wrangler.jsonc

## Deploy

```bash
npm run deploy    # Build with OpenNext + deploy to Cloudflare
```

Live at: https://landing-page.fupsonline.workers.dev/
