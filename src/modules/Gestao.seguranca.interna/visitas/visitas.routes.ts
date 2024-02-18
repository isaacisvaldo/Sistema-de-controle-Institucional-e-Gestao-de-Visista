import { Router } from "express";
import  * as visitasController from  "./controller/visitas.controller";
import { userAuth } from "../../../utils/middlewares/session";

const visitasRouter = Router()
visitasRouter.get('/painelVisitas',userAuth,visitasController.PainelVisitas)
visitasRouter.get('/Visitas',userAuth,visitasController.Visitas)
visitasRouter.get('/Visita/:visitaId',userAuth,visitasController.Visita)
visitasRouter.get('/FormCrVisita',userAuth,visitasController.FormCrVisita)
visitasRouter.post('/CrVisita',userAuth,visitasController.CrVisita)
visitasRouter.get('/visitanteschangestatus/:id',userAuth,visitasController.Visitante_changestatus)
visitasRouter.post('/addVisitantes',userAuth,visitasController.addVisitantes)
visitasRouter.post('/addVisitantesIncompleto',userAuth,visitasController.addVisitantesIncompleto)
visitasRouter.post('/Visitante_changestatusAuto',userAuth,visitasController.Visitante_changestatusAuto)

export default visitasRouter;