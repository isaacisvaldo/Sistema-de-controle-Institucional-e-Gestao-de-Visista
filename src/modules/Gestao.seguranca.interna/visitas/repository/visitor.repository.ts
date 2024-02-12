

import prisma from "../../../../config/lib/prisma";
import { generateCurrentDate } from "../../../../utils/fuction";
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
      const visitor = await prisma.tb_Visitas.findMany({
        include: {
          tb_area: true,
          tb_Tipo_visita: true,
        },
      });
      return visitor;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findOneVisita(visitaId: number) {
    try {
      const visitor = await prisma.tb_Visitas.findUnique({
        where: {
          visitaId: visitaId
        },
        include: {
          tb_area: true,

          tb_Tipo_visita: true,
        },
      });
      return visitor;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async visitanteIdentificacao() {
    try {
      const visitor = await prisma.tb_Visitante_identificacao.findMany({
        include: {
          tb_visitantes: true
        },
      });
      return visitor;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findVisitaVisitante(visitaId: number) {
    try {
      const visita_visitante = await prisma.tb_Visita_visitantes.findMany({
        where: {
          fk_visita: visitaId
        },
        include: {
          tb_situacao_visitante: true,
          tb_visitantes: true

        }


      });
      return visita_visitante;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findVisitaVisitanteById(Id: number) {
    try {
      const visita_visitante = await prisma.tb_Visita_visitantes.findMany({
        where: {
          visita_visitantesId: Id
        }
      });
      return visita_visitante;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findAllVisitaVisitante() {
    try {
      const visita_visitante = await prisma.tb_Visita_visitantes.findMany({
        include: {
          tb_visitas: true,
          tb_visitantes: true,
        },
      });
      return visita_visitante;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findAllVisitaVisitanteidVisita(id: number) {
    try {
      const visita_visitante = await prisma.tb_Visita_visitantes.findMany({
        where: {
          fk_visita: id
        },
      });
      return visita_visitante;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findAllVisitaVisitanteAllupdate(id: number, other: number) {
    try {
      const visita_visitante = await prisma.tb_Visita_visitantes.updateMany({
        where: {
          fk_visita: id
        },
        data: {
          fk_situacao_visitante: other
        }
      });
      return visita_visitante;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findAllVisitaVisitanteOneupdate(id: number, status: number, visita: number) {
    try {
      const visita_visitante = await prisma.tb_Visita_visitantes.updateMany({
        where: {
          visita_visitantesId: id,
          fk_visita: visita
        },
        data: {
          fk_situacao_visitante: status
        }
      });
      return visita_visitante;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async updateDateOute(id: number, date: string) {
    try {
      const visita_visitante = await prisma.tb_Visita_visitantes.updateMany({
        where: {
          visita_visitantesId: id
        },
        data: {
          hora_saida: date
        }
      });
      return visita_visitante;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findAllVisitaVisitantetoday() {

    const today = await generateCurrentDate()
    try {

      const visita_visitante = await prisma.tb_Visita_visitantes.findMany({
        where: {
          tb_visitas: {
            data_visita: today
           
          }
        },
        
        include: {
          tb_visitas: {
          include:{
          tb_Tipo_visita:true
          }
          },
          tb_visitantes: true,
          tb_situacao_visitante: true,
          
        },
      });

      return visita_visitante;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async contarVisitas() {
    try {
      const resultados = await prisma.tb_Visita_visitantes.groupBy({
        by: ['fk_visita'],
        _count: {
          fk_visita: true,
        },
      });

      const resultadosFormatados = resultados.map((resultado: any) => {
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
      const visitor = await prisma.tb_Visitantes.findMany({
        include: {
          tb_visitante_contacto: true,
        },
      });
      return visitor;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async persistDataVisitor(data: Visitante) {
    try {

      const visitante = await prisma.tb_Visitantes.create({
        data: {
          nome: data.nome,
          sobrenome: data.sobrenome
        },
      });
      // Crie contatos
      if (data.contactos.length > 0) {
        for (const contatoData of data.contactos) {
          await prisma.tb_Visitante_contacto.create({
            data: {
              contacto: contatoData.contacto,
              fk_visitante: visitante.visitanteId,
            },
          });
        }
      }

      // Associe pertences, se disponíveis
      if (data.pertences.length > 0) {
        for (const pertenceData of data.pertences) {
          await prisma.tb_Visita_visitante_pertence.create({
            data: {
              fk_visita: data.visitaId,
              fk_visitante: visitante.visitanteId,
              fk_pertence: pertenceData.fk_pertence,
            },
          });
        }
      }
      // Associe o visitante à visita
      await prisma.tb_Visitante_identificacao.create({
        data: {
          validade: data.Data_validade_doc,
          num_identificacao: data.num_identificacao,
          fk_tipo_identificacao: data.fk_tipo_identificacao,
          fk_visitante: visitante.visitanteId
        },
      });
      await prisma.tb_Visita_visitantes.create({
        data: {
          hora_saida: '---',
          hora_entrada: data.hora_entrada,
          fk_tp_identificacao: data.fk_tipo_identificacao,
          fk_situacao_visitante: 1,
          cod_acess:'###',
          fk_visitante: visitante.visitanteId,
          fk_visita: data.visitaId,
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
      const t = await prisma.tb_Visitante_identificacao.create({ data });
      return { sucess: " Cadastrado !", t };
    } catch (error) {
      console.log(error);
      return { error: "Erro ao cadastrar " };
    }
  },
  async deletevisitor(visitorID: number) {
    try {
      const user = await prisma.tb_Visitantes.delete({
        where: {
          visitanteId: visitorID,
        },
      });
      return { sucess: "visitante Deletado !" };
    } catch (error) {
      return { error: "Erro interno !" };
    }
  },
  async findATipoDoc() {
    try {
      const type = await prisma.tb_Tipos_doc_identificacao_visitante.findMany({});
      return type;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findByiDVisitor(id: number) {
    try {
      const visitor = await prisma.tb_Visitantes.findFirst({
        where: {
          visitanteId: id,
        },
      });
      return visitor;
    } catch (error) {
      throw new Error(`Erro ao buscar Visitantes: ${error}`);
    }
  },
  async findAllTipo() {
    try {
      const tipo_visita = await prisma.tb_Tipo_visita.findMany();
      return tipo_visita;
    } catch (error) {
      console.log(error);
    }
  },
  async pertences() {
    try {
      const pertences = await prisma.tb_Pertences.findMany();
      return pertences;
    } catch (error) {
      console.log(error);
    }
  },
};