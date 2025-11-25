import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  inStock: boolean;
  createdAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    description: { type: String },
    category: { type: String },
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
