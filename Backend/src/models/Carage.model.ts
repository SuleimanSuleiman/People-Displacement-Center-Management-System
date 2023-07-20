import mongoose, { Document } from "mongoose";

export interface CarageDocument extends Document{
    location: string;
    city: string;
}


const CarageSchema = new mongoose.Schema<CarageDocument>({
    city: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
})

const model = mongoose.model<CarageDocument>('Carage', CarageSchema);

export default model