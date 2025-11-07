# Landing Page

Next.js 15 + shadcn/ui landing page deployed to Cloudflare Workers via OpenNext.

## Stack

- Next.js 15.5.6
- React 18.3.1
- shadcn/ui + Tailwind CSS v4
- OpenNext Cloudflare adapter 1.11.1
- Wrangler 4.46.0

## Live

https://landing-page.fupsonline.workers.dev/

## Commands

```bash
npm run dev       # Local dev server (localhost:3000)
npm run build     # Next.js build
npm run deploy    # Build + deploy to Cloudflare
npm run preview   # Build + test with Wrangler locally
```

## Deploy

```bash
npm run deploy
```

Requires Cloudflare authentication via `wrangler login`.
