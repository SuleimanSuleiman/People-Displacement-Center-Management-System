import { Request,Response,NextFunction } from "express"
import { VerifyJWT, HandleRefreshToken } from '../services/session.service';
import HandleError from '../middlewares/HandleError';

export default async function   authHandle(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const accessToken = request.cookies['access-token'];
    const xRefresh = request.cookies['x-refresh'];
    if (!accessToken) return next()
    else {
        const { decoded, expired } = await VerifyJWT(accessToken)
        if (decoded) {
            response.locals.user = decoded
            return next()
        } else if (expired && xRefresh) {
            const RefreshToken = await HandleRefreshToken(xRefresh);
            if (!RefreshToken) {
                if (request.path === '/humen/login' || request.path === 'humen/signup') {
                    next()
                } else {
                    return next(HandleError(403, "please login again"));
                }
            }
        else {
            response.cookie("access-token", RefreshToken.access_token, { httpOnly: true })
            response.locals.user = RefreshToken.decoded;
            return next()
        }
        } else {
            return next(HandleError(403, "please login again"));
        }
    }
} 