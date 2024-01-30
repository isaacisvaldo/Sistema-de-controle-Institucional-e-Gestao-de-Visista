
import prisma from "../../../config/lib/prisma";
import { Visitante } from "../dto/visitor.dto";
export interface VisitorIdentification {
  // You can replace 'string' with the appropriate type
  num_identificacao: string; // Replace with the appropriate type
  fk_tipo_identificacao: number; // Replace with the appropriate type
  validade: string; // Replace with the appropriate type if 'Date' is not correct
  fk_visitante: number;
}
export const VisitorRepository = {
  async findAllVisita() {
    try {
      const visitor = await prisma.visitas.findMany({
        include: {
          Area: true,
          cod_acess_area: true,
          tipo_visita:true,
        },
      });
      return visitor;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findOneVisita(visitaId:number) {
    try {
      const visitor = await prisma.visitas.findUnique({
        where:{
        visitaID:visitaId
        },
        include: {
          Area: true,
          cod_acess_area: true,
          tipo_visita:true,
        },
      });
      return visitor;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async visitanteIdentificacao() {
    try {
      const visitor = await prisma.visitante_identificacao.findMany({
        include: {
          visitantes: true
        },
      });
      return visitor;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findVisitaVisitante(visitaId:number) {
    try {
      const visita_visitante = await prisma.visita_visitantes.findMany({
        where:{
      fk_visita:visitaId
        },
        include:{
            Visitantes: true,
            situacao_visitante:true
        }
        
     
      });
      return visita_visitante;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findVisitaVisitanteById(Id:number) {
    try {
      const visita_visitante = await prisma.visita_visitantes.findMany({
        where:{
            visita_visitantesID:Id
        }
      });
      return visita_visitante;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findAllVisitaVisitante() {
    try {
      const visita_visitante = await prisma.visita_visitantes.findMany({
        include: {
          visitas: true,
          Visitantes: true,
        },
      });
      return visita_visitante;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findAllVisitaVisitanteidVisita(id:number) {
    try {
      const visita_visitante = await prisma.visita_visitantes.findMany({
        where:{
            fk_visita:id
        },
      });
      return visita_visitante;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findAllVisitaVisitanteAllupdate(id:number,other:number) {
    try {
      const visita_visitante = await prisma.visita_visitantes.updateMany({
       where:{
        fk_visita:id
       },
       data:{
        fk_situacao_visitante:other
       }
      });
      return visita_visitante;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findAllVisitaVisitanteOneupdate(id:number,status:number,visita:number) {
    try {
      const visita_visitante = await prisma.visita_visitantes.updateMany({
       where:{
        visita_visitantesID:id,
        fk_visita:visita
       },
       data:{
        fk_situacao_visitante:status
       }
      });
      return visita_visitante;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async updateDateOute(id:number,date:string) {
    try {
      const visita_visitante = await prisma.visita_visitantes.updateMany({
       where:{
        visita_visitantesID:id
       },
       data:{
        hora_saida:date
       }
      });
      return visita_visitante;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findAllVisitaVisitantetoday() {


    try {

      const visita_visitante = await prisma.visita_visitantes.findMany({
         include: {    
         visitas: true,
        
          Visitantes: true,
          situacao_visitante:true,
        },
      });

      return visita_visitante;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async  contarVisitas() {
    try {
      const resultados = await prisma.visita_visitantes.groupBy({
        by: ['fk_visita'],
        _count: {
          fk_visita: true,
        },
      });
    
      const resultadosFormatados = resultados.map((resultado) => {
        return {
          visitaId: resultado.fk_visita,
          quantidade: resultado._count.fk_visita
        };
       
      }); 
      return resultadosFormatados

    } catch (error) {
      throw new Error(`Erro ao buscar Quantidade: ${error}`); 
    }
  },

  async findAllVisitor() {
    try {
      const visitor = await prisma.visitantes.findMany({
        include: {
          visitante_contacto: true,
        },
      });
      return visitor;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async persistDataVisitor(data: Visitante) {
    try {
  
      const visitante = await prisma.visitantes.create({
        data: {
          nome:data.nome,
          sobrenome:data.sobrenome
        },
      });
       // Crie contatos
       if(data.contactos.length > 0) {
       for (const contatoData of data.contactos) {
        await prisma.visitante_contacto.create({
          data: {
            contacto: contatoData.contacto,
            fk_visitante: visitante.visitanteID,
          },
        });
      }
    }
      
       // Associe pertences, se disponíveis
    if(data.pertences.length > 0) {
        for (const pertenceData of data.pertences) {
          await prisma.visita_visitante_pertence.create({
            data: {
              fk_visita: data.visitaId,
              fk_visitante: visitante.visitanteID,
              fk_pertence: pertenceData.fk_pertence,
            },
          });
        }
      }
         // Associe o visitante à visita
         await prisma.visitante_identificacao.create({
          data: {
            validade:data.Data_validade_doc,
            num_identificacao:data.num_identificacao,
            fk_tipo_identificacao:data.fk_tipo_identificacao,
            fk_visitante:visitante.visitanteID 
          },
        });
       await prisma.visita_visitantes.create({
        data: {
          hora_saida:'---',
          hora_entrada:data.hora_entrada,
          fk_tp_identificacao:data.fk_tipo_identificacao,
          num_passe_acesso:'', 
         fk_situacao_visitante:1,
         fk_visitante: visitante.visitanteID,  
         fk_visita:data.visitaId, 
        },
      });
      
      return { sucess: " Visitante Cadastrado !", };
    } catch (error) {
      console.log(error);
      return { error: "Erro ao cadastrar " };
    }
  },
  async persistDataVisitorIdentify(data: VisitorIdentification) {
    try {
      const t = await prisma.visitante_identificacao.create({ data });
      return { sucess: " Cadastrado !", t };
    } catch (error) {
      console.log(error);
      return { error: "Erro ao cadastrar " };
    }
  },
  async deletevisitor(visitorID: number) {
    try {
      const user = await prisma.visitantes.delete({
        where: {
          visitanteID: visitorID,
        },
      });
      return { sucess: "visitante Deletado !" };
    } catch (error) {
      return { error: "Erro interno !" };
    }
  },
  async findATipoDoc() {
    try {
      const type = await prisma.tipos_doc_identificacao_visitante.findMany({});
      return type;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findByiDVisitor(id: number) {
    try {
      const visitor = await prisma.visitantes.findFirst({
        where: {
          visitanteID: id,
        },
      });
      return visitor;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findAllTipo() {
    try {
      const tipo_visita = await prisma.tipo_visita.findMany();
      return tipo_visita;
    } catch (error) {
      console.log(error);
    }
  },
  async pertences() {
    try {
      const pertences = await prisma.pertences.findMany();
      return pertences;
    } catch (error) {
      console.log(error);
    }
  },
};
