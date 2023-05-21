import mongoose,{ Document} from "mongoose";
import { CenterDocument } from "./Center.model";
import bcrypt from 'bcryptjs';
import config from 'config';

export interface PeopleDocument extends Document{
    first_name: string;
    last_name: string;
    email: string;
    confirmEmail: boolean;
    role: string;
    timeGo?: Date;
    age: number;
    centerId: CenterDocument['_id'];
    password: string;
}

const PeopleSchema = new mongoose.Schema<PeopleDocument>({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        required: true
    },
    timeGo: {
        type: Date
    },
    age: {
        type: Number,
        required: true
    },
    centerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Center"
    },
    password: {
        type:String,
        requied: true,
        min: 6
    },
}, {
    timestamps: true,
    strict: true
})

PeopleSchema.pre("save", async function (next) {
    let user = this as PeopleDocument;
    if (!user.isModified("password")) {
        return next();
    } else {
        const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"))
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        return next();
    }
})

PeopleSchema.methods.comparePassword = async function (
    comparePass: string
): Promise<Boolean> {
    let user = this as PeopleDocument;
    return bcrypt.compare(comparePass, user.password).catch(err => false)
}

const model = mongoose.model<PeopleDocument>('People', PeopleSchema)

export default model