"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOtp = exports.getOtp = void 0;
const Otp_1 = __importDefault(require("../models/Otp"));
const otp_1 = require("../utils/otp");
const getOtp = async (req, res) => {
    try {
        const { email, mobile, purpose } = req.body;
        if (!email && !mobile) {
            return res.status(400).json({ message: "Email or mobile required" });
        }
        const otp = (0, otp_1.generateOtp)();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
        await Otp_1.default.create({
            email,
            mobile,
            otp,
            purpose,
            expiresAt,
        });
        return res.json({
            success: true,
            message: "OTP generated successfully",
            otp, // ⚠️ ONLY FOR TESTING
            expiresIn: "5 minutes",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getOtp = getOtp;
const validateOtp = async (req, res) => {
    try {
        const { email, mobile, otp, purpose } = req.body;
        const record = await Otp_1.default.findOne({
            otp,
            purpose,
            isUsed: false,
            $or: [{ email }, { mobile }],
        });
        if (!record) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }
        if (record.expiresAt < new Date()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired",
            });
        }
        record.isUsed = true;
        await record.save();
        return res.json({
            success: true,
            message: "OTP verified successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.validateOtp = validateOtp;
