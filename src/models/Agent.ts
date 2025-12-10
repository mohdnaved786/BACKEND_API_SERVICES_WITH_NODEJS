import mongoose, { Schema, Document } from "mongoose";

export interface IAgent extends Document {
    agentId: string;
    name: string;
    email: string;
    mobile: string;
    country: string;
    role: "agent";
    status: 0 | 1;          // active/inactive
    online: 0 | 1;          // 1 = online, 0 = offline
    photo?: string;
    createdAt: Date;
    updatedAt: Date;
}

const agentSchema = new Schema<IAgent>(
    {
        agentId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        mobile: { type: String, required: true },
        country: { type: String, required: true },
        role: { type: String, default: "agent" },
        status: { type: Number, enum: [0, 1], default: 1 }, // active / inactive
        online: { type: Number, enum: [0, 1], default: 0 }, // offline by default
        photo: { type: String },
    },
    { timestamps: true }
)

export default mongoose.model<IAgent>("Agent", agentSchema);



