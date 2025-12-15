import { Router } from "express";
import {
  sendMessage,
  getMessagesByConversation,
  markMessagesAsRead,
  deleteMessage,
  getConversations,
} from "../controllers/message.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/send", authMiddleware, sendMessage);
router.get("/conversations", authMiddleware, getConversations);
router.get("/:conversationId", authMiddleware, getMessagesByConversation);
router.put("/read", authMiddleware, markMessagesAsRead);
router.delete("/delete", authMiddleware, deleteMessage);

export default router;
