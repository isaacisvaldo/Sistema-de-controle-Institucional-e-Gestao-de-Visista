import { Response, Request } from "express";
import { domain } from "../../../../config/baseUrl/url";
import { generateCurrentDate } from "../../../../utils/fuction";
import { VisitorRepository } from "../repository/visitor.repository";
import { globalRepository } from "../../../Global/repository/global.repository";
import { Visita } from "../dto/visita.dto";
import { VisitaRepository } from "../repository/visita.repository";


export  async  function PainelVisitas(req: Request, res: Response) {
    try {
      const user = req.session.user;
      const today = await generateCurrentDate()
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
    
   

      let total =0
      visita_visitante.map(e=>{
        if(e.tb_visitas?.data_visita==today){
            total=total+ 1
        }
       

      })

      res.render("Dashboard/painelVisitas", {
        user,
        total,
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
        fk_tipo_visita:parseInt(fk_tipo_visita)
        
        }
        const visita = await VisitaRepository.persistDataVisita(data)
        res.json({ visita });
    
     } catch (error) {
     console.log(error) 
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