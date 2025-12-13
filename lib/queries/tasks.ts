import type { TypedSupabaseClient } from '../supabase/typedClient.js';
import type { Database, Task } from '../supabase/types.js';

export async function listTasksByEvent(
  supabase: TypedSupabaseClient,
  eventId: string
): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('event_id', eventId)
    .order('due_at', { ascending: true, nullsFirst: true });

  if (error) throw error;
  return data;
}

export async function listTasksByStudyDay(
  supabase: TypedSupabaseClient,
  eventStudyDayId: string
): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('event_study_day_id', eventStudyDayId)
    .order('due_at', { ascending: true, nullsFirst: true });

  if (error) throw error;
  return data;
}

export type CreateTaskInput = Database['public']['Tables']['tasks']['Insert'];

export async function createTask(
  supabase: TypedSupabaseClient,
  input: CreateTaskInput
): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .insert(input)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export type UpdateTaskInput =
  Database['public']['Tables']['tasks']['Update'] & { id: string };

export async function updateTask(
  supabase: TypedSupabaseClient,
  input: UpdateTaskInput
): Promise<Task> {
  const { id, ...patch } = input;

  const { data, error } = await supabase
    .from('tasks')
    .update(patch)
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTask(
  supabase: TypedSupabaseClient,
  taskId: string
): Promise<void> {
  const { error } = await supabase.from('tasks').delete().eq('id', taskId);
  if (error) throw error;
}
