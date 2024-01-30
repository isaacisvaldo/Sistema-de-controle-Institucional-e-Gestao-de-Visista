-- CreateTable
CREATE TABLE "Perfil" (
    "perfilID" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("perfilID")
);

-- CreateTable
CREATE TABLE "Grupo_user" (
    "grupoID" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grupo_user_pkey" PRIMARY KEY ("grupoID")
);

-- CreateTable
CREATE TABLE "Orgao" (
    "OrgaoID" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Orgao_pkey" PRIMARY KEY ("OrgaoID")
);

-- CreateTable
CREATE TABLE "Patente" (
    "PatenteID" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "fk_Orgao" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patente_pkey" PRIMARY KEY ("PatenteID")
);

-- CreateTable
CREATE TABLE "Categoria_area" (
    "categoriaID" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categoria_area_pkey" PRIMARY KEY ("categoriaID")
);

-- CreateTable
CREATE TABLE "Area" (
    "areaID" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "fk_categoria" INTEGER NOT NULL,
    "areaSuperiorId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("areaID")
);

-- CreateTable
CREATE TABLE "Situacao_funcionario" (
    "situacaoID" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Situacao_funcionario_pkey" PRIMARY KEY ("situacaoID")
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "funcionarioID" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sobre_nome" TEXT NOT NULL,
    "fk_patente" INTEGER NOT NULL,
    "fk_area" INTEGER NOT NULL,
    "nip" TEXT NOT NULL,
    "fk_situacao" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("funcionarioID")
);

-- CreateTable
CREATE TABLE "User" (
    "userID" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "fk_perfil" INTEGER NOT NULL,
    "fk_grupo" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "cod_funcionarioID" INTEGER NOT NULL,
    "estado" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Area_Chefe_Area" (
    "ID" SERIAL NOT NULL,
    "areaID" INTEGER NOT NULL,
    "funcionarioID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Area_Chefe_Area_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Perfil_designacao_key" ON "Perfil"("designacao");

-- CreateIndex
CREATE UNIQUE INDEX "Grupo_user_designacao_key" ON "Grupo_user"("designacao");

-- CreateIndex
CREATE UNIQUE INDEX "Orgao_designacao_key" ON "Orgao"("designacao");

-- CreateIndex
CREATE UNIQUE INDEX "Patente_designacao_key" ON "Patente"("designacao");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_area_designacao_key" ON "Categoria_area"("designacao");

-- CreateIndex
CREATE UNIQUE INDEX "Area_nome_key" ON "Area"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Area_sigla_key" ON "Area"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "Situacao_funcionario_designacao_key" ON "Situacao_funcionario"("designacao");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Area_Chefe_Area_areaID_key" ON "Area_Chefe_Area"("areaID");

-- CreateIndex
CREATE UNIQUE INDEX "Area_Chefe_Area_funcionarioID_key" ON "Area_Chefe_Area"("funcionarioID");

-- AddForeignKey
ALTER TABLE "Patente" ADD CONSTRAINT "Patente_fk_Orgao_fkey" FOREIGN KEY ("fk_Orgao") REFERENCES "Orgao"("OrgaoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_fk_categoria_fkey" FOREIGN KEY ("fk_categoria") REFERENCES "Categoria_area"("categoriaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_areaSuperiorId_fkey" FOREIGN KEY ("areaSuperiorId") REFERENCES "Area"("areaID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_fk_patente_fkey" FOREIGN KEY ("fk_patente") REFERENCES "Patente"("PatenteID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_fk_area_fkey" FOREIGN KEY ("fk_area") REFERENCES "Area"("areaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_fk_situacao_fkey" FOREIGN KEY ("fk_situacao") REFERENCES "Situacao_funcionario"("situacaoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_fk_perfil_fkey" FOREIGN KEY ("fk_perfil") REFERENCES "Perfil"("perfilID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_fk_grupo_fkey" FOREIGN KEY ("fk_grupo") REFERENCES "Grupo_user"("grupoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cod_funcionarioID_fkey" FOREIGN KEY ("cod_funcionarioID") REFERENCES "Funcionario"("funcionarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area_Chefe_Area" ADD CONSTRAINT "Area_Chefe_Area_areaID_fkey" FOREIGN KEY ("areaID") REFERENCES "Area"("areaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area_Chefe_Area" ADD CONSTRAINT "Area_Chefe_Area_funcionarioID_fkey" FOREIGN KEY ("funcionarioID") REFERENCES "Funcionario"("funcionarioID") ON DELETE RESTRICT ON UPDATE CASCADE;
