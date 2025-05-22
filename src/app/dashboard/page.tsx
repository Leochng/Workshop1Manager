'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function DashboardPage() {
  const [user, setUser] = useState<Record<string, any> | null>(null)
  const [vehiclesCount, setVehiclesCount] = useState(0)
  const [nextAppointment, setNextAppointment] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        setError('You must be signed in to view the dashboard.')
        setLoading(false)
        return
      }
      setUser(user)
      // Fetch vehicles count
      const { count: vehiclesCount, error: vehiclesError } = await supabase.from('vehicles').select('id', { count: 'exact', head: true }).eq('user_id', user.id)
      if (vehiclesError) {
        setError('Could not fetch vehicles: ' + vehiclesError.message)
        setLoading(false)
        return
      }
      setVehiclesCount(vehiclesCount || 0)
      // Fetch next appointment
      const { data: appointments, error: apptError } = await supabase.from('appointments').select('*').eq('user_id', user.id).gte('date', new Date().toISOString().slice(0, 10)).order('date', { ascending: true }).limit(1)
      if (apptError) {
        setError('Could not fetch appointments: ' + apptError.message)
        setLoading(false)
        return
      }
      setNextAppointment(appointments && appointments.length > 0 ? appointments[0] : null)
      setLoading(false)
    }
    fetchData()
  }, [supabase])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }
  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40 p-4">
      <Card className="w-full max-w-2xl mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome{user?.user_metadata?.first_name ? `, ${user.user_metadata.first_name}` : ''}!</CardTitle>
          <CardDescription>This is your Workshop1Manager dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <Link href="/vehicles">
            <Card className="hover:bg-muted transition cursor-pointer">
              <CardHeader>
                <CardTitle>Vehicles</CardTitle>
                <CardDescription>Manage your vehicles</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-2xl font-bold">{vehiclesCount}</span> registered
              </CardContent>
            </Card>
          </Link>
          <Link href="/appointments">
            <Card className="hover:bg-muted transition cursor-pointer">
              <CardHeader>
                <CardTitle>Appointments</CardTitle>
                <CardDescription>Book or view service appointments</CardDescription>
              </CardHeader>
              <CardContent>
                {nextAppointment ? (
                  <div>
                    <div className="font-semibold">Next: {nextAppointment.date} ({nextAppointment.time_slot})</div>
                    <div className="text-sm text-muted-foreground">{nextAppointment.service_type} Service</div>
                  </div>
                ) : (
                  <span className="text-muted-foreground">No upcoming</span>
                )}
              </CardContent>
            </Card>
          </Link>
          <Link href="/service-history">
            <Card className="hover:bg-muted transition cursor-pointer">
              <CardHeader>
                <CardTitle>Service History</CardTitle>
                <CardDescription>View and add service records</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/profile">
            <Card className="hover:bg-muted transition cursor-pointer">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your account</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
} 