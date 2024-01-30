/*
  Warnings:

  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Posicoes_escalados" (
    "posicaoID" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Posicoes_escalados_pkey" PRIMARY KEY ("posicaoID")
);

-- CreateTable
CREATE TABLE "Pelotoes" (
    "pelotaoID" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pelotoes_pkey" PRIMARY KEY ("pelotaoID")
);

-- CreateTable
CREATE TABLE "Turnos" (
    "turnoID" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Turnos_pkey" PRIMARY KEY ("turnoID")
);

-- CreateTable
CREATE TABLE "Postos" (
    "postoID" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Postos_pkey" PRIMARY KEY ("postoID")
);

-- CreateTable
CREATE TABLE "Tipo_Escala" (
    "tipo_escalaID" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tipo_Escala_pkey" PRIMARY KEY ("tipo_escalaID")
);

-- CreateTable
CREATE TABLE "Efetivo_pelotao" (
    "tipo_escalaID" SERIAL NOT NULL,
    "fk_funcionario" INTEGER NOT NULL,
    "fk_pelotao" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Efetivo_pelotao_pkey" PRIMARY KEY ("tipo_escalaID")
);

-- CreateTable
CREATE TABLE "Escalas" (
    "escalaID" SERIAL NOT NULL,
    "dia" TEXT NOT NULL,
    "mes" TEXT NOT NULL,
    "ano" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "fk_tipo_de_escala" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Escalas_pkey" PRIMARY KEY ("escalaID")
);

-- CreateTable
CREATE TABLE "Escala_de_permanecas" (
    "per_escalaID" SERIAL NOT NULL,
    "dia" TEXT NOT NULL,
    "d_semana" TEXT NOT NULL,
    "posicao" TEXT NOT NULL,
    "fk_funcionario" INTEGER NOT NULL,
    "fk_escala" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Escala_de_permanecas_pkey" PRIMARY KEY ("per_escalaID")
);

-- CreateTable
CREATE TABLE "Escala_de_deia_pm_cctv" (
    "per_escalaID" SERIAL NOT NULL,
    "dia" TEXT NOT NULL,
    "d_semana" TEXT NOT NULL,
    "fk_funcionario" INTEGER NOT NULL,
    "fk_escala" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Escala_de_deia_pm_cctv_pkey" PRIMARY KEY ("per_escalaID")
);

-- CreateTable
CREATE TABLE "Escala_de_pelotoes" (
    "pelotao_escalaID" SERIAL NOT NULL,
    "dia" TEXT NOT NULL,
    "d_semana" TEXT NOT NULL,
    "fk_pelotao" INTEGER NOT NULL,
    "fk_escala" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Escala_de_pelotoes_pkey" PRIMARY KEY ("pelotao_escalaID")
);

-- CreateTable
CREATE TABLE "Escala_de_pelotao_postos" (
    "pelotaoPosto_escalaID" SERIAL NOT NULL,
    "dia" TEXT NOT NULL,
    "d_semana" TEXT NOT NULL,
    "fk_pelotao" INTEGER NOT NULL,
    "fk_escala" INTEGER NOT NULL,
    "fk_posto" INTEGER NOT NULL,
    "fk_turno" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Escala_de_pelotao_postos_pkey" PRIMARY KEY ("pelotaoPosto_escalaID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Posicoes_escalados_designacao_key" ON "Posicoes_escalados"("designacao");

-- CreateIndex
CREATE UNIQUE INDEX "Pelotoes_designacao_key" ON "Pelotoes"("designacao");

-- CreateIndex
CREATE UNIQUE INDEX "Turnos_designacao_key" ON "Turnos"("designacao");

-- CreateIndex
CREATE UNIQUE INDEX "Postos_designacao_key" ON "Postos"("designacao");

-- AddForeignKey
ALTER TABLE "Efetivo_pelotao" ADD CONSTRAINT "Efetivo_pelotao_fk_funcionario_fkey" FOREIGN KEY ("fk_funcionario") REFERENCES "Funcionario"("funcionarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Efetivo_pelotao" ADD CONSTRAINT "Efetivo_pelotao_fk_pelotao_fkey" FOREIGN KEY ("fk_pelotao") REFERENCES "Pelotoes"("pelotaoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escalas" ADD CONSTRAINT "Escalas_fk_tipo_de_escala_fkey" FOREIGN KEY ("fk_tipo_de_escala") REFERENCES "Tipo_Escala"("tipo_escalaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escala_de_permanecas" ADD CONSTRAINT "Escala_de_permanecas_fk_funcionario_fkey" FOREIGN KEY ("fk_funcionario") REFERENCES "Funcionario"("funcionarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escala_de_permanecas" ADD CONSTRAINT "Escala_de_permanecas_fk_escala_fkey" FOREIGN KEY ("fk_escala") REFERENCES "Escalas"("escalaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escala_de_deia_pm_cctv" ADD CONSTRAINT "Escala_de_deia_pm_cctv_fk_funcionario_fkey" FOREIGN KEY ("fk_funcionario") REFERENCES "Funcionario"("funcionarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escala_de_deia_pm_cctv" ADD CONSTRAINT "Escala_de_deia_pm_cctv_fk_escala_fkey" FOREIGN KEY ("fk_escala") REFERENCES "Escalas"("escalaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escala_de_pelotoes" ADD CONSTRAINT "Escala_de_pelotoes_fk_pelotao_fkey" FOREIGN KEY ("fk_pelotao") REFERENCES "Funcionario"("funcionarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escala_de_pelotoes" ADD CONSTRAINT "Escala_de_pelotoes_fk_escala_fkey" FOREIGN KEY ("fk_escala") REFERENCES "Escalas"("escalaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escala_de_pelotao_postos" ADD CONSTRAINT "Escala_de_pelotao_postos_fk_pelotao_fkey" FOREIGN KEY ("fk_pelotao") REFERENCES "Funcionario"("funcionarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escala_de_pelotao_postos" ADD CONSTRAINT "Escala_de_pelotao_postos_fk_escala_fkey" FOREIGN KEY ("fk_escala") REFERENCES "Escalas"("escalaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escala_de_pelotao_postos" ADD CONSTRAINT "Escala_de_pelotao_postos_fk_posto_fkey" FOREIGN KEY ("fk_posto") REFERENCES "Postos"("postoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escala_de_pelotao_postos" ADD CONSTRAINT "Escala_de_pelotao_postos_fk_turno_fkey" FOREIGN KEY ("fk_turno") REFERENCES "Turnos"("turnoID") ON DELETE RESTRICT ON UPDATE CASCADE;
