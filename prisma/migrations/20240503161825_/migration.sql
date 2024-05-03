/*
  Warnings:

  - You are about to drop the column `bank.name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone.code` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "bank.name",
DROP COLUMN "phone.code";
