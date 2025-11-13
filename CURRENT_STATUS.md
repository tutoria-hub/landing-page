# Current Status - Waitlist/Demo System

**Date:** 2025-11-13
**Status:** ✅ UI Complete | ⚠️ D1 Setup Needed

---

## ✅ What's Working

### Code Complete
- ✓ Waitlist form component (`app/components/WaitlistForm.tsx`)
- ✓ Demo modal component (`app/components/DemoModal.tsx`)
- ✓ API route (`app/api/leads/route.ts`)
- ✓ Database schema (`schema/leads.sql`)
- ✓ TypeScript types (`types/cloudflare.d.ts`)
- ✓ Scroll-to-section UX (hero + header CTAs)
- ✓ Dev server running on **http://localhost:3001**

### Features Implemented
- Inline waitlist form with email validation
- Modal demo request (email + institution + notes)
- Smooth scroll from hero/header to "For Who?" section
- Success/error states
- Duplicate prevention (UNIQUE constraint)
- White input backgrounds

---

## ⚠️ Wrangler Issue

**Problem:** `wrangler` CLI commands failing with `fetch failed` errors

**Network check:** ✓ Can ping api.cloudflare.com
**Auth status:** Token may need refresh
**Wrangler version:** 4.31.0 (latest: 4.48.0)

**Impact:** Can't create D1 database via automated commands

---

## 🔧 Manual Setup Required (3 Steps)

You need to run these commands in a **new Terminal window** (wrangler works interactively):

### Step 1: Create D1 Database

```bash
cd /Users/frederikhandberg/Tutoria-Stack/landing-page
wrangler d1 create tutoria-leads
```

**Expected output:**
```
✅ Successfully created DB 'tutoria-leads'!

[[d1_databases]]
binding = "DB"
database_name = "tutoria-leads"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**→ COPY THE `database_id`** - you'll need it for Step 2.

---

### Step 2: Update wrangler.jsonc

Edit `wrangler.jsonc` and add the D1 binding (after line 9):

```jsonc
{
  "name": "landing-page",
  "compatibility_date": "2024-09-23",
  "compatibility_flags": ["nodejs_compat"],
  "main": ".open-next/worker.js",
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  "d1_databases": [
    {
      "binding": "TUTORIA_LEADS_DB",
      "database_name": "tutoria-leads",
      "database_id": "YOUR_DATABASE_ID_FROM_STEP_1"
    }
  ]
}
```

**Important:** Replace `YOUR_DATABASE_ID_FROM_STEP_1` with the actual ID.

---

### Step 3: Run Migration

```bash
wrangler d1 execute tutoria-leads --file=schema/leads.sql
```

**Expected output:**
```
✅ Executed 3 commands in 0.123 seconds
```

---

## 🧪 Testing

### 1. UI Test (Works Now!)

**Dev server running:** http://localhost:3001

**Test these:**
- [ ] Hero button scrolls to "For Who?" section
- [ ] Header button scrolls to "For Who?" section
- [ ] Waitlist form renders with white input background
- [ ] Click "Request a demo" opens modal
- [ ] Modal has email + institution + notes fields
- [ ] Modal closes with ESC or backdrop click

---

### 2. API Test (After D1 Setup)

**Restart dev server** after completing D1 setup:
```bash
# Kill current server
pkill -f "next dev"

# Restart
npm run dev
```

**Test waitlist submission:**
```bash
curl -X POST http://localhost:3001/api/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","type":"waitlist"}'
```

**Expected response:**
```json
{
  "success": true,
  "message": "You're on the waitlist! We'll be in touch soon."
}
```

**Verify in database:**
```bash
wrangler d1 execute tutoria-leads --command "SELECT * FROM leads"
```

---

## 📋 Next Steps

1. **Complete D1 setup** (3 manual steps above)
2. **Restart dev server** (so it picks up D1 binding)
3. **Test forms** (submit waitlist + demo request)
4. **Verify data** (`wrangler d1 execute tutoria-leads --command "SELECT * FROM leads"`)
5. **Deploy** (`npm run deploy`)

---

## 🐛 Troubleshooting

### Wrangler "fetch failed" Error

Try these:

```bash
# 1. Refresh auth token
wrangler logout
wrangler login

# 2. Update wrangler
npm install -g wrangler@latest

# 3. Check auth status
wrangler whoami
```

### Dev Server Won't Start

```bash
# Kill existing process
pkill -f "next dev"

# Try again
npm run dev
```

### Forms Don't Submit

**Checklist:**
1. ✓ D1 database created?
2. ✓ `wrangler.jsonc` has `d1_databases` binding?
3. ✓ Migration ran successfully?
4. ✓ Dev server restarted after D1 setup?
5. ✓ Browser console shows errors? (F12)

---

## 🎥 Video Player Setup (2 Minutes)

**Component:** `app/components/VideoPlayer.tsx`
**Usage:** `app/page.tsx:166-175`

### Replace Placeholder

In `app/page.tsx:170`, update:
```tsx
videoId="YOUR_YOUTUBE_VIDEO_ID"
```

With your actual ID. Example: If URL is `https://youtube.com/watch?v=dQw4w9WgXcQ`, use:
```tsx
videoId="dQw4w9WgXcQ"
```

### Add Custom Thumbnail

**Path:** `public/video-thumbnail.jpg`
**Size:** 1600x900px (16:9 at 2x for retina)
**Format:** JPG or PNG

**Until added:** Shows cream (#F7F5ED) background with play button.

---

## 🚀 Ready to Ship?

Once D1 setup is complete and forms work:

```bash
# Deploy to Cloudflare
npm run deploy

# Test live
curl -X POST https://landing-page.fupsonline.workers.dev/api/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"live-test@example.com","type":"waitlist"}'
```

---

## Current Dev Server

**URL:** http://localhost:3001
**Status:** Running (port 3000 was in use)
**Ready:** ✓

**Open it now to see the UI!**

---

## Summary

**What works:**
- UI/UX (scroll, forms, modal)
- API route (code ready)
- Database schema (file ready)

**What's needed:**
- 3 manual wrangler commands (D1 setup)
- Dev server restart
- Test + deploy

**Time to complete:** ~5 minutes

---

**Questions?** See the docs in `/docs` or `WAITLIST_SETUP.md`
