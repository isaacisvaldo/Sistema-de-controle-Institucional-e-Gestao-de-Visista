/*
  Warnings:

  - You are about to drop the `Escala_de_deia_pm_cctv` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Escala_de_deia_pm_cctv" DROP CONSTRAINT "Escala_de_deia_pm_cctv_fk_escala_fkey";

-- DropForeignKey
ALTER TABLE "Escala_de_deia_pm_cctv" DROP CONSTRAINT "Escala_de_deia_pm_cctv_fk_funcionario_fkey";

-- DropTable
DROP TABLE "Escala_de_deia_pm_cctv";

-- CreateTable
CREATE TABLE "Escala_de_deia_pm" (
    "per_escalaID" SERIAL NOT NULL,
    "dia_d_semana" INTEGER NOT NULL,
    "fk_funcionario" INTEGER NOT NULL,
    "fk_escala" INTEGER NOT NULL,
    "estado" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Escala_de_deia_pm_pkey" PRIMARY KEY ("per_escalaID")
);

-- CreateTable
CREATE TABLE "Escala_de_deia_cctv" (
    "per_escalaID" SERIAL NOT NULL,
    "dia_d_semana" INTEGER NOT NULL,
    "fk_funcionario" INTEGER NOT NULL,
    "fk_escala" INTEGER NOT NULL,
    "estado" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Escala_de_deia_cctv_pkey" PRIMARY KEY ("per_escalaID")
);

-- AddForeignKey
ALTER TABLE "Escala_de_deia_pm" ADD CONSTRAINT "Escala_de_deia_pm_fk_funcionario_fkey" FOREIGN KEY ("fk_funcionario") REFERENCES "Funcionario"("funcionarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escala_de_deia_pm" ADD CONSTRAINT "Escala_de_deia_pm_fk_escala_fkey" FOREIGN KEY ("fk_escala") REFERENCES "Escalas"("escalaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escala_de_deia_cctv" ADD CONSTRAINT "Escala_de_deia_cctv_fk_funcionario_fkey" FOREIGN KEY ("fk_funcionario") REFERENCES "Funcionario"("funcionarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escala_de_deia_cctv" ADD CONSTRAINT "Escala_de_deia_cctv_fk_escala_fkey" FOREIGN KEY ("fk_escala") REFERENCES "Escalas"("escalaID") ON DELETE RESTRICT ON UPDATE CASCADE;
