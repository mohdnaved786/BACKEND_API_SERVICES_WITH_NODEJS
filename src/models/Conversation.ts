import mongoose, { Schema, Document } from "mongoose";

export interface IConversation extends Document {
    userId: mongoose.Types.ObjectId;
    agentId: mongoose.Types.ObjectId;
    lastMessage?: string;
    lastMessageAt?: Date;
}

const conversationSchema = new Schema<IConversation>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        agentId: { type: Schema.Types.ObjectId, ref: "Agent", required: true },
        lastMessage: String,
        lastMessageAt: Date,
    },
    { timestamps: true }
);

export default mongoose.model<IConversation>("Conversation", conversationSchema);
