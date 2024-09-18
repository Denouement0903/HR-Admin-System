-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Department" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL
);
INSERT INTO "new_Department" ("id", "name", "status") SELECT "id", "name", "status" FROM "Department";
DROP TABLE "Department";
ALTER TABLE "new_Department" RENAME TO "Department";
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
