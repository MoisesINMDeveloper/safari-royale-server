/*
  Warnings:

  - You are about to drop the column `animal` on the `Combination` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Combination` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Combination" DROP COLUMN "animal",
DROP COLUMN "color";

-- CreateTable
CREATE TABLE "Animal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnimalCombinations" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ColorCombinations" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Animal_name_key" ON "Animal"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Color_name_key" ON "Color"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimalCombinations_AB_unique" ON "_AnimalCombinations"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimalCombinations_B_index" ON "_AnimalCombinations"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ColorCombinations_AB_unique" ON "_ColorCombinations"("A", "B");

-- CreateIndex
CREATE INDEX "_ColorCombinations_B_index" ON "_ColorCombinations"("B");

-- AddForeignKey
ALTER TABLE "_AnimalCombinations" ADD CONSTRAINT "_AnimalCombinations_A_fkey" FOREIGN KEY ("A") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimalCombinations" ADD CONSTRAINT "_AnimalCombinations_B_fkey" FOREIGN KEY ("B") REFERENCES "Combination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ColorCombinations" ADD CONSTRAINT "_ColorCombinations_A_fkey" FOREIGN KEY ("A") REFERENCES "Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ColorCombinations" ADD CONSTRAINT "_ColorCombinations_B_fkey" FOREIGN KEY ("B") REFERENCES "Combination"("id") ON DELETE CASCADE ON UPDATE CASCADE;
