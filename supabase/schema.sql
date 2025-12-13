-- Supabase schema for profiles, events, tasks, and event_study_days
--
-- Notes:
-- - All user-owned tables include a user_id column and enforce user_id = auth.uid() via RLS.
-- - tasks may optionally link to event_study_days; study-task linkage is represented by tasks.is_study_task.

create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

-- -----------------------------------------------------------------------------
-- Enums
-- -----------------------------------------------------------------------------

do $$
begin
  if not exists (select 1 from pg_type where typname = 'task_priority') then
    create type public.task_priority as enum ('low', 'medium', 'high', 'urgent');
  end if;

  if not exists (select 1 from pg_type where typname = 'task_status') then
    create type public.task_status as enum ('todo', 'in_progress', 'done', 'cancelled');
  end if;
end $$;

-- -----------------------------------------------------------------------------
-- Timestamp helper
-- -----------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- Tables
-- -----------------------------------------------------------------------------

create table if not exists public.profiles (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  username text,
  full_name text,
  avatar_url text
);

create unique index if not exists profiles_username_unique on public.profiles (lower(username));

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  description text,
  starts_at timestamptz,
  ends_at timestamptz
);

create index if not exists events_user_id_idx on public.events (user_id);
create index if not exists events_starts_at_idx on public.events (starts_at);

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at
before update on public.events
for each row
execute function public.set_updated_at();

create table if not exists public.event_study_days (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  event_id uuid not null references public.events (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  study_date date not null,
  notes text,
  unique (event_id, study_date)
);

create index if not exists event_study_days_user_id_idx on public.event_study_days (user_id);
create index if not exists event_study_days_event_id_idx on public.event_study_days (event_id);
create index if not exists event_study_days_study_date_idx on public.event_study_days (study_date);

drop trigger if exists event_study_days_set_updated_at on public.event_study_days;
create trigger event_study_days_set_updated_at
before update on public.event_study_days
for each row
execute function public.set_updated_at();

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  event_id uuid not null references public.events (id) on delete cascade,
  event_study_day_id uuid references public.event_study_days (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  description text,
  due_at timestamptz,
  priority public.task_priority not null default 'medium',
  status public.task_status not null default 'todo',
  is_study_task boolean not null default false,
  constraint tasks_study_linkage_check check (
    (is_study_task and event_study_day_id is not null)
    or (not is_study_task and event_study_day_id is null)
  )
);

create index if not exists tasks_user_id_idx on public.tasks (user_id);
create index if not exists tasks_event_id_idx on public.tasks (event_id);
create index if not exists tasks_event_study_day_id_idx on public.tasks (event_study_day_id);
create index if not exists tasks_due_at_idx on public.tasks (due_at);

drop trigger if exists tasks_set_updated_at on public.tasks;
create trigger tasks_set_updated_at
before update on public.tasks
for each row
execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- Helper functions
-- -----------------------------------------------------------------------------

create or replace function public.upsert_profile(
  p_username text default null,
  p_full_name text default null,
  p_avatar_url text default null
)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  v_profile public.profiles;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  insert into public.profiles (user_id, username, full_name, avatar_url)
  values (auth.uid(), p_username, p_full_name, p_avatar_url)
  on conflict (user_id)
  do update set
    username = excluded.username,
    full_name = excluded.full_name,
    avatar_url = excluded.avatar_url,
    updated_at = now()
  returning * into v_profile;

  return v_profile;
end;
$$;

revoke all on function public.upsert_profile(text, text, text) from public;
grant execute on function public.upsert_profile(text, text, text) to authenticated;

-- -----------------------------------------------------------------------------
-- Grants
-- -----------------------------------------------------------------------------

grant usage on schema public to authenticated;
grant select, insert, update, delete on table
  public.profiles,
  public.events,
  public.event_study_days,
  public.tasks
to authenticated;

-- -----------------------------------------------------------------------------
-- Row Level Security
-- -----------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.event_study_days enable row level security;
alter table public.tasks enable row level security;

-- PROFILES

drop policy if exists profiles_select on public.profiles;
create policy profiles_select
on public.profiles
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists profiles_insert on public.profiles;
create policy profiles_insert
on public.profiles
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists profiles_update on public.profiles;
create policy profiles_update
on public.profiles
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists profiles_delete on public.profiles;
create policy profiles_delete
on public.profiles
for delete
to authenticated
using (user_id = auth.uid());

-- EVENTS

drop policy if exists events_select on public.events;
create policy events_select
on public.events
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists events_insert on public.events;
create policy events_insert
on public.events
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists events_update on public.events;
create policy events_update
on public.events
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists events_delete on public.events;
create policy events_delete
on public.events
for delete
to authenticated
using (user_id = auth.uid());

-- EVENT_STUDY_DAYS

drop policy if exists event_study_days_select on public.event_study_days;
create policy event_study_days_select
on public.event_study_days
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists event_study_days_insert on public.event_study_days;
create policy event_study_days_insert
on public.event_study_days
for insert
to authenticated
with check (
  user_id = auth.uid()
  and exists (
    select 1
    from public.events e
    where e.id = event_id and e.user_id = auth.uid()
  )
);

drop policy if exists event_study_days_update on public.event_study_days;
create policy event_study_days_update
on public.event_study_days
for update
to authenticated
using (user_id = auth.uid())
with check (
  user_id = auth.uid()
  and exists (
    select 1
    from public.events e
    where e.id = event_id and e.user_id = auth.uid()
  )
);

drop policy if exists event_study_days_delete on public.event_study_days;
create policy event_study_days_delete
on public.event_study_days
for delete
to authenticated
using (user_id = auth.uid());

-- TASKS

drop policy if exists tasks_select on public.tasks;
create policy tasks_select
on public.tasks
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists tasks_insert on public.tasks;
create policy tasks_insert
on public.tasks
for insert
to authenticated
with check (
  user_id = auth.uid()
  and exists (
    select 1
    from public.events e
    where e.id = event_id and e.user_id = auth.uid()
  )
  and (
    event_study_day_id is null
    or exists (
      select 1
      from public.event_study_days sd
      where sd.id = event_study_day_id
        and sd.user_id = auth.uid()
        and sd.event_id = event_id
    )
  )
);

drop policy if exists tasks_update on public.tasks;
create policy tasks_update
on public.tasks
for update
to authenticated
using (user_id = auth.uid())
with check (
  user_id = auth.uid()
  and exists (
    select 1
    from public.events e
    where e.id = event_id and e.user_id = auth.uid()
  )
  and (
    event_study_day_id is null
    or exists (
      select 1
      from public.event_study_days sd
      where sd.id = event_study_day_id
        and sd.user_id = auth.uid()
        and sd.event_id = event_id
    )
  )
);

drop policy if exists tasks_delete on public.tasks;
create policy tasks_delete
on public.tasks
for delete
to authenticated
using (user_id = auth.uid());
