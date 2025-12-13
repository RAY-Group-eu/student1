import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = path.resolve(__dirname, '../supabase/schema.sql');

test('schema.sql defines required tables and linkage fields', async () => {
  const sql = await fs.readFile(schemaPath, 'utf8');

  const requiredFragments = [
    'create table if not exists public.profiles',
    'create table if not exists public.events',
    'create table if not exists public.tasks',
    'create table if not exists public.event_study_days',
    'is_study_task boolean',
    'event_study_day_id uuid',
    "create type public.task_priority as enum",
    "create type public.task_status as enum",
  ];

  for (const fragment of requiredFragments) {
    assert.ok(
      sql.toLowerCase().includes(fragment.toLowerCase()),
      `Expected schema.sql to contain: ${fragment}`
    );
  }
});

test('schema.sql defines RLS policies enforcing auth.uid()', async () => {
  const sql = await fs.readFile(schemaPath, 'utf8');

  const requiredPolicies = [
    'create policy profiles_select',
    'create policy events_select',
    'create policy event_study_days_select',
    'create policy tasks_select',
  ];

  for (const policy of requiredPolicies) {
    assert.ok(
      sql.toLowerCase().includes(policy.toLowerCase()),
      `Expected schema.sql to contain: ${policy}`
    );
  }

  assert.ok(
    sql.includes('auth.uid()'),
    'Expected schema.sql to reference auth.uid() in policies'
  );
});
