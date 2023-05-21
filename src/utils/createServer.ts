import express, { Express, Response, Request, NextFunction } from 'express';
import bodyParser from "body-parser";
import morgan from 'morgan';
import helmet from "helmet";

import centerRouter from "../routers/center.routes";
import PeopleRourer from "../routers/People.routes";
import CarageRouter from "../routers/carage.routes";

import authHandle from './authHandle';
import cookieParser from 'cookie-parser';
import {nodeCron} from './nodeCron';

export default function createServer() {
    const app: Express = express()
    
    nodeCron()
    app.use(express.json())
    app.use(cookieParser())
    app.use(bodyParser.urlencoded({extended: false}))    
    app.use(morgan("tiny"))
    app.use(helmet())  
    app.use(authHandle)

    app.use('/center', centerRouter)
    app.use('/humen', PeopleRourer)
    app.use('/carage', CarageRouter)

    app.use((error:any, req:Request, res:Response, next:NextFunction) => {
        const status:number = error.status || 500;
        const message:string = error.message || "an error happened";
        return res.status(status).json({
            success: false,
            status: status,
            message: message
        })
    })
    return app;
}