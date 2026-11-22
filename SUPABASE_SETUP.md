# LOGESH_OS — Supabase Backend Setup & Configuration Guide

This guide documents the database schema, Row Level Security (RLS) policies, and environment variables for the **Snake Hall of Fame** global leaderboard in LOGESH_OS.

---

## 1. Environment Variables

Create a `.env` file (or set environment variables in your deployment pipeline / GitHub Secrets / Cloudflare):

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...<your-public-anon-key>
```

> **Security Note:** Only the **public `anon` key** is used in the client. Never expose your `service_role` key in frontend code or repository files.

---

## 2. Database Schema (SQL)

Execute the following SQL in your Supabase SQL Editor:

```sql
-- 1. Create the snake_scores table
CREATE TABLE IF NOT EXISTS public.snake_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_name VARCHAR(16) NOT NULL CHECK (char_length(trim(player_name)) >= 3 AND char_length(player_name) <= 16),
    score INTEGER NOT NULL CHECK (score >= 0),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create index for high-speed leaderboard queries
CREATE INDEX IF NOT EXISTS idx_snake_scores_leaderboard 
ON public.snake_scores (score DESC, created_at ASC);

-- 3. Enable Realtime on snake_scores
ALTER PUBLICATION supabase_realtime ADD TABLE public.snake_scores;
```

---

## 3. Row Level Security (RLS) Policies

To protect the database while allowing public reading and submitting scores from the web arcade:

```sql
-- Enable Row Level Security
ALTER TABLE public.snake_scores ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow anyone (anon + authenticated) to view leaderboard scores
CREATE POLICY "Public can view high scores"
ON public.snake_scores
FOR SELECT
TO public
USING (true);

-- Policy 2: Allow anyone to insert their verified game score
CREATE POLICY "Public can submit valid scores"
ON public.snake_scores
FOR INSERT
TO public
WITH CHECK (
    char_length(trim(player_name)) >= 3 
    AND char_length(player_name) <= 16
    AND score >= 0
);
```

---

## 4. Realtime Subscription Setup

In the Supabase Dashboard:
1. Navigate to **Database** -> **Replication**.
2. Ensure the `snake_scores` table is toggled **ON** for realtime broadcast.
3. When new scores are submitted, both the Desktop **Snake Hall of Fame** widget and in-game Leaderboard automatically update in realtime without needing a page refresh.
