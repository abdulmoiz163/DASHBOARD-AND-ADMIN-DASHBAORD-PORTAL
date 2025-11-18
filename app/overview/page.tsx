'use client'

import { initialEHSData, monthlyDataToArray, months } from '@/lib/data'
import KPICard from '@/components/KPICard'
import ChartCard from '@/components/ChartCard'
import Sidebar from '@/components/Sidebar'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AlertTriangle, Activity, TrendingUp } from 'lucide-react'

export default function OverviewPage() {
  const ehsData = initialEHSData

  // Calculate totals for KPIs
  const totalAccidents = monthlyDataToArray(ehsData.accidents).reduce((a, b) => a + b, 0)
  const totalHazards = monthlyDataToArray(ehsData.hazardReporting.actual).reduce((a, b) => a + b, 0)
  const totalNearMisses = monthlyDataToArray(ehsData.nearMisses).reduce((a, b) => a + b, 0)
  const totalElectricity = monthlyDataToArray(ehsData.electricityConsumed).reduce((a, b) => a + b, 0)

  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  EHS Overview
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Public overview of Environmental, Health, and Safety Metrics
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <KPICard
                  title="Total Accidents"
                  value={totalAccidents}
                  icon={<AlertTriangle className="w-6 h-6" />}
                  trend="down"
                />
                <KPICard
                  title="Hazards Reported"
                  value={totalHazards}
                  icon={<Activity className="w-6 h-6" />}
                  trend="up"
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Training Hours */}
                <ChartCard
                  title="Training Hours (Target vs Actual)"
                  data={[
                    monthlyDataToArray(ehsData.trainingHours.actual),
                    monthlyDataToArray(ehsData.trainingHours.target)
                  ]}
                  labels={months}
                  type="bar"
                  dataLabels={['Actual', 'Target']}
                />

                {/* Hazard Reporting */}
                <ChartCard
                  title="Hazard Reporting (Target vs Actual)"
                  data={[
                    monthlyDataToArray(ehsData.hazardReporting.actual),
                    monthlyDataToArray(ehsData.hazardReporting.target)
                  ]}
                  labels={months}
                  type="bar"
                  dataLabels={['Actual', 'Target']}
                />

                {/* Near Misses */}
                <ChartCard
                  title="Near Misses Reported"
                  data={monthlyDataToArray(ehsData.nearMisses)}
                  labels={months}
                  type="bar"
                />

                {/* Leading Indicator Index */}
                <ChartCard
                  title="Leading Indicator Index"
                  data={monthlyDataToArray(ehsData.leadingIndicatorIndex.target)}
                  labels={months}
                  type="line"
                />

                {/* Accidents Breakdown */}
                <ChartCard
                  title="Accidents Breakdown - First Aid Cases"
                  data={monthlyDataToArray(ehsData.firstAidCases)}
                  labels={months}
                  type="bar"
                />
                <ChartCard
                  title="Accidents Breakdown - Medical Cases"
                  data={monthlyDataToArray(ehsData.medicalCases)}
                  labels={months}
                  type="bar"
                />
                <ChartCard
                  title="Accidents Breakdown - Ill Health Cases"
                  data={monthlyDataToArray(ehsData.illHealthCases)}
                  labels={months}
                  type="bar"
                />
                <ChartCard
                  title="Accidents Breakdown - Lost Time Accident Cases"
                  data={monthlyDataToArray(ehsData.lostTimeAccidents)}
                  labels={months}
                  type="bar"
                />

                {/* EHS Walks */}
                <ChartCard
                  title="EHS Walks"
                  data={monthlyDataToArray(ehsData.ehsWalks)}
                  labels={months}
                  type="bar"
                />

                {/* EHS Risk Assessments */}
                <ChartCard
                  title="EHS Risk Assessments"
                  data={monthlyDataToArray(ehsData.ehsRiskAssessments)}
                  labels={months}
                  type="bar"
                />

                {/* Electricity Consumption */}
                <ChartCard
                  title="Electricity Consumption (KWH)"
                  data={monthlyDataToArray(ehsData.electricityConsumed)}
                  labels={months}
                  type="line"
                />

                {/* Gas Consumption */}
                <ChartCard
                  title="Gas Consumption (m³)"
                  data={monthlyDataToArray(ehsData.gasConsumed)}
                  labels={months}
                  type="line"
                />

                {/* Water Consumption */}
                <ChartCard
                  title="Water Consumption (Gallons)"
                  data={monthlyDataToArray(ehsData.waterConsumption)}
                  labels={months}
                  type="line"
                />

                {/* Paper Consumption */}
                <ChartCard
                  title="Paper Consumption (Sheets)"
                  data={monthlyDataToArray(ehsData.paperSheetsConsumed)}
                  labels={months}
                  type="line"
                />

                {/* Carbon Footprint */}
                <ChartCard
                  title="Carbon Footprint"
                  data={monthlyDataToArray(ehsData.carbonFootprint)}
                  labels={months}
                  type="line"
                />

                {/* Month-wise EHS Trends - Combined line and bar */}
                <ChartCard
                  title="Month-wise EHS Trends - Accidents & Hazards"
                  data={[
                    monthlyDataToArray(ehsData.accidents),
                    monthlyDataToArray(ehsData.hazardReporting.actual)
                  ]}
                  labels={months}
                  type="line"
                  dataLabels={['Accidents', 'Hazards']}
                />
                <ChartCard
                  title="Month-wise EHS Trends - Near Misses & Training"
                  data={[
                    monthlyDataToArray(ehsData.nearMisses),
                    monthlyDataToArray(ehsData.trainingHours.actual)
                  ]}
                  labels={months}
                  type="bar"
                  dataLabels={['Near Misses', 'Training Hours']}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

