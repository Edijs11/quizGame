/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Quizzes" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
