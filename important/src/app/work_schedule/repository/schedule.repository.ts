import prisma from "../../config/lib/prisma";


export const scheduleRepository = {
  async findAllPosicaoEscalas() {
    try {
      const posicoes = await prisma.posicoes_escalados.findMany();
      return posicoes;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async findOnePosicaoEscalas(posicaoID: number) {
    try {
      const posicoes = await prisma.posicoes_escalados.findUnique({
        where: {
          posicaoID: posicaoID,
        },
      });
      return posicoes;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async findAllPelotao() {
    try {
      const pelotoes = await prisma.pelotoes.findMany();
      return pelotoes;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async findPelotao_Funcionario(pelotaoID:number) {
    try {
      const pelotoes = await prisma.pelotoes.findMany({
        where:{
          pelotaoID:pelotaoID
        },
        include:{
          efetivo_pelotao:{
            include:{
              funcionario:true,
            }
          }
        }
      });
      const arrayDeFuncionarios = pelotoes.flatMap(pelotao => pelotao.efetivo_pelotao.map(item => item.funcionario));

       return arrayDeFuncionarios;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async findOnePelotao(pelotaoID: number) {
    try {
      const pelotao = await prisma.pelotoes.findUnique({
        where: {
          pelotaoID: pelotaoID,
        },
      });
      return pelotao;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async findAllTurnos() {
    try {
      const turnos = await prisma.turnos.findMany();
      return turnos;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async findOneTurno(turnoID: number) {
    try {
      const turno = await prisma.turnos.findUnique({
        where: {
          turnoID: turnoID,
        },
      });
      return turno;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async findAllPostos() {
    try {
      const postos = await prisma.postos.findMany();
      return postos;
    } catch (error) {
      throw new Error(`Erro ao buscar Postos: ${error}`);
    }
  },
  async findOnePosto(postoID: number) {
    try {
      const turno = await prisma.postos.findUnique({
        where: {
          postoID: postoID,
        },
      });
      return turno;
    } catch (error) {
      throw new Error(`Erro ao buscar posto: ${error}`);
    }
  },
  async findAllTipo_Escala(){
    try {
      const tipo_Escala = await prisma.tipo_Escala.findMany();
      return tipo_Escala;
    } catch (error) {
      throw new Error(`Erro ao buscar Postos: ${error}`);
    }
  },
  async findOneTipo_Escala(tipo_escalaID: number) {
    try {
      const turno = await prisma.tipo_Escala.findUnique({
        where: {
          tipo_escalaID: tipo_escalaID,
        },
      });
      return turno;
    } catch (error) {
      throw new Error(`Erro ao buscar posto: ${error}`);
    }
  },




  async findAllArea() {
    try {
      const area = await prisma.area.findMany();
      return area;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async findOneArea(areaID: number) {
    try {
      const posicoes = await prisma.area.findUnique({
        where: {
          areaID: areaID,
        },
      });
      return posicoes;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
};
