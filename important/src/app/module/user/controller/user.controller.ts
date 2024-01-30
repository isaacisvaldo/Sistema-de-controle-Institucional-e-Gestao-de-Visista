import { Response, Request } from "express";
import { UserService } from "../../../user/user.service";
import { userRepository } from "../../../user/repository/user.repository";

import { userLogs } from "../types/types";
import { autenticationService } from "../../../util/authentication/authentication";
import * as userRepo from '../repository/user.repository'
import { generateCurrentDate } from "../../../util/fuction";

import { domain } from "../../../config/url-api/url";
import { perfilRepository } from "../../auxilary/profile/repository/profile.repositori";
import { grupoRepository } from "../../auxilary/group/repository/group.repositori";
import { employeeRepository } from "../../employee/repository/employee.repository";
import { hash } from "bcryptjs";
import { User } from "../dto/user.dto";
import { VisitorRepository } from "../../VisitGestation/repository/visitor.repository";
import { VisitaRepository } from "../../VisitGestation/repository/visita.repository";



  export  async  function index(req: Request, res: Response) {
    try {
      const message = await UserService.getSigUp(); 
      res.render("Dashboard/form/authentication-sign", {
        message,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to create user." });
    }
   }
   export  async  function  dasboard(req: Request, res: Response) {
    try {
    const today= await generateCurrentDate()
      const count = await userRepo.countAllUserOnOff();
      const visita_visitante = await VisitorRepository.findAllVisitaVisitantetoday();
      const visitas = await VisitorRepository.findAllVisita();
      visitas.forEach(async e=>{
      const data= await  VisitorRepository.findAllVisitaVisitanteidVisita(e.visitaID)
      console.log(data)
      if(data.length==0){
       await VisitaRepository.deletevisita(e.visitaID)
      }
    })
      const visitantes=await VisitorRepository.findAllVisitor()
      const user = req.session.user;
    
    
      let v_servico=0
      let v_pessoal=0
      visitas.map(e=>{
        if(e.tipo_visita?.tipo_visitaID==1){
            v_pessoal=v_pessoal+1
        }else if(e.tipo_visita?.tipo_visitaID==2){
            v_servico=v_servico+1
        }
      })
      let v_servicodia = 0;
      let v_pessoaldia = 0;
      
      visitas.forEach(e => {
          if (e.fk_tipo_visita == 1 && e.data_visita == today) {
              v_servicodia = v_servicodia + 1;
          } else if (e.fk_tipo_visita == 2 && e.data_visita == today) {
              v_pessoaldia = v_pessoaldia + 1;
          }
      });
      
   

      let total =0
      visita_visitante.map(e=>{
        if(e.visitas?.data_visita==today){
            total=total+ 1
        }
       

      })
      res.render("Dashboard/dasboard", {v_pessoaldia,v_servicodia,on:count.on,off:count.off,v_servico,v_pessoal, user,visita_visitante,visitas ,visitantes,today,total });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to create user." });
    }
  }

   export  async  function  sigin(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await userRepository.findByusername(username);

      if (user) {
        const auth = await autenticationService.passConfirmation(
          password,
          user.password
        );
        if (auth) {
       await userRepository.updateStatus_ative(user.userID,1)
          req.session.user = {
            id: user.userID,
            username: user.username,
            imagenName: user.imagen,
            email: user.email,
            designacaoGrupo: user.grupo_user?.designacao,
            designacaoPerfil: user.perfil?.designacao,
            estado: user.estado,
            perfilID: user.fk_perfil,
            grupoID: user.fk_grupo,
            situacao_funcionario: user.funcionario?.situacao?.designacao,
            area: user.funcionario?.Area?.nome,
            nip: user.funcionario?.nip,
            sigla_area: user.funcionario?.Area?.sigla,
            orgao: user.funcionario?.patente?.Orgao?.designacao,
            patente: user.funcionario?.patente?.designacao,
          };

          const data: userLogs = {
            titulo: "Inicio de Sessão",
            descricao: `O Usuario ${req.session.user.username} Efectuou um inicio de sessão ao Sistema !`,
            fk_user: req.session.user.id,
          };
          await userRepository.persistirDatalogsuser(data);
          if (user.grupo_user?.designacao == "Administrativo"|| user.grupo_user?.grupoID==1) { 
            res.redirect("/home");
          }else if(user.grupo_user?.designacao == "Gestão de Visitas"|| user.grupo_user?.grupoID==2){
            res.redirect("/painelVisitas");
          }else if(user.grupo_user?.designacao == "Recepcionista"|| user.grupo_user?.grupoID==5){
            res.redirect("/Perfil");
          }else{
            req.flash("error", "Este Usuario pode apresentar uma debilidade ! contactar o suporte tecnico !");
            res.redirect("/Perfil");
          }
        }else {
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
  export  async  function  resetPassword(req: Request, res: Response) {
    try {
      res.render("Dashboard/form/authentication-reset-password", {
        message: "",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to create user." });
    }
  }
  export  async  function  logout(req: Request, res: Response) {
    try {
      const user = req.session.user;
      const up= await userRepository.updateStatus_ative( user?.id as number,0)
      if(up){
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
 export  async  function  usuarios(req: Request, res: Response) {
  try {
    const user = req.session.user;
    const users = await userRepository.findAll();
    console.log(users);

    res.render("Dashboard/users", {
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
export  async  function  Myprofile(req: Request, res: Response) {
  try {
    const user = req.session.user;
    const logs = await userRepository.findAll_logOneUser(user?.id as number);

    res.render("Dashboard/myprofile", {
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
export  async  function  see_user_perfil(req: Request, res: Response) {
  try {
    const { userID } = req.params;
    console.log(userID);
    const id = parseInt(userID);
    const user = req.session.user;
    const use = await userRepository.findByID(id);
    if (use) {
      console.log(use);
      const logs = await userRepository.findAll_logOneUser(
        use?.userID as number
      );

      res.render("Dashboard/see_user_profile", {
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
export  async  function  Perfis_user(req: Request, res: Response) {
  try {
    const user = req.session.user;
    const perfil = await perfilRepository.findAllperfil();
    res.render("Dashboard/perfil_user", {
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
export  async  function  grupo_user(req: Request, res: Response) {
  try {
    const user = req.session.user;
    const grupos = await grupoRepository.findAllgrupos();
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

export  async  function  setting_perfil(req: Request, res: Response) {
  try {
    const user = req.session.user;
    const dados = await userRepository.findByusername(
      user?.username as string
    );

    console.log(dados);
    res.render("Dashboard/definicoes_perfil", {
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
export  async  function  Form_user(req: Request, res: Response) {
  try {
    const user = req.session.user;
    const employee = await employeeRepository.findAllEmployee();
    const users = await userRepository.findAll();
    const perfis = await perfilRepository.findAllperfil();
    const grupos = await grupoRepository.findAllgrupos();
    console.log(employee);
    res.render("Dashboard/form/register_user", {
      user,
      perfis,
      grupos,
      users,
      employee,
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
export  async  function  Add_user(req: Request, res: Response) {
  try {
    const { username, fk_perfil, fk_grupo, email, cod_funcionarioID } =
      req.body;
    console.log(username, fk_perfil, fk_grupo, email, cod_funcionarioID);
    const saltOrRounds = 10;
    const senhaHash = await hash("DTTI@123", saltOrRounds);
    const file = req.file ? req.file.filename : "user.png";
    const data: User = {
      username: username,
      imagen: file,
      fk_perfil: parseInt(fk_perfil),
      fk_grupo: parseInt(fk_grupo),
      email: email,
      password: senhaHash,
      cod_funcionarioID: parseInt(cod_funcionarioID),
      estado: 1,
    };
    const verify = await UserService.validation(data);

    if (!verify.error) {
      const PersistData = await userRepository.persistirDataUser(data);

      if (!PersistData.error) {
        req.flash("sucess", `${PersistData.sucess}`);
        res.json({ sucess: PersistData.sucess });
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
export  async  function  deleteUser(req: Request, res: Response) {
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
export  async  function  Alterar_foto_user(req: Request, res: Response) {
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