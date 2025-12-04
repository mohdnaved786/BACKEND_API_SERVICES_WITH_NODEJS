// import mongoose, { Schema, Document } from "mongoose";

// export interface IProduct extends Document {
//   name: string;
//   price: number;
//   image: string;
//   description?: string;
//   category?: string;
//   inStock: boolean;
//   createdAt: Date;
// }

// const productSchema = new Schema<IProduct>(
//   {
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     image: { type: String },
//     description: { type: String },
//     category: { type: String },
//     inStock: { type: Boolean, default: true }
//   },
//   { timestamps: true }
// );

// export default mongoose.model<IProduct>("Product", productSchema);


import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  images: string[];
  description?: string;
  category?: string;
  stock: number;
  inStock: boolean;
  createdAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    images: { type: [String], default: [] }, // multiple images
    description: { type: String, default: "" },
    category: { type: String, default: "General" },
    stock: { type: Number, default: 10 },
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
