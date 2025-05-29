'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { useAuth } from '../../lib/AuthContext'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { user, isVerified } = useAuth()
  const { t } = useLanguage();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      if (user && !isVerified) {
        router.replace('/verify-email')
      } else {
        router.replace('/dashboard')
      }
    } catch (error: any) {
      setError(t('error.login'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="space-y-3 pb-6 md:pb-8">
          <CardTitle className="text-2xl md:text-3xl font-bold text-center tracking-tight">
            {t('title')}
          </CardTitle>
          <CardDescription className="text-base md:text-lg text-center text-muted-foreground/90">
            {t('enterCredentials')}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin} className="space-y-6">
          <CardContent className="space-y-5">
            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-sm md:text-base font-medium text-foreground/90">
                {t('email')}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('enterEmail')}
                required
                className="w-full h-11 text-base transition-shadow focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <div className="space-y-2.5">
              <Label htmlFor="password" className="text-sm md:text-base font-medium text-foreground/90">
                {t('password')}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('enterPassword')}
                required
                className="w-full h-11 text-base transition-shadow focus:ring-2 focus:ring-accent/20"
              />
            </div>
            {error && (
              <p className="text-sm md:text-base text-destructive font-medium text-center bg-destructive/10 p-3 rounded-md">
                {error}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-5 pt-2">
            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground transition-all hover:scale-[1.02] active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? t('loading') : t('signIn')}
            </Button>
            <div className="space-y-4 text-center w-full">
              <p className="text-sm md:text-base text-muted-foreground">{t('noAccount')}</p>              <Link 
                href="/signup" 
                className="inline-flex w-full h-11 items-center justify-center text-base font-semibold text-accent hover:text-accent bg-muted rounded-md no-underline"
              >
                {t('register')}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}