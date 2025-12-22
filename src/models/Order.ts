// models/Order.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  orderId: string;
  userId: mongoose.Types.ObjectId;
  items: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  paymentMethod: "COD" | "ONLINE";
  paymentStatus: "PENDING" | "PAID";
  orderStatus: "PLACED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
}

const orderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },

    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number
      }
    ],

    totalAmount: Number,
    paymentMethod: { type: String },
    paymentStatus: { type: String, default: "PENDING" },
    orderStatus: { type: String, default: "PLACED" }
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
