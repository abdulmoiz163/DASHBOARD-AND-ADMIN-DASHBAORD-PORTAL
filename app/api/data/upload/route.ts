import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import Papa from 'papaparse'
import { EHSData, MonthlyData } from '@/lib/data'

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      )
    }

    const user = verifyToken(token)
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const text = await file.text()
    const result = Papa.parse(text, { header: true })

    // Process CSV data and return updated EHS data
    // This is a simplified version - you'll need to map CSV columns to your data structure
    const processedData = processCSVData(result.data)

    return NextResponse.json({ data: processedData, message: 'Data uploaded successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function processCSVData(csvData: any[]): Partial<EHSData> {
  // Expect rows with columns: Metric, Jan, Feb, ..., Dec
  // Map known metrics to EHS data keys
  const ehsPartial: Partial<EHSData> = {}

  const mapMonthly = (row: any) => ({
    jan: num(row['Jan']), feb: num(row['Feb']), mar: num(row['Mar']), apr: num(row['Apr']), may: num(row['May']), jun: num(row['Jun']),
    jul: num(row['Jul']), aug: num(row['Aug']), sep: num(row['Sep']), oct: num(row['Oct']), nov: num(row['Nov']), dec: num(row['Dec'])
  })
  function num(v: any) { const n = parseFloat(String(v ?? '').trim()); return isNaN(n) ? 0 : n }

  for (const row of csvData) {
    const metric = String(row['Metric'] ?? row['metric'] ?? '').toLowerCase()
    if (!metric) continue
    const monthly = mapMonthly(row)

    // EHS metrics mapping
    if (metric.includes('training hours target')) {
      ehsPartial.trainingHours = ehsPartial.trainingHours || { target: {} as MonthlyData, actual: {} as MonthlyData }
      ehsPartial.trainingHours.target = monthly
    } else if (metric.includes('training hours actual')) {
      ehsPartial.trainingHours = ehsPartial.trainingHours || { target: {} as MonthlyData, actual: {} as MonthlyData }
      ehsPartial.trainingHours.actual = monthly
    } else if (metric.includes('hazard reporting target')) {
      ehsPartial.hazardReporting = ehsPartial.hazardReporting || { target: {} as MonthlyData, actual: {} as MonthlyData }
      ehsPartial.hazardReporting.target = monthly
    } else if (metric.includes('hazard reporting actual')) {
      ehsPartial.hazardReporting = ehsPartial.hazardReporting || { target: {} as MonthlyData, actual: {} as MonthlyData }
      ehsPartial.hazardReporting.actual = monthly
    } else if (metric.includes('near misses')) {
      ehsPartial.nearMisses = monthly
    } else if (metric.includes('leading indicator index target')) {
      ehsPartial.leadingIndicatorIndex = ehsPartial.leadingIndicatorIndex || { target: {} as MonthlyData }
      ehsPartial.leadingIndicatorIndex.target = monthly
    } else if (metric.includes('accidents')) {
      ehsPartial.accidents = monthly
    } else if (metric.includes('first aid cases')) {
      ehsPartial.firstAidCases = monthly
    } else if (metric.includes('medical cases')) {
      ehsPartial.medicalCases = monthly
    } else if (metric.includes('ill health cases')) {
      ehsPartial.illHealthCases = monthly
    } else if (metric.includes('lost time accidents')) {
      ehsPartial.lostTimeAccidents = monthly
    } else if (metric.includes('ehs walks')) {
      ehsPartial.ehsWalks = monthly
    } else if (metric.includes('ehs risk assessments')) {
      ehsPartial.ehsRiskAssessments = monthly
    } else if (metric.includes('electricity consumed')) {
      ehsPartial.electricityConsumed = monthly
    } else if (metric.includes('gas consumed')) {
      ehsPartial.gasConsumed = monthly
    } else if (metric.includes('water consumption')) {
      ehsPartial.waterConsumption = monthly
    } else if (metric.includes('paper sheets consumed')) {
      ehsPartial.paperSheetsConsumed = monthly
    } else if (metric.includes('carbon footprint')) {
      ehsPartial.carbonFootprint = monthly
    }
  }

  return ehsPartial
}

