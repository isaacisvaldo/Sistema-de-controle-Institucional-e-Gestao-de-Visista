/*
  Warnings:

  - You are about to drop the column `hora_entrada` on the `Visitas` table. All the data in the column will be lost.
  - You are about to drop the column `hora_saida` on the `Visitas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Visitas" DROP COLUMN "hora_entrada",
DROP COLUMN "hora_saida";
