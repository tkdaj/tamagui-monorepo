import Constants from "expo-constants";
import { parseMobileEnv } from "@my/lib-config/env/mobile";

// Parse and validate env vars at app startup

export const env = parseMobileEnv({
  NODE_ENV: __DEV__ ? "development" : "production",

  SUPABASE_URL: Constants.expoConfig?.extra?.supabaseUrl || "",

  SUPABASE_ANON_KEY: Constants.expoConfig?.extra?.supabaseAnonKey || "",

  MOBILE_AUTH_REDIRECT_URL:
    Constants.expoConfig?.extra?.authRedirectUrl || "com.myproject://auth/callback",

  SENTRY_DSN: Constants.expoConfig?.extra?.sentryDsn,

  SENTRY_RELEASE: Constants.expoConfig?.extra?.sentryRelease,

  SENTRY_ENVIRONMENT: Constants.expoConfig?.extra?.sentryEnvironment,

  SENTRY_PROJECT_MOBILE: Constants.expoConfig?.extra?.sentryProjectMobile,
});
