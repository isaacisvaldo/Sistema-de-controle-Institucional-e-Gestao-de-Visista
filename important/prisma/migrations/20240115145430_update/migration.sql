/*
  Warnings:

  - You are about to drop the `Grupo_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Perfil` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_fk_grupo_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_fk_perfil_fkey";

-- DropTable
DROP TABLE "Grupo_user";

-- DropTable
DROP TABLE "Perfil";

-- CreateTable
CREATE TABLE "Profile" (
    "perfilID" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("perfilID")
);

-- CreateTable
CREATE TABLE "Group" (
    "grupoID" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("grupoID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_designacao_key" ON "Profile"("designacao");

-- CreateIndex
CREATE UNIQUE INDEX "Group_designacao_key" ON "Group"("designacao");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_fk_perfil_fkey" FOREIGN KEY ("fk_perfil") REFERENCES "Profile"("perfilID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_fk_grupo_fkey" FOREIGN KEY ("fk_grupo") REFERENCES "Group"("grupoID") ON DELETE RESTRICT ON UPDATE CASCADE;
