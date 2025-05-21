'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'

type Vehicle = {
  id: string;
  user_id: string;
  name: string;
  license_plate: string;
  created_at: string;
};

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [name, setName] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editLicensePlate, setEditLicensePlate] = useState('')
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true)
      setError(null)
      setSuccess(null)
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        setError('You must be signed in to manage vehicles.')
        setLoading(false)
        return
      }
      setUserId(user.id)
      const { data, error: vehicleError } = await supabase.from('vehicles').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      if (vehicleError) {
        setError('Could not fetch vehicles: ' + vehicleError.message)
        setLoading(false)
        return
      }
      setVehicles(data ?? [])
      setLoading(false)
    }
    fetchVehicles()
  }, [])

  const handleAddVehicle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    if (!userId) {
      setError('You must be signed in to add a vehicle.')
      return
    }
    const { error: insertError } = await supabase.from('vehicles').insert([
      {
        user_id: userId,
        name,
        license_plate: licensePlate,
      },
    ])
    if (insertError) {
      setError('Failed to add vehicle: ' + insertError.message)
      return
    }
    setSuccess('Vehicle added!')
    setName('')
    setLicensePlate('')
    // Refresh vehicle list
    const { data } = await supabase.from('vehicles').select('*').eq('user_id', userId).order('created_at', { ascending: false })
    setVehicles(data ?? [])
  }

  const handleEdit = (vehicle: Vehicle) => {
    setEditingId(vehicle.id)
    setEditName(vehicle.name)
    setEditLicensePlate(vehicle.license_plate)
  }

  const handleSaveEdit = async (id: string) => {
    setError(null)
    setSuccess(null)
    const { error: updateError } = await supabase.from('vehicles').update({
      name: editName,
      license_plate: editLicensePlate,
    }).eq('id', id)
    if (updateError) {
      setError('Failed to update vehicle: ' + updateError.message)
      return
    }
    setSuccess('Vehicle updated!')
    setEditingId(null)
    // Refresh vehicle list
    if (userId) {
      const { data } = await supabase.from('vehicles').select('*').eq('user_id', userId).order('created_at', { ascending: false })
      setVehicles(data ?? [])
    }
  }

  const handleRemove = async (id: string) => {
    setError(null)
    setSuccess(null)
    setConfirmRemoveId(id)
  }

  const confirmRemoveVehicle = async () => {
    if (!confirmRemoveId) return
    const { error: deleteError } = await supabase.from('vehicles').delete().eq('id', confirmRemoveId)
    if (deleteError) {
      setError('Failed to remove vehicle: ' + deleteError.message)
      setConfirmRemoveId(null)
      return
    }
    setSuccess('Vehicle removed!')
    setConfirmRemoveId(null)
    // Refresh vehicle list
    if (userId) {
      const { data } = await supabase.from('vehicles').select('*').eq('user_id', userId).order('created_at', { ascending: false })
      setVehicles(data ?? [])
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
          <CardTitle className="text-2xl">Add Vehicle</CardTitle>
          <CardDescription>Enter your vehicle details below.</CardDescription>
        </CardHeader>
        <form onSubmit={handleAddVehicle}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Vehicle Name/Model</Label>
              <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licensePlate">License Plate</Label>
              <Input id="licensePlate" type="text" value={licensePlate} onChange={e => setLicensePlate(e.target.value)} required />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-500">{success}</p>}
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">Add Vehicle</Button>
          </CardFooter>
        </form>
      </Card>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">My Vehicles</CardTitle>
        </CardHeader>
        <CardContent>
          {vehicles.length === 0 ? (
            <p className="text-center text-muted-foreground">No vehicles found.</p>
          ) : (
            <ul className="space-y-4">
              {vehicles.map((vehicle) => (
                <li key={vehicle.id} className="border rounded p-3 flex flex-col gap-2">
                  {editingId === vehicle.id ? (
                    <>
                      <Input
                        className="mb-2"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        required
                      />
                      <Input
                        className="mb-2"
                        value={editLicensePlate}
                        onChange={e => setEditLicensePlate(e.target.value)}
                        required
                      />
                      <div className="flex gap-2">
                        <Button size="sm" type="button" onClick={() => handleSaveEdit(vehicle.id)}>Save</Button>
                        <Button size="sm" type="button" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold">{vehicle.name}</span>
                      <span className="text-sm text-muted-foreground">{vehicle.license_plate}</span>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" type="button" onClick={() => handleEdit(vehicle)}>Edit</Button>
                        <Button size="sm" type="button" variant="destructive" onClick={() => handleRemove(vehicle.id)}>Remove</Button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
          {confirmRemoveId && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white rounded shadow-lg p-6 max-w-sm w-full">
                <p className="mb-4">Are you sure you want to remove this vehicle?</p>
                <div className="flex gap-4 justify-end">
                  <Button variant="destructive" onClick={confirmRemoveVehicle}>Yes, Remove</Button>
                  <Button variant="ghost" onClick={() => setConfirmRemoveId(null)}>Cancel</Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 