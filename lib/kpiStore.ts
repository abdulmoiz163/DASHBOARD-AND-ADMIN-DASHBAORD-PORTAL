import { initialAdminData, type AdminData, type MonthlyData } from '@/lib/data'

let currentKPI: AdminData = JSON.parse(JSON.stringify(initialAdminData))

export function getKPIData(): AdminData {
  return currentKPI
}

function mergeMonthlyData(target: MonthlyData, source: Partial<MonthlyData>) {
  if (!source) return
  target.jan = source.jan ?? target.jan
  target.feb = source.feb ?? target.feb
  target.mar = source.mar ?? target.mar
  target.apr = source.apr ?? target.apr
  target.may = source.may ?? target.may
  target.jun = source.jun ?? target.jun
  target.jul = source.jul ?? target.jul
  target.aug = source.aug ?? target.aug
  target.sep = source.sep ?? target.sep
  target.oct = source.oct ?? target.oct
  target.nov = source.nov ?? target.nov
  target.dec = source.dec ?? target.dec
}

export function updateKPIData(partial: Partial<AdminData>) {
  const next = { ...currentKPI }
  if (partial.workingHours) {
    const wh = partial.workingHours
    if (wh.totalSite) mergeMonthlyData(next.workingHours.totalSite, wh.totalSite)
    if (wh.managementMDM?.total) mergeMonthlyData(next.workingHours.managementMDM.total, wh.managementMDM.total)
    if (wh.managementMDM?.overtime) mergeMonthlyData(next.workingHours.managementMDM.overtime, wh.managementMDM.overtime)
    if (wh.managementMDM?.routine) mergeMonthlyData(next.workingHours.managementMDM.routine, wh.managementMDM.routine)
    if (wh.managementContractual?.total) mergeMonthlyData(next.workingHours.managementContractual.total, wh.managementContractual.total)
    if (wh.managementContractual?.overtime) mergeMonthlyData(next.workingHours.managementContractual.overtime, wh.managementContractual.overtime)
    if (wh.managementContractual?.routine) mergeMonthlyData(next.workingHours.managementContractual.routine, wh.managementContractual.routine)
    if (wh.nonManagementMDM?.total) mergeMonthlyData(next.workingHours.nonManagementMDM.total, wh.nonManagementMDM.total)
    if (wh.nonManagementMDM?.overtime) mergeMonthlyData(next.workingHours.nonManagementMDM.overtime, wh.nonManagementMDM.overtime)
    if (wh.nonManagementMDM?.routine) mergeMonthlyData(next.workingHours.nonManagementMDM.routine, wh.nonManagementMDM.routine)
    if (wh.nonManagementContractual?.total) mergeMonthlyData(next.workingHours.nonManagementContractual.total, wh.nonManagementContractual.total)
    if (wh.nonManagementContractual?.overtime) mergeMonthlyData(next.workingHours.nonManagementContractual.overtime, wh.nonManagementContractual.overtime)
    if (wh.nonManagementContractual?.routine) mergeMonthlyData(next.workingHours.nonManagementContractual.routine, wh.nonManagementContractual.routine)
  }
  if (partial.hrMetrics) {
    const hr = partial.hrMetrics
    if (hr.resignations) mergeMonthlyData(next.hrMetrics.resignations, hr.resignations)
    if (hr.vacantPositions) mergeMonthlyData(next.hrMetrics.vacantPositions, hr.vacantPositions)
    if (hr.staffTurnover) mergeMonthlyData(next.hrMetrics.staffTurnover, hr.staffTurnover)
  }
  currentKPI = next
  return currentKPI
}