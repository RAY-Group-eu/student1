import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import pg from 'pg';

const { Client } = pg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('Missing DATABASE_URL. Point it at your Supabase local Postgres instance.');
  console.error('Example: postgresql://postgres:postgres@localhost:54322/postgres');
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = path.resolve(__dirname, '../supabase/schema.sql');
const schemaSql = await fs.readFile(schemaPath, 'utf8');

const client = new Client({ connectionString: databaseUrl });

const expectedPolicies = [
  'profiles_select',
  'profiles_insert',
  'profiles_update',
  'profiles_delete',
  'events_select',
  'events_insert',
  'events_update',
  'events_delete',
  'event_study_days_select',
  'event_study_days_insert',
  'event_study_days_update',
  'event_study_days_delete',
  'tasks_select',
  'tasks_insert',
  'tasks_update',
  'tasks_delete',
];

try {
  await client.connect();
  await client.query('begin');

  await client.query(schemaSql);

  const { rows: policyRows } = await client.query(
    "select policyname from pg_policies where schemaname = 'public' and tablename in ('profiles','events','event_study_days','tasks')"
  );

  const found = new Set(policyRows.map((r) => r.policyname));
  const missing = expectedPolicies.filter((p) => !found.has(p));

  if (missing.length) {
    throw new Error(`Missing RLS policies: ${missing.join(', ')}`);
  }

  const { rows: rlsRows } = await client.query(
    "select c.relname as table_name, c.relrowsecurity as rls_enabled from pg_class c join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' and c.relname in ('profiles','events','event_study_days','tasks')"
  );

  const rlsDisabled = rlsRows.filter((r) => !r.rls_enabled).map((r) => r.table_name);
  if (rlsDisabled.length) {
    throw new Error(`RLS not enabled on tables: ${rlsDisabled.join(', ')}`);
  }

  console.log('Schema applied and RLS policies are present.');
} finally {
  try {
    await client.query('rollback');
  } catch {
    // ignore
  }

  await client.end().catch(() => undefined);
}
