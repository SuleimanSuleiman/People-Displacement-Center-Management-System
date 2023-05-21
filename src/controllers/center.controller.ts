import {Request, Response ,NextFunction} from "express";
import { createCenterInput, deleteCenterInput } from '../Schemas/centers/CenterSchema';
import { CreateCenter, DeleteCenter } from '../services/Center.service';
import { CenterDocument } from '../models/Center.model';
import { logger } from "../utils/logger";
import HandleError from '../middlewares/HandleError';

export const addCenterHandler = async(
    req: Request<{},{},createCenterInput['body']>,
    res: Response
) => {
    try {
        const payload = req.body;
        const newCenter = await CreateCenter(payload as CenterDocument)
        if (newCenter) {
            res.status(201).json(newCenter)
        }
    } catch (error:any) {
        logger.error(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const DeleteCenterHandle = async (
    req: Request<deleteCenterInput['params']>,
    res: Response,
    next: NextFunction
) => {
    try {
        let _id = req.params.center_id;
        let payload = req.body;
        
        const result = await DeleteCenter({ _id, ...payload })
        if (!result) {
            next(HandleError(400, "Not found this center or an error happened when delete the center"))
        } else {
            return res.status(200).json({
                success: true,
            })
        }
    } catch (error:any) {
        return next(HandleError(500, error.message))
    }
}