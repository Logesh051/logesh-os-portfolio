// Supabase Edge Function: submit-score
// Validates arcade scores server-side and inserts using service_role key

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// In-memory rate limiting map (IP / session -> timestamp)
const rateLimitMap = new Map<string, number>();

serve(async (req: Request) => {
  // 1. Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { player_name, score, session_id } = body;

    // 2. Client IP & Basic Rate Limiting
    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";
    const now = Date.now();
    const rateKey = `${clientIp}:${session_id || "default"}`;
    const lastRequest = rateLimitMap.get(rateKey);

    // Limit to 1 submission every 5 seconds per IP/session
    if (lastRequest && now - lastRequest < 5000) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please wait a few seconds before submitting again." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    rateLimitMap.set(rateKey, now);

    // Clean up old rate limit entries every 100 items
    if (rateLimitMap.size > 100) {
      for (const [k, ts] of rateLimitMap.entries()) {
        if (now - ts > 60000) rateLimitMap.delete(k);
      }
    }

    // 3. Server-side Validation
    if (typeof player_name !== "string") {
      return new Response(
        JSON.stringify({ error: "Player name must be a string." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const trimmedName = player_name.trim();
    if (trimmedName.length < 3 || trimmedName.length > 16) {
      return new Response(
        JSON.stringify({ error: "Player name must be between 3 and 16 characters." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Enforce safe characters (alphanumeric, underscore, hyphen, space)
    const validNameRegex = /^[a-zA-Z0-9_\-\s]+$/;
    if (!validNameRegex.test(trimmedName)) {
      return new Response(
        JSON.stringify({ error: "Player name contains invalid characters." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (typeof score !== "number" || !Number.isInteger(score) || score < 0) {
      return new Response(
        JSON.stringify({ error: "Score must be a positive integer." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Grid size is 20x20 = 400 cells. Max possible score is 400.
    // Enforce reasonable upper limit to reject obvious fake scores.
    if (score > 400) {
      return new Response(
        JSON.stringify({ error: "Score exceeds maximum achievable board limit (400)." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!session_id || typeof session_id !== "string") {
      return new Response(
        JSON.stringify({ error: "Valid game session ID required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 4. Initialize Supabase Admin Client with Server-side Secrets
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Missing server-side Supabase environment variables.");
      return new Response(
        JSON.stringify({ error: "Server configuration error: missing service credentials." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

    // 5. Insert Score with Service Role
    const { data, error } = await supabaseAdmin
      .from("snake_scores")
      .insert([
        {
          player_name: trimmedName,
          score: score,
        },
      ])
      .select("id, player_name, score, created_at")
      .single();

    if (error) {
      console.error("Database insert error:", error);
      return new Response(
        JSON.stringify({ error: error.message || "Failed to record score in database." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: data }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Edge function unexpected exception:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
