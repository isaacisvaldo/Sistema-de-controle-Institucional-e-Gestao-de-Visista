import { PrismaClient } from '@prisma/client';
import { tb_perfil } from './seeds/tb_perfil.seed';
import { tb_grupo } from './seeds/tb_grupo.seed';
import { tb_orgao, tb_patente } from './seeds/tb_orgao.tb_patente.seed';
import { tb_Situacaofuncionario } from './seeds/tb_Situacao.funcionario.seed';
import { tb_funcionario } from './seeds/tb_funcionario.seed';
import { tb_pertences } from './seeds/tb_pertences.seed';
import { tb_situacao_visitante } from './seeds/tb_Situacao.visitante.seed';
import { tb_tipo_visita } from './seeds/tb_tipo.visita.seed';
import { tb_tipos_doc_identificacao_visitante } from './seeds/tb_tipos.doc.identificacao.visitante.seed';
import { hash } from 'bcryptjs';
import { tb_area, tb_categoria } from './seeds/tb_categorias.tb_areas';

const prisma = new PrismaClient();
async function main() {
    //Delete
    await prisma.tb_Grupo.deleteMany();
    await prisma.tb_Perfil.deleteMany();
    await prisma.tb_User.deleteMany()
    await prisma.tb_Funcionario.deleteMany()
    await prisma.tb_Patente.deleteMany()
    await prisma.tb_Orgao.deleteMany()
    await prisma.tb_Situacao_funcionario.deleteMany()
    await prisma.tb_Pertences.deleteMany()
    await prisma.tb_Area.deleteMany()
    await prisma.tb_Categoria_area.deleteMany()
    await prisma.tb_Situacao_visitante.deleteMany()
    await prisma.tb_Tipo_visita.deleteMany()
    await prisma.tb_Tipos_doc_identificacao_visitante.deleteMany()


    //Insert
    await prisma.tb_Perfil.createMany({ data: tb_perfil });
    await prisma.tb_Grupo.createMany({ data: tb_grupo });
    await prisma.tb_Orgao.createMany({ data: tb_orgao })
    await prisma.tb_Patente.createMany({ data: tb_patente })
    await prisma.tb_Pertences.createMany({ data: tb_pertences })
    await prisma.tb_Categoria_area.createMany({ data: tb_categoria })
    await prisma.tb_Area.createMany({ data: tb_area })
    await prisma.tb_Situacao_funcionario.createMany({ data: tb_Situacaofuncionario })
    await prisma.tb_Situacao_visitante.createMany({ data: tb_situacao_visitante })
    await prisma.tb_Tipo_visita.createMany({ data: tb_tipo_visita })
    await prisma.tb_Tipos_doc_identificacao_visitante.createMany({ data: tb_tipos_doc_identificacao_visitante })
    await prisma.tb_Funcionario.createMany({ data: tb_funcionario });
    const tb_user = [
        {
            username: 'admin',
            image: 'user.png',
            email: 'admin@hotmail.com',
            fk_perfil: 1,
            fk_grupo: 1,
            password: await hash('admin', 10),
            status_ative: false,
            fk_funcionario: 1,
        }
    ];
    await prisma.tb_User.createMany({ data: tb_user })
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
