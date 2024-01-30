/*
  Warnings:

  - You are about to drop the column `posicao` on the `Escala_de_permanecas` table. All the data in the column will be lost.
  - Added the required column `fk_posicao` to the `Escala_de_permanecas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Escala_de_permanecas" DROP COLUMN "posicao",
ADD COLUMN     "fk_posicao" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Escala_de_permanecas" ADD CONSTRAINT "Escala_de_permanecas_fk_posicao_fkey" FOREIGN KEY ("fk_posicao") REFERENCES "Posicoes_escalados"("posicaoID") ON DELETE RESTRICT ON UPDATE CASCADE;
