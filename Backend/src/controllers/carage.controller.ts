import {NextFunction,Request,Response} from 'express';
import { createNewCarage, AddNewCarService, GetAllDataService } from '../services/Carage.service';
import { CarageInput } from '../Schemas/centers/Carage.schema';
import { AddCarInput } from '../Schemas/centers/AddCar.schema';
import HandleError from '../middlewares/HandleError';
import _ from "lodash";

export const CreateCarageHandle = async (
    req: Request<{},{},CarageInput['body']>,
    res: Response,
    next:NextFunction
) => {
    try {
        const payload = req.body;
        
        if (payload) {
            // @ts-ignore
            const creareNewCarage = await createNewCarage(payload);
            if (creareNewCarage) {
                res.status(201).json(creareNewCarage)
            } else {
                res.status(400).json({
                    success: false,
                    status: 400,
                    message: "an error when create the document"            
                })
            }
        } else {
            res.status(419).json({
                success: false,
                status: 419,
                message: "payload is empty !!"
            })
        }
    } catch (error:any) {
        res.status(500).json({
            success: false,
            status: 500,
            message: error.message
        })        
    }
}


export const AddCarHandle = async(
    req: Request,
    res: Response,
    next:NextFunction
) => {
    try {
        let payload:object = req.body;
        const carageId: string = req.params.Cid;
        if (!carageId) next(HandleError(400, "carage id not found"));
        payload = {
            ...payload,
            carageId
        };
        const activeValue = _.get(payload, 'active');
        if (!activeValue) {
            payload = {...payload,active: 'false'}
        }        
        const newCar = await AddNewCarService(payload);
        res.json(newCar)
    } catch (error: any) {
        let message:string = error.message;
        if (error.message.includes('E11000 duplicate key error collection')) {
            message = 'car id invalid it is repeated'
        }
        res.status(400).json({
            success: false,
            status: 400,
            message,
        })
    }
}

export const GetAllTruckHandle = async(
    req: Request,
    res: Response,
) => {
    try {
        const id = req.params.id;
        const result = await GetAllDataService(id);
        res.status(200).json(result)
    } catch (error:any) {
        res.status(500).json({
            success: false,
            stauts: 500,
            message: error.message
        })
    }
}