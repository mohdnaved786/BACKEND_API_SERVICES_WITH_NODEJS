import { Router } from "express";
import {
    createAgent,
    getAllAgents,
    getAgentById,
    updateAgent,
    deleteAgent,
    updateAgentOnlineStatus,
} from "../controllers/agent.controller";

const router = Router();

router.post("/createAgent", createAgent);
router.get("/getAllAgents", getAllAgents);
router.get("/getAgentById/:id", getAgentById);
router.put("/updateAgent/:id", updateAgent);
router.delete("/deleteAgent/:id", deleteAgent);

// update only online status
router.patch("/:id/online", updateAgentOnlineStatus);

export default router;
