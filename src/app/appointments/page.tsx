'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'

const TIME_SLOTS = ['Morning', 'Noon', 'Afternoon']
const SERVICE_TYPES = ['Basic', 'Brake', 'Engine', 'Tire', 'Battery', 'Other']

type Vehicle = {
  id: string;
  name: string;
  license_plate: string;
}

type Appointment = {
  id: string;
  vehicle_id: string;
  date: string;
  time_slot: string;
  service_type: string;
  created_at: string;
  vehicle: Vehicle;
}

export default function AppointmentsPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [vehicleId, setVehicleId] = useState('')
  const [date, setDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      setSuccess(null)
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        setError('You must be signed in to book appointments.')
        setLoading(false)
        return
      }
      setUserId(user.id)
      // Fetch vehicles
      const { data: vehicleData, error: vehicleError } = await supabase.from('vehicles').select('id, name, license_plate').eq('user_id', user.id)
      if (vehicleError) {
        setError('Could not fetch vehicles: ' + vehicleError.message)
        setLoading(false)
        return
      }
      setVehicles(vehicleData ?? [])
      // Fetch appointments (upcoming only)
      const { data: appointmentData, error: appointmentError } = await supabase.from('appointments').select('*, vehicle:vehicles(id, name, license_plate)').eq('user_id', user.id).gte('date', new Date().toISOString().slice(0, 10)).order('date', { ascending: true })
      if (appointmentError) {
        setError('Could not fetch appointments: ' + appointmentError.message)
        setLoading(false)
        return
      }
      setAppointments(appointmentData ?? [])
      setLoading(false)
    }
    fetchData()
  }, [supabase])

  const handleBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    if (!userId) {
      setError('You must be signed in to book an appointment.')
      return
    }
    if (!vehicleId || !date || !timeSlot || !serviceType) {
      setError('Please fill in all fields.')
      return
    }
    const { error: insertError } = await supabase.from('appointments').insert([
      {
        user_id: userId,
        vehicle_id: vehicleId,
        date,
        time_slot: timeSlot,
        service_type: serviceType,
      },
    ])
    if (insertError) {
      setError('Failed to book appointment: ' + insertError.message)
      return
    }
    setSuccess('Appointment booked!')
    setVehicleId('')
    setDate('')
    setTimeSlot('')
    setServiceType('')
    // Refresh appointments
    const { data: appointmentData } = await supabase.from('appointments').select('*, vehicle:vehicles(id, name, license_plate)').eq('user_id', userId).gte('date', new Date().toISOString().slice(0, 10)).order('date', { ascending: true })
    setAppointments(appointmentData ?? [])
  }

  const handleCancel = (id: string) => {
    setConfirmCancelId(id)
  }

  const confirmCancelAppointment = async () => {
    if (!confirmCancelId) return
    const { error: deleteError } = await supabase.from('appointments').delete().eq('id', confirmCancelId)
    if (deleteError) {
      setError('Failed to cancel appointment: ' + deleteError.message)
      setConfirmCancelId(null)
      return
    }
    setSuccess('Appointment cancelled!')
    setConfirmCancelId(null)
    // Refresh appointments
    if (userId) {
      const { data: appointmentData } = await supabase.from('appointments').select('*, vehicle:vehicles(id, name, license_plate)').eq('user_id', userId).gte('date', new Date().toISOString().slice(0, 10)).order('date', { ascending: true })
      setAppointments(appointmentData ?? [])
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }
  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40 p-4">
      <Card className="w-full max-w-md mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Book Appointment</CardTitle>
          <CardDescription>Fill in the details to book a service appointment.</CardDescription>
        </CardHeader>
        <form onSubmit={handleBook}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vehicle">Select Vehicle</Label>
              <select id="vehicle" className="w-full border rounded p-2" value={vehicleId} onChange={e => setVehicleId(e.target.value)} required>
                <option value="">-- Select --</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>{v.name} ({v.license_plate})</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Service Date</Label>
              <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeSlot">Time Slot</Label>
              <select id="timeSlot" className="w-full border rounded p-2" value={timeSlot} onChange={e => setTimeSlot(e.target.value)} required>
                <option value="">-- Select --</option>
                {TIME_SLOTS.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <select id="serviceType" className="w-full border rounded p-2" value={serviceType} onChange={e => setServiceType(e.target.value)} required>
                <option value="">-- Select --</option>
                {SERVICE_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-500">{success}</p>}
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">Book Appointment</Button>
          </CardFooter>
        </form>
      </Card>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          {appointments.length === 0 ? (
            <p className="text-center text-muted-foreground">No upcoming appointments.</p>
          ) : (
            <ul className="space-y-4">
              {appointments.map((appt) => (
                <li key={appt.id} className="border rounded p-3 flex flex-col gap-1">
                  <span className="font-semibold">{appt.vehicle?.name} ({appt.vehicle?.license_plate})</span>
                  <span className="text-sm">{appt.date} - {appt.time_slot}</span>
                  <span className="text-sm text-muted-foreground">{appt.service_type} Service</span>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" type="button" variant="destructive" onClick={() => handleCancel(appt.id)}>Cancel</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {confirmCancelId && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white rounded shadow-lg p-6 max-w-sm w-full">
                <p className="mb-4">Are you sure you want to cancel this appointment?</p>
                <div className="flex gap-4 justify-end">
                  <Button variant="destructive" onClick={confirmCancelAppointment}>Yes, Cancel</Button>
                  <Button variant="ghost" onClick={() => setConfirmCancelId(null)}>No</Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 