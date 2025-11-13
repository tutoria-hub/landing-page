# Documentation

Documentation for the Tutoria landing page waitlist/demo system.

---

## Quick Links

**Getting Started:**
- [WAITLIST_SETUP.md](../WAITLIST_SETUP.md) - Initial setup (3 manual steps)
- [QUICK_TEST.md](./QUICK_TEST.md) - 5-minute validation

**Testing:**
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Comprehensive test coverage

---

## Architecture Overview

```
User → Form → API Route → D1 Database → Weekly CSV Export → Manual Email
```

**Stack:**
- Next.js 15.5.6 (App Router)
- Cloudflare D1 (serverless SQL)
- OpenNext Cloudflare adapter
- TypeScript

---

## File Structure

```
landing-page/
├── app/
│   ├── api/
│   │   └── leads/
│   │       └── route.ts          # POST /api/leads endpoint
│   ├── components/
│   │   ├── WaitlistForm.tsx      # Inline email form
│   │   ├── DemoModal.tsx         # Modal for demo requests
│   │   └── Header.tsx            # Nav with scroll-to-waitlist CTA
│   └── page.tsx                   # Main landing page
├── schema/
│   └── leads.sql                  # D1 database schema
├── types/
│   └── cloudflare.d.ts           # TypeScript D1 binding types
├── docs/
│   ├── README.md                 # This file
│   ├── QUICK_TEST.md             # 5-minute test
│   └── TESTING_GUIDE.md          # Comprehensive testing
└── WAITLIST_SETUP.md             # Setup instructions
```

---

## Key Features

### 1. Waitlist Form
- Inline form in "For Who?" section
- Email validation
- Duplicate prevention
- Success/error states

### 2. Demo Modal
- Clean modal popup for institutions
- Email + institution name
- Auto-closes after success
- ESC / backdrop click to close

### 3. API Route
- POST `/api/leads`
- Validates input
- Stores to D1
- Returns JSON response

### 4. Database
- D1 serverless SQL
- UNIQUE constraint (email + type)
- IP tracking for spam detection
- Indexed for fast queries

### 5. Scroll UX
- Hero + header CTAs scroll to waitlist section
- Smooth scroll behavior
- Clean user flow

---

## Development Workflow

**Local development:**
```bash
npm run dev                # Next.js dev server (HMR)
```

**Production preview:**
```bash
npm run preview            # Build + local Workers runtime
```

**Deploy:**
```bash
npm run deploy             # Deploy to Cloudflare Workers
```

---

## Data Management

### Export Leads

**All leads:**
```bash
wrangler d1 execute tutoria-leads --command "SELECT * FROM leads ORDER BY created_at DESC"
```

**Waitlist only:**
```bash
wrangler d1 execute tutoria-leads --command "SELECT * FROM leads WHERE type='waitlist' ORDER BY created_at DESC"
```

**Demos only:**
```bash
wrangler d1 execute tutoria-leads --command "SELECT * FROM leads WHERE type='demo' ORDER BY created_at DESC"
```

**Export to CSV:**
```bash
wrangler d1 execute tutoria-leads --command "SELECT * FROM leads ORDER BY created_at DESC" --json | jq -r '.results[] | [.email, .type, .institution, .created_at] | @csv' > leads.csv
```

---

## Database Schema

```sql
CREATE TABLE leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('waitlist', 'demo')),
  institution TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  ip_address TEXT,

  UNIQUE(email, type)
);
```

**Constraints:**
- Same email can't join waitlist twice
- Same email can't request demo twice
- Email CAN be on both waitlist AND request demo (different types)

---

## API Specification

### POST /api/leads

**Request:**
```json
{
  "email": "user@example.com",
  "type": "waitlist" | "demo",
  "institution": "School Name" // Required if type=demo
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "You're on the waitlist! We'll be in touch soon."
}
```

**Error (400):**
```json
{
  "error": "Valid email is required"
}
```

**Error (409 - Duplicate):**
```json
{
  "error": "This email is already registered"
}
```

---

## Environment Variables

**None required!**

D1 binding configured in `wrangler.jsonc`:
```jsonc
{
  "d1_databases": [
    {
      "binding": "TUTORIA_LEADS_DB",
      "database_name": "tutoria-leads",
      "database_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    }
  ]
}
```

---

## Production URLs

**Live site:**
https://landing-page.fupsonline.workers.dev/

**Cloudflare Dashboard:**
https://dash.cloudflare.com/

---

## Future Enhancements

### Email Automation (Phase 2)

When ready:
1. Add Resend or Postmark API key
2. Update `app/api/leads/route.ts` to send confirmation email
3. Zero database changes needed

**Example:**
```typescript
// After successful D1 insert:
await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${env.RESEND_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    from: 'waitlist@tutoria.com',
    to: email,
    subject: 'Welcome to Tutoria Waitlist',
    html: '<p>Thank you for joining!</p>'
  })
});
```

### Analytics (Phase 3)

Track conversion:
- Add Plausible/Fathom analytics
- Track form submissions
- A/B test copy variations

### Admin Dashboard (Phase 4)

Build simple admin:
- View leads in table
- Filter by type/date
- Export CSV via UI
- Mark leads as contacted

---

## Troubleshooting

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) → "Common Issues & Solutions"

**Quick fixes:**
- Restart dev server
- Check browser console (F12)
- Verify D1 binding in `wrangler.jsonc`
- Test API with curl

---

## Support

**Issues?**
1. Check docs in `/docs`
2. Review WAITLIST_SETUP.md
3. Test with QUICK_TEST.md

**Want to modify?**
- Forms: `app/components/WaitlistForm.tsx`, `app/components/DemoModal.tsx`
- API: `app/api/leads/route.ts`
- Database: `schema/leads.sql`

---

## License

Private project - Tutoria Stack
