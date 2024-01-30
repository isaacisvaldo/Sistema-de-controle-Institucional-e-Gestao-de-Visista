/*
  Warnings:

  - You are about to drop the column `fk_escala` on the `Escala_de_pelotao_postos` table. All the data in the column will be lost.
  - Added the required column `fk_escala_de_pelotoes` to the `Escala_de_pelotao_postos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Escala_de_pelotao_postos" DROP CONSTRAINT "Escala_de_pelotao_postos_fk_escala_fkey";

-- AlterTable
ALTER TABLE "Escala_de_pelotao_postos" DROP COLUMN "fk_escala",
ADD COLUMN     "fk_escala_de_pelotoes" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Escala_de_pelotao_postos" ADD CONSTRAINT "Escala_de_pelotao_postos_fk_escala_de_pelotoes_fkey" FOREIGN KEY ("fk_escala_de_pelotoes") REFERENCES "Escala_de_pelotoes"("pelotao_escalaID") ON DELETE RESTRICT ON UPDATE CASCADE;
