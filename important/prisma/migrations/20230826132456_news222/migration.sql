-- DropForeignKey
ALTER TABLE "Visitante_contacto" DROP CONSTRAINT "Visitante_contacto_fk_visitante_fkey";

-- AddForeignKey
ALTER TABLE "Visitante_contacto" ADD CONSTRAINT "Visitante_contacto_fk_visitante_fkey" FOREIGN KEY ("fk_visitante") REFERENCES "Visitantes"("visitanteID") ON DELETE CASCADE ON UPDATE CASCADE;
