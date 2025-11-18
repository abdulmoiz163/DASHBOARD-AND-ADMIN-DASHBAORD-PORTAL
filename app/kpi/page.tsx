'use client'

import { useEffect, useMemo, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { ThemeProvider } from '@/components/ThemeProvider'
import ChartCard from '@/components/ChartCard'
import Logo from '@/components/Logo'
import { initialAdminData, months, monthlyDataToArray } from '@/lib/data'

export default function KPIDetailsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [kpiData, setKpiData] = useState(initialAdminData)

  useEffect(() => {
    const fetchKpi = async () => {
      try {
        const res = await fetch('/api/kpi')
        if (res.ok) {
          const json = await res.json()
          if (json?.data) setKpiData(json.data)
        }
      } catch {}
    }
    fetchKpi()
  }, [])

  const series = {
    totalSite: monthlyDataToArray(kpiData.workingHours.totalSite),
    mgmtTotal: (() => {
      const a = monthlyDataToArray(kpiData.workingHours.managementMDM.total)
      const b = monthlyDataToArray(kpiData.workingHours.managementContractual.total)
      return a.map((v, i) => v + b[i])
    })(),
    nonMgmtTotal: (() => {
      const a = monthlyDataToArray(kpiData.workingHours.nonManagementMDM.total)
      const b = monthlyDataToArray(kpiData.workingHours.nonManagementContractual.total)
      return a.map((v, i) => v + b[i])
    })(),
    resignations: monthlyDataToArray(kpiData.hrMetrics.resignations),
    vacancies: monthlyDataToArray(kpiData.hrMetrics.vacantPositions),
    turnover: monthlyDataToArray(kpiData.hrMetrics.staffTurnover)
  }

  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 text-center">
              <Logo className="mx-auto h-12 w-auto mb-4 text-gray-900 dark:text-white" />
              <p className="text-gray-600 dark:text-gray-400">Interactive charts and downloadable CSV of Working Hours and HR metrics.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <ChartCard title="Total Working Hours (Site)" data={series.totalSite} labels={months} type="line" />
                <ChartCard title="Management vs Non-Management (Total)" data={[series.mgmtTotal, series.nonMgmtTotal]} labels={months} type="bar" dataLabels={["Management Total", "Non-Management Total"]} />
                <ChartCard title="Resignations vs Vacancies" data={[series.resignations, series.vacancies]} labels={months} type="bar" dataLabels={["Resignations", "Vacancies"]} />
                <ChartCard title="Staff Turnover %" data={series.turnover} labels={months} type="line" />
              </div>

              {/* Simple CSV export */}
              <a
                href={`/api/kpi/export`}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Export CSV
              </a>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}