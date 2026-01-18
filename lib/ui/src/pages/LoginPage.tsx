import { useState } from 'react';
import { YStack, XStack, Text, Separator } from 'tamagui';
import { Button, Input } from '../atoms';

export interface LoginPageProps {
  onGoogleSignIn: () => Promise<void>;
  onEmailSignIn: (email: string) => Promise<void>;
  isBusy?: boolean;
  onError?: (error: string) => void;
}

export function LoginPage({
  onGoogleSignIn,
  onEmailSignIn,
  isBusy = false,
  onError,
}: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setLocalError(null);
      await onGoogleSignIn();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign in with Google';
      setLocalError(message);
      onError?.(message);
    }
  };

  const handleEmailSignIn = async () => {
    if (!email) {
      const message = 'Please enter your email';
      setLocalError(message);
      onError?.(message);
      return;
    }
    try {
      setLocalError(null);
      await onEmailSignIn(email);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign in with email';
      setLocalError(message);
      onError?.(message);
    }
  };

  return (
    <YStack maxWidth={400} width="100%" margin="auto" padding="$6" space="$4" alignItems="center">
      <Text fontSize="$8" fontWeight="bold" marginBottom="$4">
        Sign In
      </Text>

      {localError && (
        <YStack
          backgroundColor="$red2"
          borderColor="$red7"
          borderWidth={1}
          borderRadius="$4"
          padding="$3"
          width="100%"
        >
          <Text color="$red11">{localError}</Text>
        </YStack>
      )}

      <Button onPress={handleGoogleSignIn} disabled={isBusy} variant="primary">
        {isBusy ? 'Signing in...' : 'Sign in with Google'}
      </Button>

      <XStack alignItems="center" space="$3" width="100%" paddingVertical="$2">
        <Separator flex={1} />
        <Text color="$gray10">or</Text>
        <Separator flex={1} />
      </XStack>

      <Input
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="your@email.com"
        disabled={isBusy}
      />

      <Button onPress={handleEmailSignIn} disabled={isBusy || !email} variant="secondary">
        {isBusy ? 'Sending...' : 'Sign in with Email'}
      </Button>
    </YStack>
  );
}
