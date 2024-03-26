import { Router } from "express";
import  * as visitasController from  "./controller/visitas.controller";
import { userAuth } from "../../../utils/middlewares/session";
import multer from 'multer';
import configureMulter from "../../../utils/middlewares/fileUpload";
const upload = multer(configureMulter());

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
visitasRouter.get('/VisitantesIncompletos',userAuth,visitasController.VisitantesIncompletos)
visitasRouter.get('/VisitanteIncompleto/:Id',userAuth,visitasController.VisitanteIncompleto)
visitasRouter.get('/sendPhoto/:Id',userAuth,visitasController.sendPhoto)
visitasRouter.post('/completedCadatroVisitante',userAuth,visitasController.completedCadatroVisitante)
visitasRouter.post('/recivePhoto',userAuth,visitasController.recivePhoto)
visitasRouter.get('/displaycomfirmSend',userAuth,visitasController.displaycomfirmSend)

export default visitasRouter;