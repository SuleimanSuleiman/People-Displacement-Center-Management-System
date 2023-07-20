import express, { Express, Request, Response } from "express";
import createServer from "./utils/createServer";
import config from "config";
import dotenv from "dotenv";
import connect from "./utils/connect";
import winston from "winston";
import { logger } from "./utils/logger";

class App {
  private app: Express;
  private port: number;
  private host: string;

  constructor() {
    this.app = createServer();
    this.port = config.get<number>('port');
    this.host = config.get<string>('host');
    if (process.env.NODE_ENV !== 'production') {
      dotenv.config();
      logger.add(new winston.transports.Console({
        format: winston.format.simple(),
      }));
    }
  }

  public start(): void {
    this.app.listen(this.port)
      .on('listening', async (_: any) => {
        await connect();
        let string = `Server Running ${this.host}:${this.port}`;
        logger.info(string);
      })
      .on('error', (error: any) => {
        let errorMessage = `error happened ${error}`;
        logger.error(errorMessage);
      });
  }
}


                
const appInstance = new App();
appInstance.start();