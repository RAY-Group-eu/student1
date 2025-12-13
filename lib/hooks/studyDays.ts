import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getSupabaseBrowserClient } from '../supabase/browserClient.js';
import type { EventStudyDay } from '../supabase/types.js';
import {
  createStudyDay,
  deleteStudyDay,
  listStudyDaysByEvent,
  updateStudyDay,
  type CreateStudyDayInput,
  type UpdateStudyDayInput,
} from '../queries/studyDays.js';
import type { TypedSupabaseClient } from '../supabase/typedClient.js';

import { queryKeys } from './queryKeys.js';

export function useStudyDaysByEvent(
  eventId: string,
  supabase: TypedSupabaseClient = getSupabaseBrowserClient()
) {
  return useQuery({
    queryKey: queryKeys.studyDaysByEvent(eventId),
    queryFn: () => listStudyDaysByEvent(supabase, eventId),
    enabled: Boolean(eventId),
  });
}

export function useCreateStudyDay(
  eventId: string,
  supabase: TypedSupabaseClient = getSupabaseBrowserClient()
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateStudyDayInput) => createStudyDay(supabase, input),
    onSuccess: (created: EventStudyDay) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.studyDaysByEvent(eventId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.eventTimeline(eventId) });
    },
  });
}

export function useUpdateStudyDay(
  eventId: string,
  supabase: TypedSupabaseClient = getSupabaseBrowserClient()
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateStudyDayInput) => updateStudyDay(supabase, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.studyDaysByEvent(eventId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.eventTimeline(eventId) });
    },
  });
}

export function useDeleteStudyDay(
  eventId: string,
  supabase: TypedSupabaseClient = getSupabaseBrowserClient()
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteStudyDay(supabase, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.studyDaysByEvent(eventId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.eventTimeline(eventId) });
    },
  });
}
