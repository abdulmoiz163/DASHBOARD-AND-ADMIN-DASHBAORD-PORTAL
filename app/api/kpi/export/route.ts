import { NextResponse } from 'next/server'
import { months, monthlyDataToArray } from '@/lib/data'
import { getKPIData } from '@/lib/kpiStore'

export async function GET() {
  const data = getKPIData()
  const rows: string[] = []
  rows.push(['Metric', ...months].join(','))

  const addRow = (name: string, series: number[]) => {
    rows.push([name, ...series.map(v => String(v))].join(','))
  }

  addRow('Total Site Working Hours', monthlyDataToArray(data.workingHours.totalSite))
  addRow('Management Total Working Hours', monthlyDataToArray(data.workingHours.managementMDM.total).map((v, i) => v + monthlyDataToArray(data.workingHours.managementContractual.total)[i]))
  addRow('Non-Management Total Working Hours', monthlyDataToArray(data.workingHours.nonManagementMDM.total).map((v, i) => v + monthlyDataToArray(data.workingHours.nonManagementContractual.total)[i]))
  addRow('Resignations', monthlyDataToArray(data.hrMetrics.resignations))
  addRow('Vacant Positions', monthlyDataToArray(data.hrMetrics.vacantPositions))
  addRow('Staff Turnover %', monthlyDataToArray(data.hrMetrics.staffTurnover))

  const csv = rows.join('\n')
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="kpi.csv"'
    }
  })
}