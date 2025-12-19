"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversations = exports.deleteMessage = exports.markMessagesAsRead = exports.getMessagesByConversation = exports.sendMessage = void 0;
const Conversation_1 = __importDefault(require("../models/Conversation"));
const Message_1 = __importDefault(require("../models/Message"));
/**
 * SEND MESSAGE
 */
const sendMessage = async (req, res) => {
    try {
        const { userId, agentId, senderType, message } = req.body;
        if (!userId || !agentId || !senderType || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }
        let conversation = await Conversation_1.default.findOne({ userId, agentId });
        if (!conversation) {
            conversation = await Conversation_1.default.create({ userId, agentId });
        }
        const senderId = senderType === "user" ? userId : agentId;
        const receiverId = senderType === "user" ? agentId : userId;
        const newMessage = await Message_1.default.create({
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
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.sendMessage = sendMessage;
/**
 * GET ALL MESSAGES OF A CONVERSATION
 */
const getMessagesByConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const messages = await Message_1.default.find({ conversationId })
            .sort({ createdAt: 1 });
        res.json({ success: true, messages });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getMessagesByConversation = getMessagesByConversation;
/**
 * MARK MESSAGES AS READ
 */
const markMessagesAsRead = async (req, res) => {
    try {
        const { conversationId, receiverId } = req.body;
        await Message_1.default.updateMany({ conversationId, receiverId, isRead: false }, { isRead: true });
        res.json({ success: true, message: "Messages marked as read" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.markMessagesAsRead = markMessagesAsRead;
/**
 * DELETE MESSAGE (SOFT DELETE)
 */
const deleteMessage = async (req, res) => {
    try {
        const { messageId, deletedBy } = req.body;
        await Message_1.default.findByIdAndUpdate(messageId, {
            $addToSet: { deletedBy },
        });
        res.json({ success: true, message: "Message deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.deleteMessage = deleteMessage;
/**
 * GET USER / AGENT CONVERSATIONS
 */
const getConversations = async (req, res) => {
    try {
        const { userId, agentId } = req.query;
        const filter = {};
        if (userId)
            filter.userId = userId;
        if (agentId)
            filter.agentId = agentId;
        const conversations = await Conversation_1.default.find(filter)
            .sort({ lastMessageAt: -1 });
        res.json({ success: true, conversations });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getConversations = getConversations;
