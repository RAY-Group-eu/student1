import type { TypedSupabaseClient } from '../supabase/typedClient.js';
import type { Database, Event } from '../supabase/types.js';

export async function listEvents(
  supabase: TypedSupabaseClient
): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('starts_at', { ascending: true, nullsFirst: true });

  if (error) throw error;
  return data;
}

export async function getEvent(
  supabase: TypedSupabaseClient,
  eventId: string
): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', eventId)
    .single();

  if (error) throw error;
  return data;
}

export type CreateEventInput = Database['public']['Tables']['events']['Insert'];

export async function createEvent(
  supabase: TypedSupabaseClient,
  input: CreateEventInput
): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .insert(input)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export type UpdateEventInput =
  Database['public']['Tables']['events']['Update'] & { id: string };

export async function updateEvent(
  supabase: TypedSupabaseClient,
  input: UpdateEventInput
): Promise<Event> {
  const { id, ...patch } = input;

  const { data, error } = await supabase
    .from('events')
    .update(patch)
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function deleteEvent(
  supabase: TypedSupabaseClient,
  eventId: string
): Promise<void> {
  const { error } = await supabase.from('events').delete().eq('id', eventId);
  if (error) throw error;
}
