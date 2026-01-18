import { z } from 'zod';

export const sharedEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  SENTRY_DSN: z.string().min(1).optional(),
  SENTRY_RELEASE: z.string().min(1).optional(),
  SENTRY_ENVIRONMENT: z.string().min(1).optional(),
});

export type SharedEnv = z.infer<typeof sharedEnvSchema>;

export function parseSharedEnv(input: Record<string, unknown>): SharedEnv {
  return sharedEnvSchema.parse(input);
}
