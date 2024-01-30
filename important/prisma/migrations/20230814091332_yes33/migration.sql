-- CreateTable
CREATE TABLE "Cod_acess_area" (
    "codID" SERIAL NOT NULL,
    "fk_visita" INTEGER NOT NULL,
    "cod" TEXT NOT NULL DEFAULT '0001',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cod_acess_area_pkey" PRIMARY KEY ("codID")
);

-- AddForeignKey
ALTER TABLE "Cod_acess_area" ADD CONSTRAINT "Cod_acess_area_fk_visita_fkey" FOREIGN KEY ("fk_visita") REFERENCES "Visitas"("visitaID") ON DELETE RESTRICT ON UPDATE CASCADE;
