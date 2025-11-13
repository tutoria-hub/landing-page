# Testing Guide - Waitlist/Demo MVP

Complete testing guide for the D1-backed waitlist and demo request system.

---

## Prerequisites

Before testing, complete the 3-step setup from `WAITLIST_SETUP.md`:

```bash
# 1. Create D1 database
wrangler d1 create tutoria-leads

# 2. Update wrangler.jsonc with database_id

# 3. Run migration
wrangler d1 execute tutoria-leads --file=schema/leads.sql
```

---

## Local Development Testing

### 1. Start Dev Server

```bash
npm run dev
```

Server starts at: http://localhost:3000

### 2. Test Scroll Behavior

**Hero Section:**
- Click "Join the Waitlist" button in hero
- ✓ Should smooth scroll to "For Who?" section

**Header:**
- Click "Join Waitlist" button in header
- ✓ Should smooth scroll to "For Who?" section

---

## Waitlist Form Testing

### Test Case 1: Valid Submission

**Steps:**
1. Scroll to "For Who?" section
2. Enter valid email: `test@example.com`
3. Click "Join Waitlist" button

**Expected:**
- ✓ Button shows "Joining..."
- ✓ Success message: "You're on the waitlist! We'll be in touch soon."
- ✓ Input field clears
- ✓ Green checkmark appears

**Verify in D1:**
```bash
wrangler d1 execute tutoria-leads --command "SELECT * FROM leads WHERE email='test@example.com'"
```

### Test Case 2: Invalid Email

**Steps:**
1. Enter invalid email: `not-an-email`
2. Click "Join Waitlist"

**Expected:**
- ✓ Browser validation prevents submission
- ✓ "Please include an '@' in the email address" message

### Test Case 3: Duplicate Email

**Steps:**
1. Submit same email twice: `test@example.com`

**Expected:**
- ✓ First submission: Success
- ✓ Second submission: Error message "This email is already registered"

### Test Case 4: Network Error

**Steps:**
1. Stop dev server
2. Try to submit form

**Expected:**
- ✓ Error message: "Failed to submit. Please check your connection."

---

## Demo Modal Testing

### Test Case 1: Open Modal

**Steps:**
1. Scroll to "For Who?" section
2. Click "Request a demo for your institution" link

**Expected:**
- ✓ Modal opens with backdrop blur
- ✓ Background scroll disabled
- ✓ Form fields visible

### Test Case 2: Close Modal

**Methods to test:**
1. Click X button (top-right)
2. Press ESC key
3. Click backdrop (outside modal)

**Expected for all:**
- ✓ Modal closes
- ✓ Background scroll re-enabled

### Test Case 3: Valid Demo Submission

**Steps:**
1. Open modal
2. Email: `demo@school.edu`
3. Institution: `Test Elementary School`
4. Click "Request Demo"

**Expected:**
- ✓ Button shows "Submitting..."
- ✓ Success message: "Demo request received! We'll contact you shortly."
- ✓ Modal auto-closes after 2 seconds

**Verify in D1:**
```bash
wrangler d1 execute tutoria-leads --command "SELECT * FROM leads WHERE type='demo'"
```

### Test Case 4: Missing Institution

**Steps:**
1. Open modal
2. Email: `test@test.com`
3. Institution: (leave empty)
4. Click "Request Demo"

**Expected:**
- ✓ Browser validation prevents submission
- ✓ "Please fill out this field" on institution input

### Test Case 5: Duplicate Demo Request

**Steps:**
1. Submit demo request: `demo@school.edu` + `Test School`
2. Submit again with same email + different institution

**Expected:**
- ✓ First submission: Success
- ✓ Second submission: Error "This email is already registered"
- ✓ (Same email can't request demo twice)

---

## API Endpoint Testing (curl)

### Test Waitlist Submission

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"curl-test@example.com","type":"waitlist"}'
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "You're on the waitlist! We'll be in touch soon."
}
```

### Test Demo Submission

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"curl-demo@school.edu","type":"demo","institution":"Curl Test School"}'
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Demo request received! We'll contact you shortly."
}
```

### Test Validation Errors

**Missing email:**
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"type":"waitlist"}'
```

**Expected (400):**
```json
{
  "error": "Valid email is required"
}
```

**Invalid type:**
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","type":"invalid"}'
```

**Expected (400):**
```json
{
  "error": "Type must be 'waitlist' or 'demo'"
}
```

**Demo without institution:**
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","type":"demo"}'
```

**Expected (400):**
```json
{
  "error": "Institution is required for demo requests"
}
```

### Test Duplicate Constraint

```bash
# First submission
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"duplicate@test.com","type":"waitlist"}'

# Second submission (same email + type)
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"duplicate@test.com","type":"waitlist"}'
```

**Expected:**
- First: 201 Success
- Second: 409 Conflict
```json
{
  "error": "This email is already registered"
}
```

---

## Database Verification

### View All Leads

```bash
wrangler d1 execute tutoria-leads --command "SELECT * FROM leads ORDER BY created_at DESC"
```

### Count Leads by Type

```bash
# Waitlist count
wrangler d1 execute tutoria-leads --command "SELECT COUNT(*) as total FROM leads WHERE type='waitlist'"

