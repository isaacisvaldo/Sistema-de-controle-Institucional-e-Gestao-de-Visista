/*
  Warnings:

  - You are about to drop the column `designacao` on the `tb_Anexos` table. All the data in the column will be lost.
  - Added the required column `name` to the `tb_Anexos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_Anexos" DROP COLUMN "designacao",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "tb_visitanteAnexos" (
    "visitanteAnexosId" SERIAL NOT NULL,
    "fk_visitante" INTEGER NOT NULL,
    "fk_anexo" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_visitanteAnexos_pkey" PRIMARY KEY ("visitanteAnexosId")
);

-- AddForeignKey
ALTER TABLE "tb_visitanteAnexos" ADD CONSTRAINT "tb_visitanteAnexos_fk_visitante_fkey" FOREIGN KEY ("fk_visitante") REFERENCES "tb_Visitantes"("visitanteId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_visitanteAnexos" ADD CONSTRAINT "tb_visitanteAnexos_fk_anexo_fkey" FOREIGN KEY ("fk_anexo") REFERENCES "tb_Anexos"("anexoId") ON DELETE CASCADE ON UPDATE CASCADE;
