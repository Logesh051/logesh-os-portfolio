import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface SnakeScore {
  id?: string;
  player_name: string;
  score: number;
  created_at?: string;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabaseInstance: SupabaseClient | null = null;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseAnonKey.includes('placeholder')
  );
};

export const getSupabaseClient = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) return null;
  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
        realtime: {
          params: {
            eventsPerSecond: 10,
          },
        },
      });
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return supabaseInstance;
};

export interface FetchResult {
  data: SnakeScore[];
  error: string | null;
  configured: boolean;
}

export const getLeaderboard = async (limit = 10): Promise<FetchResult> => {
  const client = getSupabaseClient();
  if (!client) {
    return { data: [], error: null, configured: false };
  }

  try {
    const { data, error } = await client
      .from('snake_scores')
      .select('id, player_name, score, created_at')
      .order('score', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('Supabase fetch error:', error);
      return { data: [], error: error.message, configured: true };
    }

    return { data: (data as SnakeScore[]) || [], error: null, configured: true };
  } catch (err: any) {
    console.error('Supabase getLeaderboard exception:', err);
    return { data: [], error: err.message || 'Network error', configured: true };
  }
};

export interface SubmitResult {
  success: boolean;
  error: string | null;
  configured: boolean;
  inserted?: SnakeScore;
}

export const submitScore = async (
  playerName: string,
  score: number
): Promise<SubmitResult> => {
  const trimmed = playerName.trim();
  if (!trimmed || trimmed.length < 3 || trimmed.length > 16) {
    return {
      success: false,
      error: 'Player name must be between 3 and 16 characters.',
      configured: isSupabaseConfigured(),
    };
  }

  if (typeof score !== 'number' || score < 0 || !Number.isFinite(score)) {
    return {
      success: false,
      error: 'Invalid score value.',
      configured: isSupabaseConfigured(),
    };
  }

  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      error: 'Leaderboard database is not configured.',
      configured: false,
    };
  }

  try {
    const { data, error } = await client
      .from('snake_scores')
      .insert([
        {
          player_name: trimmed,
          score: Math.floor(score),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase submit error:', error);
      return {
        success: false,
        error: error.message || 'Failed to submit score.',
        configured: true,
      };
    }

    return {
      success: true,
      error: null,
      configured: true,
      inserted: data?.[0] as SnakeScore,
    };
  } catch (err: any) {
    console.error('Supabase submitScore exception:', err);
    return {
      success: false,
      error: err.message || 'Network error',
      configured: true,
    };
  }
};

export const subscribeToLeaderboard = (onUpdate: () => void): (() => void) => {
  const client = getSupabaseClient();
  if (!client) return () => {};

  try {
    const channel = client
      .channel('public:snake_scores')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'snake_scores' },
        () => {
          onUpdate();
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  } catch (err) {
    console.warn('Realtime subscription error:', err);
    return () => {};
  }
};
