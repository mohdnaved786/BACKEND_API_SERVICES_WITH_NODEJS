import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
    conversationId: mongoose.Types.ObjectId;
    senderType: "user" | "agent";
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    message: string;
    isRead: boolean;
    deletedBy: string[];
}

const messageSchema = new Schema<IMessage>(
    {
        conversationId: {
            type: Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
        },
        senderType: { type: String, enum: ["user", "agent"], required: true },
        senderId: { type: Schema.Types.ObjectId, required: true },
        receiverId: { type: Schema.Types.ObjectId, required: true },
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        deletedBy: { type: [String], default: [] }, // ["user", "agent"]
    },
    { timestamps: true }
);

export default mongoose.model<IMessage>("Message", messageSchema);
