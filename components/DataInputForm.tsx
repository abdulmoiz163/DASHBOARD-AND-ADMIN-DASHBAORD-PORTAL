'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { months, type EHSData, type AdminData, type MonthlyData } from '@/lib/data'

interface DataInputFormProps {
  category: string
  ehsData: EHSData
  adminData: AdminData | null
  onClose: () => void
  onSave: (data: EHSData | AdminData) => void
}

export default function DataInputForm({ category, ehsData, adminData, onClose, onSave }: DataInputFormProps) {
  const [formData, setFormData] = useState<Record<string, MonthlyData>>({})

  const getCategoryData = () => {
    switch (category) {
      case 'ehs-core':
        return {
          'Total Number of Accidents': ehsData.accidents,
          'Number of First Aid Cases': ehsData.firstAidCases,
          'Number of Medical Cases': ehsData.medicalCases,
          'Number of Ill Health Cases': ehsData.illHealthCases,
          'Number of Lost Time Accident Cases': ehsData.lostTimeAccidents,
          'Number of EHS Walks': ehsData.ehsWalks,
          'Number of EHS Risk Assessments': ehsData.ehsRiskAssessments,
        }
      case 'training-hazards':
        return {
          'Target Training Hours': ehsData.trainingHours.target,
          'Actual Training Hours': ehsData.trainingHours.actual,
          'Target Hazard Reporting': ehsData.hazardReporting.target,
          'Actual Number of Hazards Reported': ehsData.hazardReporting.actual,
          'Actual Near Misses Reported': ehsData.nearMisses,
          'Target Leading Indicator Index (LII)': ehsData.leadingIndicatorIndex.target,
        }
      case 'consumption':
        return {
          'Total Electricity Consumed (KWH)': ehsData.electricityConsumed,
          'Total Gas Consumed (meter cube)': ehsData.gasConsumed,
          'Water Consumption (US Gallons)': ehsData.waterConsumption,
          'Number of Paper Sheets Consumed': ehsData.paperSheetsConsumed,
          'Carbon Footprint': ehsData.carbonFootprint,
        }
      default:
        return {}
    }
  }

  const categoryData = getCategoryData()

  const handleChange = (metric: string, month: keyof MonthlyData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [metric]: {
        ...(prev[metric] || (categoryData as Record<string, MonthlyData>)[metric] || {}),
        [month]: parseFloat(value) || 0
      }
    }))
  }

  const handleSave = () => {
    const updatedEhsData = { ...ehsData }
    
    Object.entries(formData).forEach(([metric, values]) => {
      switch (metric) {
        case 'Total Number of Accidents':
          updatedEhsData.accidents = values
          break
        case 'Number of First Aid Cases':
          updatedEhsData.firstAidCases = values
          break
        case 'Number of Medical Cases':
          updatedEhsData.medicalCases = values
          break
        case 'Number of Ill Health Cases':
          updatedEhsData.illHealthCases = values
          break
        case 'Number of Lost Time Accident Cases':
          updatedEhsData.lostTimeAccidents = values
          break
        case 'Number of EHS Walks':
          updatedEhsData.ehsWalks = values
          break
        case 'Number of EHS Risk Assessments':
          updatedEhsData.ehsRiskAssessments = values
          break
        case 'Target Training Hours':
          updatedEhsData.trainingHours.target = values
          break
        case 'Actual Training Hours':
          updatedEhsData.trainingHours.actual = values
          break
        case 'Target Hazard Reporting':
          updatedEhsData.hazardReporting.target = values
          break
        case 'Actual Number of Hazards Reported':
          updatedEhsData.hazardReporting.actual = values
          break
        case 'Actual Near Misses Reported':
          updatedEhsData.nearMisses = values
          break
        case 'Target Leading Indicator Index (LII)':
          updatedEhsData.leadingIndicatorIndex.target = values
          break
        case 'Total Electricity Consumed (KWH)':
          updatedEhsData.electricityConsumed = values
          break
        case 'Total Gas Consumed (meter cube)':
          updatedEhsData.gasConsumed = values
          break
        case 'Water Consumption (US Gallons)':
          updatedEhsData.waterConsumption = values
          break
        case 'Number of Paper Sheets Consumed':
          updatedEhsData.paperSheetsConsumed = values
          break
        case 'Carbon Footprint':
          updatedEhsData.carbonFootprint = values
          break
      }
    })

    onSave(updatedEhsData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Edit {category.replace('-', ' ').toUpperCase()} Data
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Metric
                  </th>
                  {months.map((month) => (
                    <th
                      key={month}
                      className="px-2 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase min-w-[100px]"
                    >
                      {month}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {Object.entries(categoryData).map(([metric, values]) => (
                  <tr key={metric} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {metric}
                    </td>
                    {months.map((month, index) => {
                      const monthKey = month.toLowerCase() as keyof MonthlyData
                      const currentValue = formData[metric]?.[monthKey] ?? values[monthKey]
                      return (
                        <td key={month} className="px-2 py-3">
                          <input
                            type="number"
                            value={currentValue}
                            onChange={(e) => handleChange(metric, monthKey, e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

