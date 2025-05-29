'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { db } from '../../lib/firebase'
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { ProtectedRoute } from '../../lib/ProtectedRoute'
import { useLanguage } from '@/lib/LanguageContext'

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
  const { t } = useLanguage()

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true)
      setError(null)
      setSuccess(null)
      try {
        if (!userId) {
          setVehicles([])
          setLoading(false)
          return
        }
        const q = query(collection(db, 'vehicles'), where('user_id', '==', userId));
        const querySnapshot = await getDocs(q);
        setVehicles(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Vehicle));
      } catch (err: any) {
        setError(err.message)
      }
      setLoading(false)
    }
    fetchVehicles()
  }, [userId])

  const handleAddVehicle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    if (!userId) {
      setError(t('vehicle.error.auth'))
      return
    }
    try {
      await addDoc(collection(db, 'vehicles'), {
        user_id: userId,
        name,
        license_plate: licensePlate,
        created_at: new Date().toISOString(),
      })
      setSuccess(t('vehicle.added'))
      setName('')
      setLicensePlate('')
      // Refresh vehicle list
      const q = query(collection(db, 'vehicles'), where('user_id', '==', userId));
      const querySnapshot = await getDocs(q);
      setVehicles(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Vehicle));
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEdit = (vehicle: Vehicle) => {
    setEditingId(vehicle.id)
    setEditName(vehicle.name)
    setEditLicensePlate(vehicle.license_plate)
  }

  const handleSaveEdit = async (id: string) => {
    setError(null)
    setSuccess(null)
    try {
      await updateDoc(doc(db, 'vehicles', id), {
        name: editName,
        license_plate: editLicensePlate,
      })
      setSuccess(t('vehicle.updated'))
      setEditingId(null)
      // Refresh vehicle list
      const q = query(collection(db, 'vehicles'), where('user_id', '==', userId));
      const querySnapshot = await getDocs(q);
      setVehicles(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Vehicle));
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleRemove = async (id: string) => {
    setError(null)
    setSuccess(null)
    setConfirmRemoveId(id)
  }

  const confirmRemoveVehicle = async () => {
    if (!confirmRemoveId) return
    try {
      await deleteDoc(doc(db, 'vehicles', confirmRemoveId))
      setSuccess(t('vehicle.removed'))
      setConfirmRemoveId(null)
      // Refresh vehicle list
      const q = query(collection(db, 'vehicles'), where('user_id', '==', userId));
      const querySnapshot = await getDocs(q);
      setVehicles(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Vehicle));
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">{t('loading')}</div>
  }
  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40 p-4">
        <Card className="w-full max-w-md mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t('vehicle.add')}</CardTitle>
            <CardDescription>{t('vehicle.details')}</CardDescription>
          </CardHeader>
          <form onSubmit={handleAddVehicle}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('vehicle.nameModel')}</Label>
                <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licensePlate">{t('vehicle.licensePlate')}</Label>
                <Input id="licensePlate" type="text" value={licensePlate} onChange={e => setLicensePlate(e.target.value)} required />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && <p className="text-sm text-green-500">{success}</p>}
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">{t('vehicle.add')}</Button>
            </CardFooter>
          </form>
        </Card>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{t('vehicle.myVehicles')}</CardTitle>
          </CardHeader>
          <CardContent>
            {vehicles.length === 0 ? (
              <p className="text-center text-muted-foreground">{t('vehicle.noVehicles')}</p>
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
                          <Button size="sm" type="button" onClick={() => handleSaveEdit(vehicle.id)}>{t('vehicle.save')}</Button>
                          <Button size="sm" type="button" variant="ghost" onClick={() => setEditingId(null)}>{t('vehicle.cancel')}</Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="font-semibold">{vehicle.name}</span>
                        <span className="text-sm text-muted-foreground">{vehicle.license_plate}</span>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" type="button" onClick={() => handleEdit(vehicle)}>{t('vehicle.edit')}</Button>
                          <Button size="sm" type="button" variant="destructive" onClick={() => handleRemove(vehicle.id)}>{t('vehicle.remove')}</Button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {confirmRemoveId && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-6 max-w-sm w-full">
                  <p className="mb-4">{t('vehicle.confirmRemove')}</p>
                  <div className="flex gap-4 justify-end">
                    <Button variant="destructive" onClick={confirmRemoveVehicle}>{t('vehicle.yes')}</Button>
                    <Button variant="ghost" onClick={() => setConfirmRemoveId(null)}>{t('vehicle.no')}</Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}