import { CarageDocument } from '../models/Carage.model';
import CarageModel from "../models/Carage.model";
import { CarsDocument } from '../models/Cars.model';
import CarModel from "../models/Cars.model";
import {
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";

export const createNewCarage = async (
    payload: CarageDocument
) => {
    try {
        const newCarage = await CarageModel.create(payload);
        return newCarage.toJSON();
    } catch (error:any) {
       throw new Error(error.message);
    }
}


/**
 * إضافة سيارة جديدة
 * @param payload بيانات السيارة
 * @returns وثيقة السيارة المضافة
 */
export const AddNewCarService = async (
    // @ts-ignore
    payload: DocumentDefinition<Omit<CarsDocument,"createdAt" | "updatedAt" >>
): Promise<CarsDocument> => {
    try {
      const newCar = await CarModel.create(payload);
    return newCar;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const GetAllDataService = async (
  id: String
): Promise<CarsDocument[]>  => (
  CarModel.find({
    carageId: id
  })
)