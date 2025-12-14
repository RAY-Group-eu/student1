import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getSupabaseBrowserClient } from '../supabase/browserClient.js';
import type { Task } from '../supabase/types.js';
import {
  createTask,
  deleteTask,
  listTasksByEvent,
  listTasksByStudyDay,
  updateTask,
  type CreateTaskInput,
  type UpdateTaskInput,
} from '../queries/tasks.js';
import type { TypedSupabaseClient } from '../supabase/typedClient.js';

import { queryKeys } from './queryKeys.js';

export function useTasksByEvent(
  eventId: string,
  supabase: TypedSupabaseClient = getSupabaseBrowserClient()
) {
  return useQuery({
    queryKey: queryKeys.tasksByEvent(eventId),
    queryFn: () => listTasksByEvent(supabase, eventId),
    enabled: Boolean(eventId),
  });
}

export function useTasksByStudyDay(
  eventStudyDayId: string,
  supabase: TypedSupabaseClient = getSupabaseBrowserClient()
) {
  return useQuery({
    queryKey: ['tasks', 'byStudyDay', eventStudyDayId] as const,
    queryFn: () => listTasksByStudyDay(supabase, eventStudyDayId),
    enabled: Boolean(eventStudyDayId),
  });
}

export function useCreateTask(
  eventId: string,
  supabase: TypedSupabaseClient = getSupabaseBrowserClient()
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTaskInput) => createTask(supabase, input),
    onSuccess: (created: Task) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasksByEvent(eventId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.eventTimeline(eventId) });
    },
  });
}

export function useUpdateTask(
  eventId: string,
  supabase: TypedSupabaseClient = getSupabaseBrowserClient()
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateTaskInput) => updateTask(supabase, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasksByEvent(eventId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.eventTimeline(eventId) });
    },
  });
}

export function useDeleteTask(
  eventId: string,
  supabase: TypedSupabaseClient = getSupabaseBrowserClient()
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => deleteTask(supabase, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasksByEvent(eventId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.eventTimeline(eventId) });
    },
  });
}
