-- CreateTable
CREATE TABLE "Controle_Area" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fk_area" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Controle_Area_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Controle_Area" ADD CONSTRAINT "Controle_Area_fk_area_fkey" FOREIGN KEY ("fk_area") REFERENCES "Area"("areaID") ON DELETE RESTRICT ON UPDATE CASCADE;
