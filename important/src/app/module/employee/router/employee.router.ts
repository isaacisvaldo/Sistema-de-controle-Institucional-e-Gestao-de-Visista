import { Router } from "express";
import configureMulter from '../../../util/middlewares/fileUpload';
import { sessionVerify, userAuth} from '../../../util/middlewares/session'
import * as employeeController from '../controller/employee.controller';
import multer from 'multer';
const upload = multer(configureMulter());
const employeeRouter = Router()



employeeRouter.get('/Funcionarios',userAuth,employeeController.Employees)
employeeRouter.post('/Add_employee',employeeController.Add_employee)
employeeRouter.get('/deleteEmployee/:Id',userAuth,employeeController.deleteEmployee)

export {employeeRouter}; 