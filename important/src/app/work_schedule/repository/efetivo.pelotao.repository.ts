
import prisma from "../../config/lib/prisma";
import { Efetivo_pelotao } from "../dto/efetivo.pelotao.dto";

export const efetivo_pelotaoRepository = {
  async findAllEfetivo_pelotao() {
    try {
      const ef_pelotao = await prisma.efetivo_pelotao.findMany({
        include: {
          funcionario: true,
          pelotao: true,
        },
      });
      return ef_pelotao;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async obterEfetivo_pelotaoComMaiorID() {
    try {
      const efetivo_pelotaoComMaiorID = await prisma.efetivo_pelotao.findFirst(
        {
          select: {
            efetivopelotaoID: true,
          },
          orderBy: {
            efetivopelotaoID: "desc",
          },
        }
      );
      return efetivo_pelotaoComMaiorID?.efetivopelotaoID || 0;
    } catch (error) {
      console.error("Erro ao obter funcionário com maior ID:", error);
    } finally {
      await prisma.$disconnect();
    }
  },
  async findByID(efetivopelotaoID: number) {
    try {
      const funcionario = await prisma.efetivo_pelotao.findUnique({
        where: {
          efetivopelotaoID: efetivopelotaoID,
        },
      });
      return funcionario;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async findByFk_func_FK_pelotao(fk_funcionario: number) {
    try {
      const ef_pelotao = await prisma.efetivo_pelotao.findMany({
        where: {
          fk_funcionario: fk_funcionario,
        },
      });
    
        return ef_pelotao;
    
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },

  async PersistData(data: Efetivo_pelotao) {
    try {
      const ef_pelotao = await prisma.efetivo_pelotao.create({ data });
      console.log(ef_pelotao);
      return { sucess: " Cadastrado !" };
    } catch (error) {
      console.log(error);
      return { error: "Erro ao cadastrar " };
    }
  },
  async deleteEfetivoPelotao(efetivopelotaoID: number) {
    try {
      const ef_pelotao = await prisma.efetivo_pelotao.delete({
        where: {
          efetivopelotaoID: efetivopelotaoID,
        },
      });
      return { sucess: "Funcionario Deletado !" };
    } catch (error) {
      return { error: "Erro interno !" };
    }
  },
};
