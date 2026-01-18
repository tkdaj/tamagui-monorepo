import { createSupabaseClient } from "@my/lib-auth";
import { env } from "./env";
import { mobileStorage } from "./storage";

export const supabase = createSupabaseClient({
  url: env.SUPABASE_URL,

  anonKey: env.SUPABASE_ANON_KEY,

  storage: mobileStorage,
});
