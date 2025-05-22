'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'

interface Vehicle {
  id: string;
  name: string;
  license_plate: string;
}

interface ServiceRecord {
  id: string;
  vehicle_id: string;
  date: string;
  description: string;
  workshop?: string;
  created_at: string;
}

export default function ServiceHistoryPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [selectedVehicleId, setSelectedVehicleId] = useState('')
  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>([])
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [workshop, setWorkshop] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      setSuccess(null)
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        setError('You must be signed in to view service history.')
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
      setLoading(false)
    }
    fetchData()
  }, [supabase])

  useEffect(() => {
    const fetchRecords = async () => {
      if (!selectedVehicleId) {
        setServiceRecords([])
        return
      }
      setLoading(true)
      setError(null)
      const { data: records, error: recordsError } = await supabase.from('service_records').select('*').eq('vehicle_id', selectedVehicleId).order('date', { ascending: false })
      if (recordsError) {
        setError('Could not fetch service records: ' + recordsError.message)
        setLoading(false)
        return
      }
      setServiceRecords(records ?? [])
      setLoading(false)
    }
    fetchRecords()
  }, [selectedVehicleId, supabase])

  const handleAddRecord = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    if (!userId) {
      setError('You must be signed in to add a service record.')
      return
    }
    if (!selectedVehicleId || !date || !description) {
      setError('Please fill in all required fields.')
      return
    }
    const { error: insertError } = await supabase.from('service_records').insert([
      {
        vehicle_id: selectedVehicleId,
        date,
        description,
        workshop: workshop || null,
      },
    ])
    if (insertError) {
      setError('Failed to add service record: ' + insertError.message)
      return
    }
    setSuccess('Service record added!')
    setDate('')
    setDescription('')
    setWorkshop('')
    // Refresh records
    const { data: records } = await supabase.from('service_records').select('*').eq('vehicle_id', selectedVehicleId).order('date', { ascending: false })
    setServiceRecords(records ?? [])
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
          <CardTitle className="text-2xl">Service History</CardTitle>
          <CardDescription>Select a vehicle to view and add service records.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vehicle">Select Vehicle</Label>
            <select id="vehicle" className="w-full border rounded p-2" value={selectedVehicleId} onChange={e => setSelectedVehicleId(e.target.value)} required>
              <option value="">-- Select --</option>
              {vehicles.map(v => (
                <option key={v.id} value={v.id}>{v.name} ({v.license_plate})</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>
      {selectedVehicleId && (
        <Card className="w-full max-w-md mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Add Service Record</CardTitle>
          </CardHeader>
          <form onSubmit={handleAddRecord}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Service Date</Label>
                <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Service Description</Label>
                <Input id="description" type="text" value={description} onChange={e => setDescription(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workshop">Workshop Name (optional)</Label>
                <Input id="workshop" type="text" value={workshop} onChange={e => setWorkshop(e.target.value)} />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && <p className="text-sm text-green-500">{success}</p>}
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">Add Record</Button>
            </CardFooter>
          </form>
        </Card>
      )}
      {selectedVehicleId && (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Service Records</CardTitle>
          </CardHeader>
          <CardContent>
            {serviceRecords.length === 0 ? (
              <p className="text-center text-muted-foreground">No service records found.</p>
            ) : (
              <ul className="space-y-4">
                {serviceRecords.map((rec) => (
                  <li key={rec.id} className="border rounded p-3 flex flex-col gap-1">
                    <span className="font-semibold">{rec.date}</span>
                    <span className="text-sm">{rec.description}</span>
                    {rec.workshop && <span className="text-sm text-muted-foreground">Workshop: {rec.workshop}</span>}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
} 