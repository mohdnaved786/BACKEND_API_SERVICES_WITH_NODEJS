import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer extends Document {
    customerId: string;          // unique readable ID
    name: string;
    email?: string;
    mobile: string;
    country: string;
    countryCode: string;         // +91, +1 etc
    gender?: "male" | "female";
    photo?: string;

    birthday?: Date;
    anniversary?: Date;

    assignedAgent?: mongoose.Types.ObjectId;

    status: 0 | 1;               // 1 = active, 0 = inactive
    lastContactedAt?: Date;

    createdAt: Date;
    updatedAt: Date;
}

const customerSchema = new Schema<ICustomer>(
    {
        customerId: { type: String, unique: true, required: true },
        name: { type: String, required: true },

        email: { type: String, unique: true },
        mobile: { type: String, required: true, unique: true },
        country: { type: String, required: true },
        countryCode: { type: String, required: true },

        gender: { type: String, enum: ["male", "female"] },
        photo: { type: String },

        birthday: { type: Date },
        anniversary: { type: Date },

        assignedAgent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Agent"
        },

        status: { type: Number, enum: [0, 1], default: 1 },
        lastContactedAt: { type: Date }
    },
    { timestamps: true }
);

export default mongoose.model<ICustomer>("Customer", customerSchema);
