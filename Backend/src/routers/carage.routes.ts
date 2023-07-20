import express, { Router } from "express";
import ValidateResource from "../middlewares/ValidateResource";
import { Caragechema } from "../Schemas/centers/Carage.schema";
import { AddCarHandle, CreateCarageHandle, GetAllTruckHandle } from '../controllers/carage.controller';
import { checkFindUser } from '../middlewares/checkFindUser';
import {  AddCarSchema } from '../Schemas/centers/AddCar.schema';
import HandleError from '../middlewares/HandleError';
import City from "../models/City.model";
import Fuzzy from '../models/Fuzzy.model';

const router: Router = express.Router();

router.get("/:id",
    GetAllTruckHandle
)

///////////////////////////////////////////////////
router.get('/:carId',
    [checkFindUser, ],
)
//////////////////////////////////////////////////

router.post("/addCarage",
    [checkFindUser,ValidateResource(Caragechema)],
    CreateCarageHandle
)

router.post('/addTruck/:Cid',
     [checkFindUser, ValidateResource(AddCarSchema)],
    AddCarHandle
)

router.post('/ss',async  (req, res) => {
    try {
    const data = await Fuzzy.create(req.body);
    return res.json(data);
    } catch (err) {
        return res.json(err);
    }
})

router.all('*', (req, res, next) => {
    next(HandleError(404,'not found'))
})


export default router;