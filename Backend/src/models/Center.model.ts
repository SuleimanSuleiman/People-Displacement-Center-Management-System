import mongoose,{ Document} from "mongoose";
import { RefugeeDocument } from './refugee.model';
import { HelperDocument } from './Helper.model';

export interface CenterDocument extends Document{
    city: string;
    location: string;
    overflow: Number;
    active: String;
    refugees: RefugeeDocument['_id'];
    helper: HelperDocument['_id'];
}

const CenterSchema = new mongoose.Schema<CenterDocument>({
    city: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    overflow: {
        type: Number,
        requird: true
    },
    active: {
        type: String
    },
    refugees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Refugee"
    }],
    helper:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Helper"
    }],
})

const model = mongoose.model<CenterDocument>('Center', CenterSchema)

export default model;
