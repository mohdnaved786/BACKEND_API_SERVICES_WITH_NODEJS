import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  userId: string;
  userName: string;
  email: string;
  password: string;
  mobile: string;
  country: string;
  role: "administrator" | "supervisor" | "agent";
  active: boolean;
  photo?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    userId: { type: String, required: true, unique: true },
    userName: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    mobile: { type: String },
    country: { type: String },
    role: { type: String, enum: ["administrator", "supervisor", "agent"], required: true },
    active: { type: Boolean, default: true },
    photo: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
