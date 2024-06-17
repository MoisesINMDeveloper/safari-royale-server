/*
  Warnings:

  - Added the required column `animal_name` to the `Combination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color_name` to the `Combination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Combination" ADD COLUMN     "animal_name" TEXT NOT NULL,
ADD COLUMN     "color_name" TEXT NOT NULL,
ALTER COLUMN "animalId" DROP DEFAULT,
ALTER COLUMN "colorId" DROP DEFAULT;
