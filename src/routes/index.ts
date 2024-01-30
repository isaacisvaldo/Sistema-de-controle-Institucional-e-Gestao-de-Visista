import { Router } from "express";
import userRouter from "../modules/Gestao.users/user.routes";
import funcionarioRouter from "../modules/Gestao.funcionarios/funcionario.router";
import { userAuth } from "../utils/middlewares/session";
import areasRouter from "../modules/Gestao.areas/areas.routes";
import auxRouter from "../modules/Gestao.auxiliares/aux.routes";
const routes = Router()
routes.use('/user',userRouter)
routes.use('/funcionario',funcionarioRouter)
routes.use('/areas',areasRouter)
routes.use('/auxiliares',auxRouter)

routes.get('/', async (req, res) => {
     try {

        res.render("Dashboard/form/authentication-sign", {
          message:'Segurança Institucional',
          error: req.flash("error"),
          warning: req.flash("warning"),
          sucess: req.flash("sucess"),
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to create user." });
      }
});
routes.get('/error/siteConstrucao', (req, res) => {
    try {
      const user = req.session.user;
      res.render("Dashboard/error/siteConstrucao", {
        user,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to create user." });
    }
});
routes.get('/error/PagenotFound',userAuth, (req, res) => {
    try {
      const user = req.session.user;
      res.render("Dashboard/error/PagenotFound", {
        user,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to create user." });
    }
});
export {routes}; 