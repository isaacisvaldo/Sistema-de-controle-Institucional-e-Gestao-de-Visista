import { Response, Request } from "express";
import { domain } from "../../../../config/baseUrl/url";
import { generateCurrentDate } from "../../../../utils/fuction";
import { VisitorRepository } from "../repository/visitor.repository";
import { globalRepository } from "../../../Global/repository/global.repository";
import { Visita } from "../dto/visita.dto";
import { VisitaRepository } from "../repository/visita.repository";
import { Visitante } from "../dto/visitor.dto";
import { visitorService } from "../visitor.service";
import { generateUniqueCodeVisita, generateUniqueCodeVisitanteAcess } from "../../../../utils/generation.fuction";


export  async  function PainelVisitas(req: Request, res: Response) {
    try {
      const user = req.session.user;
      const visita_visitante = await VisitorRepository.findAllVisitaVisitantetoday();
      const visitas = await VisitorRepository.findAllVisita();  
      let v_servico=0
      let v_pessoal=0
      visitas.map(e=>{
        if(e.tb_Tipo_visita?.tipo_visitaId==1){
            v_pessoal=v_pessoal+1
        }else if(e.tb_Tipo_visita?.tipo_visitaId==2){
            v_servico=v_servico+1
        }
      })
    
   

 console.log(visita_visitante)
      res.render("Dashboard/painelVisitas", {
        user,
        total:visita_visitante.length,
        v_pessoal,
        visita_visitante,
        v_servico,
        domain,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
}
export  async  function  Visitas(req: Request, res: Response) {
    try {
      const user = req.session.user;
      const visitas = await VisitorRepository.findAllVisita();
      const count = await VisitorRepository.contarVisitas();
      console.log(visitas,count);
      res.render("Dashboard/visitas", {
        user,
        visitas,
        count,
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
  export  async  function  VisitantesIncompletos(req: Request, res: Response) {
    try {
      const user = req.session.user;
      const visitantesIncompletos = await VisitorRepository.findAllVisitorIncompleted()
      console.log(visitantesIncompletos)
     
      res.render("Dashboard/visitantesIncompletos", {
        user,
        visita_visitante:[],    
        visitantesIncompletos,
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
  export  async  function  VisitanteIncompleto(req: Request, res: Response) {
    try {
      const user = req.session.user;
      const {Id}= req.params;
      const visitantesIncompletos = await VisitorRepository.findOneVisitorIncompleted(parseInt(Id))
      const type_doc = await globalRepository.findAllTipoDocumento()
     
      res.render("Dashboard/visitanteIncompleto", {
        user, 
        visitantesIncompletos,
        domain,
        Id,
        type_doc,
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
  export  async  function  FormCrVisita(req: Request, res: Response) {
    try {
      const user = req.session.user;
   const areas = await globalRepository.findAllArea()
   const type = await globalRepository.findAllTipoVisita()
   const type_doc = await globalRepository.findAllTipoDocumento()
   const pertences = await globalRepository.findAllPertences()
   console.log(type)
      res.render("Dashboard/form/register_visita", {
        user,
        areas,
        type,
        type_doc,
        pertences,
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
  export  async  function  CrVisita(req: Request, res: Response){
    try {
       const {dt_visita,fk_area_visitada,fk_tipo_visita}= req.body
       const data :Visita={
        data_visita:dt_visita,
        fk_area: parseInt(fk_area_visitada),
        fk_tipo_visita:parseInt(fk_tipo_visita),
        cod_Visita: await generateUniqueCodeVisita()
        }
        console.log(data);
        const visita = await VisitaRepository.persistDataVisita(data)
        res.json({ visita });
    
     } catch (error) {
     console.log(error) 
    }
  }
  export  async  function  addVisitantesIncompleto(req: Request, res: Response) {
    const dataAtual = new Date();
    const horaAtual = dataAtual.getHours();
    const minutoAtual = dataAtual.getMinutes();
    const segundoAtual = dataAtual.getSeconds();
    const horaAtualFormatada = `${horaAtual}:${minutoAtual}:${segundoAtual}`;
    try {
      const {visitaId,contacto} = req.body;
      console.log("Dados do corpo da requisição:", req.body);
     const code =await generateUniqueCodeVisita()
     const data:Visitante ={
     nome: "---",
     sobrenome: "---",
     hora_entrada:horaAtualFormatada,
     fk_tipo_identificacao:null ,
     num_identificacao: "---",
     Data_validade_doc:"---",
     contactos: contacto,
     pertences:[],
     isIncompleteted:true,
     visitaId: visitaId,
      code:code
   }
   const validate = await visitorService.ValidarDataVisitor(data)
   if(!validate.error){
      const created = await VisitorRepository.persistDataVisitor(data)

      if (!created.error) {
        req.flash("sucess", `${created.sucess}`);
        res.json({ sucess: created.visitaId });
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
  export  async  function  addVisitantes(req: Request, res: Response) {
    const dataAtual = new Date();
    const horaAtual = dataAtual.getHours();
    const minutoAtual = dataAtual.getMinutes();
    const segundoAtual = dataAtual.getSeconds();
    const horaAtualFormatada = `${horaAtual}:${minutoAtual}:${segundoAtual}`;
    try {
      const {visitaId,documentNumber,documentValid,firstName,lastName,tipo_documento,pertences, contactos} = req.body;
      console.log("Dados do corpo da requisição:", req.body);
     const code =await generateUniqueCodeVisita()
     const data:Visitante ={
     nome: firstName,
     sobrenome: lastName,
     hora_entrada:horaAtualFormatada,
     fk_tipo_identificacao:parseInt(tipo_documento),
     num_identificacao: documentNumber,
     Data_validade_doc:documentValid,
     contactos: contactos,
     pertences:pertences,
     visitaId: visitaId,
      code:code
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
  export  async  function  Visitante_changestatus(req: Request, res: Response) {
    try {
      const {id}= req.params
      
      const verify=await VisitorRepository.findAllVisitaVisitanteidVisita(parseInt(id))
      if(verify.length>0) {
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