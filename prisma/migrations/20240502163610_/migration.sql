-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verificationCodeSent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verified" BOOLEAN;
