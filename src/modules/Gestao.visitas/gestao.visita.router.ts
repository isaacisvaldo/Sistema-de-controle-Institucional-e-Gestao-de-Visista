import { Router } from "express";
import multer from 'multer';
import configureMulter from "../../utils/middlewares/fileUpload";
import { userAuth } from "../../utils/middlewares/session";
const upload = multer(configureMulter());
const visitRouter = Router()
visitRouter.get('/painelVisitas',userAuth,visitController.painelVisitas)

visitRouter.get('/deletarvisitor/:visitorID',visitController.deletarvisitor)
visitRouter.get('/Visitas',userAuth,visitController.Visitas)
visitRouter.get('/Visita/:visitaId',userAuth,visitController.Visita)
visitRouter.get('/Form_Add_Visita',userAuth,visitController.Form_Add_Visita)
visitRouter.get('/Visitante_identificacao',userAuth,visitController.Visitante_identificacao)
// visitRouter.get('/form_Add_visitor',userAuth,User.form_Add_visitor)
 visitRouter.post('/Add_visitor',visitController.Add_visitor)
visitRouter.get('/Pertences',userAuth,visitController.Pertences)
visitRouter.post('/visita',visitController.add_visita_)
visitRouter.get('/Visitantes',userAuth,userAuth,visitController.Visitantes)
visitRouter.get('/Tipo_visita',userAuth,visitController.Tipo_visita)
visitRouter.get('/Visitante_definicoes/:visitorID',userAuth,visitController.Visitante_definicoes)
visitRouter.get('/visitanteschangestatus/:id',userAuth,visitController.Visitante_changestatus)
visitRouter.post('/Visitante_changestatusAuto',userAuth,visitController.Visitante_changestatusAuto)
visitRouter.get('/Visita_visitante',userAuth,visitController.Visita_visitante)
visitRouter.get('/Visita_visitante_pertence',userAuth,visitController.Visita_visitante_pertence)
export {visitRouter}; 