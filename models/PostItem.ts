// models/PostItem.ts
import mongoose, { Schema, Document, model } from 'mongoose';

export interface IPostItem extends Document {
    pname: string;
    brand: string;
    allcategory: string;
    category: string;
    description: string;
    price: string;
    alink: string;
    img: string;
}

const postItemSchema = new Schema<IPostItem>({
    pname: { type: String, required: true },
    brand: { type: String, required: true },
    allcategory: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    alink: { type: String, required: true },
    img: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.PostItem || model<IPostItem>('PostItem', postItemSchema);