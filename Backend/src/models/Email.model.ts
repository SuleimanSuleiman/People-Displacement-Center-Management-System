import mongoose,{Document} from "mongoose";
import { PeopleDocument } from './People.model';

export interface EmailDocument extends Document{
    HumenId: PeopleDocument['_id'];
    token: string;
    expiresAt: Date
}


const TokenSchema = new mongoose.Schema<EmailDocument>({
    HumenId:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    token:{
        type: String
    },
    expiresAt: {
        type: Date,
        required: true,
        default:  function() {
            return new Date(Date.now() + 10 * 60 * 1000);
        }
    }
}, {
    timestamps: true
})

const model = mongoose.model<EmailDocument>('Email', TokenSchema)

export default model;
