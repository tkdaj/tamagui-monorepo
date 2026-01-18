Supabase types and regeneration

This package contains the generated TypeScript types for the Supabase database schema.

Generation

1. Install the Supabase CLI: https://supabase.com/docs/guides/cli
2. Ensure you have a service role key available (do NOT commit it):
   - SUPABASE_URL (or SUPABASE_PROJECT_REF)
   - SUPABASE_SERVICE_ROLE_KEY

3. Run from repo root:

```bash
pnpm db:types
```

This runs `scripts/supabase-types.mjs` which calls the Supabase CLI and writes `lib/db/src/types/database.ts`.

Notes for CI

- The generated file is checked into the repository. Regenerate only when the database schema changes.
- If you want CI to regenerate types, store `SUPABASE_SERVICE_ROLE_KEY` as a secret and run `pnpm db:types` in a protected job.
