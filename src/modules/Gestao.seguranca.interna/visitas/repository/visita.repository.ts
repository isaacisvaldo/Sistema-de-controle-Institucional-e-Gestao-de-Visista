

import prisma from "../../../../config/lib/prisma";
import { Visita } from "../dto/visita.dto";


export const VisitaRepository = {
  async persistDataVisita(data: Visita) {
    try {
      const visita = await prisma.tb_Visitas.create({data});
      return { sucess: " Cadastrado !", visita };
    } catch (error) {
      console.log(error);
      return { error: "Erro ao cadastrar " };
    }
  },
 


  async deletevisita(id: number) {
    try {
      await prisma.tb_Visitas.delete({
        where: {
          visitaId: id,
        },
      });
      return { sucess: "visitante Deletado !" };
    } catch (error) {
      return { error: "Erro interno !" };
    }
  },
 

};

export { Visita };
