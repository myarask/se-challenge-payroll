/*
  Warnings:

  - You are about to drop the column `name` on the `TimeReport` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "TimeReportEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "hoursWorked" REAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "jobGroupId" TEXT NOT NULL,
    "timeReportId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TimeReportEntry_timeReportId_fkey" FOREIGN KEY ("timeReportId") REFERENCES "TimeReport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TimeReport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_TimeReport" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "TimeReport";
DROP TABLE "TimeReport";
ALTER TABLE "new_TimeReport" RENAME TO "TimeReport";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
