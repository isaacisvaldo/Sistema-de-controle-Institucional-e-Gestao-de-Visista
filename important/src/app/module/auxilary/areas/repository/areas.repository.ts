import prisma from "../../../../config/lib/prisma";
import { Area } from "../dto/area.dto";

export const areaRepository = {
  async findAllAreas() {
    try {
      const areas = await prisma.area.findMany({
        include:{
          categoria_area: true,
          areaSuperior:true
        }
      });
      return areas;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async findAOneBySigla(sigla:string) {
    try {
      const area = await prisma.area.findMany({
        where:{
          sigla:sigla
        }
      });
      return area;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async findOneAreas(areaID: number) {
    try {
      const area = await prisma.area.findUnique({
        where: {
          areaID: areaID,
        },
      });
      return area;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async findAllCategoriaArea() {
    try {
      const categoria = await prisma.categoria_area.findMany();
      return categoria;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async PersistDatArea(data: Area) {
    try {
      const area = await prisma.area.create({ data });
      console.log(area);
      return {sucess: "Area Cadastrado !"};
    } catch (error) {
      console.log(error);
      return { error: "Erro ao cadastrar Usuario" };
    }
  },
  async  obterAreaComMaiorID() {
    try {
      const AreaComMaiorID = await prisma.area.findFirst({
        select: {
          areaID: true,
        },
        orderBy: {
          areaID: 'desc',
        },
      });
      return AreaComMaiorID?.areaID;
    } catch (error) {
      console.error('Erro ao obter area com maior ID:', error);
    } finally {
      await prisma.$disconnect();
    }
  },
  async deleteArea(areaID: number) {
    try {
      await prisma.area.delete({
        where: {
          areaID: areaID,
        },
      });
      return { sucess: "Area Deletado !" };
    } catch (error) {
      return { error: "Erro interno !" };
    }
  },
};
