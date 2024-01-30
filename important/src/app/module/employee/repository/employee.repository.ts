import prisma from "../../../config/lib/prisma";
import { Funcionario } from "../types/types";

export const employeeRepository = {
  async findAllEmployee() {
    try {
      const funcionario = await prisma.funcionario.findMany({
        include: {
          situacao: true,
          patente: {
            include: {
              Orgao: true,
            },
          },
         
          user:{
            include:{
              perfil:true,
              grupo_user:true
            }
          },
        },
      });
      return funcionario;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async  obterFuncionarioComMaiorID() {
    try {
      const funcionarioComMaiorID = await prisma.funcionario.findFirst({
        select: {
          funcionarioID: true,
        },
        orderBy: {
          funcionarioID: 'desc',
        },
      });
      return funcionarioComMaiorID?.funcionarioID;
    } catch (error) {
      console.error('Erro ao obter funcionário com maior ID:', error);
    } finally {
      await prisma.$disconnect();
    }
  },
  async findByID(funcionarioID: number) {
    try {
      const funcionario = await prisma.funcionario.findUnique({
        where: {
          funcionarioID: funcionarioID,
        },
      });
      return funcionario;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async findNip(nip: string) {
    try {
      const funcionario = await prisma.funcionario.findMany({
        where: {
          nip: nip,
        },
      });
      return funcionario;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async PersistData(data: Funcionario) {
    try {
      const funcionario = await prisma.funcionario.create({ data });
      console.log(funcionario);
      return { sucess: "Funcionario Cadastrado !" };
    } catch (error) {
      console.log(error);
      return { error: "Erro ao cadastrar Usuario" };
    }
  },
  async deleteEmployee(funcionarioID: number) {
    try {
      const funcionario = await prisma.funcionario.delete({
        where: {
          funcionarioID: funcionarioID,
        },
      });
      return { sucess: "Funcionario Deletado !" };
    } catch (error) {
      return { error: "Erro interno !" };
    }
  },
  async employeesituation(){
    try {
      const situacao = await prisma.situacao_funcionario.findMany();
      return situacao;
    } catch (error) {
      throw new Error(`Erro ao buscar Postos: ${error}`);
    }
  },
};



