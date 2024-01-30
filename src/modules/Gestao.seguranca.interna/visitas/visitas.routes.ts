import { Router } from "express";
import  * as visitasController from  "./controller/visitas.controller";
import { userAuth } from "../../../utils/middlewares/session";

const visitasRouter = Router()
visitasRouter.get('/painelVisitas',userAuth,visitasController.PainelVisitas)
visitasRouter.get('/Visitas',userAuth,visitasController.Visitas)

export default visitasRouter;