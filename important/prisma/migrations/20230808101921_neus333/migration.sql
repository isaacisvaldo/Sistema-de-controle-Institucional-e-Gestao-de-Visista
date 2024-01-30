-- AlterTable
ALTER TABLE "Escala_de_deia_pm_cctv" ADD COLUMN     "estado" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Escala_de_pelotao_postos" ADD COLUMN     "estado" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Escala_de_pelotoes" ADD COLUMN     "estado" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Escala_de_permanecas" ADD COLUMN     "estado" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Escalas" ADD COLUMN     "estado" INTEGER NOT NULL DEFAULT 0;
