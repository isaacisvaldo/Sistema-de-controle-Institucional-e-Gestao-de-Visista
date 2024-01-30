/*
  Warnings:

  - You are about to drop the `tb_Recepcao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tb_Recepcao" DROP CONSTRAINT "tb_Recepcao_fk_area_fkey";

-- DropTable
DROP TABLE "tb_Recepcao";
