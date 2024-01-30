/*
  Warnings:

  - You are about to drop the `Funcionario_Contacto` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fk_funcionario` to the `Contacto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Funcionario_Contacto" DROP CONSTRAINT "Funcionario_Contacto_fk_contacto_fkey";

-- DropForeignKey
ALTER TABLE "Funcionario_Contacto" DROP CONSTRAINT "Funcionario_Contacto_fk_funcionario_fkey";

-- AlterTable
ALTER TABLE "Contacto" ADD COLUMN     "fk_funcionario" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Funcionario_Contacto";

-- AddForeignKey
ALTER TABLE "Contacto" ADD CONSTRAINT "Contacto_fk_funcionario_fkey" FOREIGN KEY ("fk_funcionario") REFERENCES "Funcionario"("funcionarioID") ON DELETE RESTRICT ON UPDATE CASCADE;
