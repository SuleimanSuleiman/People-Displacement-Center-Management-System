import express, { Router, Request, Response } from "express";
import { DeleteCenterHandle, addCenterHandler } from "../controllers/center.controller";
import { createCenterSchema, deleteCenterSchema } from "../Schemas/centers/CenterSchema";
import ValidateResource from "../middlewares/ValidateResource";

const router: Router = express.Router()


router.post(
    '/addCenter',
    ValidateResource(createCenterSchema)
    , addCenterHandler)

router.delete(
    '/deleteCenter/:center_id',
    ValidateResource(deleteCenterSchema)
    , DeleteCenterHandle
)



export default router;