import prisma from "../../../../config/lib/prisma";
import { Orgao } from "../dto/orgao.dto";

export const orgaoRepository = {
  async findAllOrgao() {
    try {
      const orgao = await prisma.orgao.findMany();
      return orgao;
    } catch (error) {
      throw new Error(`Erro ao buscar Postos: ${error}`);
    }
  },
  async findOneOrgao(orgaoID: number) {
    try {
      const turno = await prisma.orgao.findUnique({
        where: {
          orgaoID: orgaoID,
        },
      });
      return turno;
    } catch (error) {
      throw new Error(`Erro ao buscar posto: ${error}`);
    }
  },
  async PersistDataOrgao(data: Orgao) {
    try {
      const orgao = await prisma.orgao.create({ data });
      console.log(orgao);
      return { sucess: "Orgao Cadastrado !" };
    } catch (error) {
      console.log(error);
      return { error: "Erro ao cadastrar Orgao" };
    }
  },
  async obterorgaoComMaiorID() {
    try {
      const orgaoComMaiorID = await prisma.orgao.findFirst({
        select: {
          orgaoID: true,
        },
        orderBy: {
          orgaoID: "desc",
        },
      });
      return orgaoComMaiorID?.orgaoID;
    } catch (error) {
      console.error("Erro ao obter area com maior ID:", error);
    } finally {
      await prisma.$disconnect();
    }
  },
  async deleteOrgao(orgaoID: number) {
    try {
       await prisma.orgao.delete({
        where: {
          orgaoID: orgaoID,
        },
      });
      return { sucess: "Orgao Deletado !" };
    } catch (error) {
      return { error: "Erro interno !" };
    }
  },
  async findOneOrgaoBysigla(sigla: string) {
    try {
      const orgao = await prisma.orgao.findMany({
        where: {
          sigla: sigla,
        },
      });
      return orgao;
    } catch (error) {
      throw new Error(`Erro ao buscar posto: ${error}`);
    }
  },
};
