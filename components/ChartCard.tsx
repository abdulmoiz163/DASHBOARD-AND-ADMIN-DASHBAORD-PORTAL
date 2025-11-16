'use client'

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface ChartCardProps {
  title: string
  data: number[] | number[][]
  labels: readonly string[]
  type: 'line' | 'bar'
  dataLabels?: string[]
}

export default function ChartCard({ title, data, labels, type, dataLabels }: ChartCardProps) {
  const isMultiData = Array.isArray(data[0])
  
  const chartData = labels.map((label, index) => {
    const obj: any = { name: label }
    if (isMultiData) {
      (data as number[][]).forEach((series, seriesIndex) => {
        obj[dataLabels?.[seriesIndex] || `Series ${seriesIndex + 1}`] = series[index]
      })
    } else {
      obj.value = (data as number[])[index]
    }
    return obj
  })

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        {type === 'line' ? (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
            <XAxis 
              dataKey="name" 
              className="text-gray-600 dark:text-gray-400"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis 
              className="text-gray-600 dark:text-gray-400"
              tick={{ fill: 'currentColor' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px'
              }}
            />
            {isMultiData ? (
              <>
                {dataLabels?.map((label, index) => (
                  <Line
                    key={label}
                    type="monotone"
                    dataKey={label}
                    stroke={index === 0 ? '#3b82f6' : '#10b981'}
                    strokeWidth={2}
                  />
                ))}
                <Legend />
              </>
            ) : (
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            )}
          </LineChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
            <XAxis 
              dataKey="name" 
              className="text-gray-600 dark:text-gray-400"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis 
              className="text-gray-600 dark:text-gray-400"
              tick={{ fill: 'currentColor' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px'
              }}
            />
            {isMultiData ? (
              <>
                {dataLabels?.map((label, index) => (
                  <Bar
                    key={label}
                    dataKey={label}
                    fill={index === 0 ? '#3b82f6' : '#10b981'}
                  />
                ))}
                <Legend />
              </>
            ) : (
              <Bar dataKey="value" fill="#3b82f6" />
            )}
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

