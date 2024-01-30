/*
  Warnings:

  - You are about to drop the column `designacao` on the `Visitante_contacto` table. All the data in the column will be lost.
  - Added the required column `contacto` to the `Visitante_contacto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contacto" DROP CONSTRAINT "Contacto_fk_funcionario_fkey";

-- DropForeignKey
ALTER TABLE "Logs_user" DROP CONSTRAINT "Logs_user_fk_user_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cod_funcionarioID_fkey";

-- DropForeignKey
ALTER TABLE "Visita_visitantes" DROP CONSTRAINT "Visita_visitantes_fk_visita_fkey";

-- DropForeignKey
ALTER TABLE "Visitante_identificacao" DROP CONSTRAINT "Visitante_identificacao_fk_visitante_fkey";

-- AlterTable
ALTER TABLE "Visitante_contacto" DROP COLUMN "designacao",
ADD COLUMN     "contacto" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Contacto" ADD CONSTRAINT "Contacto_fk_funcionario_fkey" FOREIGN KEY ("fk_funcionario") REFERENCES "Funcionario"("funcionarioID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cod_funcionarioID_fkey" FOREIGN KEY ("cod_funcionarioID") REFERENCES "Funcionario"("funcionarioID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logs_user" ADD CONSTRAINT "Logs_user_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitante_identificacao" ADD CONSTRAINT "Visitante_identificacao_fk_visitante_fkey" FOREIGN KEY ("fk_visitante") REFERENCES "Visitantes"("visitanteID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visita_visitantes" ADD CONSTRAINT "Visita_visitantes_fk_visita_fkey" FOREIGN KEY ("fk_visita") REFERENCES "Visitas"("visitaID") ON DELETE CASCADE ON UPDATE CASCADE;
