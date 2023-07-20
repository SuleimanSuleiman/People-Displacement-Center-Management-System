import {Request, Response,NextFunction} from 'express';
import { helperInput } from '../Schemas/humen/helper.schema';
import { addHelperHandleService, FindHelper, GetHelper, UpdateHelperService } from '../services/Humen.service';
import { sendEmail } from '../services/SendEmail.service';
import { NeedHelperInput } from '../Schemas/humen/NeedHelper.schema';
import { LeaveHelperInput } from '../Schemas/humen/LeaveHelperSchema';
import HandleError from '../middlewares/HandleError';
import HelperModel from '../models/Helper.model';

export const addHelperHandle = async (
    req: Request<{}, {}, helperInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try {
        // @ts-ignore
        const AddHelper:any = await addHelperHandleService({ ...req.body });
        if (AddHelper.success) {
            const data: any = AddHelper._doc
            const message = `نحن فخورين بك وبأمثالك ولتطوعك لانقاذ حياة الابراء ومساعدتهم في هذه المحنة شكرا لك نتمنى لك دوام الصحة في مركزك  ومكان تقديم مساعدتك في مركزك`
            const sendEmailHandle = await sendEmail(data.email, "شكرا لك", message, false)

            if (sendEmailHandle) {
                res.status(201).json(data)
            }
        } else {
            res.status(400).json(AddHelper)
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const NeedHelperHandle =async  (
    req: Request<NeedHelperInput['params']>,
    res: Response,
    next: NextFunction
) => {
    try {
        const num = req.params.num;
        const location = req.params.location;
        //@ts-ignore
        const centerId = req.params.centerId;
        // const centerId = res.locals.user._doc.centerId;
        const findHelperAndSendEmails = await FindHelper(num, location, centerId);
        res.status(200).json(findHelperAndSendEmails)
    } catch (error:any) {
        res.status(500).send(error.message);
    }
}

export const LeaveHelperHandle = async (
    req: Request<LeaveHelperInput['params']>,
    res: Response,
    next: NextFunction
) => {
    try {
        // @ts-ignore
        const { id } = req.params;
        const findHelper = await GetHelper(id);
        if (!findHelper) next(HandleError(400, "not found this helper !!"));
        else {
            const updateHelper = await UpdateHelperService(findHelper._id);
            res.json(updateHelper)
        }
    } catch (error:any) {
        next(HandleError(500, error.message));
    }
}

export const ReomveHelperHandle = async (
    req: Request<LeaveHelperInput['params']>,
    res: Response,
    next: NextFunction
) => {
    try {
        // @ts-ignore
        const { id } = req.params;
        const findHelper = await GetHelper(id);
        if (!findHelper) next(HandleError(400, "not found this helper !!"));
        else {
            await HelperModel.findByIdAndRemove(findHelper._id);
            res.json({
                success: true,
            })
        }
    } catch (error: any) {
        next(HandleError(500, error.message));
    }
}

export const GetAllHelper  = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await HelperModel.find({
            centerId: req.params.id
        });
        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(400).send('error');
        }
    } catch (error:any) {
         return res.status(400).send(error.message);
    }
}