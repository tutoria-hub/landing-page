-- Migration: Add notes column to leads table
-- Date: 2025-11-13
-- Description: Add optional notes field for demo requests (e.g., preferred dates/times)

ALTER TABLE leads ADD COLUMN notes TEXT;
