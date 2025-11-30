import User from "../models/User";
import { Request, Response } from "express";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const updateData = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
