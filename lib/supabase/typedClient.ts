import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from './types.js';

export type TypedSupabaseClient = SupabaseClient<Database>;
