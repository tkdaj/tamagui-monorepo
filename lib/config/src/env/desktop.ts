import { z } from 'zod';
import { sharedEnvSchema } from './shared';

export const desktopEnvSchema = sharedEnvSchema.extend({
  DESKTOP_AUTH_REDIRECT_URL: z.string().min(1),
  SENTRY_PROJECT_DESKTOP: z.string().optional(),
});

export type DesktopEnv = z.infer<typeof desktopEnvSchema>;

export function parseDesktopEnv(input: Record<string, unknown>): DesktopEnv {
  return desktopEnvSchema.parse(input);
}
