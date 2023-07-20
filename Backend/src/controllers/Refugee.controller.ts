import {Request, Response,NextFunction} from 'express';
import { AddRefugee, CheckRefugeeAndBuildCenterHandle, fuzzyHandle } from '../services/Humen.service';
import { refugeeInput } from '../Schemas/humen/Refugee.Schema';
import HandleError from '../middlewares/HandleError';
import Refugee from "../models/refugee.model";
import CenterDocument from '../models/Center.model';

export const addRefugeeHandle =async (
    request: Request<{}, {}, refugeeInput["body"]>,
    response: Response,
    next :NextFunction
) => {
    try {
        const payload = request.body;
        const Center = await CenterDocument.findById(payload.centerId);

        if (Center?.active !== 'true') return response.status(400).json({
            success: false,
            status: 400,
            message: "Your Center is overflow, redirect refugees to another center in your origin"
        })
        const addRfugee = await AddRefugee({ body: payload });

        if (!addRfugee) return next(HandleError(400, 'invalid input'));

        const checkRefugee = await CheckRefugeeAndBuildCenterHandle({ centerId: request.body.centerId });

        if (!checkRefugee) return next(HandleError(400, 'error happened please try again'));

        if (checkRefugee.message === 'not overflow') {            
            return response.status(201).json({
                success: true,
                status: 201,
                message: "add successfully"
            });
        }
        else if (checkRefugee.message === 'should handle with fuzzy') {
            const number_center = await CenterDocument.find({
                location: Center.location,
                city: Center.city,
                active: "true"
            }).count();
            if (number_center < 2) {
                await fuzzyHandle({ centerId: request.body.centerId });
            }
            return response.status(201).json({
                success: true,
                status: 201,
                message: "add successfully and handle using fuzzy"
            });
        } else if (checkRefugee.message === "set active => false") {
            await CenterDocument.findByIdAndUpdate(payload.centerId, {
                active: "false"
            });
            return response.status(201).json({
                success: true,
                status: 201,
                message: "add successfully and lock the center redirect refugees to another center in your origin"
            });
        }
    } catch (error:any) {
        return response.status(500).json({
            success: false,
            status: 500,
            message: error.message
        })
    }
}

export const GetAllRefugee =async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // const centerId = res.locals.user._doc.centerId;
        // if(centerId !== req.params.id) next(HandleError(400,'Fuck you Man !!'))
        const data = await Refugee.find({
            centerId: req.params.id,
        });
        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(400).send('error');
        }
    } catch (error:any) {
         return res.status(500).send(error.message);
    }
}