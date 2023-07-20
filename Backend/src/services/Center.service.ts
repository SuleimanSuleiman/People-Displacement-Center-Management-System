import { CenterDocument } from '../models/Center.model';
import { logger } from '../utils/logger';
import CenterModel from "../models/Center.model";
import { FilterQuery } from 'mongoose';
import HandleError from '../middlewares/HandleError';

export const  CreateCenter = async (
    payload: CenterDocument
) => {
    try {
        const newCenter = await CenterModel.create(payload);
        logger.info("create new center",JSON.stringify(newCenter))
        return newCenter;
    } catch (error:any) {
        logger.error(error.message);
        return false
    }
}

export const DeleteCenter = async (
    query: FilterQuery<CenterDocument>,
) => {
    const result = await CenterModel.findOneAndDelete(query)
    return result;
}