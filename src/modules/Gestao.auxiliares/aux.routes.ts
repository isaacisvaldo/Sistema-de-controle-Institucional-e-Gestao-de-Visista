import { Router } from "express";
import * as auxController from './controller/aux.controller';
import multer from 'multer';
import { sessionVerify, userAuth } from "../../utils/middlewares/session";
import configureMulter from "../../utils/middlewares/fileUpload";
const upload = multer(configureMulter());
const auxRouter = Router()


auxRouter.get('/OrgaoList',userAuth,auxController.OrgaoList)

export default auxRouter;