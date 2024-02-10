-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TimeReportEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "hoursWorked" REAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "jobGroupId" TEXT NOT NULL,
    "timeReportId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TimeReportEntry_timeReportId_fkey" FOREIGN KEY ("timeReportId") REFERENCES "TimeReport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TimeReportEntry" ("createdAt", "date", "employeeId", "hoursWorked", "id", "jobGroupId", "timeReportId", "updatedAt") SELECT "createdAt", "date", "employeeId", "hoursWorked", "id", "jobGroupId", "timeReportId", "updatedAt" FROM "TimeReportEntry";
DROP TABLE "TimeReportEntry";
ALTER TABLE "new_TimeReportEntry" RENAME TO "TimeReportEntry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
