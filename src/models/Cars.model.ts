import mongoose, { Document } from "mongoose";
import { CarageDocument } from "./Carage.model";
import { CenterDocument } from './Center.model';

export interface CarsDocument extends Document{
    carId: string;
    typeCar: string;
    desc: string;
    active: boolean;
    carageId: CarageDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

const carsSchema = new mongoose.Schema<CarsDocument>({
    carId: {
        type: String,
        length: 6,
        unique: true
    },
    typeCar: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    carageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carage"
    }
}, {
    timestamps: true,
})

const model = mongoose.model<CarsDocument>('Cars', carsSchema)

export default model