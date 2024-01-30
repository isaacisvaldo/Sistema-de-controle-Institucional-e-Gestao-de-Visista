/*
  Warnings:

  - You are about to drop the `tb_Cod_acesso_area` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tb_Cod_acesso_area" DROP CONSTRAINT "tb_Cod_acesso_area_fk_visita_fkey";

-- AlterTable
ALTER TABLE "tb_Visita_visitantes" ADD COLUMN     "cod_acess" TEXT DEFAULT 'DDT1';

-- AlterTable
ALTER TABLE "tb_Visitas" ADD COLUMN     "cod_Visita" TEXT DEFAULT 'DDT2';

-- DropTable
DROP TABLE "tb_Cod_acesso_area";
