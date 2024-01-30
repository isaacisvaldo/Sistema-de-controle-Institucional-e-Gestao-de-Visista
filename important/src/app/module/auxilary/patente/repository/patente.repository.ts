import prisma from "../../../../config/lib/prisma";
import { Patente } from "../dto/patente.dto";

export const patenteRepository = {

  async PersistData(data: Patente) {
    try {
      const area = await prisma.patente.create({ data });
      console.log(area);
      return { sucess: "Patente Cadastrado !" };
    } catch (error) {
      console.log(error);
      return { error: "Erro ao cadastrar Patente" };
    }
  },
  async obterPatenteComMaiorID() {
    try {
      const PatenteComMaiorID = await prisma.patente.findFirst({
        select: {
          PatenteID: true,
        },
        orderBy: {
          PatenteID: "desc",
        },
      });
      return PatenteComMaiorID?.PatenteID;
    } catch (error) {
      console.error("Erro ao obter area com maior ID:", error);
    } finally {
      await prisma.$disconnect();
    }
  },
  async deletePatente(PatenteID: number) {
    try {
      await prisma.patente.delete({
        where: {
          PatenteID: PatenteID,
        },
      });
      return { sucess: "Patente Deletado !" };
    } catch (error) {
      return { error: "Erro interno !" };
    }
  },
  async findAllPatente(){
    try {
      const patentes = await prisma.patente.findMany({include: {
        Orgao:true
      }});
      return patentes;
    } catch (error) {
      throw new Error(`Erro ao buscar Postos: ${error}`);
    }
  },
  async findOnePatente(PatenteID: number) {
    try {
      const patente = await prisma.patente.findUnique({
        where: {
          PatenteID: PatenteID,
        },
        include: {
          Orgao:true
        }
      });
      return patente;
    } catch (error) {
      throw new Error(`Erro ao buscar posto: ${error}`);
    }
  },
  async findByDesinacao(designacao: string) {
    try {
      const patente = await prisma.patente.findMany({
        where: {
          designacao: designacao,
        }
      });
      return patente;
    } catch (error) {
      throw new Error(`Erro ao buscar posto: ${error}`);
    }
  },
  async findOnePatentefk_orgao(fk_Orgao: number) {
    try {
      const patente = await prisma.patente.findMany({
        where: {
          fk_Orgao: fk_Orgao,
        }
      });
      return patente;
    } catch (error) {
      throw new Error(`Erro ao buscar posto: ${error}`);
    }
  },
};
