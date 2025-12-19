"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserStatus = exports.updateProfile_old = exports.updateProfile = exports.getProfile = exports.getAllUsers = exports.deleteUser = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = async (req, res) => {
    try {
        let { userId, userName, email, password, country, mobile, role, active } = req.body;
        if (!email || !password || !userId) {
            return res.status(400).json({
                success: false,
                message: "userId, email and password are required"
            });
        }
        // check duplicate
        const exists = await User_1.default.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }
        // hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // photo file
        const photo = req.file ? req.file.filename : null;
        const newUser = await User_1.default.create({
            userId,
            userName,
            email,
            password: hashedPassword,
            country,
            mobile,
            role,
            active,
            photo,
        });
        return res.json({
            success: true,
            message: "User created successfully",
            user: newUser,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
exports.createUser = createUser;
const deleteUser = async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.json({
            success: true,
            message: "User deleted successfully"
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Server Error", error: err });
    }
};
exports.deleteUser = deleteUser;
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.default.find().select("-password").sort({ createdAt: -1 }); // hide passwords
        return res.json({
            success: true,
            count: users.length,
            users,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
exports.getAllUsers = getAllUsers;
const getProfile = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json({ success: true, user });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const allowedUpdates = {
            userName: req.body.userName,
            email: req.body.email,
            mobile: req.body.mobile,
            country: req.body.country,
            role: req.body.role,
            status: req.body.status,
            photo: req.body.photo,
        };
        const user = await User_1.default.findByIdAndUpdate(req.params.id, allowedUpdates, { new: true }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            success: true,
            message: "User updated successfully",
            user,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.updateProfile = updateProfile;
const updateProfile_old = async (req, res) => {
    try {
        const updateData = req.body;
        const user = await User_1.default.findByIdAndUpdate(req.params.id, updateData, { new: true }).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json({ success: true, message: "User updated successfully", user, });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.updateProfile_old = updateProfile_old;
// add new api for user status update
const updateUserStatus = async (req, res) => {
    try {
        const userId = req.params.id;
        const { status } = req.body;
        if (status !== 0 && status !== 1) {
            return res.status(400).json({ message: "Status must be 0 or 1" });
        }
        const user = await User_1.default.findByIdAndUpdate(userId, { status }, { new: true }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({
            success: true,
            message: "User status updated successfully",
            user,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};
exports.updateUserStatus = updateUserStatus;
