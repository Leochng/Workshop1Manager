'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { ProtectedRoute } from '../../lib/ProtectedRoute'
import { useLanguage } from '@/lib/LanguageContext'

export default function ProfilePage() {
  const [profile, setProfile] = useState({ first_name: '', last_name: '', phone: '', email: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    // Placeholder for fetching profile data
    setLoading(true)
    setError(null)
    setSuccess(null)
    setTimeout(() => {
      setProfile({ first_name: 'John', last_name: 'Doe', phone: '123456789', email: 'john.doe@example.com' })
      setLoading(false)
    }, 500)
  }, [])

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    // Placeholder for updating profile
    setTimeout(() => {
      setSuccess(t('profile.updateSuccess'))
      setLoading(false)
    }, 500)
  }

  const handleLogout = async () => {
    // Placeholder for logout
    router.push('/login')
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">{t('loading')}</div>
  }
  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>
  }

  return (
    <ProtectedRoute>
      <div className="flex items-center justify-center min-h-screen bg-muted/40">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t('profile.title')}</CardTitle>
            <CardDescription>{t('profile.description')}</CardDescription>
          </CardHeader>
          <form onSubmit={handleUpdate}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input id="email" type="email" value={profile.email} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">{t('profile.firstName')}</Label>
                <Input 
                  id="firstName" 
                  type="text" 
                  value={profile.first_name} 
                  onChange={e => setProfile(p => ({ ...p, first_name: e.target.value }))} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t('profile.lastName')}</Label>
                <Input 
                  id="lastName" 
                  type="text" 
                  value={profile.last_name} 
                  onChange={e => setProfile(p => ({ ...p, last_name: e.target.value }))} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t('profile.phoneNumber')}</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={profile.phone} 
                  onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} 
                  required 
                />
              </div>              {error && (
                <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md transition-all duration-300 animate-in fade-in slide-in-from-top">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-sm text-green-500 bg-green-500/10 p-3 rounded-md transition-all duration-300 animate-in fade-in slide-in-from-top">
                  {success}
                </p>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">            <Button 
              className={`w-full transition-opacity duration-200 ${loading ? 'opacity-70' : ''}`} 
              type="submit" 
              disabled={loading}
            >
              <span className={`inline-flex items-center ${loading ? 'animate-pulse' : ''}`}>
                {loading ? t('loading') : t('profile.saveChanges')}
              </span>
              </Button>
              <Button className="w-full" type="button" variant="destructive" onClick={handleLogout}>
                {t('logout')}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </ProtectedRoute>
  )
}