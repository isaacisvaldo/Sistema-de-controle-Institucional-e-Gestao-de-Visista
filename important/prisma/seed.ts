
import { perfil } from './seeds/perfil.seed';
import { situacaoFuncionario } from './seeds/situacao.funcionario.seed';
import { PrismaClient } from '@prisma/client';
import { grupo } from './seeds/grupo.seed';
import { pertences } from './seeds/pertences.seed';
import { area, categoria } from './seeds/categoria.area.seed';
import { orgao, patente } from './seeds/orgao.seed';
import { posicoes_escalados } from './seeds/posicoes.escalados.seed';
import { pelotao } from './seeds/pelotao.seed';
import { turnos } from './seeds/turnos.seed';
import { hash } from 'bcryptjs';
import { tipo_escala } from './seeds/tipo.escala.seed';
import { postos } from './seeds/postos.seed';
import { situacao_visitante } from './seeds/situacao.visitante.seed'
import {tipos_doc} from './seeds/tipos.doc.identificacao.visitante.seed'
import {tip_visita} from './seeds/tipo.visita.seed'
const prisma = new PrismaClient();
async function main() {

  await prisma.user.deleteMany(); //1
  await prisma.efetivo_pelotao.deleteMany(); //1
  await prisma.escala_de_permanecas.deleteMany(); //1
  await prisma.escala_de_deia.deleteMany(); //1
  await prisma.escala_de_pelotao_postos.deleteMany(); //1
  await prisma.escala_de_pelotoes.deleteMany(); //1
  await prisma.funcionario.deleteMany(); //2
  await prisma.area.deleteMany(); 
  await prisma.patente.deleteMany(); //4
  await prisma.perfil.deleteMany(); //Vai deletar Todos os perfis so assim vai cadastrar
  await prisma.posicoes_escalados.deleteMany(); //5
  await prisma.pelotoes.deleteMany(); //5
  await prisma.turnos.deleteMany(); //6
  await prisma.escalas.deleteMany(); //6
  await prisma.tipo_Escala.deleteMany(); //6
  await prisma.postos.deleteMany(); //6
  await prisma.logs_user.deleteMany(); //1
  await prisma.pertences.deleteMany(); //1
  await prisma.visitantes.deleteMany(); //1
  await prisma.perfil.createMany({ data: perfil });
  await prisma.pertences.createMany({ data: pertences });
  await prisma.situacao_funcionario.deleteMany();
  await prisma.situacao_funcionario.createMany({ data: situacaoFuncionario });
  await prisma.grupo_user.deleteMany();
  await prisma.grupo_user.createMany({ data: grupo });
  await prisma.categoria_area.deleteMany();
  await prisma.categoria_area.createMany({ data: categoria });
  await prisma.orgao.deleteMany();
  await prisma.orgao.createMany({ data: orgao });
  await prisma.posicoes_escalados.createMany({ data:posicoes_escalados})
  await prisma.pelotoes.createMany({ data:pelotao})
  await prisma.turnos.createMany({ data:turnos})
  await prisma.postos.createMany({ data:postos})
  await prisma.tipo_Escala.createMany({ data:tipo_escala})

  //Controle de Visitas
  await prisma.situacao_visitante.deleteMany(); //5
  await prisma.situacao_visitante.createMany({ data:situacao_visitante})
  await prisma.tipos_doc_identificacao_visitante.deleteMany()
  await prisma.tipos_doc_identificacao_visitante.createMany({ data:tipos_doc})
  await prisma.tipo_visita.deleteMany()
  await prisma.tipo_visita.createMany({ data:tip_visita})
  await prisma.patente.createMany({ data: patente });
  await prisma.area.createMany({ data: area });
  const funcionario = [
      {
      funcionarioID: 1,
      nome: 'Isaac',
      sobre_nome: 'Teste',
      fk_patente: 2,
      fk_area: 1,
      nip: '12345678LA123',
      fk_situacao: 1,
      }
  ]

  await prisma.funcionario.createMany({ data: funcionario });
  const saltOrRounds = 10;
  const userDefoult = [
    {
      username: 'admin',
      imagen: 'user.png',
      fk_perfil: 2,
      fk_grupo: 1,
      email:'isvaldo@gmail.com',
      password: await hash('admin', saltOrRounds),
      cod_funcionarioID: 1,
      estado: 1,
    }
  ];

  await prisma.user.createMany({ data: userDefoult });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
