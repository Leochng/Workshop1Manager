import { useAuth } from '../../lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function VerifyEmailPage() {
  const { user, isVerified, sendVerificationEmail } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [checking, setChecking] = useState(false);

  // Poll for verification status
  useEffect(() => {
    if (isVerified) {
      setMessage('Email verified! Redirecting...');
      setTimeout(() => router.replace('/dashboard'), 1500);
      return;
    }
    setChecking(true);
    const interval = setInterval(async () => {
      if (user) await user.reload();
    }, 3000);
    return () => {
      clearInterval(interval);
      setChecking(false);
    };
  }, [isVerified, user, router]);

  const handleResend = async () => {
    setResending(true);
    setMessage(null);
    setError(null);
    try {
      await sendVerificationEmail();
      setMessage('Verification email sent! Please check your inbox.');
    } catch (err: any) {
      setError(err.message || 'Failed to send verification email.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40 p-4">
      <div className="bg-white dark:bg-gray-900 rounded shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
        <p className="mb-4">A verification email has been sent to <span className="font-semibold">{user?.email}</span>.</p>
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${isVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {isVerified ? 'Verified' : 'Pending Verification'}
          </span>
        </div>
        <p className="mb-4">Please check your inbox and click the verification link.</p>
        {checking && !isVerified && <p className="text-sm text-muted-foreground mb-2">Checking verification status...</p>}
        {message && <p className="text-green-600 mb-2">{message}</p>}
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <Button onClick={handleResend} disabled={resending} className="w-full">
          {resending ? 'Sending...' : 'Resend Verification Email'}
        </Button>
        <p className="text-sm text-muted-foreground mt-4">Once verified, you will be redirected automatically.</p>
      </div>
    </div>
  );
} 