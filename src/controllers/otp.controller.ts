import { Request, Response } from "express";
import Otp from "../models/Otp";
import { generateOtp } from "../utils/otp";

export const getOtp = async (req: Request, res: Response) => {
    try {
        const { email, mobile, purpose } = req.body;

        if (!email && !mobile) {
            return res.status(400).json({ message: "Email or mobile required" });
        }

        const otp = generateOtp();

        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        await Otp.create({
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
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};



export const validateOtp = async (req: Request, res: Response) => {
    try {
        const { email, mobile, otp, purpose } = req.body;

        const record = await Otp.findOne({
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
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

