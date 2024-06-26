/*
  Warnings:

  - You are about to drop the column `winnerUserId` on the `Raffle` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Raffle" DROP CONSTRAINT "Raffle_winnerUserId_fkey";

-- AlterTable
ALTER TABLE "Raffle" DROP COLUMN "winnerUserId";

-- CreateTable
CREATE TABLE "_UserRafflesWon" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserRafflesWon_AB_unique" ON "_UserRafflesWon"("A", "B");

-- CreateIndex
CREATE INDEX "_UserRafflesWon_B_index" ON "_UserRafflesWon"("B");

-- AddForeignKey
ALTER TABLE "_UserRafflesWon" ADD CONSTRAINT "_UserRafflesWon_A_fkey" FOREIGN KEY ("A") REFERENCES "Raffle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRafflesWon" ADD CONSTRAINT "_UserRafflesWon_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
