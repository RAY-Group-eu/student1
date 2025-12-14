# Supabase schema + typed clients/hooks

This repo contains:

- `supabase/schema.sql`: Postgres schema for `profiles`, `events`, `tasks`, `event_study_days` + enums + RLS.
- `supabase/migrations/0001_init.sql`: migration copy of `schema.sql` (usable with Supabase CLI).
- `lib/`: Supabase browser/server clients, typed helpers, and TanStack Query hooks for CRUD + timeline queries.
- `supabase/tests/rls_compile.sql` + `scripts/verify-rls.mjs`: lightweight checks to ensure policies exist and compile.

## Environment variables

Create a `.env` (see `.env.example`).

Required for browser usage:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Optional for server usage:

- `SUPABASE_URL` (fallback when `NEXT_PUBLIC_SUPABASE_URL` is not set)
- `SUPABASE_ANON_KEY` (fallback when `NEXT_PUBLIC_SUPABASE_ANON_KEY` is not set)
- `SUPABASE_SERVICE_ROLE_KEY` (for server-to-server/admin operations)

Optional for the DB verification script:

- `DATABASE_URL` (e.g. Supabase local: `postgresql://postgres:postgres@localhost:54322/postgres`)

## Local development (Supabase CLI)

1. Install the Supabase CLI: https://supabase.com/docs/guides/cli
2. Start local stack:

```bash
supabase start
```

3. Apply migrations:

```bash
supabase db reset
```

If you want to apply the schema directly without migrations:

```bash
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f supabase/schema.sql
```

You can also run the policy assertions:

```bash
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f supabase/schema.sql -f supabase/tests/rls_compile.sql
```

## RLS verification

### Static checks (no DB required)

```bash
npm test
```

### Compile + policy presence check (requires a database)

```bash
npm run verify:rls
```

This runs `supabase/schema.sql` inside a transaction and verifies that the expected RLS policies exist.

## Schema notes

- All user-owned tables include a `user_id` column and have RLS policies enforcing `user_id = auth.uid()`.
- Study-task linkage:
  - `tasks.is_study_task` flags a task as a study task.
  - `tasks.event_study_day_id` must be non-null when `is_study_task = true`, and must be null when `is_study_task = false` (enforced by a CHECK constraint).

## Using the clients/hooks

```ts
import {
  getSupabaseBrowserClient,
  useEvents,
  useEventTimeline,
  useCreateTask,
} from './lib/index.js';

const supabase = getSupabaseBrowserClient();

// In React
// const { data: events } = useEvents(supabase)
// const { data: timeline } = useEventTimeline(eventId, supabase)
// const createTask = useCreateTask(eventId, supabase)
```
