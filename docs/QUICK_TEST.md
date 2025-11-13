# Quick Test - 5 Minutes

Fast validation that everything works.

---

## Setup (First Time Only)

```bash
# 1. Create database
wrangler d1 create tutoria-leads
# → Copy the database_id

# 2. Add to wrangler.jsonc (after line 9):
  "d1_databases": [
    {
      "binding": "TUTORIA_LEADS_DB",
      "database_name": "tutoria-leads",
      "database_id": "YOUR_DATABASE_ID_HERE"
    }
  ]

# 3. Run migration
wrangler d1 execute tutoria-leads --file=schema/leads.sql
```

---

## Quick Tests

### 1. Start Server (30 seconds)

```bash
npm run dev
```

Open: http://localhost:3000

---

### 2. Test Scroll (15 seconds)

- Click hero "Join the Waitlist" button
- ✓ Smooth scroll to "For Who?" section

---

### 3. Test Waitlist (1 minute)

1. Enter email: `test@example.com`
2. Click "Join Waitlist"
3. ✓ Success message appears
4. ✓ Input clears

**Verify:**
```bash
wrangler d1 execute tutoria-leads --command "SELECT * FROM leads"
```

You should see 1 row with your test email.

---

### 4. Test Demo Modal (1 minute)

1. Click "Request a demo for your institution"
2. ✓ Modal opens
3. Email: `demo@school.edu`
4. Institution: `Test School`
5. Click "Request Demo"
6. ✓ Success message
7. ✓ Modal closes after 2 seconds

**Verify:**
```bash
wrangler d1 execute tutoria-leads --command "SELECT * FROM leads WHERE type='demo'"
```

You should see 1 demo request.

---

### 5. Test Duplicate Prevention (30 seconds)

1. Submit same email again: `test@example.com`
2. ✓ Error: "This email is already registered"

---

### 6. Test API Direct (30 seconds)

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"curl@test.com","type":"waitlist"}'
```

**Expected:**
```json
{
  "success": true,
  "message": "You're on the waitlist! We'll be in touch soon."
}
```

---

## Cleanup

```bash
wrangler d1 execute tutoria-leads --command "DELETE FROM leads"
```

---

## ✅ All Tests Pass?

**Deploy:**
```bash
npm run deploy
```

**Test live:**
https://landing-page.fupsonline.workers.dev/

---

## ❌ Something Broken?

See `docs/TESTING_GUIDE.md` → "Common Issues & Solutions"

**Quick debug:**
1. Check browser console (F12)
2. Check dev server terminal
3. Verify D1 binding in `wrangler.jsonc`
4. Restart dev server

---

**Total time:** ~5 minutes

**Coverage:** Core functionality validated ✓
