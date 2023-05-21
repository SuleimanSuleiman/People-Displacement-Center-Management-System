import { extend, toInteger } from "lodash";
import mongoose, { Document } from "mongoose";
import { CenterDocument } from './Center.model';

export interface RefugeeDocument extends Document{
    first_name: string;
    last_name: string;
    mother_name: string;
    father_name: string;
    condtion: string;
    city: string;
    vellage: string
    centerId: CenterDocument['_id'];
}

const RefugeeSchema = new mongoose.Schema<RefugeeDocument>({
    first_name: {
        type: String,
        required: true
     },
    last_name:  {
        type: String,
        required: true
     },
    mother_name:  {
        type: String,
        required: true
     },
    father_name:  {
        type: String,
        required: true
     },
    condtion:  {
        type: String,
        required: true
     },
    city:  {
        type: String,
        required: true
     },
    vellage:  {
        type: String,
        required: true
     },
    centerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Center"
    }
}, {
    timestamps: true,
    strict: true
})

const model = mongoose.model<RefugeeDocument>("Refugee", RefugeeSchema);

export default model;