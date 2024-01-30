/*
  Warnings:

  - The `hora_entrada` column on the `Visita_visitantes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Visita_visitantes" DROP COLUMN "hora_entrada",
ADD COLUMN     "hora_entrada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
