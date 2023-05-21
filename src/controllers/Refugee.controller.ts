import {Request, Response,NextFunction} from 'express';
import { AddRefugee } from '../services/Humen.service';
import { refugeeInput } from '../Schemas/humen/Refugee.Schema';
import HandleError from '../middlewares/HandleError';

export const addRefugeeHandle =async (
    request: Request<{}, {}, refugeeInput["body"]>,
    response: Response,
    next :NextFunction
) => {
    try {
        const payload = request.body;
        const addRfugee = await AddRefugee({ body: payload })
        if (!addRfugee) return next(HandleError(400, 'please try later'))
        else {
            return response.status(201).json({
                success: true,
                status: 201,
                message: "add successfully"
            })
        }
    } catch (error:any) {
        return response.status(500).json({
            success: false,
            status: 500,
            message: error.message
        })
    }
}