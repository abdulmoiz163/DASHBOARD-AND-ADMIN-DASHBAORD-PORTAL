import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import Papa from 'papaparse'
import { updateKPIData } from '@/lib/kpiStore'

function parseCSVToKPI(rows: any[]): any {
  // Expect rows with columns: Metric, Jan, Feb, ..., Dec
  // Map known metrics to data keys
  const kpiPartial: any = { workingHours: {}, hrMetrics: {} }

  const mapMonthly = (row: any) => ({
    jan: num(row['Jan']), feb: num(row['Feb']), mar: num(row['Mar']), apr: num(row['Apr']), may: num(row['May']), jun: num(row['Jun']),
    jul: num(row['Jul']), aug: num(row['Aug']), sep: num(row['Sep']), oct: num(row['Oct']), nov: num(row['Nov']), dec: num(row['Dec'])
  })
  function num(v: any) { const n = parseFloat(String(v ?? '').trim()); return isNaN(n) ? 0 : n }

  for (const row of rows) {
    const metric = String(row['Metric'] ?? row['metric'] ?? '').toLowerCase()
    if (!metric) continue
    const monthly = mapMonthly(row)

    // Working hours mapping
    if (metric.includes('total working hours of site')) {
      kpiPartial.workingHours.totalSite = monthly
    } else if (metric.startsWith('a1') || metric.includes('overtime working hours management (mdm)')) {
      kpiPartial.workingHours.managementMDM = kpiPartial.workingHours.managementMDM || {}
      kpiPartial.workingHours.managementMDM.overtime = monthly
    } else if (metric.startsWith('a2') || metric.includes('routine working hours management (mdm)')) {
      kpiPartial.workingHours.managementMDM = kpiPartial.workingHours.managementMDM || {}
      kpiPartial.workingHours.managementMDM.routine = monthly
    } else if (metric.startsWith('a.') || metric.includes('total working hours management (mdm)')) {
      kpiPartial.workingHours.managementMDM = kpiPartial.workingHours.managementMDM || {}
      kpiPartial.workingHours.managementMDM.total = monthly
    } else if (metric.startsWith('b1') || metric.includes('overtime working hours management (contractual)')) {
      kpiPartial.workingHours.managementContractual = kpiPartial.workingHours.managementContractual || {}
      kpiPartial.workingHours.managementContractual.overtime = monthly
    } else if (metric.startsWith('b2') || metric.includes('routine working hours management (contractual)')) {
      kpiPartial.workingHours.managementContractual = kpiPartial.workingHours.managementContractual || {}
      kpiPartial.workingHours.managementContractual.routine = monthly
    } else if (metric.startsWith('b.') || metric.includes('total working hours management (contractual)')) {
      kpiPartial.workingHours.managementContractual = kpiPartial.workingHours.managementContractual || {}
      kpiPartial.workingHours.managementContractual.total = monthly
    } else if (metric.startsWith('c1') || metric.includes('overtime working hours non-management (mdm)')) {
      kpiPartial.workingHours.nonManagementMDM = kpiPartial.workingHours.nonManagementMDM || {}
      kpiPartial.workingHours.nonManagementMDM.overtime = monthly
    } else if (metric.startsWith('c2') || metric.includes('routine working hours non-management (mdm)')) {
      kpiPartial.workingHours.nonManagementMDM = kpiPartial.workingHours.nonManagementMDM || {}
      kpiPartial.workingHours.nonManagementMDM.routine = monthly
    } else if (metric.startsWith('c.') || metric.includes('total working hours non-management (mdm)')) {
      kpiPartial.workingHours.nonManagementMDM = kpiPartial.workingHours.nonManagementMDM || {}
      kpiPartial.workingHours.nonManagementMDM.total = monthly
    } else if (metric.startsWith('d1') || metric.includes('overtime working hours non-management (contractual)')) {
      kpiPartial.workingHours.nonManagementContractual = kpiPartial.workingHours.nonManagementContractual || {}
      kpiPartial.workingHours.nonManagementContractual.overtime = monthly
    } else if (metric.startsWith('d2') || metric.includes('routine working hours non-management (contractual)')) {
      kpiPartial.workingHours.nonManagementContractual = kpiPartial.workingHours.nonManagementContractual || {}
      kpiPartial.workingHours.nonManagementContractual.routine = monthly
    } else if (metric.startsWith('d.') || metric.includes('total working hours non-management (contractual)')) {
      kpiPartial.workingHours.nonManagementContractual = kpiPartial.workingHours.nonManagementContractual || {}
      kpiPartial.workingHours.nonManagementContractual.total = monthly
    } else if (metric.includes('resignations')) {
      kpiPartial.hrMetrics.resignations = monthly
    } else if (metric.includes('vacant positions')) {
      kpiPartial.hrMetrics.vacantPositions = monthly
    } else if (metric.includes('staff turnover')) {
      kpiPartial.hrMetrics.staffTurnover = monthly
    }
  }

  return kpiPartial
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ error: 'No token provided' }, { status: 401 })

    const user = verifyToken(token)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const text = await file.text()
    const result = Papa.parse(text, { header: true })
    const parsed = parseCSVToKPI(result.data as any[])

    const updated = updateKPIData(parsed)
    return NextResponse.json({ data: updated, message: 'Admin data uploaded successfully' })
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
