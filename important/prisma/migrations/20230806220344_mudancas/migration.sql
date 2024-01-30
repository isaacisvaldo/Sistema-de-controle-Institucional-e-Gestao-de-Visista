/*
  Warnings:

  - You are about to drop the column `data` on the `Escalas` table. All the data in the column will be lost.
  - You are about to drop the column `dia` on the `Escalas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Escalas" DROP COLUMN "data",
DROP COLUMN "dia";
