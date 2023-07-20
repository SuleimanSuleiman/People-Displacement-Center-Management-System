import { Request,Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { logger } from '../utils/logger';

const ValidateResource = (
    Schema: AnyZodObject
) => (
    requset: Request,
    response: Response,
    next: NextFunction
) => {
    try { 

        Schema.parse({
            body: requset.body,
            query: requset.query,
            params: requset.params
        });

        next()
    } catch (error: any) {
        logger.error(error.message)
        return response.status(400).send(error.message);
        }
    };

export default ValidateResource;