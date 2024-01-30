-- DropForeignKey
ALTER TABLE "Escala_de_pelotoes" DROP CONSTRAINT "Escala_de_pelotoes_fk_pelotao_fkey";

-- AddForeignKey
ALTER TABLE "Escala_de_pelotoes" ADD CONSTRAINT "Escala_de_pelotoes_fk_pelotao_fkey" FOREIGN KEY ("fk_pelotao") REFERENCES "Pelotoes"("pelotaoID") ON DELETE RESTRICT ON UPDATE CASCADE;
