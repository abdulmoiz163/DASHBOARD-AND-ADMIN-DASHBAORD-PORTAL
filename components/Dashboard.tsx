'use client'

import { useState, useEffect } from 'react'
import { initialEHSData, initialAdminData, monthlyDataToArray, months, type EHSData, type AdminData } from '@/lib/data'
import KPICard from './KPICard'
import DataTable from './DataTable'
import ChartCard from './ChartCard'
import DataInputForm from './DataInputForm'
import { useAuth } from './AuthProvider'
import { Edit, TrendingUp, AlertTriangle, Activity, Download, FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const { isAuthenticated, isAdmin, isSeniorExecutive } = useAuth()
  const router = useRouter()
  const [ehsData, setEhsData] = useState<EHSData>(initialEHSData)
  const [adminData, setAdminData] = useState<AdminData>(initialAdminData)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated || (!isAdmin && !isSeniorExecutive)) {
      router.push('/overview')
    }
  }, [isAuthenticated, isAdmin, isSeniorExecutive, router])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/kpi')
        if (res.ok) {
          const json = await res.json()
          if (json?.data) {
            setEhsData(json.data.ehs || initialEHSData)
            setAdminData(json.data.admin || initialAdminData)
          }
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      }
    }
    if (isAuthenticated && (isAdmin || isSeniorExecutive)) {
      fetchData()
    }
  }, [isAuthenticated, isAdmin, isSeniorExecutive])

  if (!isAuthenticated || (!isAdmin && !isSeniorExecutive)) {
    return null
  }

  // Calculate totals for KPIs - charts will update when ehsData changes
  const totalAccidents = monthlyDataToArray(ehsData.accidents).reduce((a, b) => a + b, 0)
  const totalHazards = monthlyDataToArray(ehsData.hazardReporting.actual).reduce((a, b) => a + b, 0)
  const totalNearMisses = monthlyDataToArray(ehsData.nearMisses).reduce((a, b) => a + b, 0)
  const totalElectricity = monthlyDataToArray(ehsData.electricityConsumed).reduce((a, b) => a + b, 0)
  const totalGas = monthlyDataToArray(ehsData.gasConsumed).reduce((a, b) => a + b, 0)
  const totalWater = monthlyDataToArray(ehsData.waterConsumption).reduce((a, b) => a + b, 0)

  // Calculate admin KPIs
  const totalWorkingHours = monthlyDataToArray(adminData.workingHours.totalSite).reduce((a, b) => a + b, 0)
  const totalResignations = monthlyDataToArray(adminData.hrMetrics.resignations).reduce((a, b) => a + b, 0)
  const totalVacancies = monthlyDataToArray(adminData.hrMetrics.vacantPositions).reduce((a, b) => a + b, 0)
  const avgTurnover = monthlyDataToArray(adminData.hrMetrics.staffTurnover).reduce((a, b) => a + b, 0) / 12

  // Comparison calculations for color-coded KPIs
  const getTrend = (current: number, previous: number) => {
    if (current > previous) return 'up'
    if (current < previous) return 'down'
    return 'neutral'
  }

  const currentMonth = new Date().getMonth()
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const sameMonthLastYear = currentMonth

  const accidentsCurrent = monthlyDataToArray(ehsData.accidents)[currentMonth]
  const accidentsLast = monthlyDataToArray(ehsData.accidents)[lastMonth]
  const accidentsLastYear = monthlyDataToArray(ehsData.accidents)[sameMonthLastYear]

  const hazardsCurrent = monthlyDataToArray(ehsData.hazardReporting.actual)[currentMonth]
  const hazardsLast = monthlyDataToArray(ehsData.hazardReporting.actual)[lastMonth]
  const hazardsLastYear = monthlyDataToArray(ehsData.hazardReporting.actual)[sameMonthLastYear]

  const workingHoursCurrent = monthlyDataToArray(adminData.workingHours.totalSite)[currentMonth]
  const workingHoursLast = monthlyDataToArray(adminData.workingHours.totalSite)[lastMonth]
  const workingHoursLastYear = monthlyDataToArray(adminData.workingHours.totalSite)[sameMonthLastYear]

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            EHS Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Environmental, Health, and Safety Metrics Overview
          </p>
        </div>

        {/* KPI Cards - Color-coded based on comparisons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Accidents"
            value={totalAccidents}
            icon={<AlertTriangle className="w-6 h-6" />}
            trend={getTrend(accidentsCurrent, accidentsLast)}
          />
          <KPICard
            title="Hazards Reported"
            value={totalHazards}
            icon={<Activity className="w-6 h-6" />}
            trend={getTrend(hazardsCurrent, hazardsLast)}
          />
          <KPICard
            title="Near Misses"
            value={totalNearMisses}
            icon={<TrendingUp className="w-6 h-6" />}
            trend="up"
          />
          <KPICard
            title="Electricity (KWH)"
            value={totalElectricity.toLocaleString()}
            icon={<Activity className="w-6 h-6" />}
            trend="neutral"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard
            title="Accidents Over Time"
            data={monthlyDataToArray(ehsData.accidents)}
            labels={months}
            type="line"
          />
          <ChartCard
            title="Hazards Reported vs Target"
            data={[
              monthlyDataToArray(ehsData.hazardReporting.actual),
              monthlyDataToArray(ehsData.hazardReporting.target)
            ]}
            labels={months}
            type="bar"
            dataLabels={['Actual', 'Target']}
          />
          <ChartCard
            title="Near Misses Reported"
            data={monthlyDataToArray(ehsData.nearMisses)}
            labels={months}
            type="bar"
          />
          <ChartCard
            title="Energy Consumption (KWH)"
            data={monthlyDataToArray(ehsData.electricityConsumed)}
            labels={months}
            type="line"
          />
        </div>

        {/* Data Tables Section */}
        <div className="space-y-6">
          {/* EHS Core Metrics Table */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                EHS Core Metrics
              </h2>
              {isAdmin && (
                <button
                  onClick={() => {
                    setEditingCategory('ehs-core')
                    setShowEditForm(true)
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                >
                  <Edit className="w-4 h-4" />
                  Edit Data
                </button>
              )}
            </div>
            <DataTable
              data={[
                {
                  label: 'Total Number of Accidents',
                  values: monthlyDataToArray(ehsData.accidents)
                },
                {
                  label: 'Number of First Aid Cases',
                  values: monthlyDataToArray(ehsData.firstAidCases)
                },
                {
                  label: 'Number of Medical Cases',
                  values: monthlyDataToArray(ehsData.medicalCases)
                },
                {
                  label: 'Number of Ill Health Cases',
                  values: monthlyDataToArray(ehsData.illHealthCases)
                },
                {
                  label: 'Number of Lost Time Accident Cases',
                  values: monthlyDataToArray(ehsData.lostTimeAccidents)
                },
                {
                  label: 'Number of EHS Walks',
                  values: monthlyDataToArray(ehsData.ehsWalks)
                },
                {
                  label: 'Number of EHS Risk Assessments',
                  values: monthlyDataToArray(ehsData.ehsRiskAssessments)
                }
              ]}
              labels={months}
            />
          </div>

          {/* Training & Hazards Table */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Training & Hazard Reporting
              </h2>
              {isAdmin && (
                <button
                  onClick={() => {
                    setEditingCategory('training-hazards')
                    setShowEditForm(true)
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                >
                  <Edit className="w-4 h-4" />
                  Edit Data
                </button>
              )}
            </div>
            <DataTable
              data={[
                {
                  label: 'Target Training Hours',
                  values: monthlyDataToArray(ehsData.trainingHours.target)
                },
                {
                  label: 'Actual Training Hours',
                  values: monthlyDataToArray(ehsData.trainingHours.actual)
                },
                {
                  label: 'Target Hazard Reporting',
                  values: monthlyDataToArray(ehsData.hazardReporting.target)
                },
                {
                  label: 'Actual Number of Hazards Reported',
                  values: monthlyDataToArray(ehsData.hazardReporting.actual)
                },
                {
                  label: 'Actual Near Misses Reported',
                  values: monthlyDataToArray(ehsData.nearMisses)
                },
                {
                  label: 'Target Leading Indicator Index (LII)',
                  values: monthlyDataToArray(ehsData.leadingIndicatorIndex.target)
                }
              ]}
              labels={months}
            />
          </div>

          {/* Consumption Metrics Table */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Resource Consumption
              </h2>
              {isAdmin && (
                <button
                  onClick={() => {
                    setEditingCategory('consumption')
                    setShowEditForm(true)
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                >
                  <Edit className="w-4 h-4" />
                  Edit Data
                </button>
              )}
            </div>
            <DataTable
              data={[
                {
                  label: 'Total Electricity Consumed (KWH)',
                  values: monthlyDataToArray(ehsData.electricityConsumed)
                },
                {
                  label: 'Total Gas Consumed (meter cube)',
                  values: monthlyDataToArray(ehsData.gasConsumed)
                },
                {
                  label: 'Water Consumption (US Gallons)',
                  values: monthlyDataToArray(ehsData.waterConsumption)
                },
                {
                  label: 'Number of Paper Sheets Consumed',
                  values: monthlyDataToArray(ehsData.paperSheetsConsumed)
                },
                {
                  label: 'Carbon Footprint',
                  values: monthlyDataToArray(ehsData.carbonFootprint)
                }
              ]}
              labels={months}
            />
          </div>

          {/* Admin Data Tables - Only for Senior Executive and Admin */}
          {isSeniorExecutive && (
            <>
              {/* Working Hours Table */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Working Hours
                  </h2>
                  <div className="flex gap-2">
                    <a
                      href="/api/kpi/export"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                    >
                      <Download className="w-4 h-4" />
                      Export CSV
                    </a>
                    <a
                      href="/api/export/pdf"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg"
                    >
                      <FileText className="w-4 h-4" />
                      Export PDF
                    </a>
                  </div>
                </div>
                <DataTable
                  data={[
                    {
                      label: 'Total Working Hours of Site (Total of A+B+C+D)',
                      values: monthlyDataToArray(adminData.workingHours.totalSite)
                    },
                    {
                      label: 'A. Total Working Hours Management (Total of A1+A2)',
                      values: monthlyDataToArray(adminData.workingHours.managementMDM.total)
                    },
                    {
                      label: 'A1. Overtime Working Hours Management (MDM)',
                      values: monthlyDataToArray(adminData.workingHours.managementMDM.overtime)
                    },
                    {
                      label: 'A2. Routine Working Hours Management (MDM)',
                      values: monthlyDataToArray(adminData.workingHours.managementMDM.routine)
                    },
                    {
                      label: 'B. Total Working Hours Contractual (Total of B1+B2)',
                      values: monthlyDataToArray(adminData.workingHours.managementContractual.total)
                    },
                    {
                      label: 'B1. Overtime Working Hours Contractual',
                      values: monthlyDataToArray(adminData.workingHours.managementContractual.overtime)
                    },
                    {
                      label: 'B2. Routine Working Hours Contractual',
                      values: monthlyDataToArray(adminData.workingHours.managementContractual.routine)
                    },
                    {
                      label: 'C. Total Working Hours Non-Management (MDM) (Total of C1+C2)',
                      values: monthlyDataToArray(adminData.workingHours.nonManagementMDM.total)
                    },
                    {
                      label: 'C1. Overtime Working Hours Non-Management (MDM)',
                      values: monthlyDataToArray(adminData.workingHours.nonManagementMDM.overtime)
                    },
                    {
                      label: 'C2. Routine Working Hours Non-Management (MDM)',
                      values: monthlyDataToArray(adminData.workingHours.nonManagementMDM.routine)
                    },
                    {
                      label: 'D. Total Working Hours Non-Management Contractual (Total of D1+D2)',
                      values: monthlyDataToArray(adminData.workingHours.nonManagementContractual.total)
                    },
                    {
                      label: 'D1. Overtime Working Hours Non-Management Contractual',
                      values: monthlyDataToArray(adminData.workingHours.nonManagementContractual.overtime)
                    },
                    {
                      label: 'D2. Routine Working Hours Non-Management Contractual',
                      values: monthlyDataToArray(adminData.workingHours.nonManagementContractual.routine)
                    }
                  ]}
                  labels={months}
                />
              </div>

              {/* HR Metrics Table */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    HR Metrics
                  </h2>
                  <div className="flex gap-2">
                    <a
                      href="/api/kpi/export"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                    >
                      <Download className="w-4 h-4" />
                      Export CSV
                    </a>
                    <a
                      href="/api/export/pdf"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg"
                    >
                      <FileText className="w-4 h-4" />
                      Export PDF
                    </a>
                  </div>
                </div>
                <DataTable
                  data={[
                    {
                      label: 'Number of Resignations',
                      values: monthlyDataToArray(adminData.hrMetrics.resignations)
                    },
                    {
                      label: 'Vacant Positions',
                      values: monthlyDataToArray(adminData.hrMetrics.vacantPositions)
                    },
                    {
                      label: 'Staff Turnover %',
                      values: monthlyDataToArray(adminData.hrMetrics.staffTurnover)
                    }
                  ]}
                  labels={months}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Edit Form Modal */}
      {showEditForm && (
        <DataInputForm
          category={editingCategory || ''}
          ehsData={ehsData}
          adminData={null}
          onClose={() => setShowEditForm(false)}
          onSave={(updatedData) => {
            if ('accidents' in updatedData) {
              setEhsData(updatedData as EHSData)
            }
            setShowEditForm(false)
          }}
        />
      )}
    </div>
  )
}

