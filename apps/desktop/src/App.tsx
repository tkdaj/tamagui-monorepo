// Desktop app with simple client-side routing
import { LoginPage } from '@my/lib-ui';
import { useAuth } from '@my/lib-auth';
import { supabase } from './lib/supabase';
import { env } from './lib/env';

export default function App() {
  const auth = useAuth({
    supabase,
    redirectUrl: env.WEB_AUTH_REDIRECT_URL,
    onSuccess: () => {
      alert('Check your email for the login link!');
    },
    onError: (err) => {
      console.error('Sign-in error:', err);
      alert(`Error: ${err.message}`);
    },
    onOpenUrl: (url) => {
      // For desktop Electron, open in external browser
      window.open(url, '_blank');
      return Promise.resolve();
    },
  });

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Desktop App</h1>
      <p>Environment: {env.NODE_ENV}</p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <LoginPage
          onGoogleSignIn={async () => {
            await auth.signInWithGoogle();
          }}
          onEmailSignIn={auth.signInWithEmail}
          isBusy={auth.isBusy}
          onError={(err) => {
            console.error('Sign-in error:', err);
          }}
        />
      </div>
    </div>
  );
}
