import User from "../models/User";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";



export const createUser = async (req: Request, res: Response) => {
  try {
    let {
      userId,
      userName,
      email,
      password,
      country,
      mobile,
      role,
      active
    } = req.body;

    if (!email || !password || !userId) {
      return res.status(400).json({
        success: false,
        message: "userId, email and password are required"
      });
    }

    // check duplicate
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // photo file
    const photo = req.file ? req.file.filename : null;

    const newUser = await User.create({
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

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};



export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error", error: err });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 }); // hide passwords

    return res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



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
    const allowedUpdates = {
      userName: req.body.userName,
      email: req.body.email,
      mobile: req.body.mobile,
      country: req.body.country,
      role: req.body.role,
      status: req.body.status,
      photo: req.body.photo,
    };

    const user = await User.findByIdAndUpdate(
      req.params.id,
      allowedUpdates,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const updateProfile_old = async (req: Request, res: Response) => {
  try {
    const updateData = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ success: true, message: "User updated successfully", user, });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }


};


// add new api for user status update


export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { status } = req.body;

    if (status !== 0 && status !== 1) {
      return res.status(400).json({ message: "Status must be 0 or 1" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      success: true,
      message: "User status updated successfully",
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};






