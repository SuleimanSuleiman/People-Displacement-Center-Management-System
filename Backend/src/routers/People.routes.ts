import express, { Router, Request, Response } from "express";
import ValidateResource from '../middlewares/ValidateResource';
import { LoginHandler, VerifyToken, createNewUser } from '../controllers/humen.controller';
import { createUserSchema } from "../Schemas/humen/humen.schema";
import { TokenEmailSchema } from '../Schemas/humen/TokenEmail.schema';
import checkIfRoleAdmin from "../middlewares/checkIfRoleAdmin";
import { checkFindUser } from '../middlewares/checkFindUser';
import { addRefugeeHandle, GetAllRefugee } from '../controllers/Refugee.controller';
import { refugeeScehma } from '../Schemas/humen/Refugee.Schema';
import { loginUserSchema } from "../Schemas/humen/loginUser.schema";
import { addHelperHandle, NeedHelperHandle, LeaveHelperHandle, ReomveHelperHandle, GetAllHelper } from '../controllers/helper.controller';
import { helperSchema } from "../Schemas/humen/helper.schema";
import { NeedHelperSchema } from '../Schemas/humen/NeedHelper.schema';
import { LeaveHelperSchema } from '../Schemas/humen/LeaveHelperSchema';

const router: Router = express.Router()


router.post("/signup",
    [checkIfRoleAdmin,ValidateResource(createUserSchema)],
    createNewUser
)

router.get(
    "/verify/:humen_id/:token",
    ValidateResource(TokenEmailSchema), 
    VerifyToken
)

router.post(
    '/login',
    ValidateResource(loginUserSchema),
    LoginHandler
)

router.get('/getRefugee/:id', GetAllRefugee);

router.post(
    '/addrefugee',
     [checkFindUser, ValidateResource(refugeeScehma)],
    addRefugeeHandle
)

router.post(
    '/addhelper',
     [checkFindUser, ValidateResource(helperSchema)],
    addHelperHandle
)

router.get(
    '/needHelper/:num/:location/:centerId',
     [checkFindUser, ValidateResource(NeedHelperSchema)],
    NeedHelperHandle
)

router.get('/helpers/:id',GetAllHelper)


router.get(
    '/leavehelper/:id',
     [checkFindUser],
    LeaveHelperHandle
)

router.get(
    '/removehelper/:id',
     [checkFindUser],
    ReomveHelperHandle
)
export default router;