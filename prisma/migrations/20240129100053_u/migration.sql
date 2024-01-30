-- CreateTable
CREATE TABLE "tb_Recepcao" (
    "Id" SERIAL NOT NULL,
    "fk_area" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Recepcao_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_Recepcao_fk_area_key" ON "tb_Recepcao"("fk_area");

-- AddForeignKey
ALTER TABLE "tb_Recepcao" ADD CONSTRAINT "tb_Recepcao_fk_area_fkey" FOREIGN KEY ("fk_area") REFERENCES "tb_Area"("areaId") ON DELETE RESTRICT ON UPDATE CASCADE;
