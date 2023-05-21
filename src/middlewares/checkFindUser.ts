import { Request,Response,NextFunction } from "express";
import People from "../models/People.model";

export const checkFindUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = res.locals.user;
        if (data) {
            const findUser = await People.findById(data._doc._id);
            if (findUser && findUser.role === 'admin') {
                next()
            } else {
               res.status(403).json({
                success: false,
                status: 403,
                message:"access blocked"
            })             
            }
        } else {
            res.status(403).json({
                success: false,
                status: 403,
                message:"access blocked"
            })
        }
    } catch (error:any) {
        res.status(500).json({
                  success: false,
                status: 500,
                message:error.message        
        })
    }
}