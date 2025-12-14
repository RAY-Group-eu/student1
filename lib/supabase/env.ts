type RequiredEnv = {
  supabaseUrl: string;
  supabaseAnonKey: string;
};

function readEnv(key: string): string | undefined {
  return typeof process !== 'undefined' ? process.env[key] : undefined;
}

export function getSupabaseEnv(): RequiredEnv {
  const supabaseUrl =
    readEnv('NEXT_PUBLIC_SUPABASE_URL') ??
    readEnv('SUPABASE_URL') ??
    '';

  const supabaseAnonKey =
    readEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') ??
    readEnv('SUPABASE_ANON_KEY') ??
    '';

  if (!supabaseUrl) {
    throw new Error(
      'Missing Supabase URL. Set NEXT_PUBLIC_SUPABASE_URL (browser) or SUPABASE_URL (server).'
    );
  }

  if (!supabaseAnonKey) {
    throw new Error(
      'Missing Supabase anon key. Set NEXT_PUBLIC_SUPABASE_ANON_KEY (browser) or SUPABASE_ANON_KEY (server).'
    );
  }

  return { supabaseUrl, supabaseAnonKey };
}

export function getSupabaseServiceRoleKey(): string | undefined {
  return readEnv('SUPABASE_SERVICE_ROLE_KEY');
}
