// models/Product.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  brand?: string;
  stock: number;
  images: string[];
  status: 1 | 0; // 1 = active, 0 = inactive
  createdAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    category: { type: String, required: true },
    brand: { type: String },
    stock: { type: Number, required: true },
    images: [{ type: String }],
    status: { type: Number, enum: [0, 1], default: 1 }
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
