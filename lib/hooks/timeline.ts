import { useQuery } from '@tanstack/react-query';

import { getSupabaseBrowserClient } from '../supabase/browserClient.js';
import {
  getEventTimeline,
  listTimelineItems,
  type EventTimeline,
  type ListTimelineParams,
  type TimelineItem,
} from '../queries/timeline.js';
import type { TypedSupabaseClient } from '../supabase/typedClient.js';

import { queryKeys } from './queryKeys.js';

export function useEventTimeline(
  eventId: string,
  supabase: TypedSupabaseClient = getSupabaseBrowserClient()
) {
  return useQuery<EventTimeline>({
    queryKey: queryKeys.eventTimeline(eventId),
    queryFn: () => getEventTimeline(supabase, eventId),
    enabled: Boolean(eventId),
  });
}

export function useTimelineRange(
  params: ListTimelineParams,
  supabase: TypedSupabaseClient = getSupabaseBrowserClient()
) {
  return useQuery<TimelineItem[]>({
    queryKey: queryKeys.timelineRange(params),
    queryFn: () => listTimelineItems(supabase, params),
  });
}
