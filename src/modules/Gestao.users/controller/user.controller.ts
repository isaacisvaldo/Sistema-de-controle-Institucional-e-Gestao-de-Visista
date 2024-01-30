import { Response, Request } from "express";
import { hash } from "bcryptjs";
import { domain } from "../../../config/baseUrl/url";
import { autenticationService } from "../../../utils/authentication/authentication";
import { User } from "../dto/user.dto";
import { Logs } from "../types/types";
import { userRepository } from "../repository/user.repository";
import { UserService } from "../user.service";
import { getDeviceInfo } from "../../../utils/identify.device";
import { funcionarioRepository } from "../../Gestao.funcionarios/repository/funcionario.repository";
import { VisitorRepository } from "../../Gestao.seguranca.interna/visitas/repository/visitor.repository";




export async function dasboard(req: Request, res: Response) {
  try {
    const logs = await userRepository.findAllogs()
    const count = await userRepository.countAllUserOnOff();
    const funcionarios = await funcionarioRepository.findAllFuncionario();
    const visitantes = await VisitorRepository.findAllVisitor()
    const user = req.session.user;
    console.log(logs)



    res.render("Dashboard/dasboard", {
      logs, on: count.on, off: count.off, user, visitantes,funcionarios
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create user." });
  }
}

export async function sigin(req: Request, res: Response) {

  try {
    const { username, password } = req.body;
    const device = await getDeviceInfo()
   
    const user = await userRepository.findByusername(username);
    console.log(user)
    if (user) {
      const auth = await autenticationService.passConfirmation(
        password,
        user.password
      );
      if (auth) {
        await userRepository.updateStatus_ative(user.userId, true)
        req.session.user = {
          id: user.userId,
          username: user.username,
          imagenName: user.image,
          email: user.email,
          designacaoGrupo: user.tb_grupo?.designacao,
          designacaoPerfil: user.tb_perfil?.designacao,
          status_ative: user.status_ative,
          perfilID: user.fk_perfil,
          grupoID: user.fk_grupo,
          situacao_funcionario: user.tb_funcionario?.tb_situacao_funcionario?.designacao,
          area: user.tb_funcionario?.tb_area?.nome,
          nip: user.tb_funcionario?.nip,
          areaId:user.tb_funcionario?.fk_area,
          sigla_area: user.tb_funcionario?.tb_area?.sigla,
          orgao: user.tb_funcionario?.tb_patente?.tb_orgao?.designacao,
          patente: user.tb_funcionario?.tb_patente?.designacao,
        };
        console.log(req.session.user)

        const data: Logs = {
          titulo: "Inicio de Sessão",
          descricao: `O Usuario ${user.username} Efectuou um inicio de sessão ao Sistema !`,
          fk_user: user.userId,
          dispositivo: device.deviceName,
          ip: device.ipAddress,
          lat: device.latitude as number ,
          lng: device.longitude as number,
        }
        await userRepository.persistirDatalogsuser(data);
        //if(grupo_for Controle Area )
        //Verificar que area ele esta presente
        if(user.fk_grupo==1){
            res.redirect("/user/home");
        }else if(user.fk_grupo==5){
         res.redirect("/areas/PainelControlArea");
        } else if(user.fk_grupo==2){
          res.redirect("/visitas/painelVisitas"); 
        }else{
            console.log('Grupo não encontrado')
            req.flash("error", "Grupo não encontrado !");
            res.redirect("/"); 
        }
        
        

      } else {
        req.flash("error", "Senha Incorrecta !");
        res.redirect("/");
      }
    } else {
      req.flash("error", "Usúario nao encontrado.!");
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}
export async function resetPassword(req: Request, res: Response) {
  try {
    res.render("Dashboard/form/authentication-reset-password", {
      message: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create user." });
  }
}
export async function logout(req: Request, res: Response) {
  try {
    const user = req.session.user;
    const up = await userRepository.updateStatus_ative(user?.id as number, false)
    if (up) {
      req.session.destroy;
      req.session.user = undefined;
    }
    res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create user." });
  }
}
//Usuarios
export async function Listar(req: Request, res: Response) {
  try {
    const user = req.session.user;
    const users = await userRepository.findAll();
    console.log(users);

    res.render("Dashboard/usuarios", {
      user,
      domain,
      users,
      error: req.flash("error"),
      warning: req.flash("warning"),
      sucess: req.flash("sucess"),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to ..." });
  }
}
export async function logSistema(req: Request, res: Response) {
    try {
      const user = req.session.user;
      const logs = await userRepository.findAllogs();
      console.log(logs);
  
      res.render("Dashboard/logsSistema", {
        user,
        domain,
        logs,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  export async function log(req: Request, res: Response) {
    try {
      const {logId}= req.params
      const user = req.session.user;
      const log = await userRepository.findLogById(parseInt(logId));
      console.log(log);
  
      res.render("Dashboard/log", {
        user,
        domain,
        log,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
export async function meuPerfil(req: Request, res: Response) {
  try {
    const user = req.session.user;
    const logs = await userRepository.findlogOneUser(user?.id as number);
    console.log(logs);
    res.render("Dashboard/meuPerfil", {
      user,
      domain,
      logs,
      error: req.flash("error"),
      warning: req.flash("warning"),
      sucess: req.flash("sucess"),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to ..." });
  }
}
export async function perfilUsuario(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    console.log(userId);
    const id = parseInt(userId);
    const user = req.session.user;
    const use = await userRepository.findById(id);
    if (use) {
      console.log(use);
      const logs = await userRepository.findlogOneUser(
        use?.userId as number
      );

      res.render("Dashboard/perfilUsuario", {
        user,
        use,
        domain,
        logs,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } else {
      res.redirect("/error404");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to ..." });
  }
}

export async function definicoesPerfil(req: Request, res: Response) {
  try {
    const user = req.session.user;
    const dados = await userRepository.findByusername(
      user?.username as string
    );

    console.log(dados);
    res.render("Dashboard/definicoesPerfil", {
      user,
      domain,
      dados,
      error: req.flash("error"),
      warning: req.flash("warning"),
      sucess: req.flash("sucess"),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to ..." });
  }
}
export async function PerfisUser(req: Request, res: Response) {
  try {
    const user = req.session.user;
    const perfil = await userRepository.findAllPerfil();
    res.render("Dashboard/perfisUtilizadores", {
      user,
      perfil,
      error: req.flash("error"),
      warning: req.flash("warning"),
      sucess: req.flash("sucess"),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to ..." });
  }
}
export async function grupoUser(req: Request, res: Response) {
  try {
    const user = req.session.user;
    const grupos = await userRepository.findAllGrupo();
    res.render("Dashboard/group_user", {
      user,
      grupos,
      error: req.flash("error"),
      warning: req.flash("warning"),
      sucess: req.flash("sucess"),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to ..." });
  }
}

export async function formularioUsuario(req: Request, res: Response) {
  try {
    const user = req.session.user;
    const funcionario = await funcionarioRepository.findAllFuncionario();
    const users = await userRepository.findAll();
    const perfis = await userRepository.findAllPerfil();
    const grupos = await userRepository.findAllGrupo();
    console.log(funcionario);
    res.render("Dashboard/form/register_user", {
      user,
      perfis,
      grupos,
      users,
      employee:funcionario,
      domain,
      error: req.flash("error"),
      warning: req.flash("warning"),
      sucess: req.flash("sucess"),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to ..." });
  }
}
export async function create(req: Request, res: Response) {
  try {
    const { username, fk_perfil, fk_grupo, email, fk_funcionario } =
      req.body;
      const user = req.session?.user;
      const device = await getDeviceInfo()
    const saltOrRounds = 10;
    const senhaHash = await hash("DTTI@123", saltOrRounds);
    const file = req.file ? req.file.filename : "user.png";
    const data: User = {
      username: username,
      image: file,
      fk_perfil: parseInt(fk_perfil),
      fk_grupo: parseInt(fk_grupo),
      email: email,
      password: senhaHash,
      fk_funcionario: parseInt(fk_funcionario),
      status_ative: false
    };
    const verify = await UserService.validation(data);

    if (!verify.error) {
      const PersistData = await userRepository.persistirDataUser(data);

      if (!PersistData.error) {
        const data: Logs = {
            titulo: "Inserção de Dados",
            descricao: `O Usuario ${user?.username} Inseriou Um novo Usuario de acesso ao Sistema !`,
            fk_user: user?.id as number,
            dispositivo: device.deviceName,
            ip: device.ipAddress,
            lat: device.latitude as number ,
            lng: device.longitude as number,
          }
       
        req.flash("sucess", `${PersistData.sucess}`);
        res.json({ sucess: PersistData.sucess });
        await userRepository.persistirDatalogsuser(data);
      } else {
        res.json({ error: PersistData.error });
        console.log(PersistData.error);
      }
    } else {
      res.json({ error: verify.error });
      console.log(verify.error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Falha ao criar Usuario." });
  }
}
export async function deleteUser(req: Request, res: Response) {
  try {
    const { userID } = req.params;
    const user = await userRepository.deleteuser(parseInt(userID));
    if (user) {
      req.flash("sucess", "User Deletado!");
      res.redirect("/usuarios");
    } else {
      req.flash("error", "Erro ao  Deletado User!");
      res.redirect("/usuarios");
    }
  } catch (error) {
    req.flash("warning", "Erro Interno!");
    res.redirect("/usuarios");
  }
}
//Editar Usuario
export async function Alterar_foto_user(req: Request, res: Response) {
  try {
    const file = req.file ? req.file.filename : "user.png";
    console.log(file);
    const user = req.session.user;
    const userupdate = await userRepository.updateavatar(
      user?.id as number,
      file
    );
    if (userupdate) {
      req.session.user!.imagenName = file;
      req.flash("sucess", `${userupdate.sucess}`);
      res.json({ sucess: userupdate.sucess });
    } else {
      req.flash("error", "Error updating");
      res.json({ error: "Error updating" });
      console.log("Failed to");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to ..." });
  }
}