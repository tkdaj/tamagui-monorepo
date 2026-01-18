import { createClient } from '@supabase/supabase-js';
import { env } from './env';
import type { Database } from '@my/lib-db';

export const supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
