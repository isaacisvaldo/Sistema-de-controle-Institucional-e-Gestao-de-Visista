/*
  Warnings:

  - Added the required column `hora_entrada` to the `Visita_visitantes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora_saida` to the `Visita_visitantes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Visita_visitantes" ADD COLUMN     "hora_entrada" TEXT NOT NULL,
ADD COLUMN     "hora_saida" TEXT NOT NULL;
