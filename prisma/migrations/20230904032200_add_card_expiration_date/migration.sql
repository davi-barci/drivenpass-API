/*
  Warnings:

  - You are about to drop the column `month` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `cards` table. All the data in the column will be lost.
  - Added the required column `expDate` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" DROP COLUMN "month",
DROP COLUMN "year",
ADD COLUMN     "expDate" TIMESTAMP(3) NOT NULL;
