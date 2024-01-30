/*
  Warnings:

  - You are about to drop the column `fk_pelotao` on the `Escala_de_pelotao_postos` table. All the data in the column will be lost.
  - Added the required column `fk_funcionario` to the `Escala_de_pelotao_postos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Escala_de_pelotao_postos" DROP CONSTRAINT "Escala_de_pelotao_postos_fk_pelotao_fkey";

-- AlterTable
ALTER TABLE "Escala_de_pelotao_postos" DROP COLUMN "fk_pelotao",
ADD COLUMN     "fk_funcionario" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Escala_de_pelotao_postos" ADD CONSTRAINT "Escala_de_pelotao_postos_fk_funcionario_fkey" FOREIGN KEY ("fk_funcionario") REFERENCES "Funcionario"("funcionarioID") ON DELETE RESTRICT ON UPDATE CASCADE;
