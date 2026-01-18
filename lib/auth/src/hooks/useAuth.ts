import { useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@my/lib-db";

export interface UseAuthOptions {
  supabase: SupabaseClient<Database>;
  redirectUrl: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onOpenUrl?: (url: string) => Promise<void>;
}

export function useAuth({ supabase, redirectUrl, onSuccess, onError, onOpenUrl }: UseAuthOptions) {
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = async () => {
    setIsBusy(true);
    setError(null);
    try {
      const { data, error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (authError) throw authError;

      // For mobile/desktop, open the OAuth URL
      if (data.url) {
        if (onOpenUrl) {
          await onOpenUrl(data.url);
        }
        return data.url;
      }

      if (onSuccess) {
        onSuccess();
      }
      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to sign in with Google";
      setError(errorMessage);
      if (onError) {
        onError(err instanceof Error ? err : new Error(errorMessage));
      }
      throw err;
    } finally {
      setIsBusy(false);
    }
  };

  const signInWithEmail = async (email: string) => {
    if (!email) {
      const err = new Error("Please enter your email");
      setError(err.message);
      onError?.(err);
      throw err;
    }

    setIsBusy(true);
    setError(null);
    try {
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (authError) throw authError;

      onSuccess?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to sign in with email";
      setError(errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
      throw err;
    } finally {
      setIsBusy(false);
    }
  };

  return {
    signInWithGoogle,
    signInWithEmail,
    isBusy,
    error,
    clearError: () => setError(null),
  };
}
