'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const [profile, setProfile] = useState({ first_name: '', last_name: '', phone: '', email: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      setError(null)
      setSuccess(null)
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        setError('You must be signed in to view your profile.')
        setLoading(false)
        return
      }
      const { data, error: profileError } = await supabase.from('profiles').select('first_name, last_name, phone').eq('id', user.id).single()
      if (profileError) {
        setError('Could not fetch profile: ' + profileError.message)
        setLoading(false)
        return
      }
      setProfile({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        phone: data.phone || '',
        email: user.email || '',
      })
      setLoading(false)
    }
    fetchProfile()
  }, [])

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('You must be signed in to update your profile.')
      setLoading(false)
      return
    }
    const { error: updateError } = await supabase.from('profiles').update({
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone: profile.phone,
    }).eq('id', user.id)
    if (updateError) {
      setError('Failed to update profile: ' + updateError.message)
    } else {
      setSuccess('Profile updated successfully!')
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }
  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">My Profile</CardTitle>
          <CardDescription>View and edit your profile information.</CardDescription>
        </CardHeader>
        <form onSubmit={handleUpdate}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={profile.email} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" type="text" value={profile.first_name} onChange={e => setProfile(p => ({ ...p, first_name: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" type="text" value={profile.last_name} onChange={e => setProfile(p => ({ ...p, last_name: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} required />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-500">{success}</p>}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
            <Button className="w-full" type="button" variant="destructive" onClick={handleLogout}>Logout</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
} 