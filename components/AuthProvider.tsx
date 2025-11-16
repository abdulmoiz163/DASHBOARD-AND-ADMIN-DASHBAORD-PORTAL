'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { User, UserRole } from '@/lib/types'

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string, role?: UserRole) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
  isSeniorExecutive: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored token on mount (only in browser)
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        fetchUser(storedToken)
      } else {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async (authToken: string) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      })

      if (response.ok) {
        const { user } = await response.json()
        setUser(user)
        setToken(authToken)
      } else {
        localStorage.removeItem('token')
      }
    } catch (error) {
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const { user, token } = await response.json()
        setUser(user)
        setToken(token)
        localStorage.setItem('token', token)
        return true
      }
      return false
    } catch {
      return false
    }
  }

  const signup = async (email: string, password: string, name: string, role?: UserRole): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role }),
      })

      if (response.ok) {
        const { user, token } = await response.json()
        setUser(user)
        setToken(token)
        localStorage.setItem('token', token)
        return true
      }
      return false
    } catch {
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  // Always provide context, even during loading
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isSeniorExecutive: user?.role === 'senior_executive',
      }}
    >
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg text-gray-600 dark:text-gray-400">Loading...</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

