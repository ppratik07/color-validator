/*
  Warnings:

  - You are about to drop the column `b` on the `Color` table. All the data in the column will be lost.
  - You are about to drop the column `g` on the `Color` table. All the data in the column will be lost.
  - You are about to drop the column `r` on the `Color` table. All the data in the column will be lost.
  - Added the required column `rgb` to the `Color` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Color" DROP COLUMN "b",
DROP COLUMN "g",
DROP COLUMN "r",
ADD COLUMN     "rgb" JSONB NOT NULL;
