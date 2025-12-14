-- Basic post-deploy assertions for RLS policies.
-- Run after applying supabase/schema.sql.

begin;

do $$
declare
  v_missing text[] := '{}'::text[];
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'profiles' and policyname = 'profiles_select'
  ) then
    v_missing := array_append(v_missing, 'profiles_select');
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'profiles' and policyname = 'profiles_insert'
  ) then
    v_missing := array_append(v_missing, 'profiles_insert');
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'profiles' and policyname = 'profiles_update'
  ) then
    v_missing := array_append(v_missing, 'profiles_update');
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'profiles' and policyname = 'profiles_delete'
  ) then
    v_missing := array_append(v_missing, 'profiles_delete');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'events' and policyname = 'events_select'
  ) then
    v_missing := array_append(v_missing, 'events_select');
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'events' and policyname = 'events_insert'
  ) then
    v_missing := array_append(v_missing, 'events_insert');
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'events' and policyname = 'events_update'
  ) then
    v_missing := array_append(v_missing, 'events_update');
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'events' and policyname = 'events_delete'
  ) then
    v_missing := array_append(v_missing, 'events_delete');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'event_study_days' and policyname = 'event_study_days_select'
  ) then
    v_missing := array_append(v_missing, 'event_study_days_select');
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'event_study_days' and policyname = 'event_study_days_insert'
  ) then
    v_missing := array_append(v_missing, 'event_study_days_insert');
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'event_study_days' and policyname = 'event_study_days_update'
  ) then
    v_missing := array_append(v_missing, 'event_study_days_update');
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'event_study_days' and policyname = 'event_study_days_delete'
  ) then
    v_missing := array_append(v_missing, 'event_study_days_delete');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'tasks' and policyname = 'tasks_select'
  ) then
    v_missing := array_append(v_missing, 'tasks_select');
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'tasks' and policyname = 'tasks_insert'
  ) then
    v_missing := array_append(v_missing, 'tasks_insert');
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'tasks' and policyname = 'tasks_update'
  ) then
    v_missing := array_append(v_missing, 'tasks_update');
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'tasks' and policyname = 'tasks_delete'
  ) then
    v_missing := array_append(v_missing, 'tasks_delete');
  end if;

  if array_length(v_missing, 1) is not null then
    raise exception 'Missing RLS policies: %', array_to_string(v_missing, ', ');
  end if;
end $$;

rollback;
