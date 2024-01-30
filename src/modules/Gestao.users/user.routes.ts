import { Router } from "express";
import * as userController from './controller/user.controller';
import multer from 'multer';
import { sessionVerify, userAuth } from "../../utils/middlewares/session";
import configureMulter from "../../utils/middlewares/fileUpload";
const upload = multer(configureMulter());
const userRouter = Router()


userRouter.get('/home',userAuth,userController.dasboard)
userRouter.post('/sigin',userController.sigin)
userRouter.get('/resetPassword',userController.resetPassword)
userRouter.get('/logout',userController.logout)
userRouter.get('/logSistema',userController.logSistema)
userRouter.get('/log/:logId',userAuth,userController.log)
//User
userRouter.get('/listar',userAuth,userController.Listar)
userRouter.post('/create',upload.single('file'),userAuth,userController.create)
userRouter.get('/meuPerfil',userAuth,userController.meuPerfil)
userRouter.get('/deleteUser/:userId',userAuth,userController.deleteUser)
userRouter.get('/perfilUsuario/:userId',userAuth,userController.perfilUsuario)
userRouter.get('/PerfisUser',userAuth,userController.PerfisUser)
userRouter.get('/grupoUser',userAuth,userController.grupoUser)
userRouter.get('/formularioUsuario',userAuth,userController.formularioUsuario)
userRouter.get('/definicoesPerfil',userAuth,userController.definicoesPerfil)
userRouter.post('/Alterar_foto_user',upload.single('file'),userAuth,userController.Alterar_foto_user)
export default userRouter;