/*
  Warnings:

  - The primary key for the `Visitante_contacto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `visitanteID` on the `Visitante_contacto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Visitante_contacto" DROP CONSTRAINT "Visitante_contacto_pkey",
DROP COLUMN "visitanteID",
ADD COLUMN     "contactoID" SERIAL NOT NULL,
ADD CONSTRAINT "Visitante_contacto_pkey" PRIMARY KEY ("contactoID");

-- AlterTable
ALTER TABLE "Visitas" ALTER COLUMN "data_visita" SET DATA TYPE TEXT;
