import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { getSupabaseEnv, getSupabaseServiceRoleKey } from './env.js';
import type { Database } from './types.js';

export type CreateSupabaseServerClientOptions = {
  accessToken?: string;
  serviceRole?: boolean;
};

export function createSupabaseServerClient(
  options: CreateSupabaseServerClientOptions = {}
): SupabaseClient<Database> {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseEnv();

  const serviceRoleKey = getSupabaseServiceRoleKey();
  const key = options.serviceRole
    ? serviceRoleKey ?? supabaseAnonKey
    : supabaseAnonKey;

  return createClient<Database>(supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: options.accessToken
      ? {
          headers: {
            Authorization: `Bearer ${options.accessToken}`,
          },
        }
      : undefined,
  });
}
