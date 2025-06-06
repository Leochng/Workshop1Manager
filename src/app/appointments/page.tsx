'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { db } from '../../lib/firebase'
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { ProtectedRoute } from '../../lib/ProtectedRoute'
import { useLanguage } from '@/lib/LanguageContext'

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
  const { t } = useLanguage()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      setSuccess(null)
      try {
        if (!userId) {
          setVehicles([])
          setAppointments([])
          setLoading(false)
          return
        }
        // Fetch vehicles
        const vq = query(collection(db, 'vehicles'), where('user_id', '==', userId));
        const vSnapshot = await getDocs(vq);
        setVehicles(vSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Vehicle));
        // Fetch appointments
        const aq = query(collection(db, 'appointments'), where('user_id', '==', userId));
        const aSnapshot = await getDocs(aq);
        setAppointments(aSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Appointment));
      } catch (err: any) {
        setError(err.message)
      }
      setLoading(false)
    }
    fetchData()
  }, [userId])

  const handleBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    if (!userId) {
      setError(t('appointment.error.auth'))
      return
    }
    if (!vehicleId || !date || !timeSlot || !serviceType) {
      setError(t('appointment.error.required'))
      return
    }
    try {
      await addDoc(collection(db, 'appointments'), {
        user_id: userId,
        vehicle_id: vehicleId,
        date,
        time_slot: timeSlot,
        service_type: serviceType,
        created_at: new Date().toISOString(),
      })
      setSuccess(t('appointment.success.book'))
      setVehicleId('')
      setDate('')
      setTimeSlot('')
      setServiceType('')
      // Refresh appointments
      const aq = query(collection(db, 'appointments'), where('user_id', '==', userId));
      const aSnapshot = await getDocs(aq);
      setAppointments(aSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Appointment));
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleCancel = (id: string) => {
    setConfirmCancelId(id)
  }

  const confirmCancelAppointment = async () => {
    if (!confirmCancelId) return
    try {
      await deleteDoc(doc(db, 'appointments', confirmCancelId))
      setSuccess(t('appointment.success.cancel'))
      setConfirmCancelId(null)
      // Refresh appointments
      const aq = query(collection(db, 'appointments'), where('user_id', '==', userId));
      const aSnapshot = await getDocs(aq);
      setAppointments(aSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Appointment));
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
            <CardTitle className="text-2xl">{t('appointment.book')}</CardTitle>
            <CardDescription>{t('appointment.details')}</CardDescription>
          </CardHeader>
          <form onSubmit={handleBook}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle">{t('appointment.selectVehicle')}</Label>
                <select id="vehicle" className="w-full border rounded p-2" value={vehicleId} onChange={e => setVehicleId(e.target.value)} required>
                  <option value="">{t('appointment.select')}</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>{v.name} ({v.license_plate})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">{t('appointment.serviceDate')}</Label>
                <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeSlot">{t('appointment.timeSlot')}</Label>
                <select id="timeSlot" className="w-full border rounded p-2" value={timeSlot} onChange={e => setTimeSlot(e.target.value)} required>
                  <option value="">{t('appointment.select')}</option>
                  {TIME_SLOTS.map(slot => (
                    <option key={slot} value={slot}>{t(`timeSlot.${slot.toLowerCase()}`)}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceType">{t('appointment.serviceType')}</Label>
                <select id="serviceType" className="w-full border rounded p-2" value={serviceType} onChange={e => setServiceType(e.target.value)} required>
                  <option value="">{t('appointment.select')}</option>
                  {SERVICE_TYPES.map(type => (
                    <option key={type} value={type}>{t(`serviceType.${type.toLowerCase()}`)}</option>
                  ))}
                </select>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && <p className="text-sm text-green-500">{success}</p>}
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">{t('appointment.book')}</Button>
            </CardFooter>
          </form>
        </Card>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{t('appointment.upcoming')}</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.length === 0 ? (
              <p className="text-center text-muted-foreground">{t('appointment.noUpcoming')}</p>
            ) : (
              <ul className="space-y-4">
                {appointments.map((appt) => (
                  <li key={appt.id} className="border rounded p-3 flex flex-col gap-1">
                    <span className="font-semibold">{appt.vehicle?.name} ({appt.vehicle?.license_plate})</span>
                    <span className="text-sm">{appt.date} - {t(`timeSlot.${appt.time_slot.toLowerCase()}`)}</span>
                    <span className="text-sm text-muted-foreground">{t(`serviceType.${appt.service_type.toLowerCase()}`)} {t('serviceType')}</span>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" type="button" variant="destructive" onClick={() => handleCancel(appt.id)}>{t('appointment.cancel')}</Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {confirmCancelId && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-6 max-w-sm w-full">
                  <p className="mb-4">{t('appointment.confirmCancel')}</p>
                  <div className="flex gap-4 justify-end">
                    <Button variant="destructive" onClick={confirmCancelAppointment}>{t('appointment.yesCancel')}</Button>
                    <Button variant="ghost" onClick={() => setConfirmCancelId(null)}>{t('appointment.noKeep')}</Button>
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