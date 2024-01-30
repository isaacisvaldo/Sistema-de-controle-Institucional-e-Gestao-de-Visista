import prisma from "../../../../config/lib/prisma";


export const perfilRepository = {
  async findAllperfil() {
    try {
      const patente = await prisma.perfil.findMany();
      return patente;
    } catch (error) {
      throw new Error(`Erro ao buscar posto: ${error}`);
    }
  },
};
