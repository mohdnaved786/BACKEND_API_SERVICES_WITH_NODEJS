"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAgentOnlineStatus = exports.deleteAgent = exports.updateAgent = exports.getAgentById = exports.getAllAgents = exports.createAgent = void 0;
const Agent_1 = __importDefault(require("../models/Agent"));
// CREATE AGENT
const createAgent = async (req, res) => {
    try {
        const agentData = req.body;
        const newAgent = await Agent_1.default.create(agentData);
        return res.json({
            success: true,
            message: "Agent created successfully",
            agent: newAgent,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
exports.createAgent = createAgent;
// GET ALL AGENTS
const getAllAgents = async (req, res) => {
    try {
        const agents = await Agent_1.default.find();
        return res.json({
            success: true,
            count: agents.length,
            agents,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getAllAgents = getAllAgents;
// GET SINGLE AGENT
const getAgentById = async (req, res) => {
    try {
        const agent = await Agent_1.default.findById(req.params.id);
        if (!agent)
            return res.status(404).json({ message: "Agent not found" });
        res.json({ success: true, agent });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getAgentById = getAgentById;
// UPDATE AGENT
const updateAgent = async (req, res) => {
    try {
        const agent = await Agent_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!agent)
            return res.status(404).json({ message: "Agent not found" });
        res.json({ success: true, message: "Agent updated", agent });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.updateAgent = updateAgent;
// DELETE AGENT
const deleteAgent = async (req, res) => {
    try {
        const agent = await Agent_1.default.findByIdAndDelete(req.params.id);
        if (!agent)
            return res.status(404).json({ message: "Agent not found" });
        res.json({ success: true, message: "Agent deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.deleteAgent = deleteAgent;
// CHANGE ONLINE/OFFLINE STATUS
const updateAgentOnlineStatus = async (req, res) => {
    try {
        const { online } = req.body;
        if (online !== 0 && online !== 1)
            return res.status(400).json({ message: "online must be 0 or 1" });
        const agent = await Agent_1.default.findByIdAndUpdate(req.params.id, { online }, { new: true });
        if (!agent)
            return res.status(404).json({ message: "Agent not found" });
        res.json({
            success: true,
            message: "Online/Offline status updated Successfully",
            agent,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.updateAgentOnlineStatus = updateAgentOnlineStatus;
