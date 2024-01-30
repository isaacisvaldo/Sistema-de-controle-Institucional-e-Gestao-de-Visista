/*
  Warnings:

  - The primary key for the `Efetivo_pelotao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tipo_escalaID` on the `Efetivo_pelotao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Efetivo_pelotao" DROP CONSTRAINT "Efetivo_pelotao_pkey",
DROP COLUMN "tipo_escalaID",
ADD COLUMN     "efetivopelotaoID" SERIAL NOT NULL,
ADD CONSTRAINT "Efetivo_pelotao_pkey" PRIMARY KEY ("efetivopelotaoID");
