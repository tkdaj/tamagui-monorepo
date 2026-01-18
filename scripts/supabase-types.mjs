#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const outPath = path.resolve(process.cwd(), 'lib/db/src/types/database.ts');
const args = process.argv.slice(2);
const force = args.includes('--force');

function safeWriteStub() {
  const stub = `// Placeholder Supabase types file
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
`;

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, stub, 'utf8');
  console.log('Wrote placeholder types to', outPath);
}

const supabaseUrl = process.env.SUPABASE_URL || process.env.SUPABASE_PROJECT_REF;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !serviceRole) {
  if (!force) {
    console.warn('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY not found in env.');
    console.warn('Skipping generation. Run with --force to write a placeholder into', outPath);
    process.exit(0);
  }
  console.warn('SUPABASE credentials missing — writing placeholder because --force was passed.');
  safeWriteStub();
  process.exit(0);
}

// If we reach here, attempt to run the supabase CLI. This assumes `supabase` is in PATH.
try {
  // Prefer project ref if provided via SUPABASE_PROJECT_REF
  const projectArg = process.env.SUPABASE_PROJECT_REF ? `--project ${process.env.SUPABASE_PROJECT_REF}` : '';
  const cmd = `supabase gen types typescript ${projectArg} > "${outPath}"`;
  console.log('Running:', cmd);
  execSync(cmd, { stdio: 'inherit' });
  // Try to format with Prettier if available
  try {
    execSync(`npx prettier --write "${outPath}"`, { stdio: 'ignore' });
  } catch (e) {}
  console.log('Generated supabase types at', outPath);
} catch (err) {
  console.error('Failed to run supabase CLI to generate types:', err.message ?? err);
  console.error('You can generate types manually and place them at', outPath);
  process.exit(1);
}
