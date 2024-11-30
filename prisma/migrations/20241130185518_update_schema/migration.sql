-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CashFlow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reason" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "isCashIn" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "CashFlow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CashFlow" ("category", "description", "id", "isCashIn", "reason", "userId") SELECT "category", "description", "id", "isCashIn", "reason", "userId" FROM "CashFlow";
DROP TABLE "CashFlow";
ALTER TABLE "new_CashFlow" RENAME TO "CashFlow";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
