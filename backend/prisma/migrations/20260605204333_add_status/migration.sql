/*
  Warnings:

  - You are about to drop the `TaskStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "TaskStatus_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TaskStatus";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'TODO',
    "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Task" ("createdAt", "description", "id", "priority", "statusId", "title") SELECT "createdAt", "description", "id", "priority", "statusId", "title" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
