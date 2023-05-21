import mongoose,{ Document} from "mongoose";

export interface CenterDocument extends Document{
    city: string;
    location: string;
}

const CenterSchema = new mongoose.Schema<CenterDocument>({
    city: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
})

const model = mongoose.model<CenterDocument>('Center', CenterSchema)

export default model;
