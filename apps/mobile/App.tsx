import { StatusBar } from "expo-status-bar";
import { LoginPage } from "@my/lib-ui";
import { TamaguiProvider, type TamaguiProviderProps, YStack } from "tamagui";
import config from "./tamagui.config";

export default function App() {
  const handleGoogleSignIn = async () => {
    // TODO: Implement Google Sign In
    await Promise.resolve();
  };

  const handleEmailSignIn = async (email: string) => {
    // TODO: Implement Email Sign In
    await Promise.resolve(email);
  };

  return (
    <TamaguiProvider config={config as TamaguiProviderProps["config"]}>
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background">
        <LoginPage onGoogleSignIn={handleGoogleSignIn} onEmailSignIn={handleEmailSignIn} />
        <StatusBar style="auto" />
      </YStack>
    </TamaguiProvider>
  );
}
