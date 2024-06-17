/*
  Warnings:

  - Added the required column `animal_name` to the `Raffle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color_name` to the `Raffle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Raffle" ADD COLUMN     "animal_name" TEXT NOT NULL,
ADD COLUMN     "color_name" TEXT NOT NULL;
