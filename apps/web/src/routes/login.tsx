import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@my/lib-ui";
import { useAuth } from "@my/lib-auth";
import { supabase } from "../lib/supabase";
import { env } from "../lib/env";
import { YStack } from "tamagui";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const auth = useAuth({
    supabase,
    redirectUrl: env.WEB_AUTH_REDIRECT_URL,
    onSuccess: () => {
      alert("Check your email for the login link!");
    },
    onError: (err) => {
      console.error("Sign-in error:", err);
    },
    onOpenUrl: (url) => {
      // For web, the browser automatically redirects
      window.location.href = url;
      return Promise.resolve();
    },
  });

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" minHeight="100vh">
      <LoginPage
        onGoogleSignIn={async () => {
          await auth.signInWithGoogle();
        }}
        onEmailSignIn={auth.signInWithEmail}
        isBusy={auth.isBusy}
        onError={(err) => {
          console.error("Sign-in error:", err);
        }}
      />
    </YStack>
  );
}
