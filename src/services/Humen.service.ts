import HumenModel from "../models/People.model";
import { omit } from 'lodash';
import { refugeeInput } from '../Schemas/humen/Refugee.Schema';
import Refugee from "../models/refugee.model";
import { loginUserInput } from '../Schemas/humen/loginUser.schema';
import HelperModel, { HelperDocument } from '../models/Helper.model';
import Center from '../models/Center.model';
import { sendEmail } from './SendEmail.service';
import { FilterQuery, ObjectId } from 'mongoose';

export const CreateUser = async (
  payload: any
) => {
  try {
    const newUser = await HumenModel.create(payload)
    return omit(newUser.toJSON(),"password")
  } catch (error:any) {
    throw new Error(error.message)
  }
}

export const loginUser = async (
  payload: loginUserInput
) => {

  const login = await HumenModel.findOne({
    email: payload.body.email,
  })
  if (login) {
    // @ts-ignore
    const ispasswordTrue = await login.comparePassword(payload.body.password);
    if (ispasswordTrue) {
      return login;
    } else {
      return false;
    }
  }
}

export const AddRefugee = async(
  payload:refugeeInput
) => {
  try {
    const newRefugee = await Refugee.create(payload.body);
    if (newRefugee) return newRefugee.toJSON()
    else return false
  } catch (_) {
    return false
  }
}

export const addHelperHandleService = async (
  payload:Omit<HelperDocument, "createdAt" | "updatedAt">
) => {
  try {
    const addInDB = await HelperModel.create(payload);
    if (!addInDB) throw new Error("an error happened with insert in DB");
    return {
      success: true,
      ...addInDB,
    }
  } catch (error:any) {
    return {
      success: false,
      message: error.message,
    }
  }
}


export const FindHelper = async (
  num: string,
  location: string,
  centerId: string
) => {
  try {

    const center = await Center.findById(centerId);

    const searchHelper = await HelperModel.aggregate([
      {
        $lookup: {
            from: "centers",
            localField: "centerId",
            foreignField: "_id",
            as: "centerId"
        }
      },
      {
        $set: {
          centerId: {
            $arrayElemAt: ["$centerId",0]
          }
        }
      },
      {
        $match: {
          active: false,
          "centerId.location": location
        }
      },
      {
        $project: {
          _id: 1,
          email: 1,
          active: 1,
          centerId: {
            location: 1
          }
        }
      }
    ])

    if (searchHelper) {
      let size:Number = searchHelper.length> Number(num)?Number(num):searchHelper.length
        for (let i = 0; i < Number(size); i++){
          await sendEmail(searchHelper[i].email, "Helper",
            `we need to you in ${center?.city} , ${center?.location}
            thank you for your support 
            `)
        }
        return {
          success: true,
          number_of_helper: size
        }
    } else {
      return {
        success: false,
        number_of_helper: 0
      }
    }

  } catch (error:any) {
      return {
        success: false,
        number_of_helper: 0,
        error: error.message
      }
  }
}

export const GetHelper = async (
  query: FilterQuery<HelperDocument>
) => (
  await HelperModel.find(query)
)

export const UpdateHelperService = async (
  id: ObjectId
) => (
  await HelperModel.findByIdAndUpdate(id,{active: false},{new:true})
)