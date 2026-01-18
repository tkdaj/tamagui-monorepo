import { z } from 'zod';
import { sharedEnvSchema } from './shared';

export const webEnvSchema = sharedEnvSchema.extend({
  WEB_AUTH_REDIRECT_URL: z.string().url(),
  SENTRY_PROJECT_WEB: z.string().optional(),
});

export type WebEnv = z.infer<typeof webEnvSchema>;

export function parseWebEnv(input: Record<string, unknown>): WebEnv {
  return webEnvSchema.parse(input);
}
