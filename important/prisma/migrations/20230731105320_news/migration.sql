-- CreateTable
CREATE TABLE "Contacto" (
    "contactoID" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contacto_pkey" PRIMARY KEY ("contactoID")
);

-- CreateTable
CREATE TABLE "Funcionario_Contacto" (
    "fcID" SERIAL NOT NULL,
    "fk_contacto" INTEGER NOT NULL,
    "fk_funcionario" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Funcionario_Contacto_pkey" PRIMARY KEY ("fcID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contacto_designacao_key" ON "Contacto"("designacao");

-- AddForeignKey
ALTER TABLE "Funcionario_Contacto" ADD CONSTRAINT "Funcionario_Contacto_fk_contacto_fkey" FOREIGN KEY ("fk_contacto") REFERENCES "Contacto"("contactoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario_Contacto" ADD CONSTRAINT "Funcionario_Contacto_fk_funcionario_fkey" FOREIGN KEY ("fk_funcionario") REFERENCES "Funcionario"("funcionarioID") ON DELETE RESTRICT ON UPDATE CASCADE;
