import mongoose, { Document } from "mongoose";
import { CarageDocument } from "./Carage.model";
import { CenterDocument } from './Center.model';
import { string } from 'zod';

export interface CarsDocument extends Document{
    carId: string;
    typeCar: string;
    desc: string;
    active: string;
    carageId: CarageDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

const carsSchema = new mongoose.Schema<CarsDocument>({
    carId: {
        type: String,
        length: 6,
        unique: true,
        required: true
    },
    typeCar: {
        type: String,
        required: true
    },
    active: {
        type: String,
        // default: false
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