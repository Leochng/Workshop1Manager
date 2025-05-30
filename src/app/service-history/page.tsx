'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { db } from '../../lib/firebase'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { ProtectedRoute } from '../../lib/ProtectedRoute'
import { useLanguage } from '@/lib/LanguageContext'

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
  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>([])
  const [selectedVehicleId, setSelectedVehicleId] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [workshop, setWorkshop] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      setSuccess(null)
      // Fetch vehicles for the user
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
    fetchData()
  }, [userId])

  useEffect(() => {
    const fetchRecords = async () => {
      if (!selectedVehicleId) {
        setServiceRecords([])
        return
      }
      setLoading(true)
      setError(null)
      try {
        const q = query(collection(db, 'service_records'), where('vehicle_id', '==', selectedVehicleId));
        const querySnapshot = await getDocs(q);
        setServiceRecords(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as ServiceRecord));
      } catch (err: any) {
        setError(err.message)
      }
      setLoading(false)
    }
    fetchRecords()
  }, [selectedVehicleId])

  const handleAddRecord = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    try {
      await addDoc(collection(db, 'service_records'), {
        user_id: userId,
        vehicle_id: selectedVehicleId,
        date,
        description,
        workshop,
        created_at: new Date().toISOString(),
      })
      setSuccess(t('service.success.add'))
      setDate('')
      setDescription('')
      setWorkshop('')

      // Refresh service records
      const q = query(collection(db, 'service_records'), where('vehicle_id', '==', selectedVehicleId));
      const querySnapshot = await getDocs(q);
      setServiceRecords(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as ServiceRecord));
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
            <CardTitle className="text-2xl">{t('service.selectVehicle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <select 
              id="vehicle" 
              className="w-full border rounded p-2" 
              value={selectedVehicleId} 
              onChange={e => setSelectedVehicleId(e.target.value)}
            >
              <option value="">{t('appointment.select')}</option>
              {vehicles.map(v => (
                <option key={v.id} value={v.id}>{v.name} ({v.license_plate})</option>
              ))}
            </select>
          </CardContent>
        </Card>
        {selectedVehicleId && (
          <Card className="w-full max-w-md mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t('service.addRecord')}</CardTitle>
            </CardHeader>
            <form onSubmit={handleAddRecord}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date">{t('service.date')}</Label>
                  <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">{t('service.description')}</Label>
                  <Input id="description" type="text" value={description} onChange={e => setDescription(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workshop">{t('service.workshop')}</Label>
                  <Input id="workshop" type="text" value={workshop} onChange={e => setWorkshop(e.target.value)} />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                {success && <p className="text-sm text-green-500">{success}</p>}
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit">{t('service.addRecord')}</Button>
              </CardFooter>
            </form>
          </Card>
        )}
        {selectedVehicleId && (
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{t('service.records')}</CardTitle>
            </CardHeader>
            <CardContent>
              {serviceRecords.length === 0 ? (
                <p className="text-center text-muted-foreground">{t('service.noRecords')}</p>
              ) : (
                <ul className="space-y-4">
                  {serviceRecords.map((rec) => (
                    <li key={rec.id} className="border rounded p-3 flex flex-col gap-1">
                      <span className="font-semibold">{rec.date}</span>
                      <span className="text-sm">{rec.description}</span>
                      {rec.workshop && <span className="text-sm text-muted-foreground">{t('service.workshop.label')}{rec.workshop}</span>}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </ProtectedRoute>
  )
}