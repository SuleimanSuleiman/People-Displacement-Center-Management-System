import {Request, Response ,NextFunction} from "express";
import { createCenterInput, deleteCenterInput } from '../Schemas/centers/CenterSchema';
import { CreateCenter, DeleteCenter } from '../services/Center.service';
import { CenterDocument } from '../models/Center.model';
import { logger } from "../utils/logger";
import HandleError from '../middlewares/HandleError';
import Center from "../models/Center.model";
import { PythonShell } from 'python-shell';
const pythonScriptPath = "d:/New folder/People-Displacement-Center-Management-System/createCenterrManual.py";


export const getCenterData =async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        if (!id) next(HandleError(400, 'id not found '))
        const centerData = await Center.findById(id);
        if (centerData) return res.status(200).json(centerData);
    } catch (error:any) {
        return res.status(500).json({
            success: false,
            status: 500,
            message: error.message
        })
    }
}

export const addCenterHandler = async(
    req: Request<{},{},createCenterInput['body']>,
    res: Response
) => {
    try {
        const payload = req.body;
        //@ts-ignore
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

export const GetFuzzyResult = (
    req: Request,
    res:Response
) => {
    try {
        const variablesToSend = [req.body.population_growth, req.body.earthquake_average, req.body.earthquake_average];
        const options:any = {
            args: variablesToSend,
        };

        PythonShell.run(pythonScriptPath, options).then(messages=>{
            res.status(200).json({
                success: true,
                status: 200,
                message: messages
            })
        });
    } catch (error:any) {
         res.status(500).json(error.message)    
    }
}


export const GetCentersHanlde = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await Center.find();
        return res.status(200).json({
            success: true,
            status: 200,
            data: [
                ...data
            ]
        });
    } catch (err: any) {
        console.log(err.message)
        next(HandleError(500, err.message));
    }
}