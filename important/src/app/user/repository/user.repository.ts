
import { Logs_user } from "../dto/logs.user.dto";
import { User } from "../../module/user/dto/user.dto";
import prisma from "../../config/lib/prisma";

export const userRepository = {
  async findByusername(username: string) {
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
  },
  async findByemail(email: string) {
    try {
      const user = await prisma.user.findMany({
        where: {
          email: email,
        },
        include: {
          grupo_user: true,
          perfil: true
        }
      });

      return user;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async findByID(userID:number) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          userID:userID,
        },
        include: {
          funcionario:{
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
  },
  async findAll() {
    try {
      const user = await prisma.user.findMany({
        include: {
          grupo_user: true,
          perfil: true
        }
      });

      return user;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async persistirDatalogsuser(data: Logs_user) {
    try {
      const logs = await prisma.logs_user.create({ data });

      return logs;
    } catch (error) {
      throw new Error(`Erro ao Cadatrar o log: ${error}`);
    }
  },
  async findAll_logOneUser(fk_user: number) {
    try {
      const logs = await prisma.logs_user.findMany({
        where: {
          fk_user: fk_user
        }
      });

      return logs;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async updateavatar(userID: number, avatar: string) {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          userID: userID,
        },
        data: {

          imagen: avatar,

        },
      });
      return { sucess: "Imagem Editada com sucesso !" };

    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  },
  async persistirDataUser(data: User) {
    try {
      const user = await prisma.user.create({ data });
      return { sucess: "Usuario Cadastrado !" };
    } catch (error) {
      console.log(error);
      return { error: "Erro ao cadastrar Usuario" };
    }
  },
  async deleteuser(userID: number) {
    try {
      const user = await prisma.user.delete({
        where: {
          userID: userID,
        },
      });
      return { sucess: "Usuario Deletado !" };
    } catch (error) {
      return { error: "Erro interno !" };
    }
  },
  async updateStatus_ative(userID: number,status:number) {
    try {
      const user = await prisma.user.update({
        where: {
          userID: userID,
        },
        data:{
            status_ative:status
        }
      });
      return { sucess: "Usuario Deletado !" };
    } catch (error) {
      return { error: "Erro interno !" };
    }
  },

};
