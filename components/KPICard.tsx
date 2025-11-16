'use client'

import { ReactNode } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string | number
  icon: ReactNode
  trend?: 'up' | 'down' | 'neutral'
  subtitle?: string
}

export default function KPICard({ title, value, icon, trend = 'neutral', subtitle }: KPICardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </h3>
        <div className="text-blue-600 dark:text-blue-400">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
        {trend !== 'neutral' && (
          <div className={`flex items-center gap-1 ${
            trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
          </div>
        )}
      </div>
      {subtitle && (
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  )
}

