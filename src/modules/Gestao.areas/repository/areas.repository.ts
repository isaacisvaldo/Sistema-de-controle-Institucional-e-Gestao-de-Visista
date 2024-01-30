import prisma from "../../../config/lib/prisma";
export const areasRepository = {
async findAllAreas() {
    try {
      const areas = await prisma.tb_Area.findMany({
        include: {
          areaSuperior:true,
        }
      });
      return areas;
    } catch (error) {
      throw new Error(`Erro ao buscar Area: ${error}`);
    }
  }
}