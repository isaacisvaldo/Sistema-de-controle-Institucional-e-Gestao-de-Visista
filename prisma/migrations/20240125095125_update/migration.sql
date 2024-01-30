-- CreateTable
CREATE TABLE "tb_Perfil" (
    "perfilId" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Perfil_pkey" PRIMARY KEY ("perfilId")
);

-- CreateTable
CREATE TABLE "tb_Grupo" (
    "grupoId" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Grupo_pkey" PRIMARY KEY ("grupoId")
);

-- CreateTable
CREATE TABLE "tb_Orgao" (
    "orgaoId" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Orgao_pkey" PRIMARY KEY ("orgaoId")
);

-- CreateTable
CREATE TABLE "tb_Patente" (
    "PatenteId" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "fk_Orgao" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Patente_pkey" PRIMARY KEY ("PatenteId")
);

-- CreateTable
CREATE TABLE "tb_Categoria_area" (
    "categoriaId" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Categoria_area_pkey" PRIMARY KEY ("categoriaId")
);

-- CreateTable
CREATE TABLE "tb_Area" (
    "areaId" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "fk_categoria" INTEGER NOT NULL,
    "areaSuperiorId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Area_pkey" PRIMARY KEY ("areaId")
);

-- CreateTable
CREATE TABLE "tb_Area_Chefe_Area" (
    "Id" SERIAL NOT NULL,
    "fk_area" INTEGER NOT NULL,
    "fk_funcionario" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Area_Chefe_Area_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "tb_Situacao_funcionario" (
    "situacaoId" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Situacao_funcionario_pkey" PRIMARY KEY ("situacaoId")
);

-- CreateTable
CREATE TABLE "tb_Funcionario" (
    "funcionarioId" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sobre_nome" TEXT NOT NULL,
    "fk_patente" INTEGER NOT NULL,
    "nip" TEXT NOT NULL,
    "fk_situacao" INTEGER NOT NULL,
    "fk_area" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Funcionario_pkey" PRIMARY KEY ("funcionarioId")
);

-- CreateTable
CREATE TABLE "tb_Contacto" (
    "contactoId" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "fk_funcionario" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Contacto_pkey" PRIMARY KEY ("contactoId")
);

-- CreateTable
CREATE TABLE "tb_User" (
    "userId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fk_perfil" INTEGER NOT NULL,
    "fk_grupo" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "fk_funcionario" INTEGER NOT NULL,
    "status_ative" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "tb_Log" (
    "logId" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dispositivo" TEXT,
    "ip" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "fk_user" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Log_pkey" PRIMARY KEY ("logId")
);

-- CreateTable
CREATE TABLE "tb_Anexos" (
    "anexoId" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Anexos_pkey" PRIMARY KEY ("anexoId")
);

-- CreateTable
CREATE TABLE "tb_Pertences" (
    "pertenceId" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Pertences_pkey" PRIMARY KEY ("pertenceId")
);

-- CreateTable
CREATE TABLE "tb_Tipo_visita" (
    "tipo_visitaId" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Tipo_visita_pkey" PRIMARY KEY ("tipo_visitaId")
);

-- CreateTable
CREATE TABLE "tb_Visitantes" (
    "visitanteId" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Visitantes_pkey" PRIMARY KEY ("visitanteId")
);

-- CreateTable
CREATE TABLE "tb_Situacao_visitante" (
    "situacaoId" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Situacao_visitante_pkey" PRIMARY KEY ("situacaoId")
);

-- CreateTable
CREATE TABLE "tb_Tipos_doc_identificacao_visitante" (
    "tipo_identifiId" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Tipos_doc_identificacao_visitante_pkey" PRIMARY KEY ("tipo_identifiId")
);

-- CreateTable
CREATE TABLE "tb_Visitante_contacto" (
    "contactoId" SERIAL NOT NULL,
    "contacto" TEXT NOT NULL,
    "fk_visitante" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Visitante_contacto_pkey" PRIMARY KEY ("contactoId")
);

-- CreateTable
CREATE TABLE "tb_Visitante_identificacao" (
    "visit_identId" SERIAL NOT NULL,
    "num_identificacao" TEXT NOT NULL,
    "validade" TEXT NOT NULL,
    "fk_tipo_identificacao" INTEGER NOT NULL,
    "fk_visitante" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Visitante_identificacao_pkey" PRIMARY KEY ("visit_identId")
);

-- CreateTable
CREATE TABLE "tb_Visitas" (
    "visitaId" SERIAL NOT NULL,
    "data_visita" TEXT NOT NULL,
    "fk_area" INTEGER NOT NULL,
    "fk_tipo_visita" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Visitas_pkey" PRIMARY KEY ("visitaId")
);

-- CreateTable
CREATE TABLE "tb_Cod_acesso_area" (
    "codId" SERIAL NOT NULL,
    "fk_visita" INTEGER NOT NULL,
    "cod" TEXT NOT NULL DEFAULT '0001',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Cod_acesso_area_pkey" PRIMARY KEY ("codId")
);

-- CreateTable
CREATE TABLE "tb_Visita_visitantes" (
    "visita_visitantesId" SERIAL NOT NULL,
    "fk_visita" INTEGER NOT NULL,
    "fk_visitante" INTEGER NOT NULL,
    "hora_entrada" TEXT NOT NULL,
    "hora_saida" TEXT NOT NULL,
    "fk_tp_identificacao" INTEGER NOT NULL,
    "num_passe_acesso" TEXT NOT NULL,
    "fk_situacao_visitante" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Visita_visitantes_pkey" PRIMARY KEY ("visita_visitantesId")
);

-- CreateTable
CREATE TABLE "tb_Visita_visitante_pertence" (
    "visita_visitante_pertenceId" SERIAL NOT NULL,
    "fk_visita" INTEGER NOT NULL,
    "fk_visitante" INTEGER NOT NULL,
    "fk_pertence" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_Visita_visitante_pertence_pkey" PRIMARY KEY ("visita_visitante_pertenceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_Perfil_designacao_key" ON "tb_Perfil"("designacao");

-- CreateIndex
CREATE UNIQUE INDEX "tb_Grupo_designacao_key" ON "tb_Grupo"("designacao");

-- CreateIndex
CREATE UNIQUE INDEX "tb_Orgao_designacao_key" ON "tb_Orgao"("designacao");

-- CreateIndex
CREATE UNIQUE INDEX "tb_Patente_designacao_key" ON "tb_Patente"("designacao");

-- CreateIndex
CREATE UNIQUE INDEX "tb_Categoria_area_designacao_key" ON "tb_Categoria_area"("designacao");

-- CreateIndex
CREATE UNIQUE INDEX "tb_Area_nome_key" ON "tb_Area"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "tb_Area_sigla_key" ON "tb_Area"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "tb_Area_Chefe_Area_fk_area_key" ON "tb_Area_Chefe_Area"("fk_area");

-- CreateIndex
CREATE UNIQUE INDEX "tb_Area_Chefe_Area_fk_funcionario_key" ON "tb_Area_Chefe_Area"("fk_funcionario");

-- CreateIndex
CREATE UNIQUE INDEX "tb_Situacao_funcionario_designacao_key" ON "tb_Situacao_funcionario"("designacao");

-- CreateIndex
CREATE UNIQUE INDEX "tb_Contacto_designacao_key" ON "tb_Contacto"("designacao");

-- CreateIndex
CREATE UNIQUE INDEX "tb_User_username_key" ON "tb_User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "tb_User_email_key" ON "tb_User"("email");

-- AddForeignKey
ALTER TABLE "tb_Patente" ADD CONSTRAINT "tb_Patente_fk_Orgao_fkey" FOREIGN KEY ("fk_Orgao") REFERENCES "tb_Orgao"("orgaoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Area" ADD CONSTRAINT "tb_Area_fk_categoria_fkey" FOREIGN KEY ("fk_categoria") REFERENCES "tb_Categoria_area"("categoriaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Area" ADD CONSTRAINT "tb_Area_areaSuperiorId_fkey" FOREIGN KEY ("areaSuperiorId") REFERENCES "tb_Area"("areaId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Area_Chefe_Area" ADD CONSTRAINT "tb_Area_Chefe_Area_fk_area_fkey" FOREIGN KEY ("fk_area") REFERENCES "tb_Area"("areaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Area_Chefe_Area" ADD CONSTRAINT "tb_Area_Chefe_Area_fk_funcionario_fkey" FOREIGN KEY ("fk_funcionario") REFERENCES "tb_Funcionario"("funcionarioId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Funcionario" ADD CONSTRAINT "tb_Funcionario_fk_patente_fkey" FOREIGN KEY ("fk_patente") REFERENCES "tb_Patente"("PatenteId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Funcionario" ADD CONSTRAINT "tb_Funcionario_fk_situacao_fkey" FOREIGN KEY ("fk_situacao") REFERENCES "tb_Situacao_funcionario"("situacaoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Funcionario" ADD CONSTRAINT "tb_Funcionario_fk_area_fkey" FOREIGN KEY ("fk_area") REFERENCES "tb_Area"("areaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Contacto" ADD CONSTRAINT "tb_Contacto_fk_funcionario_fkey" FOREIGN KEY ("fk_funcionario") REFERENCES "tb_Funcionario"("funcionarioId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_User" ADD CONSTRAINT "tb_User_fk_perfil_fkey" FOREIGN KEY ("fk_perfil") REFERENCES "tb_Perfil"("perfilId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_User" ADD CONSTRAINT "tb_User_fk_grupo_fkey" FOREIGN KEY ("fk_grupo") REFERENCES "tb_Grupo"("grupoId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_User" ADD CONSTRAINT "tb_User_fk_funcionario_fkey" FOREIGN KEY ("fk_funcionario") REFERENCES "tb_Funcionario"("funcionarioId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Log" ADD CONSTRAINT "tb_Log_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "tb_User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Visitante_contacto" ADD CONSTRAINT "tb_Visitante_contacto_fk_visitante_fkey" FOREIGN KEY ("fk_visitante") REFERENCES "tb_Visitantes"("visitanteId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Visitante_identificacao" ADD CONSTRAINT "tb_Visitante_identificacao_fk_tipo_identificacao_fkey" FOREIGN KEY ("fk_tipo_identificacao") REFERENCES "tb_Tipos_doc_identificacao_visitante"("tipo_identifiId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Visitante_identificacao" ADD CONSTRAINT "tb_Visitante_identificacao_fk_visitante_fkey" FOREIGN KEY ("fk_visitante") REFERENCES "tb_Visitantes"("visitanteId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Visitas" ADD CONSTRAINT "tb_Visitas_fk_area_fkey" FOREIGN KEY ("fk_area") REFERENCES "tb_Area"("areaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Visitas" ADD CONSTRAINT "tb_Visitas_fk_tipo_visita_fkey" FOREIGN KEY ("fk_tipo_visita") REFERENCES "tb_Tipo_visita"("tipo_visitaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Cod_acesso_area" ADD CONSTRAINT "tb_Cod_acesso_area_fk_visita_fkey" FOREIGN KEY ("fk_visita") REFERENCES "tb_Visitas"("visitaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Visita_visitantes" ADD CONSTRAINT "tb_Visita_visitantes_fk_visita_fkey" FOREIGN KEY ("fk_visita") REFERENCES "tb_Visitas"("visitaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Visita_visitantes" ADD CONSTRAINT "tb_Visita_visitantes_fk_visitante_fkey" FOREIGN KEY ("fk_visitante") REFERENCES "tb_Visitantes"("visitanteId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Visita_visitantes" ADD CONSTRAINT "tb_Visita_visitantes_fk_tp_identificacao_fkey" FOREIGN KEY ("fk_tp_identificacao") REFERENCES "tb_Tipos_doc_identificacao_visitante"("tipo_identifiId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Visita_visitantes" ADD CONSTRAINT "tb_Visita_visitantes_fk_situacao_visitante_fkey" FOREIGN KEY ("fk_situacao_visitante") REFERENCES "tb_Situacao_visitante"("situacaoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Visita_visitante_pertence" ADD CONSTRAINT "tb_Visita_visitante_pertence_fk_visita_fkey" FOREIGN KEY ("fk_visita") REFERENCES "tb_Visitas"("visitaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Visita_visitante_pertence" ADD CONSTRAINT "tb_Visita_visitante_pertence_fk_visitante_fkey" FOREIGN KEY ("fk_visitante") REFERENCES "tb_Visitantes"("visitanteId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_Visita_visitante_pertence" ADD CONSTRAINT "tb_Visita_visitante_pertence_fk_pertence_fkey" FOREIGN KEY ("fk_pertence") REFERENCES "tb_Pertences"("pertenceId") ON DELETE RESTRICT ON UPDATE CASCADE;
