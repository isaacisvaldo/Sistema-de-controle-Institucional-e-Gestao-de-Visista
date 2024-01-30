import { Router } from 'express';
import {userAuth} from './app/util/middlewares/session'
import UserController from './app/user/controller/user.controller'
import multer from 'multer';
import configureMulter from './app/util/middlewares/fileUpload';
const upload = multer(configureMulter());
const User= new UserController()
const routes = Router()



routes.get('/painelEscalas',userAuth,User.painelEscala)
routes.get('/painelClinic',userAuth,User.painelClinic)
//Funcionarios

routes.get('/error404',userAuth,User.error404)
routes.post('/FindFeathPatente',userAuth,User.FindFeathPatente)



//work schedule 
routes.get('/Escalas',userAuth,User.Escalas)
routes.post('/EscalaSave',userAuth,User.EscalaSave) 
routes.get('/escalapermaneca',User.escalapermaneca) 
routes.post('/EscalaPelotaoSave',userAuth,User.EscalaPelotaoSave)
routes.get('/EscalaPelotao',userAuth,User.EscalaPelotao)
routes.post('/EscalaPelotaoPostoSave',userAuth,User.EscalaPelotaoPostoSave)
routes.get('/EscalaPelotaoPosto',userAuth,User.EscalaPelotaoPosto)
routes.get('/Form_Add_Escala_Permaneca',userAuth,User.Form_Add_Escala_Permaneca)
routes.get('/EscalaPermanencas',userAuth,User.EscalaPermanencas)
routes.get('/Escala_deia_cctv',userAuth,User.Escala_cctv)
routes.get('/Escala_pm',userAuth,User.Escala_pm)
routes.get('/Escala_deia',userAuth,User.Escala_deia)
routes.get('/Form_Add_Escala_CCTV',userAuth,User.Form_Add_Escala_CCTV)
routes.get('/Posicoes_escalados',userAuth,User.Posicoes_escalados)
routes.get('/Pelotao',userAuth,User.Pelotao)
routes.get('/Turnos',userAuth,User.Turnos)
routes.get('/Postos',userAuth,User.Posto)
routes.get('/Tipo_escala',userAuth,User.Tipo_escala)
routes.get('/Efetivo_pelotao',userAuth,User.Efetivo_pelotao)
routes.post('/Efetivo_pelotaosearch',userAuth,User.Efetivo_pelotaosearch)
routes.post('/Efetivo_pelotao_save',userAuth,User.Efetivo_pelotao_save)
//End work schedule




export {routes};