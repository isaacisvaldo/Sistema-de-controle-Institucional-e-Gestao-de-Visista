
import prisma from "../../config/lib/prisma";
import { Escala } from "../dto/escala.dto";
import { Escala_pelotao_posto } from "../dto/escala.pelotao.posto.dto";
import { Escala_pelotao } from "../dto/escala.pelotoes.dto";
import { Escala_permanenca } from "../dto/escala.permanenca.dto";
import { Escala_cctv } from "../dto/escala.pm.cctv.dto";

export const escalaRepository = {
    async findAllEscala(){
        try {
          const escala = await prisma.escalas.findMany({
            include:{
                tipo_Escala:true,
            }
          });
          return escala;
        } catch (error) {
          throw new Error(`Erro ao buscar Postos: ${error}`);
        }
      },
      async findAllMes_Ano(mes:string,anos:string,tipoescalaId:number){
        try {
          const escala = await prisma.escalas.findFirst({
           where:{
            mes:mes,
            ano:anos,
            fk_tipo_de_escala:tipoescalaId
            
           }
          });
          return escala;
        } catch (error) {
          throw new Error(`Erro ao buscar Postos: ${error}`);
        }
      },
  async findByID(escalaID: number) {
    try {
      const funcionario = await prisma.escalas.findUnique({
        where: {
          escalaID: escalaID,
        },
      });
      return funcionario;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async PersistData(data: Escala) {
    try {
      const escalas = await prisma.escalas.create({ data });
      console.log(escalas);
      return { sucess:" Cadastrado !",escalas ,escalaId:escalas.escalaID};
    } catch (error) {
      console.log(error);
      return { error: "Erro ao cadastrar " };
    }
  },
  async deleteEfetivoPelotao(escalaID: number) {
    try {
      const escala = await prisma.escalas.delete({
        where: {
          escalaID: escalaID,
        },
      });
      return { sucess: "Funcionario Deletado !" };
    } catch (error) {
      return { error: "Erro interno !" };
    }
  },
  async findAllEscalaPermanencas() {
    try {
      const escala = await prisma.escala_de_permanecas.findMany({
        include:{
          funcionario:true,
          posicoes_escalados:true,
          escalas:{
            include:{
              tipo_Escala:true,
              
            }
          

          },
        }
      });
      return escala;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async findAllEscalaPermanencasByDay(day:string) {
    try {
      const escala = await prisma.escala_de_permanecas.findFirst({
      where:{
        dia_d_semana:day
      }
      });
      return escala;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async findOneEscalaPermanencas(per_escalaID: number) {
    try {
      const posicoes = await prisma.escala_de_permanecas.findUnique({
        where: {
          per_escalaID: per_escalaID,
        },
       
          include:{
            funcionario:true,
            escalas:true,
          }
      
      });
      return posicoes;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async FilterEscalaPermanencas(dia_d_semana: string,funcionarioID:number) {
    try {
      const posicoes = await prisma.escala_de_permanecas.findMany({
       
         where:{
          fk_funcionario:funcionarioID,
          dia_d_semana:dia_d_semana
         }
      
      });
      return posicoes;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async PersistDataEscalaPermanencas(data: Escala_permanenca) {
    try {
      const escalas = await prisma.escala_de_permanecas.create({ data });
      console.log(escalas);
      return { sucess:" Cadastrado !" };
    } catch (error) {
      console.log(error);
      return { error: "Erro ao cadastrar !" };
    }
  },


  async findAllEscala_de_pelotoes() {
    try {
      const escala = await prisma.escala_de_pelotoes.findMany({
        include:{
          Pelotoes:true,
          escalas:{
            include:{
              tipo_Escala:true,
            }
          }
        }
      });
      return escala;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async PersistDataEscala_de_pelotoes(data: Escala_pelotao) {
    try {
      const escalas = await prisma.escala_de_pelotoes.create({ data });
      console.log(escalas);
      return { sucess:" Cadastrado !" };
    } catch (error) {
      console.log(error);
      return { error: "Erro ao cadastrar " };
    }
  },
  async findAllEscalaPelotaoposto() {
    try {
      const escala = await prisma.escala_de_pelotao_postos.findMany({
       include:{
        funcionario:true,
        posto:true,
        escala_de_pelotoes:{
          include:{
            Pelotoes:true,
            escalas:true,
          }
        },
        turno:true,
       }
      });
      return escala;
    } catch (error) {
      throw new Error(`Erro ao buscar: ${error}`);
    }
  },
  async findOneEscalaPelotaoposto(pelotao_escalaID:number) {
    try {
      const escala = await prisma.escala_de_pelotoes.findFirst({
        where:{
        pelotao_escalaID:pelotao_escalaID
        },
        include:{
        Pelotoes:true,
      }
      });
      return escala;
    } catch (error) {
      throw new Error(`Erro ao buscar: ${error}`);
    }
  },
  async PersistDataEscalaPelotaoposto(data: Escala_pelotao_posto) {
    try {
      const escalas = await prisma.escala_de_pelotao_postos.create({ data });
      console.log(escalas);
      return { sucess:" Cadastrado !" };
    } catch (error) {
      console.log(error);
      return { error: "Erro ao cadastrar " };
    }
  },
  async deletarEscala(escalaID: number) {
    try {
      const user = await prisma.escalas.delete({
        where: {
          escalaID: escalaID,
        },
      });
      return { sucess: "Escala Deletado !" };
    } catch (error) {
      return { error: "Erro interno !" };
    }
  },

  // Escala CCTV 
  async findAllEscala_cctv(){
    try {
      const escala = await prisma.escala_de_cctv.findMany({
        include:{
            escalas:true,
        }
      });
      return escala;
    } catch (error) {
      throw new Error(`Erro ao buscar Postos: ${error}`);
    }
  },
};
