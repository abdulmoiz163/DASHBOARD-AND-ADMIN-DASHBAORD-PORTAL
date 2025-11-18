'use client'

import { useState, useRef } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import { Upload, FileText, CheckCircle, AlertCircle, Save, ChevronDown, ChevronUp } from 'lucide-react'
import { AdminData, MonthKey, months } from '@/lib/data'

export default function AdminPage() {
  const { isAdmin, token } = useAuth()
  const router = useRouter()
  const ehsFileInputRef = useRef<HTMLInputElement>(null)
  const kpiFileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [manualSaving, setManualSaving] = useState(false)

  if (!isAdmin) {
    router.push('/overview')
    return null
  }

  const handleFileUpload = async (type: 'ehs' | 'kpi') => {
    const fileInput = type === 'ehs' ? ehsFileInputRef.current : kpiFileInputRef.current
    const file = fileInput?.files?.[0]
    if (!file) return

    setUploading(true)
    postMessage(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const endpoint = type === 'ehs' ? '/api/data/upload' : '/api/kpi/upload'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        const successMsg = type === 'ehs' 
          ? (data.message || 'EHS data uploaded successfully!') 
          : (data.message || 'Admin data uploaded successfully!')
        postMessage({ type: 'success', text: successMsg })
        // Refresh the page after a delay to show updated data
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        const errorMsg = type === 'ehs' 
          ? (data.error || 'Failed to upload EHS data') 
          : (data.error || 'Failed to upload Admin data')
        postMessage({ type: 'error', text: errorMsg })
      }
    } catch (error) {
      postMessage({ type: 'error', text: 'An error occurred while uploading the file' })
    } finally {
      setUploading(false)
      if (fileInput) {
        fileInput.value = ''
      }
    }
  }

  const handleEHSUpload = (e: React.ChangeEvent<HTMLInputElement>) => handleFileUpload('ehs')
  const handleKPIUpload = (e: React.ChangeEvent<HTMLInputElement>) => handleFileUpload('kpi')

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
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Upload EHS Data CSV File
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Upload a CSV file containing EHS data. The file should have columns for metrics and monthly values (Jan-Dec).
              </p>

              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                <input
                  ref={ehsFileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleEHSUpload}
                  disabled={uploading}
                  className="hidden"
                  id="ehs-csv-upload"
                />
                <label
                  htmlFor="ehs-csv-upload"
                  className={`cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                    uploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Upload className="w-5 h-5" />
                  {uploading ? 'Uploading...' : 'Choose EHS CSV File'}
                </label>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  CSV files only. Max file size: 10MB
                </p>
              </div>

              <div className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>• Metrics: e.g., Accidents, Hazards Reported (Actual), Near Misses, Electricity Consumed</p>
                <p>• Each row represents one metric with monthly values</p>
                <p>• Values should be numeric</p>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Upload Admin Data CSV File
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Upload a CSV file containing admin data: working hours (total site, management/non-management MDM/contractual with total/overtime/routine breakdowns) and HR metrics (resignations, vacant positions, staff turnover). The file should have columns for metrics and monthly values (Jan-Dec).
              </p>

              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                <input
                  ref={kpiFileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleKPIUpload}
                  disabled={uploading}
                  className="hidden"
                  id="kpi-csv-upload"
                />
                <label
                  htmlFor="kpi-csv-upload"
                  className={`cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${
                    uploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Upload className="w-5 h-5" />
                  {uploading ? 'Uploading...' : 'Choose Admin CSV File'}
                </label>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  CSV files only. Max file size: 10MB
                </p>
              </div>

              <div className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>• First column: Exact metric names, e.g., "Total Working Hours of Site (Total of A+B+C+D)", "A. Total Working Hours Management (Total of A1+A2)", "A1. Overtime Working Hours Management (MDM)", "Number of Resignations", "Vacant Positions", "Staff Turnover %"</p>
                <p>• Subsequent columns: Months (Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec)</p>
                <p>• Each row: One metric with numeric monthly values (hours for working metrics, counts/% for HR)</p>
                <p>• Include all categories: totals, overtime, routine for management/non-management (MDM/contractual)</p>
              </div>
            </div>

            {onmessage && (
              <div
                className={`flex items-center gap-3 p-4 rounded-lg ${message && message.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                }`}
              >
                {onmessage.type === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <p>{onmessage?.text}</p>
              </div>
            )}

            <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                General CSV Format Notes
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>• Use comma-separated values with headers</p>
                <p>• Ensure no extra spaces in metric names for proper parsing</p>
                <p>• Refer to section-specific guidelines above for metric examples</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

