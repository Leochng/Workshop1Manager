'use client';

import { useAuth } from '../../lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function VerifyEmailPage() {
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { user, isVerified, sendVerificationEmail } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    } else if (isVerified) {
      router.replace('/dashboard');
    }
  }, [user, isVerified, router]);

  const handleResendVerification = async () => {
    setResending(true);
    setError(null);
    try {
      await sendVerificationEmail();
      setMessage(t('verify.success'));
    } catch (err: any) {
      setError(err.message || t('verify.error'));
    } finally {
      setResending(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40 p-4">
      <div className="bg-white dark:bg-gray-900 rounded shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-2">{t('verify.title')}</h1>
        <p className="mb-4">
          {t('verify.sent')} <span className="font-semibold">{user?.email}</span>.
        </p>
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
            isVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {isVerified ? t('verify.verified') : t('verify.pending')}
          </span>
        </div>
        {!isVerified && (
          <Button
            onClick={handleResendVerification}
            disabled={resending}
            className="w-full"
          >
            {resending ? t('verify.resending') : t('verify.resend')}
          </Button>
        )}
        {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}