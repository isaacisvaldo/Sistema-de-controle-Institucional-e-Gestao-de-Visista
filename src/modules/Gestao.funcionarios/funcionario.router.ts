import { Router } from "express";
import multer from 'multer';
import { sessionVerify, userAuth } from "../../utils/middlewares/session";
import configureMulter from "../../utils/middlewares/fileUpload";
import * as FuncionarioController  from "./controller/funcionario.controller";
const upload = multer(configureMulter());
const funcionarioRouter = Router()


funcionarioRouter.get('/Listar',userAuth,FuncionarioController.Funcionarios)
funcionarioRouter.post('/FindFeathPatenteByOrgan',FuncionarioController.FindFeathPatenteByOrgan)
funcionarioRouter.post('/Create',FuncionarioController.FuncionarioCreate)
funcionarioRouter.get('/delete/:funcionarioId',FuncionarioController.deleteFuncionario)

export default funcionarioRouter;