-- ================================================================
-- SpendSmart — Supabase Database Setup
-- Run this in your Supabase project: Dashboard → SQL Editor
-- ================================================================

-- 1. Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title          TEXT NOT NULL,
  amount         NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
  category       TEXT NOT NULL DEFAULT 'Other',
  date           DATE NOT NULL,
  notes          TEXT,
  ai_categorized BOOLEAN DEFAULT false,
  created_at     TIMESTAMPTZ DEFAULT now()
);

-- 2. Index for fast user queries
CREATE INDEX IF NOT EXISTS expenses_user_id_idx ON expenses(user_id);
CREATE INDEX IF NOT EXISTS expenses_date_idx    ON expenses(date DESC);

-- 3. Row Level Security — users can only see/edit their own expenses
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own expenses"
  ON expenses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own expenses"
  ON expenses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own expenses"
  ON expenses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own expenses"
  ON expenses FOR DELETE
  USING (auth.uid() = user_id);
