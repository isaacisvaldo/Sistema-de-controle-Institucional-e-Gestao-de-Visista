import prisma from "../../../../config/lib/prisma";


export const Visitor_contacto_Repository = {
  async finbyNumber(n: string){
    try {
      const number = await prisma.tb_Visitante_contacto.findMany({
        where:{
          contacto:n
        }
      })
      return number
    } catch (error) {
      console.log(error);
    }
  },
  async findAll(){
    try {
      const number = await prisma.tb_Visitante_contacto.findMany({
       include:{
        tb_visitantes:true,
       }
      })
      return number
    } catch (error) {
      console.log(error);
    }
  },
  async findById(id:number){
    try {
      const number = await prisma.tb_Visitante_contacto.findMany({
        where:{
        fk_visitante:id,
        },
       include:{
        tb_visitantes:true,
       }
      })
      return number
    } catch (error) {
      console.log(error);
    }
  }
};
