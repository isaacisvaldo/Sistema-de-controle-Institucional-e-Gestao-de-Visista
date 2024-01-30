/*
  Warnings:

  - The primary key for the `Orgao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `OrgaoID` on the `Orgao` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Patente" DROP CONSTRAINT "Patente_fk_Orgao_fkey";

-- AlterTable
ALTER TABLE "Orgao" DROP CONSTRAINT "Orgao_pkey",
DROP COLUMN "OrgaoID",
ADD COLUMN     "orgaoID" SERIAL NOT NULL,
ADD CONSTRAINT "Orgao_pkey" PRIMARY KEY ("orgaoID");

-- AddForeignKey
ALTER TABLE "Patente" ADD CONSTRAINT "Patente_fk_Orgao_fkey" FOREIGN KEY ("fk_Orgao") REFERENCES "Orgao"("orgaoID") ON DELETE RESTRICT ON UPDATE CASCADE;
