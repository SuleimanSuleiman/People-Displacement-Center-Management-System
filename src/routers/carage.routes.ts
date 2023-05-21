import express, { Router } from "express";
import ValidateResource from "../middlewares/ValidateResource";
import { Caragechema } from "../Schemas/centers/Carage.schema";
import { AddCarHandle, CreateCarageHandle, GetAllTruckHandle } from '../controllers/carage.controller';
import { checkFindUser } from '../middlewares/checkFindUser';
import {  AddCarSchema } from '../Schemas/centers/AddCar.schema';
import HandleError from '../middlewares/HandleError';

const router: Router = express.Router();

router.get("/",
    [checkFindUser],
    GetAllTruckHandle
)

/////////////////////////////////////////////////////
router.get('/:carId',
    [checkFindUser, ],
)
//////////////////////////////////////////////////

router.post("/addCarage",
    [checkFindUser,ValidateResource(Caragechema)],
    CreateCarageHandle
)

router.post('/addTruck',
    [checkFindUser, ValidateResource(AddCarSchema)],
    AddCarHandle
)


router.all('*', (req, res, next) => {
    next(HandleError(404,'not found'))
})

export default router;