# Demo count
wrangler d1 execute tutoria-leads --command "SELECT COUNT(*) as total FROM leads WHERE type='demo'"
```

### Check for Duplicates

```bash
wrangler d1 execute tutoria-leads --command "SELECT email, type, COUNT(*) as count FROM leads GROUP BY email, type HAVING count > 1"
```

**Expected:** Empty result (no duplicates allowed)

### View Most Recent Lead

```bash
wrangler d1 execute tutoria-leads --command "SELECT * FROM leads ORDER BY created_at DESC LIMIT 1"
```

---

## Production Testing

### Deploy to Cloudflare

```bash
npm run deploy
```

**Live URL:** https://landing-page.fupsonline.workers.dev/

### Test Production Forms

1. Visit live URL
2. Test waitlist form
3. Test demo modal
4. Verify scrolling behavior

### Check Production Database

```bash
# Use --remote flag for production
wrangler d1 execute tutoria-leads --remote --command "SELECT * FROM leads ORDER BY created_at DESC LIMIT 10"
```

---

## Visual/UX Testing Checklist

### Desktop (1440px)

- [ ] Hero button scrolls smoothly
- [ ] Header button scrolls smoothly
- [ ] Waitlist form centered and readable
- [ ] Demo modal centered and not too wide
- [ ] Input fields have white background
- [ ] Button hover states work
- [ ] Modal backdrop blur visible

### Tablet (768px)

- [ ] Forms stack properly
- [ ] Modal responsive width
- [ ] Buttons full width on mobile
- [ ] Touch targets at least 44px

### Mobile (375px)

- [ ] Single column layout
- [ ] Forms easy to fill on small screen
- [ ] Modal doesn't overflow
- [ ] Keyboard doesn't break layout

---

## Accessibility Testing

### Keyboard Navigation

- [ ] Tab through all form fields
- [ ] ESC closes modal
- [ ] Enter submits forms
- [ ] Focus visible on all interactive elements

### Screen Reader Testing

- [ ] Form labels announced
- [ ] Error messages announced
- [ ] Success messages announced
- [ ] Modal announced when opened

---

## Performance Testing

### Form Submission Speed

**Target:** < 500ms for API response

```bash
time curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"perf-test@test.com","type":"waitlist"}'
```

### Modal Animation

- [ ] Modal opens in < 200ms
- [ ] No layout shift when opening
- [ ] Backdrop blur smooth (no jank)

---

## Error Scenarios

### Database Not Configured

**Simulate:**
1. Comment out D1 binding in `wrangler.jsonc`
2. Restart dev server
3. Try to submit form

**Expected:**
- ✓ 500 error
- ✓ "Database not configured" in console
- ✓ User sees: "Failed to submit. Please try again."

### API Route Unreachable

**Simulate:**
1. Stop dev server
2. Try to submit form

**Expected:**
- ✓ "Failed to submit. Please check your connection."

---

## Data Export Testing

### Export All Leads

```bash
wrangler d1 execute tutoria-leads --command "SELECT * FROM leads ORDER BY created_at DESC"
```

### Export to CSV

```bash
wrangler d1 execute tutoria-leads --command "SELECT email, type, institution, created_at FROM leads ORDER BY created_at DESC" --json | jq -r '.results[] | [.email, .type, .institution, .created_at] | @csv' > leads-export.csv
```

**Verify:**
- [ ] CSV file created
- [ ] All fields present
- [ ] Timestamps readable
- [ ] No missing data

---

## Cleanup After Testing

### Delete Test Leads

```bash
# Delete by email pattern
wrangler d1 execute tutoria-leads --command "DELETE FROM leads WHERE email LIKE '%test%' OR email LIKE '%curl%'"

# Or clear entire table (use with caution!)
wrangler d1 execute tutoria-leads --command "DELETE FROM leads"
```

### Verify Cleanup

```bash
wrangler d1 execute tutoria-leads --command "SELECT COUNT(*) as total FROM leads"
```

---

## Common Issues & Solutions

### Issue: "Database not found"

**Solution:**
```bash
# List databases
wrangler d1 list

# If missing, create it
wrangler d1 create tutoria-leads
```

### Issue: "UNIQUE constraint failed"

**Expected behavior** - database is preventing duplicates.

**Clear data:**
```bash
wrangler d1 execute tutoria-leads --command "DELETE FROM leads WHERE email='duplicate@test.com'"
```

### Issue: Modal won't close

**Solution:**
- Check browser console for errors
- Verify ESC key listener in DemoModal.tsx
- Test clicking backdrop

### Issue: Form doesn't submit

**Debug checklist:**
1. Check dev server is running
2. Check browser console for errors
3. Verify API route at `/api/leads/route.ts`
4. Test with curl to isolate frontend vs backend
5. Check D1 binding in `wrangler.jsonc`

---

## Test Coverage Summary

| Component | Test Cases | Status |
|-----------|-----------|--------|
| Waitlist Form | 4 | ✓ |
| Demo Modal | 5 | ✓ |
| API Endpoint | 7 | ✓ |
| Database | 5 | ✓ |
| UX/Scroll | 2 | ✓ |
| Production | 3 | Pending |

---

## Next Steps

After testing passes:

1. **Production deploy:**
   ```bash
   npm run deploy
   ```

2. **Test live site:**
   - Submit real test lead
   - Verify in production D1
   - Export test data

3. **Weekly routine:**
   ```bash
   # Export leads every Monday
   wrangler d1 execute tutoria-leads --remote --command "SELECT * FROM leads WHERE created_at > DATE('now', '-7 days')" --json > weekly-leads.json
   ```

4. **When ready for email automation:**
   - Add Resend/Postmark API key
   - Update `/api/leads/route.ts` to send emails
   - Test confirmation emails

---

**Testing complete?** Ship it! 🚀

```bash
git push origin main
npm run deploy
```
