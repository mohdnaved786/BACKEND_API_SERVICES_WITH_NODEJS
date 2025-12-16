import { Request, Response } from "express";
import Agent from "../models/Agent";

// CREATE AGENT
export const createAgent = async (req: Request, res: Response) => {
    try {
        const agentData = req.body;

        const newAgent = await Agent.create(agentData);

        return res.json({
            success: true,
            message: "Agent created successfully",
            agent: newAgent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

// GET ALL AGENTS
export const getAllAgents = async (req: Request, res: Response) => {
    try {
        const agents = await Agent.find();

        return res.json({
            success: true,
            count: agents.length,
            agents,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// GET SINGLE AGENT
export const getAgentById = async (req: Request, res: Response) => {
    try {
        const agent = await Agent.findById(req.params.id);
        if (!agent) return res.status(404).json({ message: "Agent not found" });

        res.json({ success: true, agent });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// UPDATE AGENT
export const updateAgent = async (req: Request, res: Response) => {
    try {
        const agent = await Agent.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!agent)
            return res.status(404).json({ message: "Agent not found" });

        res.json({ success: true, message: "Agent updated", agent });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// DELETE AGENT
export const deleteAgent = async (req: Request, res: Response) => {
    try {
        const agent = await Agent.findByIdAndDelete(req.params.id);

        if (!agent)
            return res.status(404).json({ message: "Agent not found" });

        res.json({ success: true, message: "Agent deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// CHANGE ONLINE/OFFLINE STATUS
export const updateAgentOnlineStatus = async (req: Request, res: Response) => {
    try {
        const { online } = req.body;

        if (online !== 0 && online !== 1)
            return res.status(400).json({ message: "online must be 0 or 1" });

        const agent = await Agent.findByIdAndUpdate(
            req.params.id,
            { online },
            { new: true }
        );

        if (!agent)
            return res.status(404).json({ message: "Agent not found" });

        res.json({
            success: true,
            message: "Online/Offline status updated Successfully",
            agent,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
