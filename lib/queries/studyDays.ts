import type { TypedSupabaseClient } from '../supabase/typedClient.js';
import type { Database, EventStudyDay } from '../supabase/types.js';

export async function listStudyDaysByEvent(
  supabase: TypedSupabaseClient,
  eventId: string
): Promise<EventStudyDay[]> {
  const { data, error } = await supabase
    .from('event_study_days')
    .select('*')
    .eq('event_id', eventId)
    .order('study_date', { ascending: true });

  if (error) throw error;
  return data;
}

export type CreateStudyDayInput =
  Database['public']['Tables']['event_study_days']['Insert'];

export async function createStudyDay(
  supabase: TypedSupabaseClient,
  input: CreateStudyDayInput
): Promise<EventStudyDay> {
  const { data, error } = await supabase
    .from('event_study_days')
    .insert(input)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export type UpdateStudyDayInput =
  Database['public']['Tables']['event_study_days']['Update'] & { id: string };

export async function updateStudyDay(
  supabase: TypedSupabaseClient,
  input: UpdateStudyDayInput
): Promise<EventStudyDay> {
  const { id, ...patch } = input;

  const { data, error } = await supabase
    .from('event_study_days')
    .update(patch)
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function deleteStudyDay(
  supabase: TypedSupabaseClient,
  id: string
): Promise<void> {
  const { error } = await supabase.from('event_study_days').delete().eq('id', id);
  if (error) throw error;
}
