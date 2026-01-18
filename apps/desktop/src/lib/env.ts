import { parseWebEnv } from "@my/lib-config/env/web";

// Parse and validate env vars at app startup - using desktop-specific env
export const env = parseWebEnv({
  NODE_ENV: import.meta.env.MODE || "development",
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  WEB_AUTH_REDIRECT_URL: import.meta.env.VITE_WEB_AUTH_REDIRECT_URL,
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  SENTRY_RELEASE: import.meta.env.VITE_SENTRY_RELEASE,
  SENTRY_ENVIRONMENT: import.meta.env.VITE_SENTRY_ENVIRONMENT,
  SENTRY_PROJECT_WEB: import.meta.env.VITE_SENTRY_PROJECT_WEB,
});
