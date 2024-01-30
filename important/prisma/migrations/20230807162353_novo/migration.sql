/*
  Warnings:

  - Changed the type of `dia_d_semana` on the `Escala_de_permanecas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Escala_de_permanecas" DROP COLUMN "dia_d_semana",
ADD COLUMN     "dia_d_semana" INTEGER NOT NULL;
