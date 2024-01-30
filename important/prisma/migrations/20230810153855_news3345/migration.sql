/*
  Warnings:

  - You are about to drop the column `desiganao` on the `Situacao_visitante` table. All the data in the column will be lost.
  - Added the required column `designacao` to the `Situacao_visitante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Situacao_visitante" DROP COLUMN "desiganao",
ADD COLUMN     "designacao" TEXT NOT NULL;
