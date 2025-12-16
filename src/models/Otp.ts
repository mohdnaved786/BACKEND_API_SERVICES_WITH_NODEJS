import mongoose, { Schema, Document } from "mongoose";

export interface IOtp extends Document {
  userId?: string;
  email?: string;
  mobile?: string;
  otp: string;
  purpose: "login" | "register" | "reset-password" | "verification";
  expiresAt: Date;
  isUsed: boolean;
}

const otpSchema = new Schema<IOtp>(
  {
    userId: { type: String },
    email: { type: String },
    mobile: { type: String },

    otp: { type: String, required: true },

    purpose: {
      type: String,
      enum: ["login", "register", "reset-password", "verification"],
      required: true,
    },

    expiresAt: { type: Date, required: true },
    isUsed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IOtp>("Otp", otpSchema);
