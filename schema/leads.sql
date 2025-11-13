-- Leads table for waitlist and demo requests
-- Designed for manual CSV export + email outreach

CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('waitlist', 'demo')),
  institution TEXT, -- NULL for waitlist, filled for demo requests
  notes TEXT, -- Optional notes (e.g., preferred dates/times for demos)
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  ip_address TEXT, -- For spam detection

  -- Prevent duplicate emails per type
  UNIQUE(email, type)
);

-- Index for fast export queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_type ON leads(type);
