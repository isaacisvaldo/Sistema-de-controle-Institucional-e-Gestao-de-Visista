import prisma from "../../../config/lib/prisma";


export const Visitor_contacto_Repository = {
  async finbyNumber(n: string){
    try {
      const number = await prisma.visitante_contacto.findMany({
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
      const number = await prisma.visitante_contacto.findMany({
       include:{
        visitantes:true,
       }
      })
      return number
    } catch (error) {
      console.log(error);
    }
  },
  async findById(id:number){
    try {
      const number = await prisma.visitante_contacto.findMany({
        where:{
        fk_visitante:id,
        },
       include:{
        visitantes:true,
       }
      })
      return number
    } catch (error) {
      console.log(error);
    }
  }
};
