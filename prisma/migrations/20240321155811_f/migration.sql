/*
  Warnings:

  - You are about to drop the column `name` on the `tb_Anexos` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `tb_Anexos` table. All the data in the column will be lost.
  - Added the required column `file` to the `tb_Anexos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_Anexos" DROP COLUMN "name",
DROP COLUMN "tipo",
ADD COLUMN     "file" TEXT NOT NULL;
