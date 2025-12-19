"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentDashboardStats = void 0;
const Agent_1 = __importDefault(require("../models/Agent"));
const agentDashboardStats = async (req, res) => {
    console.log('hello');
    try {
        // Total agents (active + inactive)
        const totalAgents = await Agent_1.default.countDocuments();
        // Active & Online agents
        const onlineAgents = await Agent_1.default.countDocuments({
            online: 1,
        });
        // Active & Offline agents
        const offlineAgents = await Agent_1.default.countDocuments({
            online: 0,
        });
        res.json({
            success: true,
            data: {
                totalAgents,
                onlineAgents,
                offlineAgents,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to load agent dashboard data",
            error,
        });
    }
};
exports.agentDashboardStats = agentDashboardStats;
