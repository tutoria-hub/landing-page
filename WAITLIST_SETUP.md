# Waitlist/Demo MVP - Setup Guide

This guide contains the **manual steps** you need to complete to activate the waitlist/demo functionality.

## What's Already Done ✅

- SQL schema created (`schema/leads.sql`)
- TypeScript types defined (`types/cloudflare.d.ts`)
- API route implemented (`app/api/leads/route.ts`)
- Waitlist form component (`app/components/WaitlistForm.tsx`)
- Demo form component (`app/components/DemoForm.tsx`)
- Forms integrated into landing page (`app/page.tsx`)
- Local dev configured (`next.config.mjs`)

## Manual Steps Required 🔧

### Step 1: Create D1 Database

```bash
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

**Copy the `database_id`** - you'll need it for Step 2.

---

### Step 2: Update wrangler.jsonc

Add this D1 binding configuration to `wrangler.jsonc`:

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
  // ADD THIS:
  "d1_databases": [
    {
      "binding": "TUTORIA_LEADS_DB",
      "database_name": "tutoria-leads",
      "database_id": "YOUR_DATABASE_ID_FROM_STEP_1"
    }
  ]
}
```

**Important:** Replace `YOUR_DATABASE_ID_FROM_STEP_1` with the actual database ID from Step 1.

---

### Step 3: Run Database Migration

```bash
wrangler d1 execute tutoria-leads --file=schema/leads.sql
```

**Expected output:**
```
🌀 Executing on tutoria-leads (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx):
🌀 To execute on your remote database, add a --remote flag to your wrangler command.
✅ Executed 3 commands in 0.123 seconds
```

---

### Step 4: Verify Database

```bash
wrangler d1 execute tutoria-leads --command "SELECT name FROM sqlite_master WHERE type='table'"
```

**Expected output:**
```
┌───────┐
│ name  │
├───────┤
│ leads │
└───────┘
```

---

### Step 5: Run Migration (if database already exists)

If you've already created the database before, run this migration to add the notes column:

```bash
wrangler d1 execute tutoria-leads --file=schema/migrations/001_add_notes_column.sql
```

**Expected output:**
```
🌀 Executing on tutoria-leads (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx):
✅ Executed 1 command in 0.050 seconds
```

**Note:** This step is only needed if you already have a database running. New installations will get the notes column automatically from the base schema.

---

## Testing

### Local Development

```bash
npm run dev
```

Open http://localhost:3000 and test the waitlist form.

### Test with curl

```bash
# Test waitlist submission
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","type":"waitlist"}'

# Test demo request (with optional notes)
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","type":"demo","institution":"Test School","notes":"Prefer Tuesday or Thursday mornings"}'
```

### Verify Data

```bash
wrangler d1 execute tutoria-leads --command "SELECT * FROM leads"
```

---

## Exporting Leads (Weekly)

### Export All Leads (CSV format)

```bash
wrangler d1 execute tutoria-leads --command "SELECT email, type, institution, notes, created_at FROM leads ORDER BY created_at DESC" --json | jq -r '.results[] | [.email, .type, .institution, .notes, .created_at] | @csv'
```

### Export Just Waitlist

```bash
wrangler d1 execute tutoria-leads --command "SELECT email, created_at FROM leads WHERE type='waitlist' ORDER BY created_at DESC" --json | jq -r '.results[] | [.email, .created_at] | @csv'
```

### Export Just Demos

```bash
wrangler d1 execute tutoria-leads --command "SELECT email, institution, notes, created_at FROM leads WHERE type='demo' ORDER BY created_at DESC" --json | jq -r '.results[] | [.email, .institution, .notes, .created_at] | @csv'
```

### Export to File

```bash
wrangler d1 execute tutoria-leads --command "SELECT * FROM leads ORDER BY created_at DESC" --json | jq -r '.results[] | [.email, .type, .institution, .created_at] | @csv' > leads-export-$(date +%Y-%m-%d).csv
```

---

## Production Deployment

```bash
npm run deploy
```

The D1 binding will automatically be available in production.

---

## Future: Add Email Automation

When ready to add automatic confirmation emails:

1. Sign up for Resend or Postmark
2. Add API key to wrangler secrets:
   ```bash
   wrangler secret put RESEND_API_KEY
   ```
3. Update `app/api/leads/route.ts` to send email after successful insert
4. No database changes needed!

---

## Troubleshooting

### "Database not configured" error

- Verify `wrangler.jsonc` has the D1 binding
- Verify `database_id` matches the one from Step 1
- Restart dev server: `npm run dev`

### "UNIQUE constraint" error

- Expected behavior! Email already exists in database
- User sees: "This email is already registered"

### Empty results when exporting

- No leads submitted yet
- Test the forms first, then export

---

## Summary

**Run these 3 commands:**
1. `wrangler d1 create tutoria-leads` → Copy database_id
2. Update `wrangler.jsonc` with database_id
3. `wrangler d1 execute tutoria-leads --file=schema/leads.sql`

**Then test:**
- `npm run dev`
- Submit form at http://localhost:3000
- Export: `wrangler d1 execute tutoria-leads --command "SELECT * FROM leads"`

**Ship it:**
- `npm run deploy`

Done! 🚀
