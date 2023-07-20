import SessionModel from '../models/Session.model';
import { SessionDocument } from '../models/Session.model';
import jwt from "jsonwebtoken";
import config from 'config';
import People from "../models/People.model";
import { PeopleDocument } from '../models/People.model';
import NextFunction from 'express';

export const createSession = async (
    userId: string,
    userAgent: string
) => {
    try {
        const session = await SessionModel.create({
            userId: userId,
            userAgent: userAgent
        })
        if(session) return session.toJSON();
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export const SignJWT = async(
    payload: Object,
    options?: jwt.SignOptions | undefined
) => (
    jwt.sign(payload, config.get<string>("SECRET_JWT"), {
        ...options,
        algorithm: "HS512"
    })
)

export const VerifyJWT = async(
    accessToken: string
) => {
    try {
        const decoded = jwt.verify(accessToken, config.get<string>("SECRET_JWT"));
        return {
            decoded,
            valid: true,
            expired: false,
        }
    } catch (error:any) {
        return {
            decoded: null,
            valid: false,
            expired: error.message === 'jwt expired'
        }
    }
}

export const HandleRefreshToken = async(
    refreshToken: string
) => {
    try {
        const { decoded, expired } = await VerifyJWT(refreshToken);
        if (!decoded) return false
        else {
            const findSession = await SessionModel.findOne({
                // @ts-ignore
                _id: decoded.sessionId,
                // @ts-ignore
                userId: decoded._doc._id
            })
            if (!findSession || !findSession.valid) return false
            else {
                // @ts-ignore
                const findUserHandle = await People.findById(decoded._doc._id)
                const access_token = await SignJWT(
                    { ...findUserHandle, sessionId: findSession._id },
                    { expiresIn: config.get<string>("accessToken") });
                
                return {
                    decoded,
                    access_token
                }
            }
        }


    } catch (error:any) {
        return false
    }
}

export const createSessionAndCookie = async (
    findUserHandle: PeopleDocument,
    userAgent: string
) => {
    const session = await createSession(findUserHandle._id, userAgent || "");
            if (session) {
                //create session token
                const access_token = await SignJWT(
                    { ...findUserHandle, sessionId: session._id },
                    { expiresIn: config.get<string>("accessToken") });
                
                //create refresh token
                const refresh_token = await SignJWT(
                    { ...findUserHandle, sessionId: session._id },
                    { expiresIn: config.get("refreshToken") }
                );

                if (access_token && refresh_token) {
                    return {
                        success: true,
                        status: 200,
                        access_token,
                        refresh_token,
                        message: "successfully"
                    }
                } else {
                    return {
                        success: false,
                        status: 400,
                        message: "please try later"
                    }
                }
            } else {
                return {
                    success: false,
                    status: 400,
                    message: "please try later"
                }
            }
}