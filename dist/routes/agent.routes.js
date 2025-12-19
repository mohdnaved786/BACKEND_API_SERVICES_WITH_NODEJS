"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agent_controller_1 = require("../controllers/agent.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/createAgent", auth_middleware_1.authMiddleware, agent_controller_1.createAgent);
router.get("/getAllAgents", auth_middleware_1.authMiddleware, agent_controller_1.getAllAgents);
router.get("/getAgentById/:id", auth_middleware_1.authMiddleware, agent_controller_1.getAgentById);
router.put("/updateAgent/:id", auth_middleware_1.authMiddleware, agent_controller_1.updateAgent);
router.delete("/deleteAgent/:id", auth_middleware_1.authMiddleware, agent_controller_1.deleteAgent);
// update only online status
router.patch("/:id/online", agent_controller_1.updateAgentOnlineStatus);
exports.default = router;
