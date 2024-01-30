import { Router } from "express";
import configureMulter from '../../../util/middlewares/fileUpload';
import { sessionVerify, userAuth} from '../../../util/middlewares/session'
import * as userController from '../controller/user.controller';
import multer from 'multer';
const upload = multer(configureMulter());
const userRouter = Router()


userRouter.get('/',sessionVerify,userController.index)
userRouter.get('/home',userAuth,userController.dasboard)
userRouter.post('/sigin',userController.sigin)
userRouter.get('/resetPassword',userController.resetPassword)
userRouter.get('/logout',userController.logout)

//User
userRouter.get('/usuarios',userAuth,userController.usuarios)
userRouter.post('/Add_user',upload.single('file'),userAuth,userController.Add_user)
userRouter.get('/Perfil',userAuth,userController.Myprofile)
userRouter.get('/deleteUser/:userID',userAuth,userController.deleteUser)
userRouter.get('/see_user_perfil/:userID',userAuth,userController.see_user_perfil)
userRouter.get('/Perfis_user',userAuth,userController.Perfis_user)
userRouter.get('/grupo_user',userAuth,userController.grupo_user)
userRouter.get('/Form_user',userAuth,userController.Form_user)
userRouter.get('/setting_perfil',userAuth,userController.setting_perfil)
userRouter.post('/Alterar_foto_user',upload.single('file'),userAuth,userController.Alterar_foto_user)
export {userRouter}; 