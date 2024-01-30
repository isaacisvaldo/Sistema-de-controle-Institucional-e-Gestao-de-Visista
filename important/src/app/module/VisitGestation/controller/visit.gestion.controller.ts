
import { Response, Request } from "express";
import { visitorService } from "../visitor.service";

import { areaRepository } from "../../auxilary/areas/repository/areas.repository";
import { VisitaRepository } from "../repository/visita.repository";
import { Visitor_contacto_Repository } from "../repository/visitor.contacto.repository";
import { VisitorRepository } from "../repository/visitor.repository";
import {Visita} from "../repository/visita.repository"
import { domain } from "../../../config/url-api/url";
import { Visitante } from "../dto/visitor.dto";
import { generateCurrentDate } from "../../../util/fuction";

  //Gestão de Visita
  export  async  function  painelVisitas(req: Request, res: Response) {
    try {
      const today= await generateCurrentDate()
      const visita_visitante = await VisitorRepository.findAllVisitaVisitantetoday();
      const visitas = await VisitorRepository.findAllVisita();
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
      res.render("Dashboard/painelvisitas", {v_pessoaldia,v_servicodia,v_servico,v_pessoal, user,visita_visitante,visitas ,visitantes,today,total});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to create user." });
    }
  }
  export  async  function  Visita_visitante(req: Request, res: Response) {
    try {
      const user = req.session.user;
      const visita_visitante = await VisitorRepository.findAllVisitaVisitante();
      console.log(visita_visitante);
      res.render("Dashboard/visita_visitante", {
        user,
        domain,
        visita_visitante,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  export  async  function  Visita_visitante_pertence(req: Request, res: Response) {
    try {
      const user = req.session.user;
      console.log(user);
      res.render("Dashboard/visita_visitante_pertence", {
        user,
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
  export  async  function  Visitas(req: Request, res: Response) {
    try {
      const user = req.session.user;
      const visitas = await VisitorRepository.findAllVisita();
      const visita_visitante = await VisitorRepository.contarVisitas();
      console.log(visitas,visita_visitante);
      res.render("Dashboard/visitas", {
        user,
        visitas,
        visita_visitante,
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
  export  async  function  Visita(req: Request, res: Response) {
    try {
      const { visitaId }= req.params
      const user = req.session.user;
   
      console.log(visitaId)
      const visita = await VisitorRepository.findOneVisita(parseInt(visitaId));
      if(!visita){
      res.redirect('/error404')
      }else{
      const visita_visitante = await VisitorRepository.findVisitaVisitante(parseInt(visitaId));
      console.log(visita,visita_visitante);
      res.render("Dashboard/visita", {
        user,
        visita,
        visita_visitante,
        domain,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  export  async  function  Form_Add_Visita(req: Request, res: Response) {
    try {
      const user = req.session.user;
      const type = await VisitorRepository.findAllTipo();
      const tipo_v = await VisitorRepository.findATipoDoc()
     const pertences = await VisitorRepository.pertences()
      const area = await areaRepository.findAllAreas()
      const data = await VisitorRepository.visitanteIdentificacao()
      console.log(data);
      
      res.render("Dashboard/form/register_visita", {
        user,
        data,
        pertences,
        type,
        tipo_v,
        domain,
        area,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  export  async  function  Visitantes(req: Request, res: Response) {
    try {
      const user = req.session.user;
     
      const visitor = await Visitor_contacto_Repository.findAll()
      console.log(visitor)
      res.render("Dashboard/visitantes", {
        user,
        domain,
        visitor,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  export  async  function  add_visita_(req: Request, res: Response){
    try {
       const {dt_visita,fk_area_visitada,fk_tipo_visita}= req.body
       const data :Visita={
        data_visita:dt_visita,
        fk_area_visitada: parseInt(fk_area_visitada),
        fk_tipo_visita:parseInt(fk_tipo_visita)
        
        }
        const visita = await VisitaRepository.persistDataVisita(data)
        res.json({ visita });
    
     } catch (error) {
     console.log(error) 
    }
  }

  export  async  function  Add_visitor(req: Request, res: Response) {
    const dataAtual = new Date();
    const horaAtual = dataAtual.getHours();
    const minutoAtual = dataAtual.getMinutes();
    const segundoAtual = dataAtual.getSeconds();
    const horaAtualFormatada = `${horaAtual}:${minutoAtual}:${segundoAtual}`;
    try {
      const {visitaId,documentNumber,documentValid,firstName,lastName,tipo_documento,pertences, contactos} = req.body;
      console.log("Dados do corpo da requisição:", req.body);
     const data:Visitante ={
     nome: firstName,
     sobrenome: lastName,
     hora_entrada:horaAtualFormatada,
     fk_tipo_identificacao:parseInt(tipo_documento),
     num_identificacao: documentNumber,
     Data_validade_doc:documentValid,
     contactos: contactos,
     pertences:pertences,
     visitaId: visitaId
   }
   const validate = await visitorService.ValidarDataVisitor(data)
   if(!validate.error){
      const created = await VisitorRepository.persistDataVisitor(data)

      if (!created.error) {
        req.flash("sucess", `${created.sucess}`);
        res.json({ sucess: created.sucess });
      } else {
        res.json({ error: created.error });
        console.log(created.error);
      }
    }else {
      res.json({ error: validate.error });
      console.log(validate.error);
    }
       
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Falha ao criar Usuario." });
    }
  }
  export  async  function  Visitante_identificacao(req: Request, res: Response) {
    try {
      const user = req.session.user;
      console.log(user);
      res.render("Dashboard/visitante_identificacao", {
        user,
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
  export  async  function  Visitante_definicoes(req: Request, res: Response) {
    try {
      const {visitorID}= req.params
      const user = req.session.user;
      console.log(user,visitorID);
     // const dados = await Visitor_contacto_Repository.findById(parseInt(visitorID))
      const dados = await VisitorRepository.findByiDVisitor(parseInt(visitorID))
      VisitorRepository
      console.log(dados)
      if(dados){
        res.render("Dashboard/definicoes_visitante", {
          user,
          domain,
          dados,
          error: req.flash("error"),
          warning: req.flash("warning"),
          sucess: req.flash("sucess"),
        });
      }
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  export  async  function  Visitante_changestatus(req: Request, res: Response) {
    try {
      const {id}= req.params
      console.log(id);
      const verify=await VisitorRepository.findAllVisitaVisitanteidVisita(parseInt(id))
      if(verify){
        await VisitorRepository.findAllVisitaVisitanteAllupdate(parseInt(id),2)
      return res.status(200).json({ certo: id });
      }else{
       await VisitaRepository.deletevisita(parseInt(id))
        return res.status(200).json({ certo: "deletado" });

      }
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  export  async  function  Visitante_changestatusAuto(req: Request, res: Response) {
    const dataAtual = new Date();
    const horaAtual = dataAtual.getHours();
    const minutoAtual = dataAtual.getMinutes();
    const segundoAtual = dataAtual.getSeconds();
    const horaAtualFormatada = `${horaAtual}:${minutoAtual}:${segundoAtual}`;
    try {
      const {visitaVisitanteId,status,visita}= req.body
      let data:any
      console.log(req.body);
      if(status==5){
         await VisitorRepository.findAllVisitaVisitanteOneupdate(parseInt(visitaVisitanteId),parseInt(status),parseInt(visita))
         data = await VisitorRepository.findVisitaVisitanteById(parseInt(visitaVisitanteId))
         await VisitorRepository.updateDateOute(parseInt(visitaVisitanteId),horaAtualFormatada)
      }else{
          await VisitorRepository.findAllVisitaVisitanteOneupdate(parseInt(visitaVisitanteId),parseInt(status),parseInt(visita))
         data = await VisitorRepository.findVisitaVisitanteById(parseInt(visitaVisitanteId))
      }
     
    return res.status(200).json({ certo: 'Atualizado',data});
     
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  export  async  function  Tipo_visita(req: Request, res: Response) {
    try {
      const user = req.session.user;
      console.log(user);
      res.render("Dashboard/tipo_visita", {
        user,
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
  export  async  function  Pertences(req: Request, res: Response) {
    try {
      const user = req.session.user;
      console.log(user);
      res.render("Dashboard/pertences", {
        user,
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
  export  async  function  deletarvisitor(req: Request, res: Response) {
    try {
      const { visitorID } = req.params;
      const v = await VisitorRepository.deletevisitor(parseInt(visitorID));
      if (v) {
        req.flash("sucess", "User Deletado!");
        //res.redirect("/usuarios");
        console.log("1");
      } else {
        req.flash("error", "Erro ao  Deletado User!");
        // res.redirect("/usuarios");
        console.log("0");
      }
    } catch (error) {
      req.flash("warning", "Erro Interno!");
      res.redirect("/usuarios");
    }
  }