import {Request, Response,NextFunction} from 'express';
import { CreateUserInput } from '../Schemas/humen/humen.schema';
import { CreateUser, loginUser } from '../services/Humen.service';
import { omit } from 'lodash';
import HandleError from '../middlewares/HandleError';
import { CreateToken, findUser } from '../services/SendEmail.service';
import { TokenEmailInput } from '../Schemas/humen/TokenEmail.schema';
import { SignJWT, createSession, createSessionAndCookie } from '../services/session.service';
import config from "config";
import { loginUserInput } from '../Schemas/humen/loginUser.schema';
import CenterModel from "../models/Center.model";
import HelperModel from '../models/Helper.model';
import Refugee from "../models/refugee.model";
import { exec } from 'child_process';


export const createNewUser = async (
    request: Request<{}, {}, CreateUserInput["body"]>,
    response: Response,
    next :NextFunction
) => {
    try {
        let payload = omit(request.body, "passwordConfirmation")
        
        const newHumen = await CreateUser(payload)
        if (!newHumen) next(HandleError(400, "an error happened please try again !!"))
        const saveEmail = await CreateToken(newHumen._id, newHumen.email)
        if (saveEmail) return response.status(201).json({ ...newHumen,saveEmail })
        else next(HandleError(400,"please try later !"))
    } catch (error: any) {
        console.log(error.message)
        response.status(500).json({
            success: false,
            status: 500,
            message: error.message
        })
    }
}


export const VerifyToken = async(
    request: Request<TokenEmailInput['params']>,
    response: Response,
    next :NextFunction 
) => {
    try {
        const id = request.params.humen_id;
        const token = request.params.token;
        const findUserHandle = await findUser(id, token)
        if (!findUserHandle) next(HandleError(400, "try later"))
        else {
            const userAgent: string | undefined = request.get("user-agent")
            if (userAgent) {
                const result = await createSessionAndCookie(findUserHandle, userAgent);
       
                if (result.success) {
                    response.cookie("access-token", result.access_token, { httpOnly: true })
                    response.cookie("x-refresh", result.refresh_token, { httpOnly: true })
                    response.status(result.status).send(result.message);
                } else {
                    next(HandleError(result.status, result.message));
                }
            }
        }
    } catch (error:any) {
        response.status(500).json({
            success: false,
            status: 400,
            message: error.message
        })
    }
}


export const LoginHandler = async(
    request: Request<{}, {}, loginUserInput['body']>,
    response: Response,
    next: NextFunction
) => {
    try {
        const login = await loginUser(request);
        if (!login) return next(HandleError(409, "Email or Password invalid"))
        else if (!login.confirmEmail) {
            return next(HandleError(403,"The email not verify"))
        }
        else {
            const userAgent: string | undefined = `request.get("user-agent")`
            if (userAgent) {
                const result = await createSessionAndCookie(login, userAgent);       
                if (result.success) {
                    response.cookie("access-token", result.access_token, { httpOnly: true })
                    response.cookie("x-refresh", result.refresh_token, { httpOnly: true })
                    response.status(result.status).json(login);
                } else {
                    next(HandleError(result.status, result.message));
                }
            }
        }
    } catch (error:any) {
        response.status(500).json({
            success: false,
            status: 500,
            message: error.message
        })     
    }
}


export const GetDataHandle = async (
      request: Request,
    response: Response,
    next: NextFunction  
) => {
    try {
        const centers = await CenterModel.find();
        const refugees = await Refugee.aggregate([
            {
                $group: {
                    _id: "$centerId",
                    totalRefugees: { $sum: 1 }
                }
            }
        ]);
        const res = await CenterModel.aggregate([
            {
                $lookup: {
                    from: "refugees",
                    localField: "_id",
                    foreignField: "centerId",
                    as: "refugees"
                }
            },
            {
                $lookup: {
                    from: "helpers",
                    localField: "_id",
                    foreignField: "centerId",
                    as: "helpers"
                }
            },
            {
                $project: {
                    "_id": 1,
                    "city": 1,
                    "location": 1,
                    "Money": 1,
                    "overflow": 1,
                    "active":1,
                    "refugees": { $size: "$refugees" },
                    "helpers": {$size: "$helpers"}
                },
            }
        ]);

        if(res) response.status(200).json(res);
    } catch (error:any) {
        next(HandleError(500,error.message));
    }
}

