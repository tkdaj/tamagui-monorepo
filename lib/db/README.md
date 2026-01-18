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

This runs `scripts/supabase-types.mjs` which calls the Supabase CLI and writes `lib/db/src/types/database.gen.ts`.

Notes for CI and workflow

- The generated file (`lib/db/src/types/database.gen.ts`) is ignored by default and not committed. This keeps secrets out of the repo and ensures developers generate the latest types locally.
- Recommended options:
  - CI regeneration: Add `SUPABASE_SERVICE_ROLE_KEY` as a secret and run `pnpm db:types` in a protected CI job, then optionally commit the generated types to a branch or artifact for downstream jobs.
  - Commit a stable stub: If you prefer deterministic builds without CI secrets, commit a minimal stub file (e.g., `database.stub.ts`) that exports basic `Json`/`Database` shapes developers can extend; update `package.json` types entry to point to the committed stub.

Developer flow

- Local: run `pnpm db:types` to generate `lib/db/src/types/database.gen.ts` before running the dev server or build.
- CI: prefer regenerating types in CI using a secret and a protected job.
