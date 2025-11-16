// EHS Data Types and Initial Data

export interface MonthlyData {
  jan: number
  feb: number
  mar: number
  apr: number
  may: number
  jun: number
  jul: number
  aug: number
  sep: number
  oct: number
  nov: number
  dec: number
}

export interface EHSData {
  trainingHours: {
    target: MonthlyData
    actual: MonthlyData
  }
  hazardReporting: {
    target: MonthlyData
    actual: MonthlyData
  }
  nearMisses: MonthlyData
  leadingIndicatorIndex: {
    target: MonthlyData
  }
  accidents: MonthlyData
  firstAidCases: MonthlyData
  medicalCases: MonthlyData
  illHealthCases: MonthlyData
  lostTimeAccidents: MonthlyData
  ehsWalks: MonthlyData
  ehsRiskAssessments: MonthlyData
  electricityConsumed: MonthlyData
  gasConsumed: MonthlyData
  waterConsumption: MonthlyData
  paperSheetsConsumed: MonthlyData
  carbonFootprint: MonthlyData
}

export interface AdminData {
  workingHours: {
    totalSite: MonthlyData
    managementMDM: {
      total: MonthlyData
      overtime: MonthlyData
      routine: MonthlyData
    }
    managementContractual: {
      total: MonthlyData
      overtime: MonthlyData
      routine: MonthlyData
    }
    nonManagementMDM: {
      total: MonthlyData
      overtime: MonthlyData
      routine: MonthlyData
    }
    nonManagementContractual: {
      total: MonthlyData
      overtime: MonthlyData
      routine: MonthlyData
    }
  }
  hrMetrics: {
    resignations: MonthlyData
    vacantPositions: MonthlyData
    staffTurnover: MonthlyData
  }
}

// Initial EHS Data from screenshots
export const initialEHSData: EHSData = {
  trainingHours: {
    target: {
      jan: 100, feb: 150, mar: 50, apr: 25, may: 50, jun: 75,
      jul: 80, aug: 86, sep: 74, oct: 63, nov: 68, dec: 75
    },
    actual: {
      jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0,
      jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0
    }
  },
  hazardReporting: {
    target: {
      jan: 30, feb: 30, mar: 30, apr: 30, may: 30, jun: 30,
      jul: 30, aug: 30, sep: 30, oct: 30, nov: 30, dec: 30
    },
    actual: {
      jan: 35, feb: 45, mar: 68, apr: 15, may: 65, jun: 22,
      jul: 35, aug: 36, sep: 90, oct: 15, nov: 65, dec: 12
    }
  },
  nearMisses: {
    jan: 2, feb: 3, mar: 4, apr: 2, may: 6, jun: 2,
    jul: 1, aug: 6, sep: 7, oct: 8, nov: 9, dec: 10
  },
  leadingIndicatorIndex: {
    target: {
      jan: 125, feb: 125, mar: 125, apr: 125, may: 125, jun: 125,
      jul: 125, aug: 125, sep: 125, oct: 125, nov: 125, dec: 125
    }
  },
  accidents: {
    jan: 12, feb: 16, mar: 16, apr: 19, may: 20, jun: 12,
    jul: 16, aug: 16, sep: 19, oct: 20, nov: 16, dec: 12
  },
  firstAidCases: {
    jan: 12, feb: 15, mar: 13, apr: 19, may: 20, jun: 12,
    jul: 15, aug: 13, sep: 19, oct: 20, nov: 15, dec: 12
  },
  medicalCases: {
    jan: 0, feb: 1, mar: 1, apr: 0, may: 0, jun: 0,
    jul: 1, aug: 1, sep: 0, oct: 0, nov: 1, dec: 0
  },
  illHealthCases: {
    jan: 0, feb: 0, mar: 1, apr: 0, may: 0, jun: 0,
    jul: 0, aug: 1, sep: 0, oct: 0, nov: 0, dec: 0
  },
  lostTimeAccidents: {
    jan: 0, feb: 0, mar: 1, apr: 0, may: 0, jun: 0,
    jul: 0, aug: 1, sep: 0, oct: 0, nov: 0, dec: 0
  },
  ehsWalks: {
    jan: 1, feb: 1, mar: 1, apr: 1, may: 1, jun: 1,
    jul: 1, aug: 1, sep: 1, oct: 1, nov: 1, dec: 1
  },
  ehsRiskAssessments: {
    jan: 2, feb: 4, mar: 3, apr: 4, may: 5, jun: 7,
    jul: 6, aug: 9, sep: 8, oct: 1, nov: 4, dec: 6
  },
  electricityConsumed: {
    jan: 243486, feb: 214348, mar: 208456, apr: 277102, may: 215053, jun: 223283,
    jul: 174251, aug: 248982, sep: 295521, oct: 191993, nov: 201587, dec: 186429
  },
  gasConsumed: {
    jan: 14598, feb: 13307, mar: 14302, apr: 14744, may: 12605, jun: 11311,
    jul: 13342, aug: 14973, sep: 11271, oct: 13822, nov: 12148, dec: 14195
  },
  waterConsumption: {
    jan: 250000, feb: 300000, mar: 350000, apr: 350000, may: 250000, jun: 200000,
    jul: 300000, aug: 280000, sep: 310000, oct: 325000, nov: 300000, dec: 200000
  },
  paperSheetsConsumed: {
    jan: 5000, feb: 7000, mar: 6000, apr: 4000, may: 2500, jun: 4000,
    jul: 10000, aug: 3500, sep: 6400, oct: 6500, nov: 7000, dec: 5000
  },
  carbonFootprint: {
    jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0,
    jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0
  }
}

