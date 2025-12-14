import type { TypedSupabaseClient } from '../supabase/typedClient.js';
import type { Database, Profile } from '../supabase/types.js';

export async function getProfile(
  supabase: TypedSupabaseClient,
  userId: string
): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}

export type UpsertProfileInput = {
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
};

export async function upsertMyProfile(
  supabase: TypedSupabaseClient,
  input: UpsertProfileInput
): Promise<Profile> {
  const { data, error } = await supabase.rpc('upsert_profile', {
    p_username: input.username ?? null,
    p_full_name: input.full_name ?? null,
    p_avatar_url: input.avatar_url ?? null,
  });

  if (error) throw error;
  return data;
}
