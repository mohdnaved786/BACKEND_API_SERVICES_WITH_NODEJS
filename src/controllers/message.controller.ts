import { Request, Response } from "express";
import Conversation from "../models/Conversation";
import Message from "../models/Message";

/**
 * SEND MESSAGE
 */
export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { userId, agentId, senderType, message } = req.body;

        if (!userId || !agentId || !senderType || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let conversation = await Conversation.findOne({ userId, agentId });
        if (!conversation) {
            conversation = await Conversation.create({ userId, agentId });
        }

        const senderId = senderType === "user" ? userId : agentId;
        const receiverId = senderType === "user" ? agentId : userId;

        const newMessage = await Message.create({
            conversationId: conversation._id,
            senderType,
            senderId,
            receiverId,
            message,
        });

        conversation.lastMessage = message;
        conversation.lastMessageAt = new Date();
        await conversation.save();

        res.json({ success: true, message: newMessage });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

/**
 * GET ALL MESSAGES OF A CONVERSATION
 */
export const getMessagesByConversation = async (req: Request, res: Response) => {
    try {
        const { conversationId } = req.params;

        const messages = await Message.find({ conversationId })
            .sort({ createdAt: 1 });

        res.json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

/**
 * MARK MESSAGES AS READ
 */
export const markMessagesAsRead = async (req: Request, res: Response) => {
    try {
        const { conversationId, receiverId } = req.body;

        await Message.updateMany(
            { conversationId, receiverId, isRead: false },
            { isRead: true }
        );

        res.json({ success: true, message: "Messages marked as read" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

/**
 * DELETE MESSAGE (SOFT DELETE)
 */
export const deleteMessage = async (req: Request, res: Response) => {
    try {
        const { messageId, deletedBy } = req.body;

        await Message.findByIdAndUpdate(messageId, {
            $addToSet: { deletedBy },
        });

        res.json({ success: true, message: "Message deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

/**
 * GET USER / AGENT CONVERSATIONS
 */
export const getConversations = async (req: Request, res: Response) => {
    try {
        const { userId, agentId } = req.query;

        const filter: any = {};
        if (userId) filter.userId = userId;
        if (agentId) filter.agentId = agentId;

        const conversations = await Conversation.find(filter)
            .sort({ lastMessageAt: -1 });

        res.json({ success: true, conversations });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
