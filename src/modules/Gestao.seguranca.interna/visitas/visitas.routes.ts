import { Router } from "express";
import  * as visitasController from  "./controller/visitas.controller";
import { userAuth } from "../../../utils/middlewares/session";

const visitasRouter = Router()
visitasRouter.get('/painelVisitas',userAuth,visitasController.PainelVisitas)
visitasRouter.get('/Visitas',userAuth,visitasController.Visitas)
visitasRouter.get('/FormCrVisita',userAuth,visitasController.FormCrVisita)
visitasRouter.post('/CrVisita',userAuth,visitasController.CrVisita)
visitasRouter.get('/visitanteschangestatus/:id',userAuth,visitasController.CrVisita)

export default visitasRouter;