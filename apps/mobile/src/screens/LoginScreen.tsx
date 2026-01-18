import { Alert, Linking } from 'react-native';
import { YStack } from 'tamagui';
import { LoginPage } from '@my/lib-ui';
import { useAuth } from '@my/lib-auth';
import { supabase } from '../lib/supabase';
import { env } from '../lib/env';

export function LoginScreen() {
  const auth = useAuth({
    supabase,
    redirectUrl: env.MOBILE_AUTH_REDIRECT_URL,
    onSuccess: () => {
      Alert.alert('Success', 'Check your email for the sign-in link!');
    },
    onError: (err) => {
      Alert.alert('Error', err.message);
    },
    onOpenUrl: async (url) => {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open browser');
      }
    },
  });

  return (
    <YStack
      style={{
        flexGrow: 1,
        justifyContent: 'center',
        padding: '$4',
        backgroundColor: '$background',
      }}
    >
      <LoginPage
        onGoogleSignIn={async () => {
          await auth.signInWithGoogle();
        }}
        onEmailSignIn={auth.signInWithEmail}
        isBusy={auth.isBusy}
        onError={(err: string) => {
          Alert.alert('Error', err);
        }}
      />
    </YStack>
  );
}
