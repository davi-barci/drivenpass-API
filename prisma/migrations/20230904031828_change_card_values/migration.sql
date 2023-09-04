/*
  Warnings:

  - You are about to drop the column `CVC` on the `cards` table. All the data in the column will be lost.
  - Added the required column `CVV` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" DROP COLUMN "CVC",
ADD COLUMN     "CVV" TEXT NOT NULL;
