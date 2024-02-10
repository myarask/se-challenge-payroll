import { Injectable } from '@nestjs/common';
import { TimeReportsService } from 'src/time-reports/time-reports.service';

/**
 * Calculates the pay period for a given date.
 * The pay period is determined based on the day of the month.
 * If the day is on or before the 15th, the pay period is from the 1st to the 15th.
 * If the day is after the 15th, the pay period is from the 16th to the last day of the month.
 *
 * @param {Date} date - The input date.
 * @returns {Object} An object containing the start and end dates of the pay period.
 */
function getPayPeriod(date: Date) {
  // Extract year, month, and day from the input date
  const year = date.getFullYear();
  const month = date.getMonth(); // Note: getMonth() returns 0-11 for Jan-Dec
  const day = date.getDate();

  // Determine the pay period key based on the day
  if (day <= 15) {
    // Return the first day of the month
    return {
      startDate: `${year}-${String(month + 1).padStart(2, '0')}-01`,
      endDate: `${year}-${String(month + 1).padStart(2, '0')}-15`,
    };
  } else {
    // Return the 16th day of the month
    return {
      startDate: `${year}-${String(month + 1).padStart(2, '0')}-16`,
      endDate: `${year}-${String(month + 1).padStart(2, '0')}-${new Date(year, month + 1, 0).getDate()}`,
    };
  }
}

type EmployeeRecord = {
  employeeId: string;
  payPeriod: {
    startDate: string;
    endDate: string;
  };
  hoursWorked: number;
  amountPaid: string;
};

@Injectable()
export class ReportsService {
  constructor(private timeReportsService: TimeReportsService) {}
  async getPayroll() {
    const employeeReportsMap: Record<string, EmployeeRecord> = {};

    // Note: In a production app, rates would be stored in the DB.
    const jobGroupRate: Record<string, number> = {
      A: 20,
      B: 30,
    };

    // Fetch all time report entries
    const entries = await this.timeReportsService.findAllEntries();

    // Collect every active pay period for each employee
    entries.forEach((entry) => {
      const payPeriod = getPayPeriod(entry.date);
      const key = `${entry.employeeId}:${payPeriod.startDate}`;

      employeeReportsMap[key] ||= {
        employeeId: String(entry.employeeId),
        payPeriod,
        hoursWorked: 0,
        amountPaid: '$0.00',
      };
      employeeReportsMap[key].hoursWorked += entry.hoursWorked;
      employeeReportsMap[key].amountPaid = `$${(
        employeeReportsMap[key].hoursWorked * jobGroupRate[entry.jobGroupId]
      ).toFixed(2)}`;
    });

    // Reshape the employee reports
    const employeeReports = Object.values(employeeReportsMap)
      // Filter hoursWorked from the employee reports
      .map(({ hoursWorked, ...rest }) => rest)
      // Sort the employee reports by employee ID and pay period start date
      .sort((a, b) => {
        if (a.employeeId === b.employeeId) {
          return a.payPeriod.startDate.localeCompare(b.payPeriod.startDate);
        }
        return a.employeeId.localeCompare(b.employeeId);
      });

    return {
      payrollReport: {
        employeeReports,
      },
    };
  }
}
