import prisma from "../../../config/lib/prisma";

 export  async function findByusername(username: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
        include: {
          funcionario: {
            include: {
              Area: true,
              situacao: true,
              contacto: true,
              patente: {
                include: {
                  Orgao: true,
                }
              }
            }
          },
          grupo_user: true,
          perfil: true,

        }
      });

      return user;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  }
  export  async function countAllUserOnOff() {
    try {
      const contagemPorStatus = await prisma.user.groupBy({
        by: ['status_ative'],
        _count: true,
      });
  
      const resultados = {
        on: 0,
        off: 0,
      };
      contagemPorStatus.forEach((status) => {
        const chave = status.status_ative === 1 ? 'on' : 'off';
        resultados[chave] += status._count;
      });
      return resultados;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  }