// Initial Admin Data from screenshots
export const initialAdminData: AdminData = {
  workingHours: {
    totalSite: {
      jan: 54650, feb: 55780, mar: 56890, apr: 57900, may: 58010, jun: 58120,
      jul: 58230, aug: 58340, sep: 58450, oct: 58560, nov: 58670, dec: 59770
    },
    managementMDM: {
      total: {
        jan: 10700, feb: 10800, mar: 10900, apr: 11000, may: 11100, jun: 11200,
        jul: 11250, aug: 11280, sep: 11300, oct: 11320, nov: 11350, dec: 11380
      },
      overtime: {
        jan: 1200, feb: 1220, mar: 1240, apr: 1260, may: 1280, jun: 1300,
        jul: 1310, aug: 1320, sep: 1325, oct: 1328, nov: 1330, dec: 1330
      },
      routine: {
        jan: 9500, feb: 9580, mar: 9660, apr: 9740, may: 9820, jun: 9900,
        jul: 9940, aug: 9960, sep: 9975, oct: 9992, nov: 10020, dec: 10050
      }
    },
    managementContractual: {
      total: {
        jan: 41750, feb: 42500, mar: 43250, apr: 44000, may: 44750, jun: 45500,
        jul: 44800, aug: 44900, sep: 45000, oct: 45100, nov: 45200, dec: 45480
      },
      overtime: {
        jan: 400, feb: 420, mar: 440, apr: 460, may: 480, jun: 500,
        jul: 510, aug: 520, sep: 530, oct: 540, nov: 545, dec: 550
      },
      routine: {
        jan: 3500, feb: 3600, mar: 3700, apr: 3800, may: 3900, jun: 4000,
        jul: 3800, aug: 3850, sep: 3900, oct: 3900, nov: 3900, dec: 3900
      }
    },
    nonManagementMDM: {
      total: {
        jan: 38250, feb: 39000, mar: 39750, apr: 40500, may: 41250, jun: 42000,
        jul: 41500, aug: 41600, sep: 41700, oct: 41800, nov: 41900, dec: 41580
      },
      overtime: {
        jan: 200, feb: 220, mar: 240, apr: 260, may: 280, jun: 300,
        jul: 290, aug: 300, sep: 305, oct: 308, nov: 310, dec: 310
      },
      routine: {
        jan: 1250, feb: 1280, mar: 1310, apr: 1340, may: 1370, jun: 1400,
        jul: 1380, aug: 1385, sep: 1390, oct: 1392, nov: 1395, dec: 1380
      }
    },
    nonManagementContractual: {
      total: {
        jan: 37000, feb: 37500, mar: 38000, apr: 38500, may: 39000, jun: 39500,
        jul: 39800, aug: 40000, sep: 40200, oct: 40300, nov: 40400, dec: 40200
      },
      overtime: {
        jan: 2000, feb: 2100, mar: 2200, apr: 2300, may: 2400, jun: 2500,
        jul: 2550, aug: 2580, sep: 2600, oct: 2600, nov: 2600, dec: 2600
      },
      routine: {
        jan: 35000, feb: 35400, mar: 35800, apr: 36200, may: 36600, jun: 37000,
        jul: 37250, aug: 37420, sep: 37600, oct: 37700, nov: 37800, dec: 37600
      }
    }
  },
  hrMetrics: {
    resignations: {
      jan: 1, feb: 2, mar: 3, apr: 1, may: 2, jun: 3,
      jul: 0, aug: 4, sep: 0, oct: 2, nov: 4, dec: 6
    },
    vacantPositions: {
      jan: 1, feb: 2, mar: 3, apr: 1, may: 2, jun: 3,
      jul: 0, aug: 4, sep: 0, oct: 2, nov: 4, dec: 4
    },
    staffTurnover: {
      jan: 5, feb: 6, mar: 7, apr: 10, may: 11, jun: 12,
      jul: 0, aug: 12, sep: 10, oct: 5, nov: 6, dec: 8
    }
  }
}

// Helper function to get month name
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const

export type MonthKey = keyof MonthlyData

// Helper to convert monthly data to array
export function monthlyDataToArray(data: MonthlyData): number[] {
  return [data.jan, data.feb, data.mar, data.apr, data.may, data.jun, data.jul, data.aug, data.sep, data.oct, data.nov, data.dec]
}

