import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { updateKPIData } from '@/lib/kpiStore'

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ error: 'No token provided' }, { status: 401 })

    const user = verifyToken(token)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 })
    }

    const body = await request.json()
    const updated = updateKPIData(body)
    return NextResponse.json({ data: updated, message: 'KPI value saved' })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}