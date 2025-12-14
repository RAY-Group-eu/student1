import type { TypedSupabaseClient } from '../supabase/typedClient.js';
import type { Database, Event, EventStudyDay, Task } from '../supabase/types.js';

export type EventTimeline = Event & {
  tasks: Task[];
  event_study_days: EventStudyDay[];
};

export async function getEventTimeline(
  supabase: TypedSupabaseClient,
  eventId: string
): Promise<EventTimeline> {
  const { data, error } = await supabase
    .from('events')
    .select('*, tasks(*), event_study_days(*)')
    .eq('id', eventId)
    .single();

  if (error) throw error;
  return data as unknown as EventTimeline;
}

export type TimelineItem =
  | {
      kind: 'task';
      date: string;
      event_id: string;
      task: Task;
    }
  | {
      kind: 'study_day';
      date: string;
      event_id: string;
      study_day: EventStudyDay;
    };

export type ListTimelineParams = {
  start: string; // ISO date (YYYY-MM-DD) or full ISO string
  end: string; // ISO date (YYYY-MM-DD) or full ISO string
  eventId?: string;
};

export async function listTimelineItems(
  supabase: TypedSupabaseClient,
  params: ListTimelineParams
): Promise<TimelineItem[]> {
  const { start, end, eventId } = params;

  const tasksQuery = supabase
    .from('tasks')
    .select('*')
    .gte('due_at', start)
    .lte('due_at', end);

  const studyDaysQuery = supabase
    .from('event_study_days')
    .select('*')
    .gte('study_date', start)
    .lte('study_date', end);

  const [{ data: tasks, error: tasksError }, { data: studyDays, error: sdError }] =
    await Promise.all([
      eventId ? tasksQuery.eq('event_id', eventId) : tasksQuery,
      eventId ? studyDaysQuery.eq('event_id', eventId) : studyDaysQuery,
    ]);

  if (tasksError) throw tasksError;
  if (sdError) throw sdError;

  const items: TimelineItem[] = [
    ...(tasks ?? []).map((task) => ({
      kind: 'task' as const,
      date: task.due_at ?? task.created_at,
      event_id: task.event_id,
      task,
    })),
    ...(studyDays ?? []).map((study_day) => ({
      kind: 'study_day' as const,
      date: study_day.study_date,
      event_id: study_day.event_id,
      study_day,
    })),
  ];

  items.sort((a, b) => a.date.localeCompare(b.date));

  return items;
}
