import { NextRequest, NextResponse } from 'next/server'
import { initialEHSData, initialAdminData, monthlyDataToArray, months } from '@/lib/data'

export async function GET(request: NextRequest) {
  try {
    // For now, we'll use the initial data. In a real app, this would come from a database
    const ehsData = initialEHSData
    const adminData = initialAdminData

    // Generate CSV content for EHS data
    let csvContent = 'Category,Metric,Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec\n'

    // EHS Core Metrics
    csvContent += 'EHS Core Metrics,Total Number of Accidents,' + monthlyDataToArray(ehsData.accidents).join(',') + '\n'
    csvContent += 'EHS Core Metrics,Number of First Aid Cases,' + monthlyDataToArray(ehsData.firstAidCases).join(',') + '\n'
    csvContent += 'EHS Core Metrics,Number of Medical Cases,' + monthlyDataToArray(ehsData.medicalCases).join(',') + '\n'
    csvContent += 'EHS Core Metrics,Number of Ill Health Cases,' + monthlyDataToArray(ehsData.illHealthCases).join(',') + '\n'
    csvContent += 'EHS Core Metrics,Number of Lost Time Accident Cases,' + monthlyDataToArray(ehsData.lostTimeAccidents).join(',') + '\n'
    csvContent += 'EHS Core Metrics,Number of EHS Walks,' + monthlyDataToArray(ehsData.ehsWalks).join(',') + '\n'
    csvContent += 'EHS Core Metrics,Number of EHS Risk Assessments,' + monthlyDataToArray(ehsData.ehsRiskAssessments).join(',') + '\n'

    // Training & Hazards
    csvContent += 'Training & Hazards,Target Training Hours,' + monthlyDataToArray(ehsData.trainingHours.target).join(',') + '\n'
    csvContent += 'Training & Hazards,Actual Training Hours,' + monthlyDataToArray(ehsData.trainingHours.actual).join(',') + '\n'
    csvContent += 'Training & Hazards,Target Hazard Reporting,' + monthlyDataToArray(ehsData.hazardReporting.target).join(',') + '\n'
    csvContent += 'Training & Hazards,Actual Number of Hazards Reported,' + monthlyDataToArray(ehsData.hazardReporting.actual).join(',') + '\n'
    csvContent += 'Training & Hazards,Actual Near Misses Reported,' + monthlyDataToArray(ehsData.nearMisses).join(',') + '\n'
    csvContent += 'Training & Hazards,Target Leading Indicator Index (LII),' + monthlyDataToArray(ehsData.leadingIndicatorIndex.target).join(',') + '\n'

    // Consumption
    csvContent += 'Resource Consumption,Total Electricity Consumed (KWH),' + monthlyDataToArray(ehsData.electricityConsumed).join(',') + '\n'
    csvContent += 'Resource Consumption,Total Gas Consumed (meter cube),' + monthlyDataToArray(ehsData.gasConsumed).join(',') + '\n'
    csvContent += 'Resource Consumption,Water Consumption (US Gallons),' + monthlyDataToArray(ehsData.waterConsumption).join(',') + '\n'
    csvContent += 'Resource Consumption,Number of Paper Sheets Consumed,' + monthlyDataToArray(ehsData.paperSheetsConsumed).join(',') + '\n'
    csvContent += 'Resource Consumption,Carbon Footprint,' + monthlyDataToArray(ehsData.carbonFootprint).join(',') + '\n'

    // Admin Data
    csvContent += '\nWorking Hours,Total Working Hours of Site (Total of A+B+C+D),' + monthlyDataToArray(adminData.workingHours.totalSite).join(',') + '\n'
    csvContent += 'Working Hours,A. Total Working Hours Management (Total of A1+A2),' + monthlyDataToArray(adminData.workingHours.managementMDM.total).join(',') + '\n'
    csvContent += 'Working Hours,A1. Overtime Working Hours Management (MDM),' + monthlyDataToArray(adminData.workingHours.managementMDM.overtime).join(',') + '\n'
    csvContent += 'Working Hours,A2. Routine Working Hours Management (MDM),' + monthlyDataToArray(adminData.workingHours.managementMDM.routine).join(',') + '\n'
    csvContent += 'Working Hours,B. Total Working Hours Contractual (Total of B1+B2),' + monthlyDataToArray(adminData.workingHours.managementContractual.total).join(',') + '\n'
    csvContent += 'Working Hours,B1. Overtime Working Hours Contractual,' + monthlyDataToArray(adminData.workingHours.managementContractual.overtime).join(',') + '\n'
    csvContent += 'Working Hours,B2. Routine Working Hours Contractual,' + monthlyDataToArray(adminData.workingHours.managementContractual.routine).join(',') + '\n'
    csvContent += 'Working Hours,C. Total Working Hours Non-Management (MDM) (Total of C1+C2),' + monthlyDataToArray(adminData.workingHours.nonManagementMDM.total).join(',') + '\n'
    csvContent += 'Working Hours,C1. Overtime Working Hours Non-Management (MDM),' + monthlyDataToArray(adminData.workingHours.nonManagementMDM.overtime).join(',') + '\n'
    csvContent += 'Working Hours,C2. Routine Working Hours Non-Management (MDM),' + monthlyDataToArray(adminData.workingHours.nonManagementMDM.routine).join(',') + '\n'
    csvContent += 'Working Hours,D. Total Working Hours Non-Management Contractual (Total of D1+D2),' + monthlyDataToArray(adminData.workingHours.nonManagementContractual.total).join(',') + '\n'
    csvContent += 'Working Hours,D1. Overtime Working Hours Non-Management Contractual,' + monthlyDataToArray(adminData.workingHours.nonManagementContractual.overtime).join(',') + '\n'
    csvContent += 'Working Hours,D2. Routine Working Hours Non-Management Contractual,' + monthlyDataToArray(adminData.workingHours.nonManagementContractual.routine).join(',') + '\n'

    csvContent += '\nHR Metrics,Number of Resignations,' + monthlyDataToArray(adminData.hrMetrics.resignations).join(',') + '\n'
    csvContent += 'HR Metrics,Vacant Positions,' + monthlyDataToArray(adminData.hrMetrics.vacantPositions).join(',') + '\n'
    csvContent += 'HR Metrics,Staff Turnover %,' + monthlyDataToArray(adminData.hrMetrics.staffTurnover).join(',') + '\n'

    const response = new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="ehs-dashboard-${new Date().toISOString().split('T')[0]}.csv"`
      }
    })

    return response

  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
