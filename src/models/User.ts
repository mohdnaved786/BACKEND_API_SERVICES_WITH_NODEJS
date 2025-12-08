// import mongoose, { Schema, Document } from "mongoose";

// export interface IUser extends Document {
//   userId: string;
//   userName: string;
//   email: string;
//   password: string;
//   mobile: string;
//   country: string;
//   role: "administrator" | "supervisor" | "agent";
//   active: boolean;
//   photo?: string;
//   createdAt: Date;
// }

// const userSchema = new Schema<IUser>(
//   {
//     userId: { type: String, required: true, unique: true },
//     userName: { type: String },
//     email: { type: String, unique: true, required: true },
//     password: { type: String, required: true },
//     mobile: { type: String },
//     country: { type: String },
//     role: { type: String, enum: ["administrator", "supervisor", "agent"], required: true },
//     active: { type: Boolean, default: true },
//     photo: { type: String }
//   },
//   { timestamps: true }
// );

// export default mongoose.model<IUser>("User", userSchema);








import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  userId: string;
  userName: string;
  email: string;
  password: string;
  mobile: string;
  country: string;
  role: "administrator" | "supervisor" | "agent";
  status: 0 | 1;      // <-- ACTIVE / INACTIVE
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    userId: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    country: { type: String, required: true },

    role: {
      type: String,
      enum: ["administrator", "supervisor", "agent"],
      required: true,
    },

    status: {
      type: Number,
      enum: [0, 1],         // 0 = inactive, 1 = active
      default: 1,
    },

    photo: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
