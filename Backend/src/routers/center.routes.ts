import express, { Router, Request, Response } from "express";
import { DeleteCenterHandle, addCenterHandler, getCenterData } from "../controllers/center.controller";
import { createCenterSchema, deleteCenterSchema } from "../Schemas/centers/CenterSchema";
import ValidateResource from "../middlewares/ValidateResource";

class CenterRouter {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.setup();
  }

  private setup(): void {
    this.router.get('/:id', getCenterData);

    this.router.post(
      '/addCenter',
      ValidateResource(createCenterSchema),
      addCenterHandler
    );

    this.router.delete(
      '/deleteCenter/:center_id',
      ValidateResource(deleteCenterSchema),
      DeleteCenterHandle
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}

const centerRouterInstance = new CenterRouter();
export default centerRouterInstance.getRouter();