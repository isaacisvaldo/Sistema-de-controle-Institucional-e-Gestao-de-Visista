import prisma from "../../../../config/lib/prisma";


export const grupoRepository = {
  async findAllgrupos() {
    try {
      const grupos = await prisma.grupo_user.findMany();
      return grupos;
    } catch (error) {
      throw new Error(`Erro ao buscar posto: ${error}`);
    }
  },
};
