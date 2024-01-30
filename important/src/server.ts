import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { routes } from "./router";
import { userRouter } from "./app/module/user/router/user.router";
import RedisStore from "connect-redis"
import session, { SessionOptions } from 'express-session';
import {createClient} from "redis"
import flash from "express-flash"
import cors from 'cors';
import { auxRouter } from "./app/module/auxilary/router/auxilary.routers";
import { employeeRouter } from "./app/module/employee/router/employee.router";
import { visitRouter } from "./app/module/VisitGestation/router/visit.gestion.router";
const redisClient = createClient()
redisClient.connect().catch(console.error)
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})
config();
const main = async () => {
  const app = express();
  app.use(flash());
  app.use(
    session({
     store: redisStore,
      secret: process.env.SESSION_PASSWORD || "Testando@##123",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure:false,
        maxAge: 60 * 60 * 1000, 
      },
    } as SessionOptions));
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(routes);
  app.use(userRouter)
  app.use(auxRouter)
  app.use(employeeRouter)
  app.use(visitRouter)
  app.use(function  (req,res,next){
    res.redirect('/error404');
}) 
  const port = process.env.PORT || 8085;
  app.listen(port, () => console.log(`Rodadndo http://localhost:${port}`));
};
main();
