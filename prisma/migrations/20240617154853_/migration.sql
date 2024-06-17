/*
  Warnings:

  - You are about to drop the column `animal_name` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `color_name` on the `Raffle` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Raffle" DROP COLUMN "animal_name",
DROP COLUMN "color_name";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';
