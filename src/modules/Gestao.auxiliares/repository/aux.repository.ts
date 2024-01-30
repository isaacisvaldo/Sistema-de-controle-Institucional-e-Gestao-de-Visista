import prisma from "../../../config/lib/prisma";
import { User } from "../dto/aux.dto";
import { Logs } from "../types/types";



export const auxRepository = {


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
}

