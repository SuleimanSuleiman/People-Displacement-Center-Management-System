import express, { Express, Request, Response } from "express";
import createServer from "./utils/createServer";
import config from "config";
import dotenv from "dotenv";
import connect from "./utils/connect";
import winston from "winston";
import { logger } from "./utils/logger";


if (process.env.NODE_ENV !== 'production') {
  dotenv.config
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}


const PORT = config.get<number>('port')
const HOST = config.get<string>('host')

const app:Express = createServer();


app.listen(PORT)
    .on('listening', async (_: any) => {
      
      await connect()
      let string = `Server Running ${HOST}:${PORT}`;
        logger.info(string)
    })
    .on('error', (error: any) => {
        let errorMessage = `error happened ${error}`
        logger.error(errorMessage)
    })
