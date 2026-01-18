import { createClient } from '@supabase/supabase-js';
import type { Database } from '@my/lib-db';
import type { SessionStorage } from '../storage/types';

export interface CreateSupabaseClientOptions {
  url: string;
  anonKey: string;
  storage: SessionStorage;
}

export function createSupabaseClient(opts: CreateSupabaseClientOptions) {
  const { url, anonKey, storage } = opts;
  return createClient<Database>(url, anonKey, {
    auth: {
      storage: {
        getItem: (k) => storage.getItem(k),
        setItem: (k, v) => storage.setItem(k, v),
        removeItem: (k) => storage.removeItem(k),
      },
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}
