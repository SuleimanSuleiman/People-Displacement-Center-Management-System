import { Request,Response, NextFunction } from "express";
import HandleError from './HandleError';
import People from "../models/People.model";

const checkIfRoleAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const role: string = req.body.role;

        if (!role) next()
        if (role.toLowerCase().trim() === 'admin') {
            let isFind = await People.find({ role: "admin",centerId: req.body.centerId})
            if (isFind.length > 0) {
                next(HandleError(409,"you can not be a admin"))
            } else {
                next()
            }
        } else {
            next()
        }
    } catch (error:any) {
        next(HandleError(500,error.message))
    }
}

export default checkIfRoleAdmin