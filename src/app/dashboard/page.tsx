'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Link from 'next/link'
import { ProtectedRoute } from '../../lib/ProtectedRoute'
import { useLanguage } from '@/lib/LanguageContext'
import { IconCar, IconCalendar, IconHistory, IconUserCircle } from '@tabler/icons-react'

export default function DashboardPage() {  
  interface DashboardUser {
    id: string;
    email: string;
    user_metadata?: {
      first_name?: string;
      last_name?: string;
    };
  }

  interface NextAppointment {
    id: string;
    date: string;
    time_slot: string;
    service_type: string;
    vehicle_id: string;
  }

  const [user, setUser] = useState<DashboardUser | null>(null)
  const [vehiclesCount, setVehiclesCount] = useState(0)
  const [nextAppointment, setNextAppointment] = useState<NextAppointment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      // Placeholder logic for user
      setUser({
        id: '1',
        email: 'example@example.com'
      })
      // Placeholder logic for vehicles count
      setVehiclesCount(0)
      // Placeholder logic for next appointment
      setNextAppointment(null)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">{t('dashboard.loading')}</div>
  }
  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40 p-4">
        <Card className="w-full max-w-2xl mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t('dashboard.welcome')}{user?.user_metadata?.first_name ? `, ${user.user_metadata.first_name}` : ''}!</CardTitle>
            <CardDescription>{t('dashboard.description')}</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <Link href="/vehicles">
              <Card className="hover:bg-muted transition cursor-pointer group relative overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <IconCar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{t('dashboard.vehicles.title')}</CardTitle>
                    <CardDescription>{t('dashboard.vehicles.description')}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <span className="text-2xl font-bold">{vehiclesCount}</span> {t('dashboard.vehicles.registered')}
                </CardContent>
              </Card>
            </Link>
            <Link href="/appointments">
              <Card className="hover:bg-muted transition cursor-pointer group relative overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <IconCalendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{t('dashboard.appointments.title')}</CardTitle>
                    <CardDescription>{t('dashboard.appointments.description')}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {nextAppointment ? (
                    <div>
                      <div className="font-semibold">{t('dashboard.appointments.next')}: {nextAppointment.date} ({t(`timeSlot.${nextAppointment.time_slot.toLowerCase()}`)})</div>
                      <div className="text-sm text-muted-foreground">{t(`serviceType.${nextAppointment.service_type.toLowerCase()}`)} {t('dashboard.appointments.service')}</div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">{t('dashboard.appointments.noUpcoming')}</span>
                  )}
                </CardContent>
              </Card>
            </Link>
            <Link href="/service-history">
              <Card className="hover:bg-muted transition cursor-pointer group relative overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <IconHistory className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{t('dashboard.history.title')}</CardTitle>
                    <CardDescription>{t('dashboard.history.description')}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/profile">
              <Card className="hover:bg-muted transition cursor-pointer group relative overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <IconUserCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{t('dashboard.profile.title')}</CardTitle>
                    <CardDescription>{t('dashboard.profile.description')}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}