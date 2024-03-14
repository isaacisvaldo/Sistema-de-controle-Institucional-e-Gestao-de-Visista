-- DropForeignKey
ALTER TABLE "tb_Visitante_identificacao" DROP CONSTRAINT "tb_Visitante_identificacao_fk_tipo_identificacao_fkey";

-- AlterTable
ALTER TABLE "tb_Visitante_identificacao" ALTER COLUMN "fk_tipo_identificacao" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tb_Visitante_identificacao" ADD CONSTRAINT "tb_Visitante_identificacao_fk_tipo_identificacao_fkey" FOREIGN KEY ("fk_tipo_identificacao") REFERENCES "tb_Tipos_doc_identificacao_visitante"("tipo_identifiId") ON DELETE SET NULL ON UPDATE CASCADE;
