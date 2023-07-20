import HumenModel from "../models/People.model";
import { omit, split } from 'lodash';
import { refugeeInput } from '../Schemas/humen/Refugee.Schema';
import Refugee from "../models/refugee.model";
import { loginUserInput } from '../Schemas/humen/loginUser.schema';
import HelperModel, { HelperDocument } from '../models/Helper.model';
import Center from '../models/Center.model';
import { sendEmail } from './SendEmail.service';
import { FilterQuery, ObjectId, Query } from 'mongoose';
import { RefugeeDocument } from '../models/refugee.model';
import { PythonShell } from 'python-shell';
import mongoose from 'mongoose';
import City from '../models/City.model';
import Fuzzy from "../models/Fuzzy.model";
import { CreateCenter } from './Center.service';
import { CenterDocument } from '../models/Center.model';
import PeopleDocument from '../models/People.model';
const pythonScriptPath = "d:/New folder/People-Displacement-Center-Management-System/createCenterBackend.py";


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
  await HelperModel.findById(query)
)

export const UpdateHelperService = async (
  id: ObjectId
) => (
  await HelperModel.findByIdAndUpdate(id,{active: false},{new:true})
)

export const CheckRefugeeAndBuildCenterHandle = async (
  query: FilterQuery<RefugeeDocument>
) => {
  try {
    const refugee_length = await Refugee.find(query).count();

    const centerData = await Center.findById(query['centerId']);

    if (!refugee_length || !centerData) throw new Error('error when fetch data ');

    // @ts-ignore
    if (refugee_length + 10 == centerData.overflow) {
      return {
        message: "should handle with fuzzy"
      }
    }
    // @ts-ignore
    else if (refugee_length >= centerData.overflow + 10) {
     
      return {
        message: "set active => false"
      }
    }
    else {
      return {
        message: "not overflow"
      }
    }

  } catch (err: any) {
    throw new Error(err.message);
  }
}

export const fuzzyHandle = async(query: FilterQuery<RefugeeDocument>) => {

  try {
    const centerData = await Center.findById(query['centerId']);
    const data: any = await Fuzzy.find({
      name: centerData?.location
    });

    if (!data) throw new Error("not found data");

    const variablesToSend = [data[0].data[0].population_growth, data[0].data[0].building_resistance];
    const options:any = {
      args: variablesToSend,
    };

    PythonShell.run(pythonScriptPath, options).then(messages => {
      console.log(messages);
      if (messages[1] === 'Build') {
        console.log("build")
        HandleCreateNewCenter(centerData);
      }
    });
    } catch (error:any) {
         throw new Error(error.message)    
    }
}

const HandleCreateNewCenter = async (centerData: any) => {
  try {
    const payload: any = {
      location: centerData.location,
      city: centerData.city + Date.now(),
      overflow: 60,
      active: "true",
    }
      const createCenter: any = CreateCenter(payload);
      if (createCenter) {
        await sendEmail("johnmikegithub@gmail.com", "Manger",
          `رئيس لقد قامت خوارزميات الزكاء الصنعي ببناء مركز في منطقة 
                  ${centerData.city} وذلك خوفا من حدوث فيضان لاجئين في المركز الحالي يمكن معرفة عنوانه الفيزيائي عن طريق التواصل المباشر مع المنظم اسم 
                  المركز هو ${payload.city} في ${centerData.location} قم بتعيين مسؤول عن هذا المركز ليقوم بالواجب`);
        const locationData: any = await City.aggregate([
          {
            $match: { name: centerData.location }
          },
          {
            $project: {
              _id: 1,
              name: 1,
              regions: {
                $map: {
                  input: "$regions",
                  as: "region",
                  in: {
                    $cond: {
                      if: { $eq: ["$$region.name", centerData.city] },
                      then: {
                        name: "$$region.name",
                        value: { $subtract: ["$$region.value", 1] }
                      },
                      else: "$$region"
                    }
                  }
                }
              }
            }
          }
        ]);
        await City.findOneAndUpdate({ name: centerData.location }, locationData[0]);
        for (let i = 0; i < locationData[0].regions.length; i++) {
          if (locationData[0].regions[i].name === centerData.city && locationData[0].regions[i].value == 0) {
            await sendEmail("johnmikegithub@gmail.com", "Manger",
              `رئيس لقد تم تنشيط واستخدام كل المراكز الموجودى في محافظة ${centerData.location} منطقة ${centerData.city} قم ببناء مركز هناك ان كان هناك حاجة`);
            break;
          }
        }
      }
  } catch (err: any) {
    throw new Error(err.message)
  }
}
