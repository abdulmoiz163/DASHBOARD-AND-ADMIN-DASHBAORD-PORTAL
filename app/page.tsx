'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import Dashboard from '@/components/Dashboard'
import Sidebar from '@/components/Sidebar'
import { ThemeProvider } from '@/components/ThemeProvider'

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default function Home() {
  const { isAuthenticated, isAdmin, isSeniorExecutive } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to overview if not authenticated or not authorized
    if (!isAuthenticated || (!isAdmin && !isSeniorExecutive)) {
      router.replace('/overview')
    }
  }, [isAuthenticated, isAdmin, isSeniorExecutive, router])

  // Show loading or redirect
  if (!isAuthenticated || (!isAdmin && !isSeniorExecutive)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600 dark:text-gray-400">Redirecting...</div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  )
}

