// const User = require("../models/User");
// const crypto = require("crypto");
// const jwt = require("jsonwebtoken");

// const hashPassword = (password) => {
//   return crypto.createHash("sha256").update(password).digest("hex");
// };

// exports.registerUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists)
//       return res
//         .status(400)
//         .json({ message: "User already exists", status: 0 });

//     const user = new User({
//       email,
//       password: hashPassword(password),
//     });

//     await user.save();
//     res.status(201).json({ message: "User created Successfully", status: 1 });
//   } catch (err) {
//     res.status(500).json({ message: err.message, status: 0 });
//   }
// };

// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || user.password !== hashPassword(password))
//       return res
//         .status(400)
//         .json({ message: "Invalid credentials", status: 0 });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({ token, status: 1 });
//   } catch (err) {
//     res.status(500).json({ message: err.message, status: 0 });
//   }
// };


import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // check email exist
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.json({ message: "User registered successfully", status: 1, user });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};
