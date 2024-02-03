import prisma from "../../../config/lib/prisma";



export const globalRepository = {


    //Auxilares
    async findAllPerfil() {
      try {
        const perfil = await prisma.tb_Perfil.findMany({
        });
        return perfil;
      } catch (error) {
        throw new Error(`Erro ao buscar perfil: ${error}`);
      }
    },
    async findAllGrupo() {
      try {
        const grupo = await prisma.tb_Grupo.findMany({
        });
        return grupo;
      } catch (error) {
        throw new Error(`Erro ao buscar perfil: ${error}`);
      }
    },
    async findAllOrgao() {
      try {
        const orgao = await prisma.tb_Orgao.findMany({
        });
        return orgao;
      } catch (error) {
        throw new Error(`Erro ao buscar perfil: ${error}`);
      }
    },
    async findAllArea() {
      try {
        const areas = await prisma.tb_Area.findMany({
        });
        return areas;
      } catch (error) {
        throw new Error(`Erro ao buscar perfil: ${error}`);
      }
    },
    async findAllTipoVisita() {
      try {
        const tb_Tipo_visita = await prisma.tb_Tipo_visita.findMany({
        });
        return tb_Tipo_visita;
      } catch (error) {
        throw new Error(`Erro ao buscar perfil: ${error}`);
      }
    },
    async findAllTipoDocumento() {
      try {
        const tb_Tipo_doc = await prisma.tb_Tipos_doc_identificacao_visitante.findMany({
        });
        return tb_Tipo_doc;
      } catch (error) {
        throw new Error(`Erro ao buscar perfil: ${error}`);
      }
    },
    async findAllPertences() {
      try {
        const tb_Pertences = await prisma.tb_Pertences.findMany({
        });
        return tb_Pertences;
      } catch (error) {
        throw new Error(`Erro ao buscar perfil: ${error}`);
      }
    },
}

