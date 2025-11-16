'use client'

import { Home, FileText, BarChart3, LogOut, Upload, User } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useAuth } from './AuthProvider'
import { Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout, isAdmin, isSeniorExecutive } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/overview')
  }

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          KPI Dashboard
        </h1>
      </div>
      
      {user && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user.role.replace('_', ' ')}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/overview"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
            pathname === '/overview'
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          Overview
        </Link>
        
        {(isAdmin || isSeniorExecutive) && (
          <>
            <Link
              href="/"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
                pathname === '/'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Home className="w-5 h-5" />
              Dashboard
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
                  pathname === '/admin'
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Upload className="w-5 h-5" />
                Data Management
              </Link>
            )}
          </>
        )}
        
        {!user && (
          <Link
            href="/login"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <User className="w-5 h-5" />
            Login
          </Link>
        )}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {theme === 'light' ? (
            <>
              <Moon className="w-5 h-5" />
              Dark Mode
            </>
          ) : (
            <>
              <Sun className="w-5 h-5" />
              Light Mode
            </>
          )}
        </button>
        {user && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        )}
      </div>
    </aside>
  )
}

