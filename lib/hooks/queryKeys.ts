export const queryKeys = {
  profile: (userId: string) => ['profiles', userId] as const,

  events: () => ['events'] as const,
  event: (eventId: string) => ['events', eventId] as const,
  eventTimeline: (eventId: string) => ['events', eventId, 'timeline'] as const,

  tasksByEvent: (eventId: string) => ['tasks', 'byEvent', eventId] as const,
  studyDaysByEvent: (eventId: string) => ['studyDays', 'byEvent', eventId] as const,

  timelineRange: (params: { start: string; end: string; eventId?: string }) =>
    ['timeline', params] as const,
};
