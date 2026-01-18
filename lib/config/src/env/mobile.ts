import { z } from 'zod';
import { sharedEnvSchema } from './shared';

export const mobileEnvSchema = sharedEnvSchema.extend({
  MOBILE_AUTH_REDIRECT_URL: z.string().min(1),
  SENTRY_PROJECT_MOBILE: z.string().optional(),
});

export type MobileEnv = z.infer<typeof mobileEnvSchema>;

export function parseMobileEnv(input: Record<string, unknown>): MobileEnv {
  return mobileEnvSchema.parse(input);
}
