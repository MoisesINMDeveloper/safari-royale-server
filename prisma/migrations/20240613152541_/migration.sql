-- CreateEnum
CREATE TYPE "RaffleStatus" AS ENUM ('PENDING', 'FINALIZED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- CreateTable
CREATE TABLE "Combination" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "animal" TEXT NOT NULL,

    CONSTRAINT "Combination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Raffle" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "winnerUserId" INTEGER,
    "winningCombinationId" INTEGER,
    "status" "RaffleStatus" NOT NULL,

    CONSTRAINT "Raffle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Raffle" ADD CONSTRAINT "Raffle_winnerUserId_fkey" FOREIGN KEY ("winnerUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Raffle" ADD CONSTRAINT "Raffle_winningCombinationId_fkey" FOREIGN KEY ("winningCombinationId") REFERENCES "Combination"("id") ON DELETE SET NULL ON UPDATE CASCADE;
