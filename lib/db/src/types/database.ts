// Placeholder Supabase types file
// No Supabase credentials were provided when running this script.
// To generate real types, set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
// in your environment, install the Supabase CLI, and run:
//   pnpm db:types

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
