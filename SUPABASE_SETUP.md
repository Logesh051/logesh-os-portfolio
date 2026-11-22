# LOGESH_OS — Supabase Backend Setup & Security Architecture Guide

This document specifies the database schema, Row Level Security (RLS) policies, Edge Function deployment instructions, and realistic security guarantees for the **Snake Hall of Fame** global leaderboard.

---

## 1. Credentials Configuration

Client credentials are stored in `.env.local` (which is excluded from Git via `.gitignore`):

```env
VITE_SUPABASE_URL=https://igdoamdlajduoowdault.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_FpHaCLncaHUJm4jaeXb1Lg_08ze10Aj
```

> **Security Rule:** Never place the Supabase `service_role` key in `.env`, `.env.local`, frontend code, or client bundles. The service-role key is reserved exclusively for the server-side Edge Function.

---

## 2. Corrected Database SQL (Read-Only Public Access)

Execute the following SQL in your Supabase SQL Editor:
[https://supabase.com/dashboard/project/igdoamdlajduoowdault/sql](https://supabase.com/dashboard/project/igdoamdlajduoowdault/sql)

```sql
-- ====================================================================
-- LOGESH_OS: SECURE SNAKE ARCADE LEADERBOARD SCHEMA
-- ====================================================================

-- 1. Create table with strict constraints
CREATE TABLE IF NOT EXISTS public.snake_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_name VARCHAR(16) NOT NULL CHECK (char_length(trim(player_name)) >= 3 AND char_length(player_name) <= 16),
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 400),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Performance index for leaderboard ranking (Score DESC, Earliest Date ASC)
CREATE INDEX IF NOT EXISTS idx_snake_scores_leaderboard 
ON public.snake_scores (score DESC, created_at ASC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.snake_scores ENABLE ROW LEVEL SECURITY;

-- 4. READ POLICY: Allow anyone (anon + authenticated) to view leaderboard entries
DROP POLICY IF EXISTS "Public can view high scores" ON public.snake_scores;
CREATE POLICY "Public can view high scores"
ON public.snake_scores
FOR SELECT
TO public
USING (true);

-- 5. WRITE POLICY: ZERO PUBLIC INSERT ACCESS
-- We explicitly DO NOT create an INSERT policy for public/anon.
-- Only the service_role key (bypassing RLS by default in Supabase)
-- used exclusively inside our backend Edge Function can insert rows.
DROP POLICY IF EXISTS "Public can submit valid scores" ON public.snake_scores;

-- 6. Enable Realtime broadcast for live desktop updates
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

## 3. Server-Side Edge Function: `submit-score`

The function source is located at:
[`supabase/functions/submit-score/index.ts`](file:///C:/Users/Logesh/.gemini/antigravity/scratch/logesh-os/supabase/functions/submit-score/index.ts)

### How It Works
1. **CORS Headers:** Handled safely for web client invocations.
2. **Server-Side Validation:**
   - `player_name`: non-empty string, trimmed, 3–16 characters, alphanumeric/dashes/underscores only.
   - `score`: integer, non-negative, <= 400 (mathematical board limit on 20×20 grid).
   - `session_id`: required unique game session token.
3. **Rate Limiting:** Enforces maximum 1 submission every 5 seconds per IP/session.
4. **Privileged Insertion:** Uses `SUPABASE_SERVICE_ROLE_KEY` to insert into `snake_scores`.

### Deployment Steps (via Supabase CLI)

If you have the Supabase CLI installed:

```bash
# 1. Log in to your Supabase account
supabase login

# 2. Link to your project
supabase link --project-ref igdoamdlajduoowdault

# 3. Deploy the Edge Function
supabase functions deploy submit-score --no-verify-jwt
```

> **Note:** `--no-verify-jwt` allows public web visitors from your portfolio to invoke the function without an authenticated user JWT, while the Edge Function itself performs all authorization and input verification.

### Server-Side Secrets
Supabase automatically injects `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` into the Edge Function runtime environment. If deploying manually, ensure `SUPABASE_SERVICE_ROLE_KEY` is set in the Supabase Dashboard under:
**Project Settings** -> **Edge Functions** -> **Secrets**.

---

## 4. Realistic Security & Anti-Cheat Analysis

### What These Checks DO Guarantee
- **No Direct Database Writes:** Malicious actors cannot use the browser's public anon key to craft direct `supabase.from('snake_scores').insert(...)` calls. PostgreSQL RLS blocks all public INSERTs.
- **Strict Data Sanitization:** Only valid player handles (3–16 characters, safe characters) and realistic scores (0–400) can ever enter the table.
- **Flood / Spam Mitigation:** Rapid multi-submissions from the same IP/session are rejected with HTTP 429.
- **Credential Isolation:** The `service_role` key never touches the browser, client bundle, or repository.

### What These Checks DO NOT Guarantee
- **Client-Authoritative Limitations:** Because the classic Snake game runs client-side in the browser's JavaScript engine, a technical player could modify client-side memory or script variables before dispatching the final score to the Edge Function.
- **Absolute Cheat-Proofing:** Making any game 100% cheat-proof requires **server-authoritative gameplay simulation** (where the server tracks every game tick and validates keystroke timestamps in realtime), which is unnecessary and impractical for an interactive portfolio arcade game.
