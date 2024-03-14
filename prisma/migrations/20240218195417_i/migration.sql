-- DropForeignKey
ALTER TABLE "tb_Visita_visitantes" DROP CONSTRAINT "tb_Visita_visitantes_fk_tp_identificacao_fkey";

-- AlterTable
ALTER TABLE "tb_Visita_visitantes" ALTER COLUMN "fk_tp_identificacao" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tb_Visita_visitantes" ADD CONSTRAINT "tb_Visita_visitantes_fk_tp_identificacao_fkey" FOREIGN KEY ("fk_tp_identificacao") REFERENCES "tb_Tipos_doc_identificacao_visitante"("tipo_identifiId") ON DELETE SET NULL ON UPDATE CASCADE;
