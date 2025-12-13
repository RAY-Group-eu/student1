import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { getSupabaseEnv } from './env.js';
import type { Database } from './types.js';

let singleton: SupabaseClient<Database> | undefined;

export function getSupabaseBrowserClient(): SupabaseClient<Database> {
  if (singleton) return singleton;

  const { supabaseUrl, supabaseAnonKey } = getSupabaseEnv();

  singleton = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return singleton;
}
