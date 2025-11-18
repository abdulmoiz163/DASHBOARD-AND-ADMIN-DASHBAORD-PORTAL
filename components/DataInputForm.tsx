'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { months, type EHSData, type AdminData, type MonthlyData } from '@/lib/data'

interface DataInputFormProps {
  category: string
  ehsData: EHSData | null
  adminData: AdminData | null
  onClose: () => void
  onSave: (data: EHSData | Partial<AdminData>) => void
}

export default function DataInputForm({ category, ehsData, adminData, onClose, onSave }: DataInputFormProps) {
  const [formData, setFormData] = useState<Record<string, MonthlyData>>({})

  const getCategoryData = () => {
    if (ehsData) {
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
    } else if (adminData) {
      switch (category) {
        case 'working-hours':
          return {
            'Total Working Hours of Site (Total of A+B+C+D)': adminData.workingHours.totalSite,
            'A. Total Working Hours Management (Total of A1+A2)': adminData.workingHours.managementMDM.total,
            'A1. Overtime Working Hours Management (MDM)': adminData.workingHours.managementMDM.overtime,
            'A2. Routine Working Hours Management (MDM)': adminData.workingHours.managementMDM.routine,
            'B. Total Working Hours Contractual (Total of B1+B2)': adminData.workingHours.managementContractual.total,
            'B1. Overtime Working Hours Contractual': adminData.workingHours.managementContractual.overtime,
            'B2. Routine Working Hours Contractual': adminData.workingHours.managementContractual.routine,
            'C. Total Working Hours Non-Management (MDM) (Total of C1+C2)': adminData.workingHours.nonManagementMDM.total,
            'C1. Overtime Working Hours Non-Management (MDM)': adminData.workingHours.nonManagementMDM.overtime,
            'C2. Routine Working Hours Non-Management (MDM)': adminData.workingHours.nonManagementMDM.routine,
            'D. Total Working Hours Non-Management Contractual (Total of D1+D2)': adminData.workingHours.nonManagementContractual.total,
            'D1. Overtime Working Hours Non-Management Contractual': adminData.workingHours.nonManagementContractual.overtime,
            'D2. Routine Working Hours Non-Management Contractual': adminData.workingHours.nonManagementContractual.routine,
          }
        case 'hr-metrics':
          return {
            'Number of Resignations': adminData.hrMetrics.resignations,
            'Vacant Positions': adminData.hrMetrics.vacantPositions,
            'Staff Turnover %': adminData.hrMetrics.staffTurnover,
          }
        default:
          return {}
      }
    }
    return {}
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
    if (ehsData) {
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
    } else if (adminData) {
      const partialAdminData: Partial<AdminData> = {
        workingHours: {
          totalSite: adminData.workingHours.totalSite,
          managementMDM: { ...adminData.workingHours.managementMDM },
          managementContractual: { ...adminData.workingHours.managementContractual },
          nonManagementMDM: { ...adminData.workingHours.nonManagementMDM },
          nonManagementContractual: { ...adminData.workingHours.nonManagementContractual }
        },
        hrMetrics: { ...adminData.hrMetrics }
      }

      Object.entries(formData).forEach(([metric, values]) => {
        if (category === 'working-hours') {
          switch (metric) {
            case 'Total Working Hours of Site (Total of A+B+C+D)':
              partialAdminData.workingHours!.totalSite = values
              break
            case 'A. Total Working Hours Management (Total of A1+A2)':
              partialAdminData.workingHours!.managementMDM.total = values
              break
            case 'A1. Overtime Working Hours Management (MDM)':
              partialAdminData.workingHours!.managementMDM.overtime = values
              break
            case 'A2. Routine Working Hours Management (MDM)':
              partialAdminData.workingHours!.managementMDM.routine = values
              break
            case 'B. Total Working Hours Contractual (Total of B1+B2)':
              partialAdminData.workingHours!.managementContractual.total = values
              break
            case 'B1. Overtime Working Hours Contractual':
              partialAdminData.workingHours!.managementContractual.overtime = values
              break
            case 'B2. Routine Working Hours Contractual':
              partialAdminData.workingHours!.managementContractual.routine = values
              break
            case 'C. Total Working Hours Non-Management (MDM) (Total of C1+C2)':
              partialAdminData.workingHours!.nonManagementMDM.total = values
              break
            case 'C1. Overtime Working Hours Non-Management (MDM)':
              partialAdminData.workingHours!.nonManagementMDM.overtime = values
              break
            case 'C2. Routine Working Hours Non-Management (MDM)':
              partialAdminData.workingHours!.nonManagementMDM.routine = values
              break
            case 'D. Total Working Hours Non-Management Contractual (Total of D1+D2)':
              partialAdminData.workingHours!.nonManagementContractual.total = values
              break
            case 'D1. Overtime Working Hours Non-Management Contractual':
              partialAdminData.workingHours!.nonManagementContractual.overtime = values
              break
            case 'D2. Routine Working Hours Non-Management Contractual':
              partialAdminData.workingHours!.nonManagementContractual.routine = values
              break
          }
        } else if (category === 'hr-metrics') {
          switch (metric) {
            case 'Number of Resignations':
              partialAdminData.hrMetrics!.resignations = values
              break
            case 'Vacant Positions':
              partialAdminData.hrMetrics!.vacantPositions = values
              break
            case 'Staff Turnover %':
              partialAdminData.hrMetrics!.staffTurnover = values
              break
          }
        }
      })

      onSave(partialAdminData)
    }
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
                    {months.map((month) => {
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
