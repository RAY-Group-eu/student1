import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getSupabaseBrowserClient } from '../supabase/browserClient.js';
import type { Profile } from '../supabase/types.js';
import {
  getProfile,
  upsertMyProfile,
  type UpsertProfileInput,
} from '../queries/profiles.js';
import type { TypedSupabaseClient } from '../supabase/typedClient.js';

import { queryKeys } from './queryKeys.js';

export function useProfile(
  userId: string,
  supabase: TypedSupabaseClient = getSupabaseBrowserClient()
) {
  return useQuery<Profile>({
    queryKey: queryKeys.profile(userId),
    queryFn: () => getProfile(supabase, userId),
    enabled: Boolean(userId),
  });
}

export function useUpsertMyProfile(
  supabase: TypedSupabaseClient = getSupabaseBrowserClient()
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpsertProfileInput) => upsertMyProfile(supabase, input),
    onSuccess: (profile: Profile) => {
      queryClient.setQueryData(queryKeys.profile(profile.user_id), profile);
    },
  });
}
