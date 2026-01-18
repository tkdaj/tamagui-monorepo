import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export const Route = createFileRoute('/auth/callback')({
  component: AuthCallback,
});

function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // TanStack Router handles URL parsing, get session from Supabase
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (data.session) {
          // Successfully authenticated, redirect to home
          void router.navigate({ to: '/' });
        } else {
          throw new Error('No session found');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
      }
    };

    void handleCallback();
  }, [router]);

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Authentication Error</h1>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={() => void router.navigate({ to: '/login' })}>Back to Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Completing sign in...</h1>
    </div>
  );
}
