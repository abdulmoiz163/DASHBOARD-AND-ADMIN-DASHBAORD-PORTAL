import { NextResponse } from 'next/server'
import { getKPIData } from '@/lib/kpiStore'

// Public endpoint serving KPI (Admin) dataset for charts
export async function GET() {
  return NextResponse.json({ data: getKPIData() })
}