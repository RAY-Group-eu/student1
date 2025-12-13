import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getSupabaseBrowserClient } from '../supabase/browserClient.js';
import type { Event } from '../supabase/types.js';
import {
  createEvent,
  deleteEvent,
  getEvent,
  listEvents,
  updateEvent,
  type CreateEventInput,
  type UpdateEventInput,
} from '../queries/events.js';
import type { TypedSupabaseClient } from '../supabase/typedClient.js';

import { queryKeys } from './queryKeys.js';

export function useEvents(supabase: TypedSupabaseClient = getSupabaseBrowserClient()) {
  return useQuery({
    queryKey: queryKeys.events(),
    queryFn: () => listEvents(supabase),
  });
}

export function useEvent(
  eventId: string,
  supabase: TypedSupabaseClient = getSupabaseBrowserClient()
) {
  return useQuery({
    queryKey: queryKeys.event(eventId),
    queryFn: () => getEvent(supabase, eventId),
    enabled: Boolean(eventId),
  });
}

export function useCreateEvent(
  supabase: TypedSupabaseClient = getSupabaseBrowserClient()
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateEventInput) => createEvent(supabase, input),
    onSuccess: (created: Event) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events() });
      queryClient.setQueryData(queryKeys.event(created.id), created);
    },
  });
}

export function useUpdateEvent(
  supabase: TypedSupabaseClient = getSupabaseBrowserClient()
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateEventInput) => updateEvent(supabase, input),
    onSuccess: (updated: Event) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events() });
      queryClient.setQueryData(queryKeys.event(updated.id), updated);
      queryClient.invalidateQueries({ queryKey: queryKeys.eventTimeline(updated.id) });
    },
  });
}

export function useDeleteEvent(
  supabase: TypedSupabaseClient = getSupabaseBrowserClient()
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: string) => deleteEvent(supabase, eventId),
    onSuccess: (_void, eventId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events() });
      queryClient.removeQueries({ queryKey: queryKeys.event(eventId) });
      queryClient.removeQueries({ queryKey: queryKeys.eventTimeline(eventId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.tasksByEvent(eventId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.studyDaysByEvent(eventId) });
    },
  });
}
