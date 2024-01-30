import { Response, Request } from "express";
import { domain } from "../../../../config/baseUrl/url";
import { generateCurrentDate } from "../../../../utils/fuction";
import { VisitorRepository } from "../repository/visitor.repository";


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