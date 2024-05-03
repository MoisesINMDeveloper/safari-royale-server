/*
  Warnings:

  - You are about to drop the column `phoneName` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_phoneName_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phoneName",
ADD COLUMN     "phoneCode" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_phoneCode_fkey" FOREIGN KEY ("phoneCode") REFERENCES "Phone"("code") ON DELETE SET NULL ON UPDATE CASCADE;
