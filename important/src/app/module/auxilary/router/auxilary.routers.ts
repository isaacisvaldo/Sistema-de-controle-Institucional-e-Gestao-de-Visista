import { Router } from "express";
import * as userAuxilary from '../controllers/auxilary.controller';
import { userAuth } from "../../../util/middlewares/session";
const auxRouter = Router()
//Orgao
auxRouter.get('/Orgao',userAuth,userAuxilary.Orgao)
auxRouter.post('/Add_orgao',userAuth,userAuxilary.Add_orgao)
auxRouter.get('/deleteOrgao/:orgaoID',userAuth,userAuxilary.deleteOrgao)
//Patente
auxRouter.get('/Patente',userAuth,userAuxilary.Patente)
auxRouter.post('/Add_Patente',userAuth,userAuxilary.Add_Patente)
//Areas
auxRouter.get('/Areas',userAuth,userAuxilary.Areas)
auxRouter.post('/Add_areas',userAuxilary.Add_areas)
auxRouter.get('/deleteArea/:areaID',userAuxilary.deleteArea)
export {auxRouter}; 