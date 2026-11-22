# LOGESH_OS — Supabase Backend Setup & SQL Instructions

This guide provides the exact SQL to execute in your Supabase project dashboard to initialize the **Snake Hall of Fame** global leaderboard table, indexes, and Row Level Security (RLS) policies.

---

## 1. Project Details & Configured Credentials

- **Project URL:** `https://igdoamdlajduoowdault.supabase.co`
- **Publishable / Anon Key:** `sb_publishable_FpHaCLncaHUJm4jaeXb1Lg_08ze10Aj`
- **Configured File:** `.env.local` (excluded from git)

---

## 2. Step-by-Step Instructions for User

1. Open your Supabase Dashboard: [https://supabase.com/dashboard/project/igdoamdlajduoowdault](https://supabase.com/dashboard/project/igdoamdlajduoowdault)
2. In the left sidebar, click on **SQL Editor**.
3. Click **New query** (or paste into an existing query tab).
4. Copy and paste the complete SQL script below into the editor.
5. Click **Run** (or press `Ctrl+Enter` / `Cmd+Enter`).
6. Confirm that the execution reports `Success: No rows returned`.

---

## 3. SQL Script to Execute

```sql
-- ====================================================================
-- LOGESH_OS: SNAKE ARCADE GLOBAL LEADERBOARD SETUP
-- ====================================================================

-- 1. Create the snake_scores table with strict check constraints
CREATE TABLE IF NOT EXISTS public.snake_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_name VARCHAR(16) NOT NULL CHECK (char_length(trim(player_name)) >= 3 AND char_length(player_name) <= 16),
    score INTEGER NOT NULL CHECK (score >= 0),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create index for fast leaderboard ordering (Score DESC, Earliest Date ASC)
CREATE INDEX IF NOT EXISTS idx_snake_scores_leaderboard 
ON public.snake_scores (score DESC, created_at ASC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.snake_scores ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Allow anyone (anon + authenticated) to view leaderboard entries
DROP POLICY IF EXISTS "Public can view high scores" ON public.snake_scores;
CREATE POLICY "Public can view high scores"
ON public.snake_scores
FOR SELECT
TO public
USING (true);

-- 5. Policy: Allow safe score submissions with server-side validation
DROP POLICY IF EXISTS "Public can submit valid scores" ON public.snake_scores;
CREATE POLICY "Public can submit valid scores"
ON public.snake_scores
FOR INSERT
TO public
WITH CHECK (
    char_length(trim(player_name)) >= 3 
    AND char_length(player_name) <= 16
    AND score >= 0
);

-- 6. Enable Supabase Realtime broadcast for snake_scores
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND schemaname = 'public' 
        AND tablename = 'snake_scores'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.snake_scores;
    END IF;
END $$;
```

---

## 4. Verification

Once executed, any score submitted from `Snake.exe` will instantly appear on:
1. The Desktop **Snake Hall of Fame** widget (`● LIVE`).
2. The in-game **Global Leaderboard** tab (Top 10).
3. In Supabase Dashboard under **Table Editor** -> `snake_scores`.
