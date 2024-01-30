-- DropForeignKey
ALTER TABLE "Visitas" DROP CONSTRAINT "Visitas_fk_area_visitada_fkey";

-- DropForeignKey
ALTER TABLE "Visitas" DROP CONSTRAINT "Visitas_fk_tipo_visita_fkey";

-- AddForeignKey
ALTER TABLE "Visitas" ADD CONSTRAINT "Visitas_fk_area_visitada_fkey" FOREIGN KEY ("fk_area_visitada") REFERENCES "Area"("areaID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitas" ADD CONSTRAINT "Visitas_fk_tipo_visita_fkey" FOREIGN KEY ("fk_tipo_visita") REFERENCES "Tipo_visita"("tipo_visitaID") ON DELETE CASCADE ON UPDATE CASCADE;
