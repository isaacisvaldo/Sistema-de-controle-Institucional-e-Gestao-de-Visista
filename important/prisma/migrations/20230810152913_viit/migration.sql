-- CreateTable
CREATE TABLE "Anexos" (
    "anexoID" SERIAL NOT NULL,
    "nome_anexo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Anexos_pkey" PRIMARY KEY ("anexoID")
);

-- CreateTable
CREATE TABLE "Pertences" (
    "pertenceID" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pertences_pkey" PRIMARY KEY ("pertenceID")
);

-- CreateTable
CREATE TABLE "Tipo_visita" (
    "tipo_visitaID" SERIAL NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tipo_visita_pkey" PRIMARY KEY ("tipo_visitaID")
);

-- CreateTable
CREATE TABLE "Visitantes" (
    "visitanteID" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visitantes_pkey" PRIMARY KEY ("visitanteID")
);

-- CreateTable
CREATE TABLE "Situacao_visitante" (
    "situacaoID" SERIAL NOT NULL,
    "desiganao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Situacao_visitante_pkey" PRIMARY KEY ("situacaoID")
);

-- CreateTable
CREATE TABLE "Tipos_doc_identificacao_visitante" (
    "tipo_identifiID" SERIAL NOT NULL,
    "desc" TEXT NOT NULL,
    "designacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tipos_doc_identificacao_visitante_pkey" PRIMARY KEY ("tipo_identifiID")
);

-- CreateTable
CREATE TABLE "Visitante_contacto" (
    "visitanteID" SERIAL NOT NULL,
    "desc" TEXT NOT NULL,
    "designacao" TEXT NOT NULL,
    "fk_visitante" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visitante_contacto_pkey" PRIMARY KEY ("visitanteID")
);

-- CreateTable
CREATE TABLE "Visitante_identificacao" (
    "visit_identID" SERIAL NOT NULL,
    "fk_anexo" INTEGER NOT NULL,
    "num_identificacao" TEXT NOT NULL,
    "validade" TEXT NOT NULL,
    "fk_tipo_identificacao" INTEGER NOT NULL,
    "fk_visitante" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visitante_identificacao_pkey" PRIMARY KEY ("visit_identID")
);

-- CreateTable
CREATE TABLE "Visitas" (
    "visitaID" SERIAL NOT NULL,
    "data_visita" TIMESTAMP(3) NOT NULL,
    "hora_entrada" TEXT NOT NULL,
    "hora_saida" TEXT NOT NULL,
    "fk_area_visitada" INTEGER NOT NULL,
    "fk_tipo_visita" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visitas_pkey" PRIMARY KEY ("visitaID")
);

-- CreateTable
CREATE TABLE "Visita_visitantes" (
    "visita_visitantesID" SERIAL NOT NULL,
    "fk_visita" INTEGER NOT NULL,
    "fk_visitante" INTEGER NOT NULL,
    "fk_tp_identificacao" INTEGER NOT NULL,
    "num_passe_acesso" TEXT NOT NULL,
    "fk_situacao_visitante" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visita_visitantes_pkey" PRIMARY KEY ("visita_visitantesID")
);

-- CreateTable
CREATE TABLE "Visita_visitante_pertence" (
    "visita_visitante_pertenceID" SERIAL NOT NULL,
    "fk_visita" INTEGER NOT NULL,
    "fk_visitante" INTEGER NOT NULL,
    "fk_pertence" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visita_visitante_pertence_pkey" PRIMARY KEY ("visita_visitante_pertenceID")
);

-- AddForeignKey
ALTER TABLE "Visitante_contacto" ADD CONSTRAINT "Visitante_contacto_fk_visitante_fkey" FOREIGN KEY ("fk_visitante") REFERENCES "Visitantes"("visitanteID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitante_identificacao" ADD CONSTRAINT "Visitante_identificacao_fk_anexo_fkey" FOREIGN KEY ("fk_anexo") REFERENCES "Anexos"("anexoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitante_identificacao" ADD CONSTRAINT "Visitante_identificacao_fk_tipo_identificacao_fkey" FOREIGN KEY ("fk_tipo_identificacao") REFERENCES "Tipos_doc_identificacao_visitante"("tipo_identifiID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitante_identificacao" ADD CONSTRAINT "Visitante_identificacao_fk_visitante_fkey" FOREIGN KEY ("fk_visitante") REFERENCES "Visitantes"("visitanteID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitas" ADD CONSTRAINT "Visitas_fk_area_visitada_fkey" FOREIGN KEY ("fk_area_visitada") REFERENCES "Area"("areaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitas" ADD CONSTRAINT "Visitas_fk_tipo_visita_fkey" FOREIGN KEY ("fk_tipo_visita") REFERENCES "Tipo_visita"("tipo_visitaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visita_visitantes" ADD CONSTRAINT "Visita_visitantes_fk_visita_fkey" FOREIGN KEY ("fk_visita") REFERENCES "Visitas"("visitaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visita_visitantes" ADD CONSTRAINT "Visita_visitantes_fk_visitante_fkey" FOREIGN KEY ("fk_visitante") REFERENCES "Visitantes"("visitanteID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visita_visitantes" ADD CONSTRAINT "Visita_visitantes_fk_tp_identificacao_fkey" FOREIGN KEY ("fk_tp_identificacao") REFERENCES "Tipos_doc_identificacao_visitante"("tipo_identifiID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visita_visitantes" ADD CONSTRAINT "Visita_visitantes_fk_situacao_visitante_fkey" FOREIGN KEY ("fk_situacao_visitante") REFERENCES "Situacao_visitante"("situacaoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visita_visitante_pertence" ADD CONSTRAINT "Visita_visitante_pertence_fk_visita_fkey" FOREIGN KEY ("fk_visita") REFERENCES "Visitas"("visitaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visita_visitante_pertence" ADD CONSTRAINT "Visita_visitante_pertence_fk_visitante_fkey" FOREIGN KEY ("fk_visitante") REFERENCES "Visitantes"("visitanteID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visita_visitante_pertence" ADD CONSTRAINT "Visita_visitante_pertence_fk_pertence_fkey" FOREIGN KEY ("fk_pertence") REFERENCES "Pertences"("pertenceID") ON DELETE RESTRICT ON UPDATE CASCADE;
