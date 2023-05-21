import mongoose, { Document} from "mongoose";
import { extend } from 'lodash';
import { CenterDocument } from './Center.model';
import { Schema } from "zod";

export interface HelperDocument extends Document{
	first_name: string,
	last_name: string,
	active: boolean,
	email: string,
    centerId: CenterDocument['_id'],
    createdAt: Date;
    updatedAt: Date;
}


const HelperSchema = new mongoose.Schema<HelperDocument>({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true,
    },
    centerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Center"
    }, 
}, {
    timestamps: true
})

const HelperModel = mongoose.model<HelperDocument>("Helper", HelperSchema);

export default HelperModel;