/*
  Warnings:

  - You are about to drop the `_AnimalCombinations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ColorCombinations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AnimalCombinations" DROP CONSTRAINT "_AnimalCombinations_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnimalCombinations" DROP CONSTRAINT "_AnimalCombinations_B_fkey";

-- DropForeignKey
ALTER TABLE "_ColorCombinations" DROP CONSTRAINT "_ColorCombinations_A_fkey";

-- DropForeignKey
ALTER TABLE "_ColorCombinations" DROP CONSTRAINT "_ColorCombinations_B_fkey";

-- AlterTable
ALTER TABLE "Combination" ADD COLUMN     "animalId" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "colorId" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "_AnimalCombinations";

-- DropTable
DROP TABLE "_ColorCombinations";

-- AddForeignKey
ALTER TABLE "Combination" ADD CONSTRAINT "Combination_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Combination" ADD CONSTRAINT "Combination_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
