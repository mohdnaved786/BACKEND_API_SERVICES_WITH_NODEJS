import { Request, Response } from "express";
import Agent from "../models/Agent";

export const agentDashboardStats = async (req: Request, res: Response) => {
    console.log('hello')
    try {
        // Total agents (active + inactive)
        const totalAgents = await Agent.countDocuments();

        // Active & Online agents
        const onlineAgents = await Agent.countDocuments({
            online: 1,
        });

        // Active & Offline agents
        const offlineAgents = await Agent.countDocuments({
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to load agent dashboard data",
            error,
        });
    }
};
