import { Router } from "express";
import {
    createAgent,
    getAllAgents,
    getAgentById,
    updateAgent,
    deleteAgent,
    updateAgentOnlineStatus,
} from "../controllers/agent.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/createAgent", authMiddleware, createAgent);
router.get("/getAllAgents", authMiddleware, getAllAgents);
router.get("/getAgentById/:id", authMiddleware, getAgentById);
router.put("/updateAgent/:id", authMiddleware, updateAgent);
router.delete("/deleteAgent/:id", authMiddleware, deleteAgent);


// update only online status
router.patch("/:id/online", updateAgentOnlineStatus);

export default router;
