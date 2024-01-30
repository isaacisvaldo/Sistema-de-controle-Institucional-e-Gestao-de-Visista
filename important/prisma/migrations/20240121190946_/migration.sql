/*
  Warnings:

  - You are about to drop the `Controle_Area` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Controle_Area" DROP CONSTRAINT "Controle_Area_fk_area_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_fk_grupo_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_fk_perfil_fkey";

-- DropTable
DROP TABLE "Controle_Area";

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Perfil" (
    "perfilID" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("perfilID")
);

-- CreateTable
CREATE TABLE "Grupo_user" (
    "grupoID" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grupo_user_pkey" PRIMARY KEY ("grupoID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Perfil_designacao_key" ON "Perfil"("designacao");

-- CreateIndex
CREATE UNIQUE INDEX "Grupo_user_designacao_key" ON "Grupo_user"("designacao");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_fk_perfil_fkey" FOREIGN KEY ("fk_perfil") REFERENCES "Perfil"("perfilID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_fk_grupo_fkey" FOREIGN KEY ("fk_grupo") REFERENCES "Grupo_user"("grupoID") ON DELETE RESTRICT ON UPDATE CASCADE;
