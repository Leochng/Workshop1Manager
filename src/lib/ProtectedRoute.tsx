import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';

export const ProtectedRoute = ({ children, requireVerified = true }: { children: React.ReactNode, requireVerified?: boolean }) => {
  const { user, loading, isVerified } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/login');
      } else if (requireVerified && !isVerified) {
        router.replace('/verify-email');
      }
    }
  }, [user, loading, isVerified, requireVerified, router]);

  if (loading || !user || (requireVerified && !isVerified)) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return <>{children}</>;
}; 