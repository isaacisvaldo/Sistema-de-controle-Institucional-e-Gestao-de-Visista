import { domain } from "../../../config/baseUrl/url";
import { Response, Request } from "express";
import { areasRepository } from "../repository/areas.repository";

export  async  function Areas(req: Request, res: Response) {
    try {
      const user = req.session.user;
      const areas= await areasRepository.findAllAreas()
      console.log(areas)
      res.render("Dashboard/areas", {
        user,
        areas,
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

export  async  function PainelControlArea(req: Request, res: Response) {
    try {
      const user = req.session.user;
      const areas= await areasRepository.findAllAreas()
      console.log(areas)
      res.render("Dashboard/painelControleArea", {
        user,
        areas,
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