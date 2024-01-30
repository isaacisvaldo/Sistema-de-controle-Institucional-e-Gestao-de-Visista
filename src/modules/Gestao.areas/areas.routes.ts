import { Router } from "express";
import multer from 'multer';
import { sessionVerify, userAuth } from "../../utils/middlewares/session";
import configureMulter from "../../utils/middlewares/fileUpload";
import  * as areasController from "./controller/areas.controller";

const upload = multer(configureMulter());
const areasRouter = Router()
areasRouter.get('/Listar',userAuth,areasController.Areas)
areasRouter.get('/PainelControlArea',userAuth,areasController.PainelControlArea)
export default areasRouter;