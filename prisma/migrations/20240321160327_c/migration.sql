/*
  Warnings:

  - You are about to drop the column `fk_anexo` on the `tb_visitanteAnexos` table. All the data in the column will be lost.
  - Added the required column `file1` to the `tb_visitanteAnexos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file2` to the `tb_visitanteAnexos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tb_visitanteAnexos" DROP CONSTRAINT "tb_visitanteAnexos_fk_anexo_fkey";

-- AlterTable
ALTER TABLE "tb_visitanteAnexos" DROP COLUMN "fk_anexo",
ADD COLUMN     "file1" TEXT NOT NULL,
ADD COLUMN     "file2" TEXT NOT NULL;
