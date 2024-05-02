/*
  Warnings:

  - You are about to drop the column `verificationCodeSent` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "verificationCodeSent",
ALTER COLUMN "verified" SET DEFAULT false;
