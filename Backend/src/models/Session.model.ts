import mongoose, { Document } from "mongoose";
import { PeopleDocument } from "./People.model";

export interface SessionDocument extends Document{
    userId: PeopleDocument['_id'],
    valid: boolean,
    userAgent: string,
    createdAt: Date,
    updateAt: Date
}

const sessionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "People"
    },
    valid: {
        type: Boolean,
        default: true
    },
    userAgent: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
     strict: true
})

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);

export default SessionModel;
