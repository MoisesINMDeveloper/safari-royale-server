/*
  Warnings:

  - You are about to drop the column `bankId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Bank` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Phone` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_bankId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_phoneId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bankId",
DROP COLUMN "phoneId",
ADD COLUMN     "bankName" TEXT,
ADD COLUMN     "phoneName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Bank_name_key" ON "Bank"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_code_key" ON "Phone"("code");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_bankName_fkey" FOREIGN KEY ("bankName") REFERENCES "Bank"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_phoneName_fkey" FOREIGN KEY ("phoneName") REFERENCES "Phone"("code") ON DELETE SET NULL ON UPDATE CASCADE;
