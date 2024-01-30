/*
  Warnings:

  - You are about to drop the column `d_semana` on the `Escala_de_pelotao_postos` table. All the data in the column will be lost.
  - You are about to drop the column `dia` on the `Escala_de_pelotao_postos` table. All the data in the column will be lost.
  - You are about to drop the column `d_semana` on the `Escala_de_pelotoes` table. All the data in the column will be lost.
  - You are about to drop the column `dia` on the `Escala_de_pelotoes` table. All the data in the column will be lost.
  - Added the required column `dia_d_semana` to the `Escala_de_pelotoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Escala_de_pelotao_postos" DROP COLUMN "d_semana",
DROP COLUMN "dia";

-- AlterTable
ALTER TABLE "Escala_de_pelotoes" DROP COLUMN "d_semana",
DROP COLUMN "dia",
ADD COLUMN     "dia_d_semana" INTEGER NOT NULL;
