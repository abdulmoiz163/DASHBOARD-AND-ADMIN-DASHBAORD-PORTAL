'use client'

import { useState, useRef } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'

export default function AdminPage() {
  const { isAdmin, token } = useAuth()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  if (!isAdmin) {
    router.push('/overview')
    return null
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setMessage(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/data/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Data uploaded successfully!' })
        // Refresh the page after a delay to show updated data
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to upload data' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while uploading the file' })
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Data Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload and manage EHS data via CSV files
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Upload CSV File
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Upload a CSV file containing EHS data. The file should have columns for metrics and monthly values (Jan-Dec).
              </p>

              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                  id="csv-upload"
                />
                <label
                  htmlFor="csv-upload"
                  className={`cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                    uploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Upload className="w-5 h-5" />
                  {uploading ? 'Uploading...' : 'Choose CSV File'}
                </label>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  CSV files only. Max file size: 10MB
                </p>
              </div>
            </div>

            {message && (
              <div
                className={`flex items-center gap-3 p-4 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <p>{message.text}</p>
              </div>
            )}

            <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                CSV Format Guidelines
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>• First column should contain metric names</p>
                <p>• Subsequent columns should be months (Jan, Feb, Mar, etc.)</p>
                <p>• Each row represents one metric</p>
                <p>• Values should be numeric</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

