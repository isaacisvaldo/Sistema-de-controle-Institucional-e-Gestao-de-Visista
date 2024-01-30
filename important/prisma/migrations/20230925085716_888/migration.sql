/*
  Warnings:

  - You are about to drop the column `fk_anexo` on the `Visitante_identificacao` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Visitante_identificacao" DROP CONSTRAINT "Visitante_identificacao_fk_anexo_fkey";

-- AlterTable
ALTER TABLE "Visitante_identificacao" DROP COLUMN "fk_anexo";
